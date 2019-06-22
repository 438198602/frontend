# HTML head 设置

### 判断IE（“if lte IE 9” IE9及以下，“if lt IE 9” IE9以下）

```
<!--[if lte IE 9]>
  <script>
    window.location.href = 'http://www.baidu.com';
  </script>
<![endif]-->
```

### 启用360等浏览器的极速模式(webkit)/不让百度转码

```
<meta name="renderer" content="webkit"> <!-- 用在360等国内双核浏览器中 -->
<meta name="force-rendering" content="webkit"> <!-- 用在其它非主流浏览器 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- 针对 IE 浏览器 -->
<meta http-equiv="Cache-Control" content="no-transform"> <!-- 针对百度搜索 -->
<meta name="format-detection" content="telephone=no,email=no,adress=no">
```

### iPhoneX刘海兼容

```
<meta
  name="viewport"
  content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover"
/>

body {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  padding-right: constant(safe-area-inset-right);
  padding-right: env(safe-area-inset-right);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: constant(safe-area-inset-left);
  padding-left: env(safe-area-inset-left);
}
```

### 移动端的rem

```
<script>
  (function (WIN) {
    var setFontSize = function (_width) {
      var docEl = document.documentElement;
      // 获取当前窗口的宽度
      var width = _width || docEl.clientWidth;

      if (width > 750) {
        width = 750;
      }

      var rem = width * 2 / 7.5;
      console.log(WIN.devicePixelRatio)
      console.log(rem);
      docEl.style.fontSize = rem + 'px';
    }

    var timer;
    //函数节流
    function dbcRefresh() {
      clearTimeout(timer);
      timer = setTimeout(setFontSize, 100);
    }

    //窗口更新动态改变 font-size
    WIN.addEventListener('resize', dbcRefresh, false);
    //页面显示时计算一次
    WIN.addEventListener('pageshow', function (e) {
      if (e.persisted) {
        dbcRefresh()
      }
    }, false);
    setFontSize();
  })(window);
</script>
```

### 用VW替换上述js方法

> vw表示1%的屏幕宽度，而我们的设计稿通常是750px的，屏幕一共是100vw，对应750px，那么1px就是100/750vw。rem是相对html元素，为了方便计算，我们取html是100px，那么100px就是13.333333333333334vw。对应750px的设计稿，1rem是100px，10px就是0.1rem。

```
html {
  font-size: 13.333333333333334vw;
}
```

### 使用CDN

```
<!--应用外部js，优先使用CDN，为以防万一，提供一个备用的本地资源文件。-->
<script src="http://ajax.microsoft.com/ajax/jquery/jquery-1.4.2.min.js"></script>
<script>
  if (typeof jQuery == 'undefined') {
    document.write(unescape("%3Cscript src='jquery-1.4.2.min.js'%3E%3C/script%3E"));
  }
</script>
```
