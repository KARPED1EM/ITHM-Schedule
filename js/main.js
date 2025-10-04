const scheduleFileMap = {
    entry: 'data/schedule/entry.json',
    advanced: 'data/schedule/advanced.json',
    selfStudy: 'data/schedule/self-study.json'
};

const scheduleData = {
    entry: null,
    advanced: null,
    selfStudy: null
};

let calendarData = null;
let currentScheduleType = null;
let manualScheduleOverride = null;
let specialToday = null;
let hasInitialScroll = false;
let isLoading = true;
let isError = false;
let previewDate = null;

const periodLabels = {
    morning: '<span class="emoji">🌅</span> 上午',
    afternoon: '<span class="emoji">☀️</span> 下午',
    evening: '<span class="emoji">🌙</span> 晚上'
};

const scheduleTypeNames = {
    entry: '入门课',
    advanced: '进阶课',
    selfStudy: '自习日',
    special: '特殊安排'
};

const scheduleTypeEmojis = {
    entry: '📅',
    advanced: '🚀',
    selfStudy: '📚',
    special: '⭐'
};

const weekdayNames = ['日', '一', '二', '三', '四', '五', '六'];

const kindLabels = {
    class: '课程',
    self: '晚自习',
    duty: '整理',
    leave: '离校',
    activity: '活动'
};

const specialScheduleCache = {};
const specialScheduleRequests = {};
const specialScheduleErrors = {};

let timelineNodes = [];

async function loadData() {
    try {
        toggleLoading(true);
        const scheduleEntries = Object.entries(scheduleFileMap);
        const queue = scheduleEntries.map(([, url]) => fetch(url));
        queue.push(fetch('data/calendar.json'));
        const responses = await Promise.all(queue);
        responses.forEach(response => {
            if (!response.ok) throw new Error('网络错误或数据文件不存在');
        });
        const baseData = await Promise.all(responses.slice(0, scheduleEntries.length).map(response => response.json()));
        baseData.forEach((data, index) => {
            const key = scheduleEntries[index][0];
            scheduleData[key] = data;
        });
        calendarData = await responses[responses.length - 1].json();
        determineCurrentSchedule();
        if (specialToday && specialToday.scheduleKey) {
            await fetchSpecialSchedule(specialToday.scheduleKey, false).catch(() => {});
        }
        initUI();
    } catch (error) {
        console.error('Failed to load data:', error);
        isError = true;
        renderErrorState(error);
    } finally {
        toggleLoading(false);
        const timelineContainer = document.getElementById('timelineContainer');
        if (timelineContainer) timelineContainer.classList.remove('hidden');
        const timelineLoading = document.getElementById('timelineLoading');
        if (timelineLoading) timelineLoading.classList.add('hidden');
    }
}

function toggleLoading(loading) {
    isLoading = loading;
    const title = document.getElementById('scheduleTitle');
    const btn = document.getElementById('switchScheduleBtn');
    const timelineLoading = document.getElementById('timelineLoading');
    const timelineContainer = document.getElementById('timelineContainer');
    const emptyMessage = document.getElementById('emptyMessage');
    if (loading) {
        if (title) title.innerHTML = `<span class="emoji">📅</span> 加载中...`;
        if (btn) btn.setAttribute('disabled', 'true');
        if (timelineLoading) timelineLoading.classList.remove('hidden');
        if (timelineContainer) timelineContainer.classList.add('hidden');
        if (emptyMessage) emptyMessage.classList.add('hidden');
        setCardLoadingState();
    } else {
        if (btn) btn.removeAttribute('disabled');
        if (timelineLoading) timelineLoading.classList.add('hidden');
        clearCardLoadingState();
    }
}

function setCardLoadingState() {
    const card = document.getElementById('currentCard');
    if (!card) return;
    const skeleton = card.querySelector('.card-skeleton');
    if (skeleton) skeleton.classList.remove('hidden');
    card.classList.remove('hidden');
    const status = card.querySelector('.card-status');
    const type = card.querySelector('.card-type');
    const title = card.querySelector('.card-title');
    const timeRange = card.querySelector('.card-time-range');
    const countdownLabel = card.querySelector('.countdown-label');
    const countdownValue = card.querySelector('.countdown-value');
    const progressBar = card.querySelector('.card-progress-bar');
    if (status) status.textContent = '加载中';
    if (type) type.textContent = '课程';
    if (title) title.textContent = '请稍候...';
    if (timeRange) timeRange.textContent = '';
    if (countdownLabel) countdownLabel.textContent = '预计开始于';
    if (countdownValue) countdownValue.textContent = '--:--:--';
    if (progressBar) progressBar.style.setProperty('--progress', '0%');
}

function clearCardLoadingState() {
    const card = document.getElementById('currentCard');
    if (!card) return;
    const skeleton = card.querySelector('.card-skeleton');
    if (skeleton) skeleton.classList.add('hidden');
}

function renderErrorState(err) {
    const title = document.getElementById('scheduleTitle');
    if (title) title.innerHTML = `<span class="emoji">⚠️</span> 加载失败`;
    const emptyMessage = document.getElementById('emptyMessage');
    const timelineContainer = document.getElementById('timelineContainer');
    if (emptyMessage) {
        emptyMessage.innerHTML = `<h3>数据加载失败</h3><p>${(err && err.message) || '请稍后重试。'}</p>`;
        emptyMessage.classList.remove('hidden');
    }
    if (timelineContainer) timelineContainer.classList.add('hidden');
    const card = document.getElementById('currentCard');
    if (card) {
        const skeleton = card.querySelector('.card-skeleton');
        if (skeleton) skeleton.classList.add('hidden');
        const status = card.querySelector('.card-status');
        const type = card.querySelector('.card-type');
        const titleEl = card.querySelector('.card-title');
        const timeRange = card.querySelector('.card-time-range');
        const countdownLabel = card.querySelector('.countdown-label');
        const countdownValue = card.querySelector('.countdown-value');
        const progressBar = card.querySelector('.card-progress-bar');
        card.classList.remove('hidden');
        if (status) status.textContent = '错误';
        if (type) type.textContent = '系统';
        if (titleEl) titleEl.textContent = '无法加载数据';
        if (timeRange) timeRange.textContent = '请检查网络或稍后重试';
        if (countdownLabel) countdownLabel.textContent = '';
        if (countdownValue) countdownValue.textContent = '--:--:--';
        if (progressBar) progressBar.style.setProperty('--progress', '0%');
        card.classList.remove('active');
    }
    const calGrid = document.getElementById('calendarGrid');
    if (calGrid) {
        calGrid.innerHTML = `<div class="empty-message"><h3>日历加载失败</h3><p>请稍后重试</p></div>`;
    }
}

function determineCurrentSchedule() {
    const today = new Date();
    const dateStr = formatDateKey(today);
    const savedOverride = localStorage.getItem('scheduleOverride');
    const savedDate = localStorage.getItem('scheduleOverrideDate');
    if (savedOverride && savedDate === dateStr) {
        manualScheduleOverride = savedOverride;
    } else {
        localStorage.removeItem('scheduleOverride');
        localStorage.removeItem('scheduleOverrideDate');
        manualScheduleOverride = null;
    }
    specialToday = null;
    currentScheduleType = null;
    const day = calendarData && calendarData[dateStr];
    if (day) {
        if (day.type === 'special') {
            currentScheduleType = 'special';
            specialToday = {
                name: day.name || '特殊安排',
                scheduleKey: typeof day.schedule === 'string' ? day.schedule : null,
                scheduleData: null
            };
        } else if (day.type === 'entry' || day.type === 'advanced' || day.type === 'self-study') {
            currentScheduleType = day.type === 'self-study' ? 'selfStudy' : day.type;
        } else if (day.type === 'rest') {
            currentScheduleType = null;
        }
    }
    if (manualScheduleOverride) {
        currentScheduleType = manualScheduleOverride;
        specialToday = null;
    }
}

function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function parseHM(hm) {
    const parts = hm.split(':').map(Number);
    const d = new Date();
    d.setHours(parts[0], parts[1] || 0, 0, 0);
    return d;
}

function normalize(arr) {
    return arr.map(item => {
        const start = parseHM(item.start);
        const end = parseHM(item.end || item.start);
        return { ...item, _s: start, _e: end };
    });
}

function isIn(now, start, end) {
    return now >= start && now <= end;
}

function progress(now, start, end) {
    const duration = end - start;
    if (duration <= 0) return 1;
    return Math.min(1, Math.max(0, (now - start) / duration));
}

function buildTimeline(container, data) {
    container.innerHTML = '';
    const nodes = [];
    let lastPeriod = '';
    data.forEach(entry => {
        if (entry.period && entry.period !== lastPeriod) {
            lastPeriod = entry.period;
            const divider = document.createElement('div');
            divider.className = 'period-divider';
            divider.innerHTML = periodLabels[entry.period] || entry.period;
            container.appendChild(divider);
        }
        const item = document.createElement('div');
        item.className = 'item';
        const label = document.createElement('div');
        label.className = 'label';
        label.textContent = entry.name;
        const time = document.createElement('div');
        time.className = 'time';
        time.textContent = entry.start + (entry.end && entry.end !== entry.start ? ' - ' + entry.end : '');
        const meta = document.createElement('div');
        meta.className = 'meta';
        meta.textContent = kindLabels[entry.kind] || '安排';
        const bar = document.createElement('div');
        bar.className = 'progressbar';
        const span = document.createElement('span');
        bar.appendChild(span);
        item.appendChild(label);
        item.appendChild(time);
        item.appendChild(meta);
        item.appendChild(bar);
        container.appendChild(item);
        nodes.push({ entry, item, span });
    });
    setTimeout(adjustRailHeight, 0);
    return nodes;
}

function adjustRailHeight() {
    const timeline = document.getElementById('timeline');
    const rail = document.querySelector('.rail');
    const railTrack = document.querySelector('.rail-track');
    const emptyMessage = document.getElementById('emptyMessage');
    if (timeline && rail && railTrack) {
        const isEmpty = (emptyMessage && !emptyMessage.classList.contains('hidden')) || timeline.childElementCount === 0;
        if (isEmpty) {
            const approx = Math.max(emptyMessage ? emptyMessage.offsetHeight : 200, 200);
            rail.style.minHeight = approx + 'px';
            railTrack.style.height = approx + 'px';
            return;
        }
        const timelineHeight = timeline.scrollHeight;
        rail.style.minHeight = timelineHeight + 'px';
        railTrack.style.height = timelineHeight + 'px';
    }
}

function scrollToCurrentActivity() {
    const container = document.getElementById('timelineContainer');
    if (!container || window.innerWidth <= 900) return;
    const current = container.querySelector('.item.current');
    const gap = container.querySelector('.gap-marker');
    const target = current || gap;
    if (!target) return;
    const containerHeight = container.clientHeight;
    const targetTop = target.offsetTop;
    const targetHeight = target.offsetHeight;
    const scrollTo = targetTop - containerHeight / 2 + targetHeight / 2;
    container.scrollTop = scrollTo;
}

function getRenderContext() {
    if (previewDate) {
        const dateStr = formatDateKey(previewDate);
        const day = calendarData && calendarData[dateStr];
        let type = null;
        let name = null;
        let scheduleArr = null;
        let scheduleKey = null;
        if (day) {
            if (day.type === 'special') {
                type = 'special';
                name = day.name || '特殊安排';
                scheduleKey = typeof day.schedule === 'string' ? day.schedule : null;
                if (scheduleKey) {
                    scheduleArr = specialScheduleCache[scheduleKey] || null;
                }
            } else if (day.type === 'entry' || day.type === 'advanced' || day.type === 'self-study') {
                type = day.type === 'self-study' ? 'selfStudy' : day.type;
                scheduleArr = scheduleData[type] || null;
            } else if (day.type === 'rest') {
                type = null;
            }
        }
        return { mode: 'preview', dateStr, type, name, scheduleArr, scheduleKey };
    }
    if (currentScheduleType === 'special') {
        const scheduleKey = specialToday && specialToday.scheduleKey ? specialToday.scheduleKey : null;
        const scheduleArr = scheduleKey ? specialScheduleCache[scheduleKey] || (specialToday && specialToday.scheduleData) || null : null;
        return {
            mode: 'today',
            dateStr: formatDateKey(new Date()),
            type: 'special',
            name: specialToday ? specialToday.name : '特殊安排',
            scheduleArr,
            scheduleKey
        };
    }
    return {
        mode: 'today',
        dateStr: formatDateKey(new Date()),
        type: currentScheduleType,
        name: null,
        scheduleArr: currentScheduleType ? scheduleData[currentScheduleType] || null : null,
        scheduleKey: null
    };
}

function updateStatusLayout(hasSchedule) {
    const statusWrapper = document.getElementById('statusWrapper');
    const timeNotice = document.getElementById('timeNotice');
    const currentCard = document.getElementById('currentCard');
    if (!statusWrapper || !timeNotice || !currentCard) return;
    if (!hasSchedule) {
        statusWrapper.classList.add('single-column');
        currentCard.classList.add('hidden');
        timeNotice.classList.remove('hidden');
    } else {
        statusWrapper.classList.remove('single-column');
        timeNotice.classList.add('hidden');
        currentCard.classList.remove('hidden');
    }
}

function fetchSpecialSchedule(key, shouldUpdate = true) {
    if (!key) return Promise.resolve(null);
    if (specialScheduleCache[key]) return Promise.resolve(specialScheduleCache[key]);
    if (specialScheduleRequests[key]) return specialScheduleRequests[key];
    const request = fetch(`data/special-schedule/${key}`)
        .then(response => {
            if (!response.ok) throw new Error('特殊日程加载失败');
            return response.json();
        })
        .then(data => {
            specialScheduleCache[key] = data;
            delete specialScheduleErrors[key];
            if (specialToday && specialToday.scheduleKey === key) {
                specialToday.scheduleData = data;
            }
            return data;
        })
        .catch(error => {
            specialScheduleErrors[key] = error;
            throw error;
        })
        .finally(() => {
            delete specialScheduleRequests[key];
            if (shouldUpdate) {
                timelineNodes = [];
                hasInitialScroll = false;
                setTimeout(updateTimeline, 0);
            }
        });
    specialScheduleRequests[key] = request;
    return request;
}

function updateTimeline() {
    if (isError) return;
    const timelineContainer = document.getElementById('timelineContainer');
    const timelineLoading = document.getElementById('timelineLoading');
    const timeline = document.getElementById('timeline');
    const emptyMessage = document.getElementById('emptyMessage');
    const railProgress = document.getElementById('railProgress');
    const railDot = document.getElementById('railDot');
    const card = document.getElementById('currentCard');
    const timeNotice = document.getElementById('timeNotice');
    if (timelineLoading) timelineLoading.classList.add('hidden');
    if (timelineContainer) timelineContainer.setAttribute('aria-busy', 'false');
    if (isLoading) return;
    const ctx = getRenderContext();
    let raw = ctx.scheduleArr;
    if (ctx.type === 'special' && ctx.scheduleKey) {
        if (specialScheduleErrors[ctx.scheduleKey]) {
            if (timeNotice) timeNotice.textContent = ctx.mode === 'preview' ? `无法加载「${ctx.name || '特殊安排'}」的日程，请以通知为准。` : '特殊日程加载失败，请以通知为准。';
            updateStatusLayout(false);
            if (emptyMessage) {
                emptyMessage.innerHTML = `<h3>特殊日程加载失败</h3><p>${ctx.mode === 'preview' ? '该日' : '今日'}日程无法加载，请以通知为准。</p>`;
                emptyMessage.classList.remove('hidden');
            }
            if (timelineContainer) timelineContainer.classList.add('hidden');
            if (timeline) timeline.innerHTML = '';
            timelineNodes = [];
            if (railProgress) railProgress.style.height = '0px';
            if (railDot) railDot.classList.remove('visible');
            if (card) {
                const countdownLabel = card.querySelector('.countdown-label');
                const countdownValue = card.querySelector('.countdown-value');
                const progressBar = card.querySelector('.card-progress-bar');
                if (countdownLabel) countdownLabel.textContent = '';
                if (countdownValue) countdownValue.textContent = '--:--:--';
                if (progressBar) progressBar.style.setProperty('--progress', '0%');
                card.classList.remove('active');
            }
            adjustRailHeight();
            return;
        }
        if (!raw) {
            fetchSpecialSchedule(ctx.scheduleKey);
            if (timeNotice) timeNotice.text内容 = ctx.mode === 'preview' ? `正在加载「${ctx.name || '特殊安排'}」的日程，请稍候...` : '正在加载今日特殊日程，请稍候...';
            updateStatusLayout(false);
            if (emptyMessage) {
                emptyMessage.innerHTML = `<h3>正在加载特殊日程</h3><p>请稍候...</p>`;
                emptyMessage.classList.remove('hidden');
            }
            if (timelineContainer) timelineContainer.classList.add('hidden');
            if (timeline) timeline.innerHTML = '';
            timelineNodes = [];
            if (railProgress) railProgress.style.height = '0px';
            if (railDot) railDot.classList.remove('visible');
            if (card) {
                const countdownLabel = card.querySelector('.countdown-label');
                const countdownValue = card.querySelector('.countdown-value');
                const progressBar = card.querySelector('.card-progress-bar');
                if (countdownLabel) countdownLabel.textContent = '';
                if (countdownValue) countdownValue.textContent = '--:--:--';
                if (progressBar) progressBar.style.setProperty('--progress', '0%');
                card.classList.remove('active');
            }
            adjustRailHeight();
            return;
        }
    }
    const hasSchedule = Array.isArray(raw) && raw.length > 0;
    if (!hasSchedule) {
        let emptyHtml = '';
        let noticeText = '';
        if (ctx.type === 'special') {
            emptyHtml = `<h3>${ctx.mode === 'preview' ? '该日为「' + (ctx.name || '特殊安排') + '」' : '今天是「' + (ctx.name || '特殊安排') + '」'}</h3><p>无详细时间表，请以实际通知为准。</p>`;
            noticeText = ctx.mode === 'preview' ? `该日为「${ctx.name || '特殊安排'}」，无详细时间表，请以实际通知为准。` : `今天是「${ctx.name || '特殊安排'}」，无详细时间表，请以实际通知为准。`;
        } else {
            emptyHtml = `<h3>${ctx.mode === 'preview' ? '该日无安排' : '今日无安排'}</h3><p>好好休息。</p>`;
            noticeText = ctx.mode === 'preview' ? '该日无安排，好好休息。' : '今日无安排，好好休息。';
        }
        if (emptyMessage) {
            emptyMessage.innerHTML = emptyHtml;
            emptyMessage.classList.remove('hidden');
        }
        if (timelineContainer) timelineContainer.classList.add('hidden');
        if (timeline) timeline.innerHTML = '';
        timelineNodes = [];
        if (railProgress) railProgress.style.height = '0px';
        if (railDot) railDot.classList.remove('visible');
        if (timeNotice) timeNotice.textContent = noticeText;
        if (card) {
            const countdownLabel = card.querySelector('.countdown-label');
            const countdownValue = card.querySelector('.countdown-value');
            const progressBar = card.querySelector('.card-progress-bar');
            if (countdownLabel) countdownLabel.textContent = '';
            if (countdownValue) countdownValue.textContent = '--:--:--';
            if (progressBar) progressBar.style.setProperty('--progress', '0%');
            card.classList.remove('active');
        }
        updateStatusLayout(false);
        adjustRailHeight();
        return;
    }
    updateStatusLayout(true);
    if (timeNotice) timeNotice.textContent = '';
    if (emptyMessage) emptyMessage.classList.add('hidden');
    if (timelineContainer) timelineContainer.classList.remove('hidden');
    const data = normalize(raw);
    const needsRebuild = timelineNodes.length !== data.length || (timeline && timeline.childElementCount === 0);
    if (needsRebuild && timeline) {
        timelineNodes = buildTimeline(timeline, data);
    }
    const now = new Date();
    let currentIndex = -1;
    let isInGap = false;
    let isBeforeStart = false;
    let isAfterEnd = false;
    if (data.length > 0) {
        if (now < data[0]._s) {
            isBeforeStart = true;
        } else if (now > data[data.length - 1]._e) {
            isAfterEnd = true;
        } else {
            for (let i = 0; i < data.length; i++) {
                if (isIn(now, data[i]._s, data[i]._e)) {
                    currentIndex = i;
                    break;
                }
            }
            if (currentIndex === -1) {
                for (let i = 0; i < data.length - 1; i++) {
                    if (now > data[i]._e && now < data[i + 1]._s) {
                        currentIndex = i;
                        isInGap = true;
                        break;
                    }
                }
            }
        }
    }
    if (timeline) {
        timeline.querySelectorAll('.gap-marker').forEach(el => el.remove());
    }
    let targetPosition = 0;
    let showDot = !isBeforeStart && !isAfterEnd;
    timelineNodes.forEach((node, index) => {
        const active = index === currentIndex && !isInGap && !isBeforeStart && !isAfterEnd;
        const before = (!isBeforeStart && (index < currentIndex || (index === currentIndex && isInGap))) || isAfterEnd;
        const upcoming = index > currentIndex && !isAfterEnd;
        if (node.span) {
            const value = active ? progress(now, node.entry._s, node.entry._e) * 100 + '%' : before ? '100%' : '0%';
            node.span.style.setProperty('--p', value);
        }
        node.item.classList.toggle('current', active);
        node.item.classList.toggle('past', before);
        node.item.classList.toggle('upnext', upcoming && index === currentIndex + 1);
        if (index === currentIndex && !isInGap && !isBeforeStart) {
            targetPosition = node.item.offsetTop + node.item.offsetHeight / 2;
        } else if (index === currentIndex && isInGap) {
            const nextNode = timelineNodes[index + 1];
            if (nextNode && timeline) {
                const gapEl = document.createElement('div');
                gapEl.className = 'gap-marker';
                gapEl.innerHTML = `<div class="gap-line"></div><div class="gap-time">休息</div>`;
                node.item.parentNode.insertBefore(gapEl, nextNode.item);
                targetPosition = gapEl.offsetTop + gapEl.offsetHeight / 2;
            }
        }
    });
    if (isAfterEnd && timelineNodes.length > 0) {
        const lastNode = timelineNodes[timelineNodes.length - 1];
        targetPosition = lastNode.item.offsetTop + lastNode.item.offsetHeight;
    }
    if (railProgress) railProgress.style.height = Math.max(targetPosition, 0) + 'px';
    if (railDot) {
        railDot.style.top = Math.max(targetPosition, 0) + 'px';
        railDot.classList.toggle('visible', showDot);
    }
    if (!hasInitialScroll) {
        hasInitialScroll = true;
        setTimeout(scrollToCurrentActivity, 100);
    }
    updateCurrentCard(data, currentIndex, isInGap, isBeforeStart, isAfterEnd, ctx);
    adjustRailHeight();
}

function formatCountdown(ms) {
    if (ms < 0) return '00:00:00';
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds].map(v => String(v).padStart(2, '0')).join(':');
}

function updateCurrentCard(data, currentIndex, isInGap, isBeforeStart, isAfterEnd, ctx) {
    const card = document.getElementById('currentCard');
    if (!card) return;
    const skeleton = card.querySelector('.card-skeleton');
    if (skeleton) skeleton.classList.add('hidden');
    const now = new Date();
    const isSpecialDay = ctx.type === 'special';
    if (data.length === 0) {
        card.classList.add('hidden');
        return;
    }
    let currentItem = null;
    let nextItem = null;
    let countdownTarget = null;
    let countdownLabel = '';
    let status = '';
    if (isBeforeStart) {
        nextItem = data[0];
        countdownTarget = nextItem._s;
        countdownLabel = '距离开始';
        status = isSpecialDay ? '特殊安排' : '准备中';
    } else if (isAfterEnd) {
        const statusEl = card.querySelector('.card-status');
        const typeEl = card.querySelector('.card-type');
        const titleEl = card.querySelector('.card-title');
        const timeRange = card.querySelector('.card-time-range');
        const countdownValue = card.querySelector('.countdown-value');
        const progressBar = card.querySelector('.card-progress-bar');
        if (statusEl) statusEl.textContent = isSpecialDay ? '特殊安排' : ctx.mode === 'preview' ? '该日完成' : '已结束';
        if (typeEl) typeEl.textContent = isSpecialDay ? '今天是' : ctx.mode === 'preview' ? '该日完成' : '今日完成';
        if (titleEl) titleEl.textContent = isSpecialDay ? (ctx.name || '特殊日') : ctx.mode === 'preview' ? '该日课程已结束' : '今日课程已结束';
        if (timeRange) timeRange.textContent = isSpecialDay ? '请以实际通知为准' : '';
        const countdownLabelEl = card.querySelector('.countdown-label');
        if (countdownLabelEl) countdownLabelEl.textContent = '';
        if (countdownValue) countdownValue.textContent = '--:--:--';
        if (progressBar) progressBar.style.setProperty('--progress', '100%');
        card.classList.remove('active');
        return;
    } else if (isInGap && currentIndex >= 0 && currentIndex < data.length - 1) {
        nextItem = data[currentIndex + 1];
        countdownTarget = nextItem._s;
        countdownLabel = '距离开始';
        status = isSpecialDay ? '特殊安排' : '休息中';
    } else if (currentIndex >= 0 && !isInGap) {
        currentItem = data[currentIndex];
        countdownTarget = currentItem._e;
        countdownLabel = '剩余时间';
        status = isSpecialDay ? '特殊安排' : '进行中';
    }
    const statusEl = card.querySelector('.card-status');
    const typeEl = card.querySelector('.card-type');
    const titleEl = card.querySelector('.card-title');
    const timeRange = card.querySelector('.card-time-range');
    const countdownLabelEl = card.querySelector('.countdown-label');
    const countdownValue = card.querySelector('.countdown-value');
    const progressBar = card.querySelector('.card-progress-bar');
    if (currentItem) {
        if (statusEl) statusEl.textContent = status;
        if (typeEl) typeEl.textContent = kindLabels[currentItem.kind] || '安排';
        if (titleEl) titleEl.textContent = (isSpecialDay ? '今天是：' : '') + currentItem.name;
        if (timeRange) timeRange.textContent = `${currentItem.start} - ${currentItem.end}`;
        if (progressBar) progressBar.style.setProperty('--progress', progress(now, currentItem._s, currentItem._e) * 100 + '%');
        card.classList.add('active');
    } else if (nextItem) {
        if (statusEl) statusEl.textContent = status;
        if (typeEl) typeEl.textContent = kindLabels[nextItem.kind] || '安排';
        if (titleEl) titleEl.textContent = (isSpecialDay ? '今天是：' : '') + '下一节：' + nextItem.name;
        if (timeRange) timeRange.textContent = `${nextItem.start} - ${nextItem.end}`;
        if (progressBar) progressBar.style.setProperty('--progress', '0%');
        card.classList.remove('active');
    }
    if (countdownLabelEl) countdownLabelEl.text内容 = countdownLabel;
    if (countdownValue) countdownValue.textContent = countdownTarget ? formatCountdown(countdownTarget - now) : '--:--:--';
}

function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 9) return '🌤️ 早上好';
    if (hour >= 9 && hour < 12) return '🌞 上午好';
    if (hour >= 12 && hour < 14) return '☀️ 午安';
    if (hour >= 14 && hour < 18) return '🌆 下午好';
    if (hour >= 18 && hour < 22) return '🌃 晚上好';
    return '🌙 晚安';
}

function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const clock = document.getElementById('clock');
    const greeting = document.getElementById('greeting');
    if (clock) clock.textContent = `${h}:${m}:${s}`;
    if (greeting) greeting.textContent = getGreeting();
}

function updateSwitchButton() {
    const btn = document.getElementById('switchScheduleBtn');
    if (!btn) return;
    const btnText = btn.querySelector('.switch-btn-text');
    if (!btnText) return;
    if (previewDate) {
        btn.classList.add('exit-preview');
        btnText.textContent = '退出预览';
    } else {
        btn.classList.remove('exit-preview');
        btnText.textContent = '切换课表';
    }
}

function handleSwitchButtonClick() {
    if (previewDate) {
        exitPreview();
    } else {
        showSwitchModal();
    }
}

function exitPreview() {
    previewDate = null;
    hasInitialScroll = false;
    timelineNodes = [];
    updateScheduleTitle();
    updateTimeline();
    updateSwitchButton();
}

function buildCalendar() {
    const container = document.getElementById('calendarGrid');
    if (!container) return;
    container.innerHTML = `
        <div class="calendar-scroll-wrapper">
            <div class="calendar-strip" id="calendarStrip"></div>
        </div>
    `;
    const strip = document.getElementById('calendarStrip');
    if (!strip) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysToShow = 15;
    const startOffset = Math.floor(daysToShow / 2);
    for (let i = -startOffset; i <= startOffset; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = formatDateKey(date);
        const dayData = calendarData && calendarData[dateStr];
        const weekday = weekdayNames[date.getDay()];
        const dateEl = document.createElement('div');
        dateEl.className = 'calendar-date';
        dateEl.dataset.date = dateStr;
        const weekdayEl = document.createElement('div');
        weekdayEl.className = 'date-weekday';
        weekdayEl.textContent = i === 0 ? '今日' : weekday;
        const numberEl = document.createElement('div');
        numberEl.className = 'date-number';
        numberEl.textContent = date.getDate();
        dateEl.appendChild(weekdayEl);
        dateEl.appendChild(numberEl);
        if (dayData && dayData.type !== 'rest') {
            const typeKey = dayData.type === 'self-study' ? 'selfstudy' : dayData.type;
            if (i !== 0) {
                dateEl.classList.add(typeKey);
            }
            const typeEl = document.createElement('div');
            typeEl.className = 'date-type';
            if (dayData.type === 'special') {
                typeEl.textContent = dayData.name || '特殊';
            } else {
                const typeText = { entry: '入门', advanced: '进阶', 'self-study': '自习' };
                typeEl.textContent = typeText[dayData.type] || '';
            }
            dateEl.appendChild(typeEl);
        }
        if (i === 0) dateEl.classList.add('today');
        if (date < today) dateEl.classList.add('past');
        strip.appendChild(dateEl);
    }
    strip.addEventListener('click', event => {
        const card = event.target.closest('.calendar-date');
        if (!card) return;
        const ds = card.dataset.date;
        if (!ds) return;
        const todayStr = formatDateKey(new Date());
        if (ds === todayStr) {
            previewDate = null;
            hasInitialScroll = false;
            timelineNodes = [];
            updateScheduleTitle();
            updateTimeline();
            updateSwitchButton();
            return;
        }
        previewDate = new Date(ds + 'T00:00:00');
        hasInitialScroll = false;
        timelineNodes = [];
        updateScheduleTitle();
        updateTimeline();
        updateSwitchButton();
    });
    setTimeout(() => {
        const todayEl = strip.querySelector('.today');
        const wrapper = container.querySelector('.calendar-scroll-wrapper');
        if (todayEl && wrapper) {
            const scrollLeft = todayEl.offsetLeft - wrapper.clientWidth / 2 + todayEl.offsetWidth / 2;
            wrapper.scrollLeft = scrollLeft;
        }
        if (wrapper && !wrapper.hasWheelListener) {
            wrapper.hasWheelListener = true;
            wrapper.addEventListener('wheel', event => {
                if (event.shiftKey) return;
                event.preventDefault();
                wrapper.scrollLeft += event.deltaY !== 0 ? event.deltaY : event.deltaX;
            }, { passive: false });
            let isDown = false;
            let startX = 0;
            let scrollLeft = 0;
            wrapper.addEventListener('pointerdown', event => {
                isDown = true;
                startX = event.clientX;
                scrollLeft = wrapper.scrollLeft;
            });
            wrapper.addEventListener('pointermove', event => {
                if (!isDown) return;
                const delta = event.clientX - startX;
                wrapper.scrollLeft = scrollLeft - delta;
            });
            const end = () => {
                isDown = false;
            };
            wrapper.addEventListener('pointerup', end);
            wrapper.addEventListener('pointercancel', end);
            wrapper.addEventListener('mouseleave', end);
        }
    }, 100);
}

function updateScheduleTitle() {
    const title = document.getElementById('scheduleTitle');
    if (!title) return;
    if (previewDate) {
        const ds = formatDateKey(previewDate);
        const day = calendarData && calendarData[ds];
        if (!day || day.type === 'rest') {
            title.innerHTML = `<span class="emoji">👀</span> （预览）无安排`;
            return;
        }
        if (day.type === 'special') {
            title.innerHTML = `<span class="emoji">${scheduleTypeEmojis.special}</span> （预览）「${day.name || '特殊安排'}」`;
            return;
        }
        const typeKey = day.type === 'self-study' ? 'selfStudy' : day.type;
        const emoji = scheduleTypeEmojis[typeKey] || '📅';
        const name = scheduleTypeNames[typeKey] || '课程';
        title.innerHTML = `<span class="emoji">${emoji}</span> （预览）${name}`;
        return;
    }
    const todayStr = formatDateKey(new Date());
    const todayData = calendarData && calendarData[todayStr];
    if (currentScheduleType === 'special' && specialToday) {
        title.innerHTML = `<span class="emoji">${scheduleTypeEmojis.special}</span> 今天是「${specialToday.name}」`;
        return;
    }
    if (!currentScheduleType) {
        if (todayData && todayData.type === 'special') {
            title.innerHTML = `<span class="emoji">${scheduleTypeEmojis.special}</span> 今天是「${todayData.name || '特殊安排'}」`;
        } else {
            title.innerHTML = `<span class="emoji">🏖️</span> 今日无安排`;
        }
    } else {
        const emoji = scheduleTypeEmojis[currentScheduleType] || '📅';
        const name = scheduleTypeNames[currentScheduleType] || '今日课程';
        title.innerHTML = `<span class="emoji">${emoji}</span> ${name}`;
    }
}

function restoreDefaultSchedule() {
    localStorage.removeItem('scheduleOverride');
    localStorage.removeItem('scheduleOverrideDate');
    manualScheduleOverride = null;
    determineCurrentSchedule();
    timelineNodes = [];
    hasInitialScroll = false;
    updateScheduleTitle();
    updateTimeline();
    updateSwitchButton();
    closeSwitchModal();
}

function showSwitchModal() {
    const modal = document.getElementById('switchModal');
    const options = document.getElementById('scheduleOptions');
    const notice = document.getElementById('specialNotice');
    const restoreBtn = document.getElementById('restoreDefaultBtn');
    if (!modal || !options || !restoreBtn) return;
    options.innerHTML = '';
    if (currentScheduleType === 'special' && specialToday && notice) {
        notice.style.display = 'block';
        notice.textContent = `提示：今天是「${specialToday.name}」，默认采用特殊日程。你也可以临时选择其他课表（仅今天生效）。`;
    } else if (notice) {
        notice.style.display = 'none';
        notice.textContent = '';
    }
    ['entry', 'advanced', 'selfStudy'].forEach(type => {
        const option = document.createElement('div');
        option.className = `schedule-option ${type === 'selfStudy' ? 'self-study' : type}`;
        option.textContent = scheduleTypeNames[type];
        option.onclick = () => {
            manualScheduleOverride = type;
            localStorage.setItem('scheduleOverride', type);
            localStorage.setItem('scheduleOverrideDate', formatDateKey(new Date()));
            currentScheduleType = type;
            specialToday = null;
            timelineNodes = [];
            hasInitialScroll = false;
            updateScheduleTitle();
            updateTimeline();
            updateSwitchButton();
            closeSwitchModal();
        };
        options.appendChild(option);
    });
    restoreBtn.onclick = restoreDefaultSchedule;
    modal.classList.add('show');
}

function closeSwitchModal() {
    const modal = document.getElementById('switchModal');
    if (modal) modal.classList.remove('show');
}

let raf = null;
let lastTick = null;

function tick() {
    const now = new Date();
    const s = now.getSeconds();
    if (s !== lastTick) {
        lastTick = s;
        updateClock();
        updateTimeline();
    }
    raf = requestAnimationFrame(tick);
}

function initUI() {
    updateScheduleTitle();
    updateClock();
    updateTimeline();
    buildCalendar();
    updateSwitchButton();
    const switchBtn = document.getElementById('switchScheduleBtn');
    if (switchBtn) switchBtn.addEventListener('click', handleSwitchButtonClick);
    if (!raf) raf = requestAnimationFrame(tick);
}

window.addEventListener('resize', () => {
    updateTimeline();
    adjustRailHeight();
    const grid = document.getElementById('calendarGrid');
    if (grid) {
        const wrapper = grid.querySelector('.calendar-scroll-wrapper');
        const strip = grid.querySelector('.calendar-strip');
        if (wrapper && strip) {
            const todayEl = strip.querySelector('.today');
            if (todayEl) {
                const scrollLeft = todayEl.offsetLeft - wrapper.clientWidth / 2 + todayEl.offsetWidth / 2;
                wrapper.scrollLeft = scrollLeft;
            }
        }
    }
});

loadData();