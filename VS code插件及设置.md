### VS code 插件

```
Auto Close Tag  // 自动关闭标签
Auto Rename Tag  // 自动重命名配对的HTML / XML标记
Path Intellisense  // 路径提示
cssrem  // px转rem
React Native Tools
```

### VS code设置(1.21.0)

```
// 将设置放入此文件中以覆盖默认设置
{
    // 窗口失去焦点自动保存
    "files.autoSave": "onWindowChange",
    // 空格数
    "editor.tabSize": 2,
    // 自动换行
    "editor.wordWrap": "on",
    // 控制在已有窗口时新打开窗口的尺寸继承上一活动窗口的尺寸
    "window.newWindowDimensions": "inherit",
    // 启用后，保存文件时在文件末尾插入一个最终新行。
    "files.insertFinalNewline": true,
    // 启用后，保存文件时将删除在最终新行后的所有新行。
    "files.trimFinalNewlines": true,
    // 启用后，将在保存文件时剪裁尾随空格。
    "files.trimTrailingWhitespace": true,
    // 如果设置为 "true"，将不再显示扩展建议的通知。
    "extensions.ignoreRecommendations": true,
    // root font-size (unit: px), default: 16
    "cssrem.rootFontSize": 16,
}
```
