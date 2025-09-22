let scheduleData = {
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

async function loadData() {
    try {
        toggleLoading(true);
        const [entryRes, advancedRes, selfStudyRes, calendarRes] = await Promise.all([
            fetch('data/entry-schedule.json'),
            fetch('data/advanced-schedule.json'),
            fetch('data/self-study-schedule.json'),
            fetch('data/calendar.json')
        ]);
        if (!entryRes.ok || !advancedRes.ok || !selfStudyRes.ok || !calendarRes.ok) {
            throw new Error('网络错误或数据文件不存在');
        }
        scheduleData.entry = await entryRes.json();
        scheduleData.advanced = await advancedRes.json();
        scheduleData.selfStudy = await selfStudyRes.json();
        calendarData = await calendarRes.json();
        determineCurrentSchedule();
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
        title.innerHTML = `<span class="emoji">📅</span> 加载中...`;
        btn.setAttribute('disabled', 'true');
        if (timelineLoading) timelineLoading.classList.remove('hidden');
        if (timelineContainer) timelineContainer.classList.add('hidden');
        if (emptyMessage) emptyMessage.classList.add('hidden');
        setCardLoadingState();
    } else {
        btn.removeAttribute('disabled');
        if (timelineLoading) timelineLoading.classList.add('hidden');
        clearCardLoadingState();
    }
}

function setCardLoadingState() {
    const card = document.getElementById('currentCard');
    const skeleton = card.querySelector('.card-skeleton');
    card.classList.remove('hidden');
    skeleton.classList.remove('hidden');
    card.querySelector('.card-status').textContent = '加载中';
    card.querySelector('.card-type').textContent = '课程';
    card.querySelector('.card-title').textContent = '请稍候...';
    card.querySelector('.card-time-range').textContent = '';
    card.querySelector('.countdown-label').textContent = '预计开始于';
    card.querySelector('.countdown-value').textContent = '--:--:--';
    card.querySelector('.card-progress-bar').style.setProperty('--progress', '0%');
}

function clearCardLoadingState() {
    const card = document.getElementById('currentCard');
    const skeleton = card.querySelector('.card-skeleton');
    skeleton.classList.add('hidden');
}

function renderErrorState(err) {
    const title = document.getElementById('scheduleTitle');
    title.innerHTML = `<span class="emoji">⚠️</span> 加载失败`;
    
    const emptyMessage = document.getElementById('emptyMessage');
    const timelineContainer = document.getElementById('timelineContainer');
    
    if (emptyMessage) {
        emptyMessage.innerHTML = `<h3>数据加载失败</h3><p>${(err && err.message) || '请稍后重试。'}</p>`;
        emptyMessage.classList.remove('hidden');
        timelineContainer.classList.add('hidden');
    }
    
    const card = document.getElementById('currentCard');
    card.classList.remove('hidden');
    card.querySelector('.card-skeleton').classList.add('hidden');
    card.querySelector('.card-status').textContent = '错误';
    card.querySelector('.card-type').textContent = '系统';
    card.querySelector('.card-title').textContent = '无法加载数据';
    card.querySelector('.card-time-range').textContent = '请检查网络或稍后重试';
    card.querySelector('.countdown-label').textContent = '';
    card.querySelector('.countdown-value').textContent = '--:--:--';
    card.querySelector('.card-progress-bar').style.setProperty('--progress', '0%');
    
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
            specialToday = { name: day.name || '特殊安排', schedule: Array.isArray(day.schedule) ? day.schedule : null };
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
    const [h, m] = hm.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m || 0, 0, 0);
    return d;
}

function normalize(arr) {
    return arr.map(o => {
        const s = parseHM(o.start);
        const e = parseHM(o.end || o.start);
        return { ...o, _s: s, _e: e };
    });
}

function isIn(now, s, e) {
    return now >= s && now <= e;
}

function progress(now, s, e) {
    const dur = e - s;
    if (dur <= 0) return 1;
    return Math.min(1, Math.max(0, (now - s) / dur));
}

function tagText(kind) {
    switch (kind) {
        case 'class': return '课程';
        case 'self': return '晚自习';
        case 'duty': return '整理';
        case 'leave': return '离校';
        case 'activity': return '活动';
        default: return '安排';
    }
}

function buildTimeline(container, data) {
    container.innerHTML = '';
    const nodes = [];
    let lastPeriod = '';
    data.forEach((entry) => {
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
        meta.textContent = tagText(entry.kind);
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
        const isEmpty = !emptyMessage.classList.contains('hidden') || timeline.childElementCount === 0;
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

let timelineNodes = [];

function scrollToCurrentActivity() {
    const container = document.getElementById('timelineContainer');
    if (!container || window.innerWidth <= 900) return; // 移动端不自动滚动
    const current = container.querySelector('.item.current');
    const gap = container.querySelector('.gap-marker');
    const target = current || gap;
    if (!target) return;
    const containerHeight = container.clientHeight;
    const targetTop = target.offsetTop;
    const targetHeight = target.offsetHeight;
    const scrollTo = targetTop - (containerHeight / 2) + (targetHeight / 2);
    container.scrollTop = scrollTo;
}

function getRenderContext() {
    if (previewDate) {
        const dateStr = formatDateKey(previewDate);
        const day = calendarData && calendarData[dateStr];
        let type = null, name = null, scheduleArr = null;
        if (day) {
            if (day.type === 'special') {
                type = 'special';
                name = day.name || '特殊安排';
                scheduleArr = Array.isArray(day.schedule) ? day.schedule : null;
            } else if (day.type === 'entry' || day.type === 'advanced' || day.type === 'self-study') {
                type = day.type === 'self-study' ? 'selfStudy' : day.type;
                scheduleArr = scheduleData[type] || null;
            } else if (day.type === 'rest') {
                type = null;
            }
        }
        return { mode: 'preview', dateStr, type, name, scheduleArr };
    } else {
        if (currentScheduleType === 'special') {
            return {
                mode: 'today',
                dateStr: formatDateKey(new Date()),
                type: 'special',
                name: specialToday ? specialToday.name : '特殊安排',
                scheduleArr: specialToday ? specialToday.schedule : null
            };
        }
        return {
            mode: 'today',
            dateStr: formatDateKey(new Date()),
            type: currentScheduleType,
            name: null,
            scheduleArr: currentScheduleType ? (scheduleData[currentScheduleType] || null) : null
        };
    }
}

function updateStatusLayout(hasSchedule) {
    const statusWrapper = document.getElementById('statusWrapper');
    const timeNotice = document.getElementById('timeNotice');
    const currentCard = document.getElementById('currentCard');
    
    if (!hasSchedule) {
        // 没有时间表时：居中显示time-display，显示notice
        statusWrapper.classList.add('single-column');
        currentCard.classList.add('hidden');
        timeNotice.classList.remove('hidden');
    } else {
        // 有时间表时：恢复默认布局
        statusWrapper.classList.remove('single-column');
        timeNotice.classList.add('hidden');
        currentCard.classList.remove('hidden');
    }
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
    
    timelineLoading?.classList.add('hidden');
    timelineContainer?.setAttribute('aria-busy', 'false');
    
    if (isLoading) return;
    
    const ctx = getRenderContext();
    const raw = ctx.scheduleArr;
    const hasSchedule = !!raw;
    
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
        
        emptyMessage.innerHTML = emptyHtml;
        emptyMessage.classList.remove('hidden');
        timelineContainer.classList.add('hidden');
        
        if (timeNotice) {
            timeNotice.textContent = noticeText;
        }
        
        railProgress.style.height = '0px';
        railDot.classList.remove('visible');
        
        updateStatusLayout(false);
        adjustRailHeight();
        return;
    }
    
    updateStatusLayout(true);
    emptyMessage.classList.add('hidden');
    timelineContainer.classList.remove('hidden');
    
    const data = normalize(raw);
    const needsRebuild = timelineNodes.length === 0 || !emptyMessage.classList.contains('hidden') || (timeline.childElementCount === 0);
    if (needsRebuild) {
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
    
    timeline.querySelectorAll('.gap-marker').forEach(el => el.remove());
    let targetPosition = 0;
    let showDot = !isBeforeStart && !isAfterEnd;
    
    timelineNodes.forEach((n, i) => {
        const active = i === currentIndex && !isInGap && !isBeforeStart && !isAfterEnd;
        const before = (!isBeforeStart && (i < currentIndex || (i === currentIndex && isInGap))) || (isAfterEnd);
        const upcoming = i > currentIndex && !isAfterEnd;
        
        if (n.span) {
            n.span.style.setProperty('--p', active ? (progress(now, n.entry._s, n.entry._e) * 100) + '%' : (before ? '100%' : '0%'));
        }
        n.item.classList.toggle('current', active);
        n.item.classList.toggle('past', before);
        n.item.classList.toggle('upnext', upcoming && i === currentIndex + 1);
        
        if (i === currentIndex && !isInGap && !isBeforeStart) {
            targetPosition = n.item.offsetTop + n.item.offsetHeight / 2;
        } else if (i === currentIndex && isInGap) {
            const nextItem = timelineNodes[i + 1];
            if (nextItem) {
                const gapEl = document.createElement('div');
                gapEl.className = 'gap-marker';
                gapEl.innerHTML = `<div class="gap-line"></div><div class="gap-time">休息</div>`;
                n.item.parentNode.insertBefore(gapEl, nextItem.item);
                targetPosition = gapEl.offsetTop + gapEl.offsetHeight / 2;
            }
        }
    });
    
    if (isAfterEnd && timelineNodes.length > 0) {
        const lastNode = timelineNodes[timelineNodes.length - 1];
        targetPosition = lastNode.item.offsetTop + lastNode.item.offsetHeight;
    }
    
    railProgress.style.height = Math.max(targetPosition, 0) + 'px';
    railDot.style.top = Math.max(targetPosition, 0) + 'px';
    railDot.classList.toggle('visible', showDot);
    
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
    const skeleton = card.querySelector('.card-skeleton');
    skeleton.classList.add('hidden');
    
    const now = new Date();
    const isSpecialDay = ctx.type === 'special';
    let currentItem = null, nextItem = null, countdownTarget = null, countdownLabel = '', status = '';
    
    if (data.length === 0) {
        card.classList.add('hidden');
        return;
    }
    
    if (isBeforeStart) {
        nextItem = data[0];
        countdownTarget = nextItem._s;
        countdownLabel = '距离开始';
        status = isSpecialDay ? '特殊安排' : '准备中';
    } else if (isAfterEnd) {
        card.querySelector('.card-status').textContent = isSpecialDay ? '特殊安排' : (ctx.mode === 'preview' ? '该日完成' : '已结束');
        card.querySelector('.card-type').textContent = isSpecialDay ? '今天是' : (ctx.mode === 'preview' ? '该日完成' : '今日完成');
        card.querySelector('.card-title').textContent = isSpecialDay ? (ctx.name || '特殊日') : (ctx.mode === 'preview' ? '该日课程已结束' : '今日课程已结束');
        card.querySelector('.card-time-range').textContent = isSpecialDay ? '请以实际通知为准' : '';
        card.querySelector('.countdown-label').textContent = '';
        card.querySelector('.countdown-value').textContent = '--:--:--';
        card.querySelector('.card-progress-bar').style.setProperty('--progress', '100%');
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
    
    if (currentItem) {
        card.querySelector('.card-status').textContent = status;
        card.querySelector('.card-type').textContent = tagText(currentItem.kind);
        card.querySelector('.card-title').textContent = (isSpecialDay ? '今天是：' : '') + currentItem.name;
        card.querySelector('.card-time-range').textContent = `${currentItem.start} - ${currentItem.end}`;
        const prog = progress(now, currentItem._s, currentItem._e);
        card.querySelector('.card-progress-bar').style.setProperty('--progress', (prog * 100) + '%');
        card.classList.add('active');
    } else if (nextItem) {
        card.querySelector('.card-status').textContent = status;
        card.querySelector('.card-type').textContent = tagText(nextItem.kind);
        card.querySelector('.card-title').textContent = (isSpecialDay ? '今天是：' : '') + '下一节：' + nextItem.name;
        card.querySelector('.card-time-range').textContent = `${nextItem.start} - ${nextItem.end}`;
        card.querySelector('.card-progress-bar').style.setProperty('--progress', '0%');
        card.classList.remove('active');
    }
    
    card.querySelector('.countdown-label').textContent = countdownLabel;
    card.querySelector('.countdown-value').textContent = countdownTarget ? formatCountdown(countdownTarget - now) : '--:--:--';
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
    document.getElementById('clock').textContent = `${h}:${m}:${s}`;
    document.getElementById('greeting').textContent = getGreeting();
}

function updateSwitchButton() {
    const btn = document.getElementById('switchScheduleBtn');
    const btnText = btn.querySelector('.switch-btn-text');
    
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
                const typeText = { 'entry': '入门', 'advanced': '进阶', 'self-study': '自习' };
                typeEl.textContent = typeText[dayData.type] || '';
            }
            dateEl.appendChild(typeEl);
        }
        
        if (i === 0) dateEl.classList.add('today');
        if (date < today) dateEl.classList.add('past');
        strip.appendChild(dateEl);
    }
    
    strip.addEventListener('click', (e) => {
        const card = e.target.closest('.calendar-date');
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
        if (todayEl) {
            const wrapper = container.querySelector('.calendar-scroll-wrapper');
            const scrollLeft = todayEl.offsetLeft - (wrapper.clientWidth / 2) + (todayEl.offsetWidth / 2);
            wrapper.scrollLeft = scrollLeft;
        }
        const wrapper = container.querySelector('.calendar-scroll-wrapper');
        if (wrapper && !wrapper.hasWheelListener) {
            wrapper.hasWheelListener = true;
            wrapper.addEventListener('wheel', (e) => {
                if (e.shiftKey) return;
                e.preventDefault();
                wrapper.scrollLeft += e.deltaY !== 0 ? e.deltaY : e.deltaX;
            }, { passive: false });
            let isDown = false, startX = 0, scrollLeft = 0;
            wrapper.addEventListener('pointerdown', (e) => {
                isDown = true; startX = e.clientX; scrollLeft = wrapper.scrollLeft;
            });
            wrapper.addEventListener('pointermove', (e) => {
                if (!isDown) return;
                const delta = e.clientX - startX;
                wrapper.scrollLeft = scrollLeft - delta;
            });
            const end = () => { isDown = false; };
            wrapper.addEventListener('pointerup', end);
            wrapper.addEventListener('pointercancel', end);
            wrapper.addEventListener('mouseleave', end);
        }
    }, 100);
}

function updateScheduleTitle() {
    const title = document.getElementById('scheduleTitle');
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
    closeSwitchModal();
}

function showSwitchModal() {
    const modal = document.getElementById('switchModal');
    const options = document.getElementById('scheduleOptions');
    const notice = document.getElementById('specialNotice');
    const restoreBtn = document.getElementById('restoreDefaultBtn');
    
    options.innerHTML = '';
    
    if (currentScheduleType === 'special' && specialToday) {
        notice.style.display = 'block';
        notice.textContent = `提示：今天是「${specialToday.name}」，默认采用特殊日程。你也可以临时选择其他课表（仅今天生效）。`;
    } else {
        notice.style.display = 'none';
        notice.textContent = '';
    }
    
    ['entry', 'advanced', 'selfStudy'].forEach(type => {
        const option = document.createElement('div');
        option.className = `schedule-option ${type.toLowerCase().replace('study', '-study')}`;
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
            closeSwitchModal();
        };
        options.appendChild(option);
    });
    
    restoreBtn.onclick = restoreDefaultSchedule;
    
    modal.classList.add('show');
}

function closeSwitchModal() {
    document.getElementById('switchModal').classList.remove('show');
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
    document.getElementById('switchScheduleBtn').addEventListener('click', handleSwitchButtonClick);
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
                const scrollLeft = todayEl.offsetLeft - (wrapper.clientWidth / 2) + (todayEl.offsetWidth / 2);
                wrapper.scrollLeft = scrollLeft;
            }
        }
    }
});

loadData();