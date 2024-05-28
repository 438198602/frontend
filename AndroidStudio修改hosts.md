### AndroidStudio修改hosts

> 来源 https://blog.csdn.net/qq_24125575/article/details/116657523

一、启动模拟器

1、进入到模拟器目录

Android
`cd C:\Users\ycl\AppData\Local\Android\Sdk\emulator`

Mac
`cd /Users/mars/Library/Android/sdk/emulator`

2、查看已安装模拟器列表

`./emulator -list-avds`

3、启动模拟器，并修改只读权限（Pixel_XL_API_28 为需要启动的模拟器名称，API_29 `adb remount`有问题）

`./emulator -avd Pixel_XL_API_28 -writable-system`

> 启动成功，不要关闭此窗口，此控制台窗口一关闭模拟器也会跟着关闭！

二、修改hosts（新开一个控制台窗口）

1、先进入到SDK的platform-tools目录

Android
`cd C:\Users\ycl\AppData\Local\Android\Sdk\platform-tools`

Mac
`cd ~/Library/Android/sdk/platform-tools`

2、root

Android
`adb root`

Mac
`./adb root`

3、remount

Android
`adb remount`

Mac
`./adb remount`

4、将电脑的hosts文件push虚拟机

Android
`adb push C:\Windows\System32\drivers\etc\hosts /system/etc/hosts`

Mac
`./adb push /private/etc/hosts /system/etc/hosts`

5、查看host文件是否修改成功

Android
`adb shell cat /etc/hosts`

Mac
`./adb shell cat /etc/hosts`

