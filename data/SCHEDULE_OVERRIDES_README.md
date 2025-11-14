# 日程覆盖功能说明

## 概述

日程覆盖功能允许您对预设日程进行单天的临时修改，而无需修改原始的日程配置文件。这对于处理临时的课程变更非常有用。

## 使用方法

### 1. 配置文件位置

覆盖配置文件位于：`data/schedule-overrides.json`

### 2. 配置文件结构

```json
{
  "YYYY-MM-DD": {
    "baseSchedule": "日程类型",
    "comment": "可选的说明注释",
    "overrides": [
      {
        "index": 项目索引,
        "name": "新名称",
        "start": "新开始时间",
        "end": "新结束时间"
      }
    ]
  }
}
```

### 3. 字段说明

- **日期键** (`YYYY-MM-DD`): 要覆盖的日期，格式为 `2025-11-17`
- **baseSchedule**: 基于哪个预设日程（entry, advanced, deep-learning等）
  - 系统会验证该日期的日程类型是否匹配
  - 如果不匹配，覆盖将不会生效
- **comment**: 可选的注释说明，方便维护
- **overrides**: 覆盖项数组，每个项包含：
  - **index**: 要修改的日程项索引（从0开始计数）
  - 其他字段: 要覆盖的字段值（name, start, end, kind, period等）

### 4. 如何确定索引

查看对应的预设日程文件（如 `data/schedule/deep-learning.json`），数组中的第一项索引为0，第二项为1，以此类推。

例如 `deep-learning.json`:
```json
[
  { "name": "早读", ... },           // index: 0
  { "name": "第一节课", ... },       // index: 1
  { "name": "第二节课", ... },       // index: 2
  ...
  { "name": "演讲", ... },           // index: 6
  ...
]
```

### 5. 实际示例

将11月17日的deep-learning课程中的"演讲"改为"点名"，并调整时间：

```json
{
  "2025-11-17": {
    "baseSchedule": "deep-learning",
    "comment": "将下午的演讲改为点名，时间从14:10-14:25改为14:25-14:30",
    "overrides": [
      {
        "index": 6,
        "name": "点名",
        "start": "14:25",
        "end": "14:30"
      }
    ]
  }
}
```

### 6. 高级用法

#### 覆盖多个项目

```json
{
  "2025-11-20": {
    "baseSchedule": "deep-learning",
    "comment": "修改多个时间段",
    "overrides": [
      {
        "index": 6,
        "name": "点名",
        "start": "14:25",
        "end": "14:30"
      },
      {
        "index": 7,
        "start": "14:35",
        "end": "15:25"
      }
    ]
  }
}
```

#### 只修改部分字段

您可以只覆盖需要修改的字段，其他字段保持不变：

```json
{
  "2025-11-21": {
    "baseSchedule": "deep-learning",
    "comment": "只修改名称",
    "overrides": [
      {
        "index": 6,
        "name": "临时点名"
      }
    ]
  }
}
```

## 注意事项

1. **不影响原文件**: 覆盖配置不会修改原始的日程配置文件
2. **缓存友好**: 覆盖在渲染时应用，不会污染日程缓存
3. **类型匹配**: 覆盖只对匹配的 `baseSchedule` 类型生效
4. **索引验证**: 系统会验证索引是否有效，无效的索引会被忽略并在控制台显示警告
5. **特殊日程**: 覆盖功能仅适用于预设日程，不适用于特殊日程
6. **可选文件**: 如果覆盖文件不存在或加载失败，系统会继续正常运行，不会影响其他功能

## 调试

在浏览器控制台中查看日志：
- 成功加载: `Schedule overrides loaded successfully`
- 加载失败: `Schedule overrides not found or failed to load, continuing without overrides`
- 索引错误: `Invalid override index X for date YYYY-MM-DD`

## 维护建议

1. 定期清理过期的覆盖配置
2. 使用 `comment` 字段记录修改原因
3. 验证 `baseSchedule` 与日历配置匹配
4. 在修改前先查看原始日程文件确认索引
