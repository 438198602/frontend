### VS code 插件

```
Auto Close Tag  // 自动关闭标签
Auto Rename Tag  // 自动重命名配对的HTML / XML标记
Path Intellisense  // 路径提示
React Native Tools
```

### VS code设置(1.19.2)

```
// 将设置放入此文件中以覆盖默认设置
{
    // 窗口失去焦点自动保存
    "files.autoSave": "onWindowChange",
    "editor.tabSize": 2,
    // 自动换行
    "editor.wordWrap": "on",
    // 启用后，保存文件时在文件末尾插入一个最终新行。
    "files.insertFinalNewline": true,
    // 启用后，保存文件时将删除在最终新行后的所有新行。
    "files.trimFinalNewlines": true,
    // 启用后，将在保存文件时剪裁尾随空格。
    "files.trimTrailingWhitespace": true,
    "extensions.ignoreRecommendations": true,
    "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\cmd.exe",
    "workbench.startupEditor": "newUntitledFile",
    // px和rem互转
    "px-to-rem.px-per-rem": 37.5
}
```
