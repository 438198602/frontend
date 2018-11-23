### 一、Mac更改launchpad（启动台）图标大小

1、设置每列显示的图标数目为8 

```
defaults write com.apple.dock springboard-columns -int 8
```

2、设置每行显示的图标数目为7 

```
defaults write com.apple.dock springboard-rows -int 7
```

3、重新启动launchpad 

```
killall Dock
```

### 二、显示隐藏文件

1、显示隐藏文件：

```
defaults write com.apple.Finder AppleShowAllFiles YES;KillAll Finder
```

2、不显示隐藏文件：

```
defaults write com.apple.Finder AppleShowAllFiles NO;KillAll Finder
```

### 三、Mac显示任何来源

```
sudo spctl --master-disable
```

