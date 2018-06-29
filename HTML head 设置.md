# HTML head 设置

### 判断IE（“if lte IE 9” IE9及以下，“if lt IE 9” IE9以下）

```
<!--[if lte IE 9]>
  <script>
    window.location.href = 'http://www.baidu.com';
  </script>
<![endif]-->
```

### viewport(viewport-fit=cover 兼容iPhoneX的刘海)

```
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover">
```

### DNS 预读取

```
<!-- DNS 预读取 -->
<meta http-equiv="x-dns-prefetch-control" content="on"> <!-- Firefox有设置可以关闭dns-prefetch，这里用来强制打开 -->
<link rel="dns-prefetch" href="//github.com">
```

### 启用360等浏览器的极速模式(webkit)/不让百度转码

```
<meta name="renderer" content="webkit"> <!-- 用在360中 -->
<meta name="force-rendering" content="webkit"> <!-- 用在其它 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- 针对 IE 浏览器 -->
<meta http-equiv="Cache-Control" content="no-transform"> <!-- 针对百度搜索 -->
<meta name="format-detection" content="telephone=no,email=no,adress=no">
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

### 用VW替换上述js方法（设置html的font-size，这样在750px的设计稿上,1rem = 100px）

```
html {
  font-size: 13.333333333333334vw;
}
```

### 高清屏的1px

```
.line1 {
  position: relative;
}
.line1::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .line1::after {
    -ms-transform: scaleY(0.5); /* IE 9 */
    -webkit-transform: scaleY(0.5); /* Safari */
    transform: scaleY(0.5); /* 标准语法 */
  }
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
