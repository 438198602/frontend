# HTML head 设置

### viewport(viewport-fit=cover 兼容iPhoneX的刘海)

```
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover">
```

### DNS 预读取

```
<!-- DNS 预读取 -->
<meta http-equiv="x-dns-prefetch-control" content="on">
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
  !function (d) {
    var c = d.document;
    var a = c.documentElement;
    var b = d.devicePixelRatio;
    var f;
    function e() {
      var h = a.getBoundingClientRect().width, g;
      if (b === 1) {
        h = 720
      }
      if(h>720) h = 720;  // 设置基准值的极限值
      g = h / 7.2;
      a.style.fontSize = g + "px"
    }
    if (b > 2) {
      b = 3
    } else {
      if (b > 1) {
        b = 2
      } else {
        b = 1
      }
    }
    a.setAttribute("data-dpr", b);
    d.addEventListener("resize", function () {
      clearTimeout(f);
      f = setTimeout(e, 200)
    }, false);
    e()
  }(window);
</script>
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
