### VS code 插件

```
Auto Close Tag  // 自动关闭标签
Auto Rename Tag  // 自动重命名配对的HTML / XML标记
Path Intellisense  // 路径提示
cssrem  // px转rem
file-size  // 文件大小
Git History
React Native Tools
Settings Sync  // 代码同步
EditorConfig for VS Code  // 读取.editorconfig文件配置
Chinese (Simplified) Language Pack for Visual Studio Code  // 适用于 VS Code 的中文（简体）语言包
```

### VS code设置(1.21.0)

```
// 将设置放入此文件中以覆盖默认设置
{
    // 窗口失去焦点自动保存
    "files.autoSave": "onWindowChange",
    // 自动换行
    "editor.wordWrap": "on",
    // 控制是否显示工作台底部状态栏中的 Twitter 反馈 (笑脸图标)。
    "workbench.statusBar.feedback.visible": false,
    // 控制在已有窗口时新打开窗口的尺寸继承上一活动窗口的尺寸
    "window.newWindowDimensions": "inherit",
    // 启用后，保存文件时在文件末尾插入一个最终新行。
    "files.insertFinalNewline": true,
    // 启用后，保存文件时将删除在最终新行后的所有新行。
    "files.trimFinalNewlines": true,
    // 启用后，将在保存文件时剪裁尾随空格。
    "files.trimTrailingWhitespace": true,
    // 启用后，将在离开“扩展”视图时，自动关闭扩展详细信息页面。
    "extensions.closeExtensionDetailsOnViewChange": true,
    // 启用后，将不会显示扩展建议的通知。
    "extensions.ignoreRecommendations": true,
    // 启用后，除非用户特别进行请求，将不会获取或显示推荐。某些推荐将从联机服务中获取。
    "extensions.showRecommendationsOnlyOnDemand": true,
    // 保存时设置文件的格式。格式化程序必须可用，不能自动保存文件，并且不能关闭编辑器。
    "editor.formatOnSave": true,
    // 控制编辑器在键入一行后是否自动格式化该行。
    "editor.formatOnType": true,
    // 代码同步配置
    "sync.gist": "",
    "sync.quietSync": true,
    "sync.removeExtensions": true,
    "sync.syncExtensions": true,
    "sync.autoDownload": false,
    "sync.autoUpload": false,
    "sync.forceDownload": false,
}
```
