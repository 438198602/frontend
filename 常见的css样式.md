# 一些常见的css样式

### 全局设置

```
body {
  /* 移动端触摸元素时出现半透明灰色遮罩 */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  /* 禁用系统默认的长按菜单 */
  -webkit-touch-callout: none;
  /* 禁止用户选中文本 */
  user-select: none;
}
```

### 页面变灰色（ie7-9，其它浏览器，不支持ie10、ie11）

> https://developer.mozilla.org/zh-CN/docs/Web/CSS/position
> 
> 对于指定了 filter 样式且值不为 none 时，被应用该样式的元素其子元素中如果有 position 为 absolute 或 fixed 的元素，会为这些元素创建一个新的容器，使得这些绝对或固定定位的元素其定位的基准相对于这个新创建的容器。
> 
> 因此，我们可以将该样式应用到根元素html上，即使创建了新的定位基准元素，也不会对子孙元素产生不符合预期的影响

```
<style type="text/css">
    html {
        -webkit-filter: grayscale(100%);
           -moz-filter: grayscale(100%);
            -ms-filter: grayscale(100%);
             -o-filter: grayscale(100%);
                filter: grayscale(100%);
    }
</style>
<!--[if IE]>
<style type="text/css">
    * {
        -webkit-filter: grayscale(100%);
           -moz-filter: grayscale(100%);
            -ms-filter: grayscale(100%);
             -o-filter: grayscale(100%);
                filter: grayscale(100%);
                filter: gray;
    }
</style>
<![endif]-->
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

### position: absolute， 让margin有效的

设置left:0, right:0 就可以。原因是两边都是0不存在边距，element就可以得出距离，并居中。

```
div {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
}
```

### 使用 clearfix 清除浮动。

```
.clearfix {
  zoom: 1;
}
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
 ```

### 超链接

```
a /*所有超链接*/
a:link /*超链接文字格式*/
a:visited /*浏览过的链接文字格式*/
a:hover /*鼠标转到链接*/
a:active /*按下链接的格式*/
```

### ::-webkit-input-placeholder

input 的 H5 placeholder 属性，不能直接改文字颜色，所以目前的解决方法就是用 ::input-placeholder 属性来改。

Tips: 配合 opacity 属性使用效果更佳！

```
input::input-placeholder {
	color: #aaa;
}
input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: #aaa;
}
input:-moz-placeholder { /* Firefox 18- */
    color: #aaa;
}
input::-moz-placeholder { /* Firefox 19+ */
    color: #aaa;
}
input:-ms-input-placeholder { /* IE 10+ */
    color: #aaa !important;
}
```

### H5 IOS input问题
1、键盘默认显示的换行，改为搜索（用form包裹，action 设为 return true）
```
<form action="javascript:return true;">
    <input type="search" name="keywords" autofocus="autofocus" autocomplete="off" placeholder="" />
</form>'
```
2、iOS 在input type=search中自带的搜索图标 去掉
```
input[type="search"] {
    -webkit-appearance: none;
} 
input::-webkit-search-cancel-button {
    display: none;
}
```

### outline 当点击input元素时显示的当前状态线（外发光）

```
div {
  outline: none; //移动浏览器默认的状态线
  // outline: 1px solid red; 也可以设置样式
}
或者
input:focus{
  outline: none;
}
```

### contenteditable 规定元素内容是否可编辑

```
<p contenteditable="true">可编辑</p>
<div contenteditable></div>
```

### css实现不换行、自动换行、强制换行

```
//不换行
white-space: nowrap;

//自动换行
word-wrap: break-word;
word-break: normal;

//强制换行
word-break: break-all;
```

### 文本截断

```
//单行
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;

//多行
<div class="wrap">
  <div class="text">文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断文本截断</div>
</div>
.wrap {
  height: 40px;
  line-height: 20px;
  overflow: hidden;
}
.wrap .text {
  float: right;
  margin-left: -5px;
  width: 100%;
  word-break: break-all;
}
.wrap::before {
  float: left;
  width: 5px;
  content: '';
  height: 40px;
}
.wrap::after {
  float: right;
  content: "...";
  height: 20px;
  line-height: 20px;
  /* 为三个省略号的宽度 */
  width: 3em;
  /* 使盒子不占位置 */
  margin-left: -3em;
  /* 移动省略号位置 */
  position: relative;
  left: 100%;
  top: -20px;
  padding-right: 5px;
  background-color: #fff;
}
```

### playsinline

手机 video 都可以在页面中播放，而不是全屏播放。

> playsinline 页面内播放（webkit- webkit内核；x5- x5内核，QQ浏览器、微信等）

> x-webkit-airplay ios连接 airplay

```
<video id="myvideo" src="test.mp4" webkit-playsinline playsinline x5-playsinline x-webkit-airplay="allow"></video>
```

