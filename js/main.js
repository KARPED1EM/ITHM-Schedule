const config = window.SCHEDULE_CONFIG || {};
const siteConfig = config.site || {};
if (siteConfig.title) document.title = siteConfig.title;

const pathConfig = config.paths || {};
const themePath = pathConfig.theme || 'data/theme.json';
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
const statusTomorrowText = statusesConfig.tomorrow || '明日预告';
const statusTomorrowRestText = statusesConfig.tomorrowRest || '明日无安排';

const cardLoadingStatusText = cardConfig.loadingStatus || '加载中';
const cardLoadingTypeText = cardConfig.loadingType || defaultScheduleName;
const cardLoadingTitleText = cardConfig.loadingTitle || '请稍候...';
const cardLoadingCountdownLabelText = cardConfig.loadingCountdownLabel || '预计开始于';
const cardNextPrefix = cardConfig.nextPrefix || '下一节：';
const cardSpecialPrefix = cardConfig.specialPrefix || '今天是：';
const cardTomorrowPrefix = cardConfig.tomorrowPrefix || '明日第一节：';
const cardTomorrowStartLabel = cardConfig.tomorrowStartLabel || '开始时间';
const cardTomorrowRestTitle = cardConfig.tomorrowRestTitle || '明天无安排';
const cardTomorrowRestSubtitle = cardConfig.tomorrowRestSubtitle || '好好犒劳自己一天！';
const cardTomorrowRestHighlight = cardConfig.tomorrowRestHighlight || '🎉🎉🎉';
const cardTomorrowRestLabel = typeof cardConfig.tomorrowRestLabel === 'string' ? cardConfig.tomorrowRestLabel : '';

const switchButtonDefaultText = switcherConfig.buttonDefault || '切换课表';
const switchButtonPreviewText = switcherConfig.buttonPreview || '退出预览';

const calendarTitleText = calendarConfig.title || '本月日程';
const calendarTodayLabel = (calendarConfig.labels && calendarConfig.labels.today) || '今日';
const calendarRestLabel = (calendarConfig.labels && calendarConfig.labels.rest) || '休息';
const cardTomorrowRestTypeText = typeof cardConfig.tomorrowRestType === 'string' && cardConfig.tomorrowRestType.trim() ? cardConfig.tomorrowRestType : calendarRestLabel || '休息日';
const calendarTypeLabels = calendarConfig.typeLabels || {};
const daysBefore = typeof calendarConfig.daysBefore === 'number' ? calendarConfig.daysBefore : 15;
const daysAfter = typeof calendarConfig.daysAfter === 'number' ? calendarConfig.daysAfter : 15;
const weekdayNames = Array.isArray(calendarConfig.weekdays) ? calendarConfig.weekdays : ['日', '一', '二', '三', '四', '五', '六'];

const timelineGapLabel = timelineConfig.gapLabel || '休息';

const modalTitleText = modalConfig.title || '纠正今日课表（仅覆盖今日）';
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
const scheduleOverridesUrl = pathConfig.scheduleOverrides || 'data/schedule-overrides.json';

const scheduleOverrideKey = 'scheduleOverride';
const scheduleOverrideDateKey = 'scheduleOverrideDate';

const settingsStorageKey = 'scheduleSettings';
const defaultSettings = Object.freeze({
    timezone: 'UTC+8',
    offsetMinutes: 480,
    timeFormat: '12'
});
const MAX_TIMEZONE_OFFSET_MINUTES = 14 * 60;
let userSettings = loadSettings();
let timezoneOffsetMinutes = userSettings.offsetMinutes;
let timezoneOffsetMs = timezoneOffsetMinutes * 60000;
let activeTimeFormat = userSettings.timeFormat === '24' ? '24' : '12';
let pendingTimeFormat = activeTimeFormat;
let isSettingsModalOpen = false;
let settingsUIInitialized = false;

const scheduleCache = {};
const scheduleRequests = {};
const scheduleErrors = {};
const specialScheduleCache = {};
const specialScheduleRequests = {};
const specialScheduleErrors = {};
let scheduleOverridesData = null;

const defaultTypeStyle = Object.freeze({
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.14) 100%)',
    text: 'var(--text)',
    subtext: 'var(--muted)',
    border: 'rgba(255, 255, 255, 0.12)',
    optionAccent: 'var(--accent)'
});
const calendarTypeStyles = Object.create(null);
calendarTypeStyles.__default = defaultTypeStyle;

let themeConfig = null;

let calendarData = null;
let currentScheduleType = null;
let manualScheduleOverride = null;
let specialToday = null;
let hasInitialScroll = false;
let isLoading = true;
let isError = false;
let previewDate = null;
let previewDateKey = null;
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

async function fetchJson(url, options) {
    const { errorMessage = networkErrorMessage, ...fetchOptions } = options || {};
    const response = await fetch(url, fetchOptions);
    if (!response.ok) throw new Error(errorMessage);
    return response.json();
}

function requestTimelineRefresh() {
    timelineNodes = [];
    hasInitialScroll = false;
    setTimeout(updateTimeline, 0);
}

function createCachedJsonLoader({
    cache,
    requests,
    errors,
    urlResolver,
    missingMessage,
    logLabel,
    onSuccess,
    defaultShouldUpdate = false
}) {
    const label = logLabel || 'resource';
    return function load(key, shouldUpdate = defaultShouldUpdate) {
        if (!key) return Promise.resolve(null);
        if (cache[key]) return Promise.resolve(cache[key]);
        if (requests[key]) return requests[key];

        const url = urlResolver(key);
        if (!url) {
            const error = new Error(missingMessage);
            if (errors && key) errors[key] = error;
            return Promise.reject(error);
        }

        const refreshAfterLoad = Boolean(shouldUpdate);
        const request = fetchJson(url).then(data => {
            cache[key] = data;
            if (errors && key) delete errors[key];
            if (typeof onSuccess === 'function') onSuccess(key, data);
            return data;
        }).catch(error => {
            if (errors && key) errors[key] = error;
            console.error(`Failed to load ${label}:`, key, error);
            throw error;
        }).finally(() => {
            if (requests && key) delete requests[key];
            if (refreshAfterLoad) requestTimelineRefresh();
        });

        requests[key] = request;
        return request;
    };
}

function setCSSVariable(name, value) {
    if (typeof document === 'undefined' || !document.documentElement) return;
    if (!name || value === undefined || value === null) return;
    const normalized = String(value).trim();
    if (!normalized) return;
    document.documentElement.style.setProperty(name, normalized);
}

function applyTheme(theme) {
    if (!theme || typeof theme !== 'object') return;
    const colors = theme.colors && typeof theme.colors === 'object' ? theme.colors : theme;
    if (!colors) return;
    if (isNonEmptyString(colors.accent)) setCSSVariable('--accent', colors.accent);
    if (isNonEmptyString(colors.accentWeak)) setCSSVariable('--accent-weak', colors.accentWeak);
    if (isNonEmptyString(colors.todayText)) setCSSVariable('--calendar-today-text', colors.todayText);

    const todayColors = colors.today && typeof colors.today === 'object' ? colors.today : null;
    if (todayColors) {
        if (isNonEmptyString(todayColors.text)) setCSSVariable('--calendar-today-text', todayColors.text);
        if (isNonEmptyString(todayColors.outline)) setCSSVariable('--calendar-today-outline', todayColors.outline);
        if (isNonEmptyString(todayColors.ring)) setCSSVariable('--calendar-today-ring', todayColors.ring);
        if (isNonEmptyString(todayColors.shadow)) setCSSVariable('--calendar-today-shadow', todayColors.shadow);
        if (isNonEmptyString(todayColors.glow)) setCSSVariable('--calendar-today-glow', todayColors.glow);
        if (isNonEmptyString(todayColors.numberShadow)) setCSSVariable('--calendar-today-number-shadow', todayColors.numberShadow);
        if (isNonEmptyString(todayColors.subtextShadow)) setCSSVariable('--calendar-today-subtext-shadow', todayColors.subtextShadow);
    }

    resetTypeStyles();
    if (colors.calendarDefault) registerTypeStyle('default', colors.calendarDefault);
    const calendarColors = colors.calendar && typeof colors.calendar === 'object' ? colors.calendar : null;
    if (calendarColors) {
        Object.entries(calendarColors).forEach(([key, value]) => {
            registerTypeStyle(key, value);
        });
    }
    const typeColors = colors.types && typeof colors.types === 'object' ? colors.types : null;
    if (typeColors) {
        Object.entries(typeColors).forEach(([key, value]) => {
            registerTypeStyle(key, value);
        });
    }
    if (!calendarTypeStyles.__default) {
        calendarTypeStyles.__default = defaultTypeStyle;
    }
}

async function loadTheme() {
    if (!themePath) return;
    try {
        const response = await fetch(themePath, { cache: 'no-store' });
        if (!response.ok) throw new Error(`Theme request failed with status ${response.status}`);
        themeConfig = await response.json();
        applyTheme(themeConfig);
    } catch (error) {
        console.warn('Failed to load theme config:', error);
    }
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

function formatTimezoneOffset(offsetMinutes) {
    if (!Number.isFinite(offsetMinutes)) return 'UTC';
    if (offsetMinutes === 0) return 'UTC';
    const sign = offsetMinutes > 0 ? '+' : '-';
    const absMinutes = Math.abs(offsetMinutes);
    const hours = Math.floor(absMinutes / 60);
    const minutes = absMinutes % 60;
    const minutePart = minutes ? `:${String(minutes).padStart(2, '0')}` : '';
    return `UTC${sign}${hours}${minutePart}`;
}

function parseTimezoneValue(value) {
    if (typeof value !== 'string') return null;
    let input = value.trim();
    if (!input) return null;
    let upper = input.toUpperCase();
    if (upper === 'UTC' || upper === 'GMT' || upper === 'Z') {
        return { offsetMinutes: 0, normalized: 'UTC' };
    }
    if (upper.startsWith('UTC')) {
        upper = upper.slice(3).trim();
    } else if (upper.startsWith('GMT')) {
        upper = upper.slice(3).trim();
    }
    if (upper === 'Z') return { offsetMinutes: 0, normalized: 'UTC' };
    let sign = 1;
    if (upper.startsWith('+') || upper.startsWith('-')) {
        sign = upper[0] === '-' ? -1 : 1;
        upper = upper.slice(1).trim();
    }
    if (!upper) return null;
    let hours = 0;
    let minutes = 0;
    if (upper.includes(':')) {
        const [h, m] = upper.split(':');
        hours = Number.parseInt(h, 10);
        minutes = Number.parseInt(m, 10);
    } else if (upper.includes('.')) {
        const [h, fraction] = upper.split('.');
        hours = Number.parseInt(h, 10);
        const fractional = Number(`0.${fraction}`);
        if (!Number.isFinite(fractional)) return null;
        minutes = Math.round(fractional * 60);
    } else if (/^\d{3,}$/.test(upper)) {
        const hPart = upper.slice(0, -2);
        const mPart = upper.slice(-2);
        hours = Number.parseInt(hPart, 10);
        minutes = Number.parseInt(mPart, 10);
    } else {
        hours = Number.parseInt(upper, 10);
    }
    if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
    if (minutes < 0) return null;
    if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes %= 60;
    }
    const totalMinutes = sign * (Math.abs(hours) * 60 + minutes);
    if (Math.abs(totalMinutes) > MAX_TIMEZONE_OFFSET_MINUTES) return null;
    return { offsetMinutes: totalMinutes, normalized: formatTimezoneOffset(totalMinutes) };
}

function loadSettings() {
    const fallback = {
        timezone: defaultSettings.timezone,
        offsetMinutes: defaultSettings.offsetMinutes,
        timeFormat: defaultSettings.timeFormat
    };
    const useFallback = () => ({ ...fallback });
    try {
        if (typeof localStorage === 'undefined') return useFallback();
        const stored = localStorage.getItem(settingsStorageKey);
        if (!stored) return useFallback();
        let parsed;
        try {
            parsed = JSON.parse(stored);
        } catch (parseError) {
            console.warn('Failed to parse stored settings, using defaults.', parseError);
            return useFallback();
        }
        let timezoneText = typeof parsed.timezone === 'string' ? parsed.timezone.trim() : '';
        if (!timezoneText) timezoneText = fallback.timezone;
        let timezoneInfo = parseTimezoneValue(timezoneText);
        if (!timezoneInfo && parsed.offsetMinutes !== undefined && parsed.offsetMinutes !== null && parsed.offsetMinutes !== '') {
            const offset = Number(parsed.offsetMinutes);
            if (Number.isFinite(offset) && Math.abs(offset) <= MAX_TIMEZONE_OFFSET_MINUTES) {
                timezoneInfo = { offsetMinutes: offset, normalized: formatTimezoneOffset(offset) };
            }
        }
        if (!timezoneInfo) timezoneInfo = parseTimezoneValue(fallback.timezone);
        if (!timezoneInfo) timezoneInfo = { offsetMinutes: fallback.offsetMinutes, normalized: fallback.timezone };
        const rawFormat = parsed.timeFormat;
        let timeFormat = fallback.timeFormat;
        if (rawFormat === '24' || rawFormat === 24) {
            timeFormat = '24';
        } else if (typeof rawFormat === 'string' && rawFormat.trim() === '24') {
            timeFormat = '24';
        }
        const normalized = {
            timezone: timezoneInfo.normalized,
            offsetMinutes: timezoneInfo.offsetMinutes,
            timeFormat
        };
        try {
            const normalizedJson = JSON.stringify(normalized);
            if (stored !== normalizedJson) {
                localStorage.setItem(settingsStorageKey, normalizedJson);
            }
        } catch (persistError) {
            console.warn('Unable to normalize stored settings.', persistError);
        }
        return normalized;
    } catch (error) {
        console.warn('Failed to load settings, using defaults.', error);
        return useFallback();
    }
}

function persistSettings(settings) {
    try {
        if (typeof localStorage === 'undefined') return;
        localStorage.setItem(settingsStorageKey, JSON.stringify(settings));
    } catch (error) {
        console.warn('Unable to persist settings.', error);
    }
}

function toTimezoneDate(date) {
    return new Date(date.getTime() + timezoneOffsetMs);
}

function fromTimezoneComponents(year, month, day, hour = 0, minute = 0, second = 0, millisecond = 0) {
    const utcMillis = Date.UTC(year, month, day, hour, minute, second, millisecond) - timezoneOffsetMs;
    return new Date(utcMillis);
}

function startOfTimezoneDay(date) {
    const tz = toTimezoneDate(date);
    const year = tz.getUTCFullYear();
    const month = tz.getUTCMonth();
    const day = tz.getUTCDate();
    return fromTimezoneComponents(year, month, day);
}

function formatDateKey(date) {
    const tz = toTimezoneDate(date);
    const year = tz.getUTCFullYear();
    const month = String(tz.getUTCMonth() + 1).padStart(2, '0');
    const day = String(tz.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function parseDateKey(key) {
    if (typeof key !== 'string') return null;
    const parts = key.split('-').map(Number);
    if (parts.length !== 3 || parts.some(num => Number.isNaN(num))) return null;
    const [year, month, day] = parts;
    return fromTimezoneComponents(year, month - 1, day);
}

function getTimezoneTimeParts(date) {
    const tz = toTimezoneDate(date);
    return {
        hours: tz.getUTCHours(),
        minutes: tz.getUTCMinutes(),
        seconds: tz.getUTCSeconds(),
        weekday: tz.getUTCDay(),
        year: tz.getUTCFullYear(),
        month: tz.getUTCMonth(),
        date: tz.getUTCDate()
    };
}

function format24HourTime(date, includeSeconds = false) {
    const { hours, minutes, seconds } = getTimezoneTimeParts(date);
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    if (includeSeconds) {
        const s = String(seconds).padStart(2, '0');
        return `${h}:${m}:${s}`;
    }
    return `${h}:${m}`;
}

function get12HourParts(date) {
    const { hours, minutes, seconds } = getTimezoneTimeParts(date);
    const period = hours >= 12 ? 'PM' : 'AM';
    let hour12 = hours % 12;
    if (hour12 === 0) hour12 = 12;
    const minuteStr = String(minutes).padStart(2, '0');
    const secondStr = String(seconds).padStart(2, '0');
    return {
        period,
        timeNoSeconds: `${hour12}:${minuteStr}`,
        timeWithSeconds: `${hour12}:${minuteStr}:${secondStr}`,
        hour: hour12,
        minute: minutes,
        second: seconds
    };
}

function formatClockDisplay(date) {
    if (activeTimeFormat === '24') {
        return format24HourTime(date, true);
    }
    const info = get12HourParts(date);
    return `${info.timeWithSeconds} ${info.period}`;
}

function formatScheduleTime(date) {
    if (activeTimeFormat === '24') {
        return format24HourTime(date);
    }
    const info = get12HourParts(date);
    return `${info.period} ${info.timeNoSeconds}`;
}

function formatScheduleRange(startDate, endDate, isSameTime = false) {
    if (activeTimeFormat === '24') {
        const startText = format24HourTime(startDate);
        const endText = format24HourTime(endDate);
        return isSameTime || startText === endText ? startText : `${startText} - ${endText}`;
    }
    const startInfo = get12HourParts(startDate);
    const endInfo = get12HourParts(endDate);
    const sameTime = isSameTime || (startInfo.period === endInfo.period && startInfo.timeNoSeconds === endInfo.timeNoSeconds);
    if (sameTime) return `${startInfo.period} ${startInfo.timeNoSeconds}`;
    if (startInfo.period === endInfo.period) {
        return `${startInfo.period} ${startInfo.timeNoSeconds} - ${endInfo.timeNoSeconds}`;
    }
    return `${startInfo.period} ${startInfo.timeNoSeconds} - ${endInfo.period} ${endInfo.timeNoSeconds}`;
}

function parseHM(hm, dayUtc) {
    const baseTime = (dayUtc instanceof Date ? dayUtc : startOfTimezoneDay(new Date())).getTime();
    if (!hm) return new Date(baseTime);
    const parts = hm.split(':');
    const hours = Number.parseInt(parts[0], 10);
    const minutes = parts.length > 1 ? Number.parseInt(parts[1], 10) : 0;
    const safeHours = Number.isFinite(hours) ? hours : 0;
    const safeMinutes = Number.isFinite(minutes) ? minutes : 0;
    return new Date(baseTime + safeHours * 3600000 + safeMinutes * 60000);
}

function normalize(arr, dayUtc) {
    const baseDay = dayUtc instanceof Date ? dayUtc : startOfTimezoneDay(new Date());
    return arr.map(item => {
        const start = parseHM(item.start, baseDay);
        const end = parseHM(item.end || item.start, baseDay);
        const sameTime = !item.end || item.end === item.start;
        return Object.assign({}, item, {
            _s: start,
            _e: end,
            _startLabel: formatScheduleTime(start),
            _endLabel: formatScheduleTime(end),
            _rangeLabel: formatScheduleRange(start, end, sameTime)
        });
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

function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim() !== '';
}

function themeAliases(key) {
    if (!key || typeof key !== 'string') return [];
    const trimmed = key.trim();
    if (!trimmed) return [];
    const aliases = new Set([trimmed]);
    const lower = trimmed.toLowerCase();
    if (lower !== trimmed) aliases.add(lower);
    const normalized = normalizeTypeClass(trimmed);
    if (normalized) aliases.add(normalized);
    const legacy = legacyTypeClass(trimmed);
    if (legacy) aliases.add(legacy);
    return Array.from(aliases);
}

function resetTypeStyles() {
    Object.keys(calendarTypeStyles).forEach(key => {
        if (key !== '__default') delete calendarTypeStyles[key];
    });
    calendarTypeStyles.__default = defaultTypeStyle;
}

function sanitizeTypeStyle(value) {
    if (!value) return null;
    let base = value;
    if (typeof value === 'object' && value.calendar && typeof value.calendar === 'object') {
        base = value.calendar;
    }
    const style = {};
    if (isNonEmptyString(base.background)) style.background = base.background;
    else if (isNonEmptyString(base.bg)) style.background = base.bg;
    if (isNonEmptyString(base.text)) style.text = base.text;
    else if (isNonEmptyString(base.color)) style.text = base.color;
    else if (isNonEmptyString(base.foreground)) style.text = base.foreground;
    if (isNonEmptyString(base.subtext)) style.subtext = base.subtext;
    else if (typeof value === 'object' && isNonEmptyString(value.subtext)) style.subtext = value.subtext;
    if (isNonEmptyString(base.border)) style.border = base.border;
    else if (isNonEmptyString(base.outline)) style.border = base.outline;
    else if (typeof value === 'object' && isNonEmptyString(value.border)) style.border = value.border;
    if (typeof value === 'object') {
        if (isNonEmptyString(value.optionAccent)) style.optionAccent = value.optionAccent;
        else if (isNonEmptyString(value.option)) style.optionAccent = value.option;
        else if (isNonEmptyString(value.accent)) style.optionAccent = value.accent;
        else if (isNonEmptyString(base.optionAccent)) style.optionAccent = base.optionAccent;
    }
    if (!style.subtext && style.text) style.subtext = style.text;
    if (!style.optionAccent) {
        if (style.text) style.optionAccent = style.text;
        else if (style.border) style.optionAccent = style.border;
    }
    return Object.keys(style).length ? style : null;
}

function registerTypeStyle(key, value) {
    if (!key) return;
    const style = sanitizeTypeStyle(value);
    if (!style) return;
    const frozen = Object.freeze(style);
    const aliases = themeAliases(key);
    aliases.forEach(alias => {
        if (alias) calendarTypeStyles[alias] = frozen;
    });
    if (aliases.includes('default') || key === 'default' || key === '*') {
        calendarTypeStyles.__default = frozen;
    }
}

function getTypeStyle(type) {
    const base = calendarTypeStyles.__default || defaultTypeStyle;
    if (!type) return base;
    const aliases = themeAliases(type);
    for (let i = 0; i < aliases.length; i++) {
        const alias = aliases[i];
        if (alias && calendarTypeStyles[alias]) return calendarTypeStyles[alias];
    }
    return base;
}

function applyCalendarTypeStyles(element, type) {
    if (!element) return;
    const base = calendarTypeStyles.__default || defaultTypeStyle;
    const style = getTypeStyle(type);
    const background = style.background || base.background;
    const text = style.text || base.text;
    const subtext = style.subtext || style.text || base.subtext || base.text;
    const border = style.border || base.border;
    if (background) element.style.setProperty('--calendar-date-bg', background);
    if (text) element.style.setProperty('--calendar-date-text', text);
    if (subtext) element.style.setProperty('--calendar-date-subtext', subtext);
    if (border) element.style.setProperty('--calendar-date-border', border);
}

function applyScheduleOptionTheme(element, type) {
    if (!element) return;
    const base = calendarTypeStyles.__default || defaultTypeStyle;
    const style = getTypeStyle(type);
    const accent = style.optionAccent || style.text || base.optionAccent || base.text || 'var(--accent)';
    element.style.setProperty('--schedule-option-accent', accent);
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
    calendarData = await fetchJson(calendarUrl);
}

async function loadScheduleOverrides() {
    try {
        scheduleOverridesData = await fetchJson(scheduleOverridesUrl);
        console.log('Schedule overrides loaded successfully');
    } catch (error) {
        console.warn('Schedule overrides not found or failed to load, continuing without overrides:', error);
        scheduleOverridesData = null;
    }
}

function applyScheduleOverrides(scheduleArr, dateStr, scheduleType) {
    if (!scheduleArr || !Array.isArray(scheduleArr)) return scheduleArr;
    if (!scheduleOverridesData || typeof scheduleOverridesData !== 'object') return scheduleArr;

    const override = scheduleOverridesData[dateStr];
    if (!override) return scheduleArr;

    // Check if this override applies to the current schedule type
    if (override.baseSchedule && override.baseSchedule !== scheduleType) {
        return scheduleArr;
    }

    // Apply overrides if they exist
    if (!Array.isArray(override.overrides) || override.overrides.length === 0) {
        return scheduleArr;
    }

    // Create a deep copy of the schedule array to avoid mutating the cached data
    const modifiedSchedule = scheduleArr.map(item => ({ ...item }));

    // Apply each override
    override.overrides.forEach(overrideItem => {
        const index = overrideItem.index;
        if (typeof index !== 'number' || index < 0 || index >= modifiedSchedule.length) {
            console.warn(`Invalid override index ${index} for date ${dateStr}`);
            return;
        }

        // Apply all fields from the override to the target item
        const targetItem = modifiedSchedule[index];
        Object.keys(overrideItem).forEach(key => {
            if (key !== 'index') {
                targetItem[key] = overrideItem[key];
            }
        });
    });

    // Filter out items marked as hidden
    const filteredSchedule = modifiedSchedule.filter(item => !item.hidden);

    return filteredSchedule;
}

const loadSchedule = createCachedJsonLoader({
    cache: scheduleCache,
    requests: scheduleRequests,
    errors: scheduleErrors,
    urlResolver: getScheduleUrl,
    missingMessage: scheduleErrorSubtitle,
    logLabel: 'schedule'
});

const loadSpecialSchedule = createCachedJsonLoader({
    cache: specialScheduleCache,
    requests: specialScheduleRequests,
    errors: specialScheduleErrors,
    urlResolver: getSpecialScheduleUrl,
    missingMessage: specialErrorSubtitle,
    logLabel: 'special schedule',
    defaultShouldUpdate: true,
    onSuccess: (key, data) => {
        if (specialToday && specialToday.scheduleKey === key) {
            specialToday.scheduleData = data;
        }
    }
});

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
    if (previewDateKey) {
        const dateStr = previewDateKey;
        const parsed = previewDate instanceof Date ? previewDate : parseDateKey(dateStr);
        const dateUtc = parsed instanceof Date ? parsed : startOfTimezoneDay(new Date());
        let type = null;
        let name = null;
        let scheduleArr = null;
        let scheduleKey = null;
        const day = calendarData && calendarData[dateStr];
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
                // Apply schedule overrides for preset schedules
                scheduleArr = applyScheduleOverrides(scheduleArr, dateStr, type);
            }
        }
        return { mode: 'preview', dateStr, dateUtc, type, name, scheduleArr, scheduleKey };
    }
    const now = new Date();
    const dateStr = formatDateKey(now);
    const dateUtc = parseDateKey(dateStr) || startOfTimezoneDay(now);
    if (currentScheduleType === 'special') {
        const scheduleKey = specialToday && specialToday.scheduleKey ? specialToday.scheduleKey : null;
        const scheduleArr = scheduleKey ? specialScheduleCache[scheduleKey] || (specialToday && specialToday.scheduleData) || null : null;
        return {
            mode: 'today',
            dateStr,
            dateUtc,
            type: 'special',
            name: specialToday ? specialToday.name : scheduleName('special'),
            scheduleArr,
            scheduleKey
        };
    }
    // Apply schedule overrides for today's preset schedule
    let todayScheduleArr = currentScheduleType ? scheduleCache[currentScheduleType] || null : null;
    todayScheduleArr = applyScheduleOverrides(todayScheduleArr, dateStr, currentScheduleType);

    return {
        mode: 'today',
        dateStr,
        dateUtc,
        type: currentScheduleType,
        name: currentScheduleType ? scheduleName(currentScheduleType) : null,
        scheduleArr: todayScheduleArr,
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
        time.textContent = entry._rangeLabel || '';
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
    if (!timeline || !rail || !railTrack) return;
    const applyHeight = () => {
        rail.style.removeProperty('min-height');
        railTrack.style.removeProperty('height');
        const isEmpty = (emptyMessage && !emptyMessage.classList.contains('hidden')) || timeline.childElementCount === 0;
        if (isEmpty) {
            const approx = Math.max(emptyMessage ? emptyMessage.offsetHeight : 200, 200);
            rail.style.minHeight = `${approx}px`;
            railTrack.style.height = `${approx}px`;
            return;
        }
        const timelineRect = timeline.getBoundingClientRect();
        const measured = Math.max(timeline.scrollHeight, timeline.offsetHeight, Math.round(timelineRect.height));
        const height = Math.max(measured, 0);
        rail.style.minHeight = `${height}px`;
        railTrack.style.height = `${height}px`;
    };
    if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(applyHeight);
    } else {
        setTimeout(applyHeight, 0);
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
    const renderDay = ctx.dateUtc instanceof Date ? ctx.dateUtc : startOfTimezoneDay(new Date());
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
        if (ctx.type) {
            // Has schedule type (special or regular) but no timetable - treat as special arrangement
            const displayName = ctx.name || scheduleName(ctx.type);
            if (emptyMessage) {
                const heading = ctx.mode === 'preview' ? `${scheduleTitlePreviewPrefix}${displayName}` : `${scheduleTitleSpecialTodayPrefix}${displayName}${scheduleTitleSpecialTodaySuffix}`;
                const subtitle = `${specialEmptyTitle}${specialEmptySubtitle ? '：' : ''}${specialEmptySubtitle}`;
                emptyMessage.innerHTML = `<h3>${heading}</h3><p>${subtitle}</p>`;
                emptyMessage.classList.remove('hidden');
            }
            if (timeNotice) timeNotice.textContent = ctx.mode === 'preview' ? specialNoticePreview : specialNoticeToday;
        } else {
            // No schedule type - rest day or no arrangement
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
    const data = normalize(raw, renderDay);
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
    const hasActiveCurrent = currentIndex >= 0 && !isInGap && !isBeforeStart && !isAfterEnd;
    timelineNodes.forEach((node, index) => {
        const active = index === currentIndex && !isInGap && !isBeforeStart && !isAfterEnd;
        const before = (!isBeforeStart && (index < currentIndex || (index === currentIndex && isInGap))) || isAfterEnd;
        const upcoming = index > currentIndex && !isAfterEnd;
        const isUpNext = upcoming && index === currentIndex + 1;
        if (node.span) {
            const value = active ? progress(now, node.entry._s, node.entry._e) * 100 + '%' : before ? '100%' : '0%';
            node.span.style.setProperty('--p', value);
        }
        node.item.classList.toggle('current', active);
        node.item.classList.toggle('past', before);
        node.item.classList.toggle('upnext', isUpNext);
        node.item.classList.toggle('upnext-standalone', isUpNext && !hasActiveCurrent);
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
    if (railProgress) {
        if (isAfterEnd) {
            railProgress.style.height = '100%';
        } else {
            railProgress.style.height = Math.max(targetPosition, 0) + 'px';
        }
    }
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

function getTomorrowPreview(ctx) {
    if (!ctx) return null;
    const baseDay = ctx.dateUtc instanceof Date ? ctx.dateUtc : startOfTimezoneDay(new Date());
    const parts = getTimezoneTimeParts(baseDay);
    const tomorrowUtc = fromTimezoneComponents(parts.year, parts.month, parts.date + 1);
    const tomorrowKey = formatDateKey(tomorrowUtc);
    const day = calendarData && calendarData[tomorrowKey];
    if (!day || !day.type || day.type === 'rest') {
        return { state: 'rest', dateUtc: tomorrowUtc, dateStr: tomorrowKey };
    }
    if (day.type === 'special') {
        const scheduleKey = typeof day.schedule === 'string' ? day.schedule : typeof day.scheduleKey === 'string' ? day.scheduleKey : null;
        const displayName = day.name || scheduleName('special');
        if (!scheduleKey) {
            return { state: 'rest', dateUtc: tomorrowUtc, dateStr: tomorrowKey, displayName };
        }
        const cached = specialScheduleCache[scheduleKey];
        if (Array.isArray(cached) && cached.length) {
            const normalized = normalize(cached, tomorrowUtc);
            if (normalized.length) {
                return {
                    state: 'ready',
                    dateUtc: tomorrowUtc,
                    dateStr: tomorrowKey,
                    firstItem: normalized[0],
                    displayName,
                    isSpecial: true
                };
            }
            return { state: 'rest', dateUtc: tomorrowUtc, dateStr: tomorrowKey, displayName };
        }
        if (specialScheduleErrors[scheduleKey]) {
            return { state: 'error', dateUtc: tomorrowUtc, dateStr: tomorrowKey, displayName };
        }
        loadSpecialSchedule(scheduleKey, true).catch(() => {});
        return { state: 'loading', dateUtc: tomorrowUtc, dateStr: tomorrowKey, displayName };
    }
    const scheduleType = day.type;
    const displayName = scheduleName(scheduleType);
    const cached = scheduleCache[scheduleType];
    if (Array.isArray(cached) && cached.length) {
        const normalized = normalize(cached, tomorrowUtc);
        if (normalized.length) {
            return {
                state: 'ready',
                dateUtc: tomorrowUtc,
                dateStr: tomorrowKey,
                firstItem: normalized[0],
                displayName,
                isSpecial: false
            };
        }
        return { state: 'rest', dateUtc: tomorrowUtc, dateStr: tomorrowKey, displayName };
    }
    if (scheduleErrors[scheduleType]) {
        return { state: 'error', dateUtc: tomorrowUtc, dateStr: tomorrowKey, displayName };
    }
    loadSchedule(scheduleType, true).catch(() => {});
    return { state: 'loading', dateUtc: tomorrowUtc, dateStr: tomorrowKey, displayName };
}

function renderTomorrowPreview(card, tomorrowInfo) {
    if (!card || !tomorrowInfo) return false;

    const statusEl = card.querySelector('.card-status');
    const typeEl = card.querySelector('.card-type');
    const titleEl = card.querySelector('.card-title');
    const timeRange = card.querySelector('.card-time-range');
    const countdownLabelEl = card.querySelector('.countdown-label');
    const countdownValue = card.querySelector('.countdown-value');
    const progressBar = card.querySelector('.card-progress-bar');

    if (tomorrowInfo.state === 'ready' && tomorrowInfo.firstItem) {
        const schedulePrefix = tomorrowInfo.displayName ? `${tomorrowInfo.displayName} · ` : '';
        if (statusEl) statusEl.textContent = statusTomorrowText;
        if (typeEl) typeEl.textContent = kindLabel(tomorrowInfo.firstItem.kind);
        if (titleEl) titleEl.textContent = `${cardTomorrowPrefix}${schedulePrefix}${tomorrowInfo.firstItem.name || ''}`;
        if (timeRange) timeRange.textContent = tomorrowInfo.firstItem._rangeLabel || '';
        if (countdownLabelEl) countdownLabelEl.textContent = cardTomorrowStartLabel;
        if (countdownValue) countdownValue.textContent = tomorrowInfo.firstItem._startLabel || countdownPlaceholder;
        if (progressBar) progressBar.style.setProperty('--progress', '0%');
        card.classList.remove('active');
        card.classList.add('upcoming');
        card.classList.remove('hidden');
        return true;
    }

    if (tomorrowInfo.state === 'loading') {
        if (statusEl) statusEl.textContent = statusTomorrowText;
        if (typeEl) typeEl.textContent = tomorrowInfo.displayName || cardLoadingTypeText;
        if (titleEl) titleEl.textContent = cardLoadingTitleText;
        if (timeRange) timeRange.textContent = '';
        if (countdownLabelEl) countdownLabelEl.textContent = cardLoadingCountdownLabelText;
        if (countdownValue) countdownValue.textContent = countdownPlaceholder;
        if (progressBar) progressBar.style.setProperty('--progress', '0%');
        card.classList.remove('active');
        card.classList.add('upcoming');
        card.classList.remove('hidden');
        return true;
    }

    if (tomorrowInfo.state === 'error') {
        if (statusEl) statusEl.textContent = statusTomorrowText;
        if (typeEl) typeEl.textContent = tomorrowInfo.displayName || cardErrorTypeText;
        if (titleEl) titleEl.textContent = scheduleErrorTitle;
        if (timeRange) timeRange.textContent = scheduleErrorSubtitle;
        if (countdownLabelEl) countdownLabelEl.textContent = '';
        if (countdownValue) countdownValue.textContent = countdownPlaceholder;
        if (progressBar) progressBar.style.setProperty('--progress', '0%');
        card.classList.remove('active');
        card.classList.add('upcoming');
        card.classList.remove('hidden');
        return true;
    }

    if (tomorrowInfo.state === 'rest') {
        if (statusEl) statusEl.textContent = statusTomorrowRestText;
        if (typeEl) typeEl.textContent = cardTomorrowRestTypeText;
        if (titleEl) titleEl.textContent = cardTomorrowRestTitle;
        if (timeRange) timeRange.textContent = cardTomorrowRestSubtitle;
        if (countdownLabelEl) countdownLabelEl.textContent = cardTomorrowRestLabel;
        if (countdownValue) countdownValue.textContent = cardTomorrowRestHighlight;
        if (progressBar) progressBar.style.setProperty('--progress', '0%');
        card.classList.remove('active');
        card.classList.add('rest-day');
        card.classList.remove('hidden');
        return true;
    }

    return false;
}

function updateCurrentCard(data, currentIndex, isInGap, isBeforeStart, isAfterEnd, ctx) {
    const card = document.getElementById('currentCard');
    if (!card) return;
    const skeleton = card.querySelector('.card-skeleton');
    if (skeleton) skeleton.classList.add('hidden');
    const count = data.length;
    if (!count) {
        // Handle empty schedule: check if we should show tomorrow preview
        if (ctx.mode === 'today') {
            const now = new Date();
            const { hours } = getTimezoneTimeParts(now);
            let shouldShowTomorrow = false;

            // Case 1: Rest day or no schedule type - show tomorrow preview after 17:00 (5 PM)
            if (ctx.type === null || ctx.type === 'rest') {
                shouldShowTomorrow = hours >= 17;
            }
            // Case 2: Has schedule type (special or regular) but no timetable - show tomorrow preview after 21:00 (9 PM)
            else if (ctx.type) {
                shouldShowTomorrow = hours >= 21;
            }

            if (shouldShowTomorrow) {
                const tomorrowInfo = getTomorrowPreview(ctx);
                if (tomorrowInfo && renderTomorrowPreview(card, tomorrowInfo)) {
                    return;
                }
            }
        }
        card.classList.add('hidden');
        return;
    }
    const statusEl = card.querySelector('.card-status');
    const typeEl = card.querySelector('.card-type');
    const titleEl = card.querySelector('.card-title');
    const timeRange = card.querySelector('.card-time-range');
    const countdownLabelEl = card.querySelector('.countdown-label');
    const countdownValue = card.querySelector('.countdown-value');
    const progressBar = card.querySelector('.card-progress-bar');
    card.classList.remove('upcoming');
    card.classList.remove('rest-day');
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
        if (ctx.mode === 'today') {
            const tomorrowInfo = getTomorrowPreview(ctx);
            if (tomorrowInfo && renderTomorrowPreview(card, tomorrowInfo)) {
                return;
            }
        }
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
    if (currentItem) {
        if (statusEl) statusEl.textContent = statusText;
        if (typeEl) typeEl.textContent = kindLabel(currentItem.kind);
        if (titleEl) titleEl.textContent = (isSpecialDay ? cardSpecialPrefix : '') + (currentItem.name || '');
        if (timeRange) timeRange.textContent = currentItem._rangeLabel || '';
        if (progressBar) progressBar.style.setProperty('--progress', (progress(now, currentItem._s, currentItem._e) * 100) + '%');
        card.classList.add('active');
    } else if (nextItem) {
        if (statusEl) statusEl.textContent = statusText;
        if (typeEl) typeEl.textContent = kindLabel(nextItem.kind);
        if (titleEl) titleEl.textContent = cardNextPrefix + (nextItem.name || '');
        if (timeRange) timeRange.textContent = nextItem._rangeLabel || '';
        if (progressBar) progressBar.style.setProperty('--progress', '0%');
        card.classList.remove('active');
    }
    if (countdownLabelEl) countdownLabelEl.textContent = countdownLabel;
    if (countdownValue) countdownValue.textContent = countdownTarget ? formatCountdown(countdownTarget - now) : countdownPlaceholder;
    card.classList.remove('hidden');
}

function getGreetingMessage(now = new Date()) {
    const { hours } = getTimezoneTimeParts(now);
    for (let i = 0; i < greetingsConfig.length; i++) {
        const item = greetingsConfig[i];
        if (typeof item.start !== 'number' || typeof item.end !== 'number') continue;
        if (item.start <= item.end) {
            if (hours >= item.start && hours < item.end) return item.text || '';
        } else {
            if (hours >= item.start || hours < item.end) return item.text || '';
        }
    }
    return greetingsConfig.length > 0 ? greetingsConfig[0].text || '' : '';
}

function updateClock() {
    const now = new Date();
    const clock = document.getElementById('clock');
    const greeting = document.getElementById('greeting');
    if (clock) clock.textContent = formatClockDisplay(now);
    if (greeting) greeting.textContent = getGreetingMessage(now);
}

function updateScheduleTitle() {
    const title = document.getElementById('scheduleTitle');
    if (!title) return;
    if (previewDateKey) {
        const ds = previewDateKey;
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
    previewDateKey = null;
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
        option.className = 'schedule-option';
        if (type) option.dataset.type = type;
        option.textContent = scheduleName(type);
        applyScheduleOptionTheme(option, type);
        option.onclick = () => {
            manualScheduleOverride = type;
            localStorage.setItem(scheduleOverrideKey, type);
            localStorage.setItem(scheduleOverrideDateKey, formatDateKey(new Date()));
            currentScheduleType = type;
            specialToday = null;
            previewDate = null;
            previewDateKey = null;
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

function initializeSettingsUI() {
    if (settingsUIInitialized) return;
    const button = document.getElementById('settingsButton');
    const modal = document.getElementById('settingsModal');
    const saveBtn = document.getElementById('settingsSaveBtn');
    const cancelBtn = document.getElementById('settingsCancelBtn');
    const form = document.getElementById('settingsForm');
    const timezoneInput = document.getElementById('timezoneInput');
    const formatButtons = Array.from(document.querySelectorAll('.format-option'));
    if (!button || !modal || !saveBtn || !cancelBtn || !form || !timezoneInput || formatButtons.length === 0) return;
    settingsUIInitialized = true;
    button.addEventListener('click', openSettingsModal);
    cancelBtn.addEventListener('click', () => closeSettingsModal(true));
    saveBtn.addEventListener('click', event => {
        event.preventDefault();
        handleSettingsSave();
    });
    modal.addEventListener('click', event => {
        if (event.target === modal) closeSettingsModal(true);
    });
    form.addEventListener('submit', event => {
        event.preventDefault();
        handleSettingsSave();
    });
    formatButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveFormatButton(btn.dataset.format);
        });
    });
    timezoneInput.addEventListener('input', () => {
        const errorEl = document.getElementById('timezoneError');
        if (errorEl) errorEl.textContent = '';
    });
    pendingTimeFormat = activeTimeFormat;
    setActiveFormatButton(activeTimeFormat);
    timezoneInput.value = userSettings.timezone || '';
    timezoneInput.removeAttribute('aria-invalid');
}

function openSettingsModal() {
    if (isSettingsModalOpen) return;
    const modal = document.getElementById('settingsModal');
    const timezoneInput = document.getElementById('timezoneInput');
    const errorEl = document.getElementById('timezoneError');
    if (!modal || !timezoneInput) return;
    isSettingsModalOpen = true;
    pendingTimeFormat = activeTimeFormat;
    setActiveFormatButton(pendingTimeFormat);
    timezoneInput.value = userSettings.timezone || '';
    timezoneInput.removeAttribute('aria-invalid');
    if (errorEl) errorEl.textContent = '';
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => timezoneInput.focus(), 50);
    document.addEventListener('keydown', handleSettingsKeydown);
}

function closeSettingsModal(reset = true) {
    const modal = document.getElementById('settingsModal');
    if (!modal) return;
    if (!modal.classList.contains('show')) return;
    isSettingsModalOpen = false;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', handleSettingsKeydown);
    if (reset) {
        const timezoneInput = document.getElementById('timezoneInput');
        const errorEl = document.getElementById('timezoneError');
        if (timezoneInput) timezoneInput.value = userSettings.timezone || '';
        if (timezoneInput) timezoneInput.removeAttribute('aria-invalid');
        if (errorEl) errorEl.textContent = '';
        setActiveFormatButton(activeTimeFormat);
    }
    const opener = document.getElementById('settingsButton');
    if (opener) opener.focus();
}

function handleSettingsKeydown(event) {
    if (event.key === 'Escape') {
        event.preventDefault();
        closeSettingsModal(true);
    }
}

function setActiveFormatButton(format) {
    pendingTimeFormat = format === '24' ? '24' : '12';
    const buttons = document.querySelectorAll('.format-option');
    buttons.forEach(button => {
        const isActive = button.dataset.format === pendingTimeFormat;
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        button.classList.toggle('active', isActive);
    });
}

function handleSettingsSave() {
    const timezoneInput = document.getElementById('timezoneInput');
    const errorEl = document.getElementById('timezoneError');
    if (!timezoneInput) return;
    const previousOffset = timezoneOffsetMinutes;
    const previousFormat = activeTimeFormat;
    const previousLabel = userSettings.timezone;
    const inputValue = timezoneInput.value.trim();
    const parsed = parseTimezoneValue(inputValue);
    if (!parsed) {
        if (errorEl) errorEl.textContent = '请输入有效的时区（例如 UTC+8、UTC-2、GMT+9）';
        timezoneInput.focus();
        timezoneInput.setAttribute('aria-invalid', 'true');
        return;
    }
    timezoneInput.removeAttribute('aria-invalid');
    const nextFormat = pendingTimeFormat === '24' ? '24' : '12';
    const offsetChanged = parsed.offsetMinutes !== previousOffset;
    const formatChanged = nextFormat !== previousFormat;
    const labelChanged = parsed.normalized !== previousLabel;
    if (!offsetChanged && !formatChanged && !labelChanged) {
        closeSettingsModal(true);
        return;
    }
    userSettings = {
        timezone: parsed.normalized,
        offsetMinutes: parsed.offsetMinutes,
        timeFormat: nextFormat
    };
    timezoneOffsetMinutes = parsed.offsetMinutes;
    timezoneOffsetMs = timezoneOffsetMinutes * 60000;
    activeTimeFormat = nextFormat;
    pendingTimeFormat = nextFormat;
    persistSettings(userSettings);
    if (errorEl) errorEl.textContent = '';
    closeSettingsModal(false);
    applySettingsChanges();
}

function applySettingsChanges() {
    if (previewDateKey) {
        previewDate = parseDateKey(previewDateKey) || startOfTimezoneDay(new Date());
    }
    pendingTimeFormat = activeTimeFormat;
    setActiveFormatButton(activeTimeFormat);
    if (!isSettingsModalOpen) {
        const timezoneInput = document.getElementById('timezoneInput');
        if (timezoneInput) timezoneInput.value = userSettings.timezone || '';
        const errorEl = document.getElementById('timezoneError');
        if (errorEl) errorEl.textContent = '';
    }
    determineCurrentSchedule();
    hasInitialScroll = false;
    timelineNodes = [];
    updateScheduleTitle();
    buildCalendar();
    updateSwitchButton();
    updateClock();
    updateTimeline();
}

function handleSwitchButtonClick() {
    if (previewDateKey) {
        exitPreview();
    } else {
        showSwitchModal();
    }
}

function exitPreview() {
    previewDate = null;
    previewDateKey = null;
    hasInitialScroll = false;
    timelineNodes = [];
    updateScheduleTitle();
    updateSwitchButton();
    updateTimeline();
}

function updateCalendarPreviewHighlight() {
    const strip = document.getElementById('calendarStrip');
    if (!strip) return;
    const highlighted = strip.querySelectorAll('.calendar-date.preview');
    highlighted.forEach(el => el.classList.remove('preview'));
    if (!previewDateKey) return;
    const ds = previewDateKey;
    const target = strip.querySelector(`.calendar-date[data-date="${ds}"]`);
    if (!target || target.classList.contains('today')) return;
    target.classList.add('preview');
}

function updateSwitchButton() {
    const btn = document.getElementById('switchScheduleBtn');
    if (!btn) return;
    const btnText = btn.querySelector('.switch-btn-text');
    if (!btnText) return;
    if (previewDateKey) {
        btn.classList.add('exit-preview');
        btnText.textContent = switchButtonPreviewText;
    } else {
        btn.classList.remove('exit-preview');
        btnText.textContent = switchButtonDefaultText;
    }
    updateCalendarPreviewHighlight();
}

function buildCalendar() {
    const container = document.getElementById('calendarGrid');
    if (!container) return;
    container.innerHTML = `<div class="calendar-scroll-wrapper"><div class="calendar-strip" id="calendarStrip"></div></div>`;
    const strip = document.getElementById('calendarStrip');
    if (!strip) return;
    const calendarTitleEl = document.querySelector('.calendar-title');
    if (calendarTitleEl) calendarTitleEl.textContent = calendarTitleText;
    const todayUtc = startOfTimezoneDay(new Date());
    for (let i = -daysBefore; i <= daysAfter; i++) {
        const dateUtc = new Date(todayUtc.getTime() + i * 86400000);
        const dateStr = formatDateKey(dateUtc);
        const dayData = calendarData ? calendarData[dateStr] : null;
        const parts = getTimezoneTimeParts(dateUtc);
        const weekdayIndex = Number.isInteger(parts.weekday) ? parts.weekday % weekdayNames.length : 0;
        const weekday = weekdayNames[weekdayIndex] || '';
        const dateEl = document.createElement('div');
        dateEl.className = 'calendar-date';
        dateEl.dataset.date = dateStr;
        const weekdayEl = document.createElement('div');
        weekdayEl.className = 'date-weekday';
        weekdayEl.textContent = i === 0 ? calendarTodayLabel : weekday;
        const numberEl = document.createElement('div');
        numberEl.className = 'date-number';
        numberEl.textContent = parts.date;
        dateEl.appendChild(weekdayEl);
        dateEl.appendChild(numberEl);
        let typeKey = dayData && dayData.type ? dayData.type : null;
        if (typeKey) {
            dateEl.dataset.type = typeKey;
            if (typeKey === 'rest') {
                dateEl.classList.add('rest');
                const typeEl = document.createElement('div');
                typeEl.className = 'date-type';
                typeEl.textContent = calendarRestLabel;
                dateEl.appendChild(typeEl);
            } else {
                const typeEl = document.createElement('div');
                typeEl.className = 'date-type';
                if (typeKey === 'special') {
                    typeEl.textContent = dayData.name || calendarTypeLabels.special || scheduleName('special');
                } else {
                    typeEl.textContent = calendarTypeLabels[typeKey] || scheduleName(typeKey);
                }
                dateEl.appendChild(typeEl);
            }
        }
        applyCalendarTypeStyles(dateEl, typeKey);
        if (i === 0) dateEl.classList.add('today');
        if (dateUtc.getTime() < todayUtc.getTime()) dateEl.classList.add('past');
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
            previewDateKey = null;
            hasInitialScroll = false;
            timelineNodes = [];
            updateScheduleTitle();
            updateSwitchButton();
            updateTimeline();
            return;
        }
        previewDateKey = ds;
        previewDate = parseDateKey(ds) || startOfTimezoneDay(new Date());
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
    updateCalendarPreviewHighlight();
}

async function loadData() {
    try {
        toggleLoading(true);
        await loadCalendar();
        await loadScheduleOverrides();
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
    initializeSettingsUI();
    const switchBtn = document.getElementById('switchScheduleBtn');
    if (switchBtn) switchBtn.addEventListener('click', handleSwitchButtonClick);
    const githubLink = document.querySelector('.github-fab');
    if (githubLink && siteConfig.github) githubLink.href = siteConfig.github;
    if (!raf) raf = requestAnimationFrame(tick);
}

function tick() {
    const now = new Date();
    const s = toTimezoneDate(now).getUTCSeconds();
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
loadTheme().finally(() => {
    loadData();
});
