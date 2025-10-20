window.SCHEDULE_CONFIG = {
    site: {
        title: '黑马AI大模型开发 - 课程时间表',
        github: 'https://github.com/KARPED1EM/ITHM-Schedule'
    },
    paths: {
        calendar: 'data/calendar.json',
        scheduleDir: 'data/schedule',
        scheduleExtension: '.json',
        specialScheduleDir: 'data/special-schedule',
        specialScheduleExtension: '.json',
        theme: 'data/theme.json'
    },
    defaults: {
        scheduleName: '课程',
        scheduleEmoji: '📅',
        kindLabel: '安排',
        countdownPlaceholder: '--:--:--'
    },
    scheduleTypes: {
        default: { name: '今日课程', emoji: '📅' },
        entry: { name: '入门课', emoji: '📅' },
        advanced: { name: '进阶课', emoji: '🚀' },
        'data-stats': { name: '数据与统计', emoji: '📊' },
        'self-study': { name: '自习日', emoji: '📚' },
        special: { name: '特殊安排', emoji: '⭐' }
    },
    kinds: {
        class: '课程',
        self: '晚自习',
        duty: '整理',
        leave: '离校',
        activity: '活动'
    },
    periods: {
        morning: '<span class="emoji">🌅</span> 上午',
        afternoon: '<span class="emoji">☀️</span> 下午',
        evening: '<span class="emoji">🌙</span> 晚上'
    },
    greetings: [
        { start: 5, end: 9, text: '🌤️ 早上好' },
        { start: 9, end: 12, text: '🌞 上午好' },
        { start: 12, end: 14, text: '☀️ 午安' },
        { start: 14, end: 18, text: '🌆 下午好' },
        { start: 18, end: 22, text: '🌃 晚上好' },
        { start: 22, end: 24, text: '🌙 晚安' },
        { start: 0, end: 5, text: '🌙 晚安' }
    ],
    calendar: {
        title: '本月日程',
        daysBefore: 15,
        daysAfter: 15,
        labels: { today: '今日', rest: '休息' },
        typeLabels: { entry: '入门', advanced: '进阶', 'data-stats': '数据', 'self-study': '自习', special: '特殊' }
    },
    timeline: {
        gapLabel: '休息'
    },
    timelineMessages: {
        scheduleLoadingTitle: '正在加载课表',
        scheduleLoadingSubtitle: '请稍候...',
        scheduleErrorTitle: '课表加载失败',
        scheduleErrorSubtitle: '请检查数据文件。',
        emptyTodayTitle: '今日无安排',
        emptyTodaySubtitle: '好好休息。',
        emptyPreviewTitle: '该日无安排',
        emptyPreviewSubtitle: '好好休息。',
        specialEmptyTitle: '无详细时间表',
        specialEmptySubtitle: '请以实际通知为准。',
        specialLoadingTitle: '正在加载特殊日程',
        specialLoadingSubtitle: '请稍候...',
        specialErrorTitle: '特殊日程加载失败',
        specialErrorSubtitle: '请以通知为准。'
    },
    statuses: {
        beforeStart: '准备中',
        inProgress: '进行中',
        break: '休息中',
        special: '特殊安排',
        completedToday: '今日课程已结束',
        completedPreview: '该日课程已结束',
        completedTypeToday: '今日完成',
        completedTypePreview: '该日完成',
        completedSpecialType: '今天是',
        completedSpecialTitle: '请以实际通知为准',
        tomorrow: '明日预告',
        tomorrowRest: '明日无安排'
    },
    countdowns: {
        until: '距离开始',
        remaining: '剩余时间',
        placeholder: '--:--:--'
    },
    card: {
        loadingStatus: '加载中',
        loadingType: '课程',
        loadingTitle: '请稍候...',
        loadingCountdownLabel: '预计开始于',
        nextPrefix: '下一节：',
        specialPrefix: '今天是：',
        tomorrowPrefix: '明日第一节：',
        tomorrowStartLabel: '开始时间',
        tomorrowRestTitle: '明天无安排',
        tomorrowRestSubtitle: '好好犒劳自己一天！',
        tomorrowRestHighlight: '🎉🎉🎉',
        tomorrowRestType: '休息日',
        tomorrowRestLabel: '庆祝时间'
    },
    texts: {
        scheduleTitleLoading: '加载中...',
        scheduleTitleNoPlanEmoji: '🏖️',
        scheduleTitlePreviewEmoji: '👀',
        scheduleTitlePreviewPrefix: '（预览）',
        scheduleTitleSpecialTodayPrefix: '今天是「',
        scheduleTitleSpecialTodaySuffix: '」',
        scheduleTitlePreviewSpecialPrefix: '（预览）「',
        scheduleTitlePreviewSpecialSuffix: '」',
        scheduleTitleNoPlanText: '今日无安排',
        scheduleTitlePreviewNoPlanText: '（预览）无安排',
        timelineLoading: '正在加载课表...',
        calendarLoading: '正在加载日历...'
    },
    notices: {
        scheduleLoading: '正在加载课表，请稍候...',
        scheduleError: '课表加载失败，请检查数据文件。',
        restToday: '今日无安排，好好休息。',
        restPreview: '该日无安排，好好休息。',
        specialToday: '今天是特殊安排，请以实际通知为准。',
        specialPreview: '该日为特殊安排，请以实际通知为准。',
        specialLoadingToday: '正在加载今日特殊日程，请稍候...',
        specialLoadingPreviewPrefix: '正在加载「',
        specialLoadingPreviewSuffix: '」的日程，请稍候...',
        specialErrorToday: '特殊日程加载失败，请以通知为准。',
        specialErrorPreviewPrefix: '无法加载「',
        specialErrorPreviewSuffix: '」的日程，请以通知为准。'
    },
    modal: {
        title: '纠正今日课表（仅覆盖今日）',
        restore: '恢复默认',
        cancel: '取消',
        specialNoticePrefix: '提示：今天是「',
        specialNoticeSuffix: '」，默认采用特殊日程。你也可以临时选择其他课表（仅今天生效）。'
    },
    errors: {
        network: '网络错误或数据文件不存在',
        loadTitle: '数据加载失败',
        loadMessage: '请稍后重试。',
        cardStatus: '错误',
        cardType: '系统',
        cardTitle: '无法加载数据',
        cardSubtitle: '请检查网络或稍后重试',
        calendarTitle: '日历加载失败',
        calendarMessage: '请稍后重试'
    },
    switcher: {
        buttonDefault: '切换课表',
        buttonPreview: '退出预览',
        types: ['entry', 'advanced', 'data-stats', 'self-study']
    }
};
