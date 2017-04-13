# HTML head 设置

### 启用360等浏览器的极速模式(webkit)

```
<!-- 启用360等浏览器的极速模式(webkit) -->
<meta name="renderer" content="webkit">
```

### 不让百度转码

```
<!-- 不让百度转码 -->
<meta http-equiv="Cache-Control" content="no-siteapp"/>
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
