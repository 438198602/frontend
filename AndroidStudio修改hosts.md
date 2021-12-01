### AndroidStudio修改hosts

> 来源 https://blog.csdn.net/qq_24125575/article/details/116657523

一、启动模拟器

1、进入到模拟器目录

`cd C:\Users\ycl\AppData\Local\Android\Sdk\emulator`

2、查看已安装模拟器列表

`./emulator -list-avds`

3、启动模拟器，并修改只读权限（Pixel_XL_API_28 为需要启动的模拟器名称，API_29 `adb remount`有问题）

`./emulator -avd Pixel_XL_API_28 -writable-system`

> 启动成功，不要关闭此窗口，此控制台窗口一关闭模拟器也会跟着关闭！

二、修改hosts（新开一个控制台窗口）

1、先进入到SDK的platform-tools目录

`cd C:\Users\ycl\AppData\Local\Android\Sdk\platform-tools`

2、root

`adb root`

3、remount

`adb remount`

4、在D盘新建一个andriodhosts文件夹，将/system/etc/hosts里的hosts文件拉到此处

`adb pull /system/etc/hosts d:/andriodhosts`

5、修改后将hosts再push回虚拟机

`adb push d:/andriodhosts/hosts /system/etc/hosts`

6、查看host文件是否修改成功

`adb shell cat /etc/hosts`
