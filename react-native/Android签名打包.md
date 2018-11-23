# ReactNative android 打包签名apk

>## 0.42及以下版本用以下方法打包，0.42以上版本请参考<http://facebook.github.io/react-native/docs/signed-apk-android.html>

### tips：“/” 表示RN主目录

1、生成签名密钥

```
keytool -genkey -v -keystore app.keystore -alias app -keyalg RSA -keysize 2048 -validity 10000
```
密码输入：`app`

成功后RN目录下会有一个`app.keystore`的密钥文件

2、在`/android/app/src/main`目录下新建`assets`文件夹

3、将index.android.bundle文件下载并保存到assets文件夹下

```
curl -k "http://localhost:8081/index.android.bundle" > android/app/src/main/assets/index.android.bundle
```

4、在`/android/app/build.gradle`文件中添加

```
def enableProguardInReleaseBuilds = true

signingConfigs {
    release {
        storeFile file("E://RNapp/app.keystore")    //地址(必须反斜杠)
        storePassword "app"    //密码
        keyAlias "app"    //keyAlias的名字
        keyPassword "app"    //密码
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release    //添加这句话引用签名配置
    }
}
```

5、在`/android/`目录下执行 `gradle assembleRelease` 命令，
成功打包后的文件在`/android/app/build/outputs/apk`目录中，例如app-release.apk。

打包中途出现无法解决的问题，执行 `gradle clean`。在重复3、5的步骤。

NOTE：安装gradle工具（版本与`/android/gradle/wrapper`下的一致），并配置环境变量。
配置`GRADLEHOME`到你的gradle根目录当中，
然后把`%GRADLEHOME%/bin`（linux或mac的是`$GRADLE_HOME/bin`）加到PATH的环境变量。
配置完成之后，运行`gradle -v`，检查一下是否安装无误。

6、将app-release.apk发布到各大Android应用市场（如应用宝即可下载）。
