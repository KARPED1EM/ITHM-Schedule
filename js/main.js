const config = window.SCHEDULE_CONFIG || {};
const siteConfig = config.site || {};
if (siteConfig.title) document.title = siteConfig.title;

const pathConfig = config.paths || {};
const defaultsConfig = config.defaults || {};
const scheduleTypeConfig = config.scheduleTypes || {};
const kindConfig = config.kinds || {};
const periodConfig = config.periods || {};
const greetingsConfig = Array.isArray(config.greetings) ? config.greetings : [];
const calendarConfig = config.calendar || {};
const timelineConfig = config.timeline || {};
const timelineMessages = config.timelineMessages || {};
const statusesConfig = config.statuses || {};
const countdownConfig = config.countdowns || {};
const cardConfig = config.card || {};
const textConfig = config.texts || {};
const noticesConfig = config.notices || {};
const modalConfig = config.modal || {};
const errorsConfig = config.errors || {};
const switcherConfig = config.switcher || {};
const scheduleFilesConfig = config.scheduleFiles || {};
const specialScheduleFilesConfig = config.specialScheduleFiles || {};

const defaultScheduleName = defaultsConfig.scheduleName || '课程';
const defaultScheduleEmoji = defaultsConfig.scheduleEmoji || '📅';
const defaultKindLabel = defaultsConfig.kindLabel || '安排';
const countdownPlaceholder = countdownConfig.placeholder || defaultsConfig.countdownPlaceholder || '--:--:--';

const scheduleTitleLoadingText = textConfig.scheduleTitleLoading || '加载中...';
const scheduleTitleNoPlanEmoji = textConfig.scheduleTitleNoPlanEmoji || '🏖️';
const scheduleTitlePreviewEmoji = textConfig.scheduleTitlePreviewEmoji || '👀';
const scheduleTitlePreviewPrefix = textConfig.scheduleTitlePreviewPrefix || '（预览）';
const scheduleTitleSpecialTodayPrefix = textConfig.scheduleTitleSpecialTodayPrefix || '今天是「';
const scheduleTitleSpecialTodaySuffix = textConfig.scheduleTitleSpecialTodaySuffix || '」';
const scheduleTitlePreviewSpecialPrefix = textConfig.scheduleTitlePreviewSpecialPrefix || '（预览）「';
const scheduleTitlePreviewSpecialSuffix = textConfig.scheduleTitlePreviewSpecialSuffix || '」';
const scheduleTitleNoPlanText = textConfig.scheduleTitleNoPlanText || '今日无安排';
const scheduleTitlePreviewNoPlanText = textConfig.scheduleTitlePreviewNoPlanText || '（预览）无安排';
const timelineLoadingText = textConfig.timelineLoading || '正在加载课表...';
const calendarLoadingText = textConfig.calendarLoading || '正在加载日历...';

const scheduleLoadingTitle = timelineMessages.scheduleLoadingTitle || '正在加载课表';
const scheduleLoadingSubtitle = timelineMessages.scheduleLoadingSubtitle || '请稍候...';
const scheduleErrorTitle = timelineMessages.scheduleErrorTitle || '课表加载失败';
const scheduleErrorSubtitle = timelineMessages.scheduleErrorSubtitle || '请检查数据文件。';
const emptyTodayTitle = timelineMessages.emptyTodayTitle || '今日无安排';
const emptyTodaySubtitle = timelineMessages.emptyTodaySubtitle || '好好休息。';
const emptyPreviewTitle = timelineMessages.emptyPreviewTitle || '该日无安排';
const emptyPreviewSubtitle = timelineMessages.emptyPreviewSubtitle || '好好休息。';
const specialEmptyTitle = timelineMessages.specialEmptyTitle || '无详细时间表';
const specialEmptySubtitle = timelineMessages.specialEmptySubtitle || '请以实际通知为准。';
const specialLoadingTitle = timelineMessages.specialLoadingTitle || '正在加载特殊日程';
const specialLoadingSubtitle = timelineMessages.specialLoadingSubtitle || '请稍候...';
const specialErrorTitle = timelineMessages.specialErrorTitle || '特殊日程加载失败';
const specialErrorSubtitle = timelineMessages.specialErrorSubtitle || '请以通知为准。';

const scheduleLoadingNotice = noticesConfig.scheduleLoading || '正在加载课表，请稍候...';
const scheduleErrorNotice = noticesConfig.scheduleError || '课表加载失败，请检查数据文件。';
const restNoticeToday = noticesConfig.restToday || '今日无安排，好好休息。';
const restNoticePreview = noticesConfig.restPreview || '该日无安排，好好休息。';
const specialNoticeToday = noticesConfig.specialToday || '今天是特殊安排，请以实际通知为准。';
const specialNoticePreview = noticesConfig.specialPreview || '该日为特殊安排，请以实际通知为准。';
const specialLoadingTodayNotice = noticesConfig.specialLoadingToday || '正在加载今日特殊日程，请稍候...';
const specialLoadingPreviewNoticePrefix = noticesConfig.specialLoadingPreviewPrefix || '正在加载「';
const specialLoadingPreviewNoticeSuffix = noticesConfig.specialLoadingPreviewSuffix || '」的日程，请稍候...';
const specialErrorTodayNotice = noticesConfig.specialErrorToday || '特殊日程加载失败，请以通知为准。';
const specialErrorPreviewNoticePrefix = noticesConfig.specialErrorPreviewPrefix || '无法加载「';
const specialErrorPreviewNoticeSuffix = noticesConfig.specialErrorPreviewSuffix || '」的日程，请以通知为准。';

const countdownRemainingText = countdownConfig.remaining || '剩余时间';
const countdownUntilText = countdownConfig.until || '距离开始';

const statusBeforeStartText = statusesConfig.beforeStart || '准备中';
const statusInProgressText = statusesConfig.inProgress || '进行中';
const statusBreakText = statusesConfig.break || '休息中';
const statusSpecialText = statusesConfig.special || '特殊安排';
const statusCompletedTodayText = statusesConfig.completedToday || '今日课程已结束';
const statusCompletedPreviewText = statusesConfig.completedPreview || '该日课程已结束';
const statusCompletedTypeTodayText = statusesConfig.completedTypeToday || '今日完成';
const statusCompletedTypePreviewText = statusesConfig.completedTypePreview || '该日完成';
const statusCompletedSpecialTypeText = statusesConfig.completedSpecialType || '今天是';
const statusCompletedSpecialTitleText = statusesConfig.completedSpecialTitle || '请以实际通知为准';

const cardLoadingStatusText = cardConfig.loadingStatus || '加载中';
const cardLoadingTypeText = cardConfig.loadingType || defaultScheduleName;
const cardLoadingTitleText = cardConfig.loadingTitle || '请稍候...';
const cardLoadingCountdownLabelText = cardConfig.loadingCountdownLabel || '预计开始于';
const cardNextPrefix = cardConfig.nextPrefix || '下一节：';
const cardSpecialPrefix = cardConfig.specialPrefix || '今天是：';

const switchButtonDefaultText = switcherConfig.buttonDefault || '切换课表';
const switchButtonPreviewText = switcherConfig.buttonPreview || '退出预览';

const calendarTitleText = calendarConfig.title || '本月日程';
const calendarTodayLabel = (calendarConfig.labels && calendarConfig.labels.today) || '今日';
const calendarRestLabel = (calendarConfig.labels && calendarConfig.labels.rest) || '休息';
const calendarTypeLabels = calendarConfig.typeLabels || {};
const daysBefore = typeof calendarConfig.daysBefore === 'number' ? calendarConfig.daysBefore : 15;
const daysAfter = typeof calendarConfig.daysAfter === 'number' ? calendarConfig.daysAfter : 15;
const weekdayNames = Array.isArray(calendarConfig.weekdays) ? calendarConfig.weekdays : ['日', '一', '二', '三', '四', '五', '六'];

const timelineGapLabel = timelineConfig.gapLabel || '休息';

const modalTitleText = modalConfig.title || '选择课表类型';
const modalRestoreText = modalConfig.restore || '恢复默认';
const modalCancelText = modalConfig.cancel || '取消';
const modalSpecialNoticePrefix = modalConfig.specialNoticePrefix || '提示：今天是「';
const modalSpecialNoticeSuffix = modalConfig.specialNoticeSuffix || '」，默认采用特殊日程。你也可以临时选择其他课表（仅今天生效）。';

const networkErrorMessage = errorsConfig.network || '网络错误或数据文件不存在';
const errorsLoadTitle = errorsConfig.loadTitle || '数据加载失败';
const errorsLoadMessage = errorsConfig.loadMessage || '请稍后重试。';
const cardErrorStatusText = errorsConfig.cardStatus || '错误';
const cardErrorTypeText = errorsConfig.cardType || '系统';
const cardErrorTitleText = errorsConfig.cardTitle || '无法加载数据';
const cardErrorSubtitleText = errorsConfig.cardSubtitle || '请检查网络或稍后重试';
const calendarErrorTitleText = errorsConfig.calendarTitle || '日历加载失败';
const calendarErrorMessageText = errorsConfig.calendarMessage || '请稍后重试';

const calendarUrl = pathConfig.calendar || 'data/calendar.json';
const scheduleDir = pathConfig.scheduleDir || 'data/schedule';
const scheduleExtension = typeof pathConfig.scheduleExtension === 'string' ? pathConfig.scheduleExtension : '.json';
const specialScheduleDir = pathConfig.specialScheduleDir || 'data/special-schedule';
const specialScheduleExtension = typeof pathConfig.specialScheduleExtension === 'string' ? pathConfig.specialScheduleExtension : '.json';

const scheduleOverrideKey = 'scheduleOverride';
const scheduleOverrideDateKey = 'scheduleOverrideDate';

const scheduleCache = {};
const scheduleRequests = {};
const scheduleErrors = {};
const specialScheduleCache = {};
const specialScheduleRequests = {};
const specialScheduleErrors = {};

let calendarData = null;
let currentScheduleType = null;
let manualScheduleOverride = null;
let specialToday = null;
let hasInitialScroll = false;
let isLoading = true;
let isError = false;
let previewDate = null;
let timelineNodes = [];
let raf = null;
let lastTick = null;

function isAbsoluteUrl(path) {
    return typeof path === 'string' && /^https?:\/\//i.test(path);
}

function isRootRelative(path) {
    return typeof path === 'string' && path.startsWith('/');
}

function ensureExtension(file, extension) {
    if (!file || !extension) return file;
    if (file.endsWith(extension) || file.includes('?')) return file;
    return file + extension;
}

function joinPath(base, file) {
    if (!file) return null;
    if (base.endsWith('/')) return base + file;
    return base + '/' + file;
}

function resolveResource(base, identifier, extension) {
    if (!identifier) return null;
    if (isAbsoluteUrl(identifier) || isRootRelative(identifier)) return identifier;
    const file = ensureExtension(identifier, extension);
    return joinPath(base, file);
}

function getScheduleUrl(type) {
    if (!type) return null;
    const mapping = scheduleFilesConfig[type];
    if (mapping) return resolveResource(scheduleDir, mapping, scheduleExtension);
    return resolveResource(scheduleDir, type, scheduleExtension);
}

function getSpecialScheduleUrl(key) {
    if (!key) return null;
    const mapping = specialScheduleFilesConfig[key] || key;
    return resolveResource(specialScheduleDir, mapping, specialScheduleExtension);
}

function scheduleMeta(type) {
    if (type && scheduleTypeConfig[type]) return scheduleTypeConfig[type];
    if (scheduleTypeConfig.default) return scheduleTypeConfig.default;
    return { name: defaultScheduleName, emoji: defaultScheduleEmoji };
}

function scheduleName(type) {
    const meta = scheduleMeta(type);
    return meta.name || defaultScheduleName;
}

function scheduleEmoji(type) {
    const meta = scheduleMeta(type);
    return meta.emoji || defaultScheduleEmoji;
}

function kindLabel(kind) {
    if (kind && kindConfig[kind]) return kindConfig[kind];
    return defaultKindLabel;
}

function periodLabel(period) {
    if (period && periodConfig[period]) return periodConfig[period];
    return period || '';
}

function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function parseHM(hm) {
    if (!hm) {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }
    const parts = hm.split(':').map(Number);
    const d = new Date();
    d.setHours(parts[0] || 0, parts[1] || 0, 0, 0);
    return d;
}

function normalize(arr) {
    return arr.map(item => {
        const start = parseHM(item.start);
        const end = parseHM(item.end || item.start);
        return Object.assign({}, item, { _s: start, _e: end });
    });
}

function isIn(now, start, end) {
    return now >= start && now <= end;
}

function progress(now, start, end) {
    const duration = end - start;
    if (duration <= 0) return 1;
    const value = (now - start) / duration;
    return Math.min(1, Math.max(0, value));
}

function normalizeTypeClass(type) {
    if (!type) return '';
    return type.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function legacyTypeClass(type) {
    if (!type) return '';
    if (type === 'self-study') return 'selfstudy';
    return type.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function applyInitialTexts() {
    const title = document.getElementById('scheduleTitle');
    if (title) title.innerHTML = `<span class="emoji">${scheduleEmoji()}</span> ${scheduleTitleLoadingText}`;
    const timelineLoadingTextEl = document.querySelector('#timelineLoading .loading-text');
    if (timelineLoadingTextEl) timelineLoadingTextEl.textContent = timelineLoadingText;
    const calendarLoadingTextEl = document.querySelector('#calendarGrid .loading-text');
    if (calendarLoadingTextEl) calendarLoadingTextEl.textContent = calendarLoadingText;
    const switchBtnText = document.querySelector('#switchScheduleBtn .switch-btn-text');
    if (switchBtnText) switchBtnText.textContent = switchButtonDefaultText;
    const calendarTitleEl = document.querySelector('.calendar-title');
    if (calendarTitleEl) calendarTitleEl.textContent = calendarTitleText;
    const emptyMessage = document.getElementById('emptyMessage');
    if (emptyMessage) emptyMessage.innerHTML = `<h3>${emptyTodayTitle}</h3><p>${emptyTodaySubtitle}</p>`;
    const modalTitleEl = document.querySelector('#switchModal .modal h3');
    if (modalTitleEl) modalTitleEl.textContent = modalTitleText;
    const restoreBtn = document.getElementById('restoreDefaultBtn');
    if (restoreBtn) restoreBtn.textContent = modalRestoreText;
    const modalCloseBtn = document.querySelector('.modal-close');
    if (modalCloseBtn) modalCloseBtn.textContent = modalCancelText;
}

function toggleLoading(loading) {
    isLoading = loading;
    const title = document.getElementById('scheduleTitle');
    const btn = document.getElementById('switchScheduleBtn');
    const timelineLoading = document.getElementById('timelineLoading');
    const timelineContainer = document.getElementById('timelineContainer');
    const emptyMessage = document.getElementById('emptyMessage');
    if (loading) {
        if (title) title.innerHTML = `<span class="emoji">${scheduleEmoji()}</span> ${scheduleTitleLoadingText}`;
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
    card.classList.remove('hidden');
    card.classList.remove('active');
    const skeleton = card.querySelector('.card-skeleton');
    if (skeleton) skeleton.classList.remove('hidden');
    const status = card.querySelector('.card-status');
    const type = card.querySelector('.card-type');
    const title = card.querySelector('.card-title');
    const timeRange = card.querySelector('.card-time-range');
    const countdownLabel = card.querySelector('.countdown-label');
    const countdownValue = card.querySelector('.countdown-value');
    const progressBar = card.querySelector('.card-progress-bar');
    if (status) status.textContent = cardLoadingStatusText;
    if (type) type.textContent = cardLoadingTypeText;
    if (title) title.textContent = cardLoadingTitleText;
    if (timeRange) timeRange.textContent = '';
    if (countdownLabel) countdownLabel.textContent = cardLoadingCountdownLabelText;
    if (countdownValue) countdownValue.textContent = countdownPlaceholder;
    if (progressBar) progressBar.style.setProperty('--progress', '0%');
}

function clearCardLoadingState() {
    const card = document.getElementById('currentCard');
    if (!card) return;
    const skeleton = card.querySelector('.card-skeleton');
    if (skeleton) skeleton.classList.add('hidden');
}

function renderErrorState(err) {
    const message = err && err.message ? err.message : errorsLoadMessage;
    const title = document.getElementById('scheduleTitle');
    if (title) title.innerHTML = `<span class="emoji">⚠️</span> ${errorsLoadTitle}`;
    const emptyMessage = document.getElementById('emptyMessage');
    const timelineContainer = document.getElementById('timelineContainer');
    if (emptyMessage) {
        emptyMessage.innerHTML = `<h3>${errorsLoadTitle}</h3><p>${message}</p>`;
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
        card.classList.remove('active');
        card.classList.remove('hidden');
        if (status) status.textContent = cardErrorStatusText;
        if (type) type.textContent = cardErrorTypeText;
        if (titleEl) titleEl.textContent = cardErrorTitleText;
        if (timeRange) timeRange.textContent = cardErrorSubtitleText;
        if (countdownLabel) countdownLabel.textContent = '';
        if (countdownValue) countdownValue.textContent = countdownPlaceholder;
        if (progressBar) progressBar.style.setProperty('--progress', '0%');
    }
    const calGrid = document.getElementById('calendarGrid');
    if (calGrid) {
        calGrid.innerHTML = `<div class="empty-message"><h3>${calendarErrorTitleText}</h3><p>${calendarErrorMessageText}</p></div>`;
    }
}

async function loadCalendar() {
    const response = await fetch(calendarUrl);
    if (!response.ok) throw new Error(networkErrorMessage);
    calendarData = await response.json();
}

function loadSchedule(type, shouldUpdate = false) {
    if (!type) return Promise.resolve(null);
    if (scheduleCache[type]) return Promise.resolve(scheduleCache[type]);
    if (scheduleRequests[type]) return scheduleRequests[type];
    const url = getScheduleUrl(type);
    if (!url) {
        const error = new Error(scheduleErrorSubtitle);
        scheduleErrors[type] = error;
        return Promise.reject(error);
    }
    const request = fetch(url).then(response => {
        if (!response.ok) throw new Error(networkErrorMessage);
        return response.json();
    }).then(data => {
        scheduleCache[type] = data;
        delete scheduleErrors[type];
        return data;
    }).catch(error => {
        scheduleErrors[type] = error;
        console.error('Failed to load schedule:', type, error);
        throw error;
    }).finally(() => {
        delete scheduleRequests[type];
        if (shouldUpdate) {
            timelineNodes = [];
            hasInitialScroll = false;
            setTimeout(updateTimeline, 0);
        }
    });
    scheduleRequests[type] = request;
    return request;
}

function loadSpecialSchedule(key, shouldUpdate = true) {
    if (!key) return Promise.resolve(null);
    if (specialScheduleCache[key]) return Promise.resolve(specialScheduleCache[key]);
    if (specialScheduleRequests[key]) return specialScheduleRequests[key];
    const url = getSpecialScheduleUrl(key);
    if (!url) {
        const error = new Error(specialErrorSubtitle);
        specialScheduleErrors[key] = error;
        return Promise.reject(error);
    }
    const request = fetch(url).then(response => {
        if (!response.ok) throw new Error(networkErrorMessage);
        return response.json();
    }).then(data => {
        specialScheduleCache[key] = data;
        delete specialScheduleErrors[key];
        if (specialToday && specialToday.scheduleKey === key) specialToday.scheduleData = data;
        return data;
    }).catch(error => {
        specialScheduleErrors[key] = error;
        console.error('Failed to load special schedule:', key, error);
        throw error;
    }).finally(() => {
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

function determineCurrentSchedule() {
    const today = new Date();
    const dateStr = formatDateKey(today);
    let savedOverride = localStorage.getItem(scheduleOverrideKey);
    const savedDate = localStorage.getItem(scheduleOverrideDateKey);
    if (savedOverride === 'selfStudy') savedOverride = 'self-study';
    if (savedOverride && savedDate === dateStr) {
        manualScheduleOverride = savedOverride;
    } else {
        manualScheduleOverride = null;
        localStorage.removeItem(scheduleOverrideKey);
        localStorage.removeItem(scheduleOverrideDateKey);
    }
    specialToday = null;
    currentScheduleType = null;
    const day = calendarData && calendarData[dateStr];
    if (day) {
        if (day.type === 'special') {
            currentScheduleType = 'special';
            const scheduleKey = typeof day.schedule === 'string' ? day.schedule : typeof day.scheduleKey === 'string' ? day.scheduleKey : null;
            specialToday = {
                name: day.name || scheduleName('special'),
                scheduleKey,
                scheduleData: null
            };
        } else if (day.type === 'rest' || !day.type) {
            currentScheduleType = null;
        } else {
            currentScheduleType = day.type;
        }
    }
    if (manualScheduleOverride) {
        currentScheduleType = manualScheduleOverride;
        specialToday = null;
    }
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
                name = day.name || scheduleName('special');
                scheduleKey = typeof day.schedule === 'string' ? day.schedule : typeof day.scheduleKey === 'string' ? day.scheduleKey : null;
                if (scheduleKey) scheduleArr = specialScheduleCache[scheduleKey] || null;
            } else if (day.type === 'rest' || !day.type) {
                type = null;
                name = null;
            } else {
                type = day.type;
                name = scheduleName(type);
                scheduleArr = scheduleCache[type] || null;
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
            name: specialToday ? specialToday.name : scheduleName('special'),
            scheduleArr,
            scheduleKey
        };
    }
    return {
        mode: 'today',
        dateStr: formatDateKey(new Date()),
        type: currentScheduleType,
        name: currentScheduleType ? scheduleName(currentScheduleType) : null,
        scheduleArr: currentScheduleType ? scheduleCache[currentScheduleType] || null : null,
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

function buildTimeline(container, data) {
    container.innerHTML = '';
    const nodes = [];
    let lastPeriod = '';
    data.forEach(entry => {
        if (entry.period && entry.period !== lastPeriod) {
            lastPeriod = entry.period;
            const divider = document.createElement('div');
            divider.className = 'period-divider';
            divider.innerHTML = periodLabel(entry.period);
            container.appendChild(divider);
        }
        const item = document.createElement('div');
        item.className = 'item';
        const label = document.createElement('div');
        label.className = 'label';
        label.textContent = entry.name || '';
        const time = document.createElement('div');
        time.className = 'time';
        const timeText = entry.start ? entry.start + (entry.end && entry.end !== entry.start ? ' - ' + entry.end : '') : '';
        time.textContent = timeText;
        const meta = document.createElement('div');
        meta.className = 'meta';
        meta.textContent = kindLabel(entry.kind);
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

function updateTimeline() {
    if (isError || !calendarData) return;
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
            const displayName = ctx.name || scheduleName('special');
            if (timeNotice) timeNotice.textContent = ctx.mode === 'preview' ? `${specialErrorPreviewNoticePrefix}${displayName}${specialErrorPreviewNoticeSuffix}` : specialErrorTodayNotice;
            updateStatusLayout(false);
            if (emptyMessage) {
                emptyMessage.innerHTML = `<h3>${specialErrorTitle}</h3><p>${specialErrorSubtitle}</p>`;
                emptyMessage.classList.remove('hidden');
            }
            if (timelineContainer) timelineContainer.classList.add('hidden');
            if (timeline) timeline.innerHTML = '';
            timelineNodes = [];
            if (railProgress) railProgress.style.height = '0px';
            if (railDot) railDot.classList.remove('visible');
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
                card.classList.remove('active');
                if (status) status.textContent = statusSpecialText;
                if (type) type.textContent = scheduleName('special');
                if (titleEl) titleEl.textContent = specialErrorTitle;
                if (timeRange) timeRange.textContent = specialErrorSubtitle;
                if (countdownLabel) countdownLabel.textContent = '';
                if (countdownValue) countdownValue.textContent = countdownPlaceholder;
                if (progressBar) progressBar.style.setProperty('--progress', '0%');
            }
            adjustRailHeight();
            return;
        }
        if (!raw) {
            loadSpecialSchedule(ctx.scheduleKey, true).catch(() => {});
            if (timeNotice) timeNotice.textContent = ctx.mode === 'preview' ? `${specialLoadingPreviewNoticePrefix}${ctx.name || scheduleName('special')}${specialLoadingPreviewNoticeSuffix}` : specialLoadingTodayNotice;
            updateStatusLayout(false);
            if (emptyMessage) {
                emptyMessage.innerHTML = `<h3>${specialLoadingTitle}</h3><p>${specialLoadingSubtitle}</p>`;
                emptyMessage.classList.remove('hidden');
            }
            if (timelineContainer) timelineContainer.classList.add('hidden');
            if (timeline) timeline.innerHTML = '';
            timelineNodes = [];
            if (railProgress) railProgress.style.height = '0px';
            if (railDot) railDot.classList.remove('visible');
            setCardLoadingState();
            adjustRailHeight();
            return;
        }
    }
    if (ctx.type && ctx.type !== 'special' && !raw) {
        if (scheduleErrors[ctx.type]) {
            if (timeNotice) timeNotice.textContent = scheduleErrorNotice;
            updateStatusLayout(false);
            if (emptyMessage) {
                emptyMessage.innerHTML = `<h3>${scheduleErrorTitle}</h3><p>${scheduleErrorSubtitle}</p>`;
                emptyMessage.classList.remove('hidden');
            }
            if (timelineContainer) timelineContainer.classList.add('hidden');
            if (timeline) timeline.innerHTML = '';
            timelineNodes = [];
            if (railProgress) railProgress.style.height = '0px';
            if (railDot) railDot.classList.remove('visible');
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
                card.classList.remove('active');
                if (status) status.textContent = cardErrorStatusText;
                if (type) type.textContent = scheduleName(ctx.type);
                if (titleEl) titleEl.textContent = scheduleErrorTitle;
                if (timeRange) timeRange.textContent = scheduleErrorSubtitle;
                if (countdownLabel) countdownLabel.textContent = '';
                if (countdownValue) countdownValue.textContent = countdownPlaceholder;
                if (progressBar) progressBar.style.setProperty('--progress', '0%');
            }
            adjustRailHeight();
            return;
        }
        loadSchedule(ctx.type, true).catch(() => {});
        if (timeNotice) timeNotice.textContent = scheduleLoadingNotice;
        updateStatusLayout(false);
        if (emptyMessage) {
            emptyMessage.innerHTML = `<h3>${scheduleLoadingTitle}</h3><p>${scheduleLoadingSubtitle}</p>`;
            emptyMessage.classList.remove('hidden');
        }
        if (timelineContainer) timelineContainer.classList.add('hidden');
        if (timeline) timeline.innerHTML = '';
        timelineNodes = [];
        if (railProgress) railProgress.style.height = '0px';
        if (railDot) railDot.classList.remove('visible');
        setCardLoadingState();
        adjustRailHeight();
        return;
    }
    const hasSchedule = Array.isArray(raw) && raw.length > 0;
    if (!hasSchedule) {
        if (ctx.type === 'special') {
            const displayName = ctx.name || scheduleName('special');
            if (emptyMessage) {
                const heading = ctx.mode === 'preview' ? `${scheduleTitlePreviewPrefix}${displayName}` : `${scheduleTitleSpecialTodayPrefix}${displayName}${scheduleTitleSpecialTodaySuffix}`;
                const subtitle = `${specialEmptyTitle}${specialEmptySubtitle ? '：' : ''}${specialEmptySubtitle}`;
                emptyMessage.innerHTML = `<h3>${heading}</h3><p>${subtitle}</p>`;
                emptyMessage.classList.remove('hidden');
            }
            if (timeNotice) timeNotice.textContent = ctx.mode === 'preview' ? specialNoticePreview : specialNoticeToday;
        } else {
            if (emptyMessage) {
                const heading = ctx.mode === 'preview' ? emptyPreviewTitle : emptyTodayTitle;
                const subtitle = ctx.mode === 'preview' ? emptyPreviewSubtitle : emptyTodaySubtitle;
                emptyMessage.innerHTML = `<h3>${heading}</h3><p>${subtitle}</p>`;
                emptyMessage.classList.remove('hidden');
            }
            if (timeNotice) timeNotice.textContent = ctx.mode === 'preview' ? restNoticePreview : restNoticeToday;
        }
        updateStatusLayout(false);
        if (timelineContainer) timelineContainer.classList.add('hidden');
        if (timeline) timeline.innerHTML = '';
        timelineNodes = [];
        if (railProgress) railProgress.style.height = '0px';
        if (railDot) railDot.classList.remove('visible');
        if (card) {
            const progressBar = card.querySelector('.card-progress-bar');
            if (progressBar) progressBar.style.setProperty('--progress', '0%');
            card.classList.remove('active');
        }
        adjustRailHeight();
        return;
    }
    updateStatusLayout(true);
    if (timeNotice) timeNotice.textContent = '';
    if (emptyMessage) emptyMessage.classList.add('hidden');
    if (timelineContainer) timelineContainer.classList.remove('hidden');
    const data = normalize(raw);
    if (timeline && (timelineNodes.length !== data.length || timeline.childElementCount === 0)) {
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
                gapEl.innerHTML = `<div class="gap-line"></div><div class="gap-time">${timelineGapLabel}</div>`;
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
    if (ms < 0) ms = 0;
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
    const count = data.length;
    if (!count) {
        card.classList.add('hidden');
        return;
    }
    const now = new Date();
    const isSpecialDay = ctx.type === 'special';
    let currentItem = null;
    let nextItem = null;
    let countdownTarget = null;
    let countdownLabel = '';
    let statusText = '';
    if (isBeforeStart) {
        nextItem = data[0];
        countdownTarget = nextItem._s;
        countdownLabel = countdownUntilText;
        statusText = isSpecialDay ? statusSpecialText : statusBeforeStartText;
    } else if (isAfterEnd) {
        const statusEl = card.querySelector('.card-status');
        const typeEl = card.querySelector('.card-type');
        const titleEl = card.querySelector('.card-title');
        const timeRange = card.querySelector('.card-time-range');
        const countdownLabelEl = card.querySelector('.countdown-label');
        const countdownValue = card.querySelector('.countdown-value');
        const progressBar = card.querySelector('.card-progress-bar');
        if (statusEl) statusEl.textContent = isSpecialDay ? statusSpecialText : ctx.mode === 'preview' ? statusCompletedPreviewText : statusCompletedTodayText;
        if (typeEl) typeEl.textContent = isSpecialDay ? statusCompletedSpecialTypeText : ctx.mode === 'preview' ? statusCompletedTypePreviewText : statusCompletedTypeTodayText;
        if (titleEl) titleEl.textContent = isSpecialDay ? (ctx.name || scheduleName('special')) : ctx.mode === 'preview' ? statusCompletedPreviewText : statusCompletedTodayText;
        if (timeRange) timeRange.textContent = isSpecialDay ? statusCompletedSpecialTitleText : '';
        if (countdownLabelEl) countdownLabelEl.textContent = '';
        if (countdownValue) countdownValue.textContent = countdownPlaceholder;
        if (progressBar) progressBar.style.setProperty('--progress', '100%');
        card.classList.remove('active');
        card.classList.remove('hidden');
        return;
    } else if (isInGap && currentIndex >= 0 && currentIndex < count - 1) {
        nextItem = data[currentIndex + 1];
        countdownTarget = nextItem._s;
        countdownLabel = countdownUntilText;
        statusText = isSpecialDay ? statusSpecialText : statusBreakText;
    } else if (currentIndex >= 0 && !isInGap) {
        currentItem = data[currentIndex];
        countdownTarget = currentItem._e;
        countdownLabel = countdownRemainingText;
        statusText = isSpecialDay ? statusSpecialText : statusInProgressText;
    }
    const statusEl = card.querySelector('.card-status');
    const typeEl = card.querySelector('.card-type');
    const titleEl = card.querySelector('.card-title');
    const timeRange = card.querySelector('.card-time-range');
    const countdownLabelEl = card.querySelector('.countdown-label');
    const countdownValue = card.querySelector('.countdown-value');
    const progressBar = card.querySelector('.card-progress-bar');
    if (currentItem) {
        if (statusEl) statusEl.textContent = statusText;
        if (typeEl) typeEl.textContent = kindLabel(currentItem.kind);
        if (titleEl) titleEl.textContent = (isSpecialDay ? cardSpecialPrefix : '') + (currentItem.name || '');
        if (timeRange) timeRange.textContent = `${currentItem.start || ''}${currentItem.end && currentItem.end !== currentItem.start ? ' - ' + currentItem.end : ''}`;
        if (progressBar) progressBar.style.setProperty('--progress', (progress(now, currentItem._s, currentItem._e) * 100) + '%');
        card.classList.add('active');
    } else if (nextItem) {
        if (statusEl) statusEl.textContent = statusText;
        if (typeEl) typeEl.textContent = kindLabel(nextItem.kind);
        if (titleEl) titleEl.textContent = (isSpecialDay ? cardSpecialPrefix : '') + cardNextPrefix + (nextItem.name || '');
        if (timeRange) timeRange.textContent = `${nextItem.start || ''}${nextItem.end && nextItem.end !== nextItem.start ? ' - ' + nextItem.end : ''}`;
        if (progressBar) progressBar.style.setProperty('--progress', '0%');
        card.classList.remove('active');
    }
    if (countdownLabelEl) countdownLabelEl.textContent = countdownLabel;
    if (countdownValue) countdownValue.textContent = countdownTarget ? formatCountdown(countdownTarget - now) : countdownPlaceholder;
    card.classList.remove('hidden');
}

function getGreetingMessage() {
    const hour = new Date().getHours();
    for (let i = 0; i < greetingsConfig.length; i++) {
        const item = greetingsConfig[i];
        if (typeof item.start !== 'number' || typeof item.end !== 'number') continue;
        if (item.start <= item.end) {
            if (hour >= item.start && hour < item.end) return item.text || '';
        } else {
            if (hour >= item.start || hour < item.end) return item.text || '';
        }
    }
    return greetingsConfig.length > 0 ? greetingsConfig[0].text || '' : '';
}

function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const clock = document.getElementById('clock');
    const greeting = document.getElementById('greeting');
    if (clock) clock.textContent = `${h}:${m}:${s}`;
    if (greeting) greeting.textContent = getGreetingMessage();
}

function updateScheduleTitle() {
    const title = document.getElementById('scheduleTitle');
    if (!title) return;
    if (previewDate) {
        const ds = formatDateKey(previewDate);
        const day = calendarData && calendarData[ds];
        if (!day || day.type === 'rest' || !day.type) {
            title.innerHTML = `<span class="emoji">${scheduleTitlePreviewEmoji}</span> ${scheduleTitlePreviewNoPlanText}`;
            return;
        }
        if (day.type === 'special') {
            const name = day.name || scheduleName('special');
            title.innerHTML = `<span class="emoji">${scheduleEmoji('special')}</span> ${scheduleTitlePreviewSpecialPrefix}${name}${scheduleTitlePreviewSpecialSuffix}`;
            return;
        }
        const typeKey = day.type;
        title.innerHTML = `<span class="emoji">${scheduleEmoji(typeKey)}</span> ${scheduleTitlePreviewPrefix}${scheduleName(typeKey)}`;
        return;
    }
    if (currentScheduleType === 'special' && specialToday) {
        title.innerHTML = `<span class="emoji">${scheduleEmoji('special')}</span> ${scheduleTitleSpecialTodayPrefix}${specialToday.name}${scheduleTitleSpecialTodaySuffix}`;
        return;
    }
    if (!currentScheduleType) {
        title.innerHTML = `<span class="emoji">${scheduleTitleNoPlanEmoji}</span> ${scheduleTitleNoPlanText}`;
        return;
    }
    title.innerHTML = `<span class="emoji">${scheduleEmoji(currentScheduleType)}</span> ${scheduleName(currentScheduleType)}`;
}

function restoreDefaultSchedule() {
    localStorage.removeItem(scheduleOverrideKey);
    localStorage.removeItem(scheduleOverrideDateKey);
    manualScheduleOverride = null;
    determineCurrentSchedule();
    previewDate = null;
    timelineNodes = [];
    hasInitialScroll = false;
    setCardLoadingState();
    updateScheduleTitle();
    updateSwitchButton();
    if (currentScheduleType && currentScheduleType !== 'special') {
        loadSchedule(currentScheduleType, true).catch(() => {
            setTimeout(updateTimeline, 0);
        });
    } else if (currentScheduleType === 'special' && specialToday && specialToday.scheduleKey) {
        loadSpecialSchedule(specialToday.scheduleKey, true).catch(() => {
            setTimeout(updateTimeline, 0);
        });
    } else {
        updateTimeline();
    }
    closeSwitchModal();
}

function getSwitchTypes() {
    const list = Array.isArray(switcherConfig.types) ? switcherConfig.types.slice() : [];
    if (calendarData) {
        Object.values(calendarData).forEach(day => {
            if (day && day.type && day.type !== 'special' && day.type !== 'rest') list.push(day.type);
        });
    }
    const seen = new Set();
    const result = [];
    for (let i = 0; i < list.length; i++) {
        const type = list[i];
        if (!type || type === 'special') continue;
        if (!seen.has(type)) {
            seen.add(type);
            result.push(type);
        }
    }
    return result;
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
        notice.textContent = `${modalSpecialNoticePrefix}${specialToday.name}${modalSpecialNoticeSuffix}`;
    } else if (notice) {
        notice.style.display = 'none';
        notice.textContent = '';
    }
    const types = getSwitchTypes();
    types.forEach(type => {
        const option = document.createElement('div');
        option.className = `schedule-option ${legacyTypeClass(type)} type-${normalizeTypeClass(type)}`;
        option.textContent = scheduleName(type);
        option.onclick = () => {
            manualScheduleOverride = type;
            localStorage.setItem(scheduleOverrideKey, type);
            localStorage.setItem(scheduleOverrideDateKey, formatDateKey(new Date()));
            currentScheduleType = type;
            specialToday = null;
            previewDate = null;
            timelineNodes = [];
            hasInitialScroll = false;
            setCardLoadingState();
            updateScheduleTitle();
            updateSwitchButton();
            loadSchedule(type, true).catch(() => {
                setTimeout(updateTimeline, 0);
            });
            closeSwitchModal();
        };
        options.appendChild(option);
    });
    restoreBtn.textContent = modalRestoreText;
    restoreBtn.onclick = restoreDefaultSchedule;
    modal.classList.add('show');
}

function closeSwitchModal() {
    const modal = document.getElementById('switchModal');
    if (modal) modal.classList.remove('show');
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
    updateSwitchButton();
    updateTimeline();
}

function updateSwitchButton() {
    const btn = document.getElementById('switchScheduleBtn');
    if (!btn) return;
    const btnText = btn.querySelector('.switch-btn-text');
    if (!btnText) return;
    if (previewDate) {
        btn.classList.add('exit-preview');
        btnText.textContent = switchButtonPreviewText;
    } else {
        btn.classList.remove('exit-preview');
        btnText.textContent = switchButtonDefaultText;
    }
}

function buildCalendar() {
    const container = document.getElementById('calendarGrid');
    if (!container) return;
    container.innerHTML = `<div class="calendar-scroll-wrapper"><div class="calendar-strip" id="calendarStrip"></div></div>`;
    const strip = document.getElementById('calendarStrip');
    if (!strip) return;
    const calendarTitleEl = document.querySelector('.calendar-title');
    if (calendarTitleEl) calendarTitleEl.textContent = calendarTitleText;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = -daysBefore; i <= daysAfter; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = formatDateKey(date);
        const dayData = calendarData ? calendarData[dateStr] : null;
        const weekday = weekdayNames[date.getDay()];
        const dateEl = document.createElement('div');
        dateEl.className = 'calendar-date';
        dateEl.dataset.date = dateStr;
        const weekdayEl = document.createElement('div');
        weekdayEl.className = 'date-weekday';
        weekdayEl.textContent = i === 0 ? calendarTodayLabel : weekday;
        const numberEl = document.createElement('div');
        numberEl.className = 'date-number';
        numberEl.textContent = date.getDate();
        dateEl.appendChild(weekdayEl);
        dateEl.appendChild(numberEl);
        if (dayData && dayData.type) {
            const typeKey = dayData.type;
            if (typeKey !== 'rest') {
                const legacyClass = legacyTypeClass(typeKey);
                if (legacyClass) dateEl.classList.add(legacyClass);
                dateEl.classList.add(`type-${normalizeTypeClass(typeKey)}`);
                if (typeKey === 'special') dateEl.classList.add('special');
                const typeEl = document.createElement('div');
                typeEl.className = 'date-type';
                if (typeKey === 'special') {
                    typeEl.textContent = dayData.name || calendarTypeLabels.special || scheduleName('special');
                } else {
                    typeEl.textContent = calendarTypeLabels[typeKey] || scheduleName(typeKey);
                }
                dateEl.appendChild(typeEl);
            } else {
                dateEl.classList.add('rest');
                const typeEl = document.createElement('div');
                typeEl.className = 'date-type';
                typeEl.textContent = calendarRestLabel;
                dateEl.appendChild(typeEl);
            }
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
            updateSwitchButton();
            updateTimeline();
            return;
        }
        previewDate = new Date(ds + 'T00:00:00');
        hasInitialScroll = false;
        timelineNodes = [];
        updateScheduleTitle();
        updateSwitchButton();
        updateTimeline();
    });
    const wrapper = container.querySelector('.calendar-scroll-wrapper');
    if (wrapper) {
        setTimeout(() => {
            const todayEl = strip.querySelector('.today');
            if (todayEl) {
                const scrollLeft = todayEl.offsetLeft - wrapper.clientWidth / 2 + todayEl.offsetWidth / 2;
                wrapper.scrollLeft = scrollLeft;
            }
            if (!wrapper.hasWheelListener) {
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
}

async function loadData() {
    try {
        toggleLoading(true);
        await loadCalendar();
        determineCurrentSchedule();
        if (currentScheduleType && currentScheduleType !== 'special') {
            await loadSchedule(currentScheduleType);
        }
        if (currentScheduleType === 'special' && specialToday && specialToday.scheduleKey) {
            await loadSpecialSchedule(specialToday.scheduleKey, false).catch(() => {});
        }
        const optionalLoads = [];
        const optionalSet = new Set();
        const types = getSwitchTypes();
        types.forEach(type => {
            if (type && type !== currentScheduleType && !scheduleCache[type]) optionalSet.add(type);
        });
        optionalSet.forEach(type => {
            optionalLoads.push(loadSchedule(type, false));
        });
        if (optionalLoads.length > 0) await Promise.allSettled(optionalLoads);
        isError = false;
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

function initUI() {
    updateScheduleTitle();
    updateClock();
    updateTimeline();
    buildCalendar();
    updateSwitchButton();
    const switchBtn = document.getElementById('switchScheduleBtn');
    if (switchBtn) switchBtn.addEventListener('click', handleSwitchButtonClick);
    const githubLink = document.querySelector('.github-fab');
    if (githubLink && siteConfig.github) githubLink.href = siteConfig.github;
    if (!raf) raf = requestAnimationFrame(tick);
}

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

applyInitialTexts();
loadData();