# 一些常见的css样式

### 超链接

```
a /*所有超链接*/
a:link /*超链接文字格式*/
a:visited /*浏览过的链接文字格式*/
a:active /*按下链接的格式*/
a:hover /*鼠标转到链接*/
```

### ::-webkit-input-placeholder

input 的 H5 placeholder 属性，不能直接改文字颜色，所以目前的解决方法就是用 ::input-placeholder 属性来改。

Tips: 配合 opacity 属性使用效果更佳！

```
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: pink;
}
::-moz-placeholder { /* Firefox 19+ */
    color: pink;
}
:-ms-input-placeholder { /* IE 10+ */
    color: pink;
}
:-moz-placeholder { /* Firefox 18- */
    color: pink;
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

 ### user-select 禁止用户选中文本

```
div {
    user-select: none;
}
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

### box-sizing 让元素的宽度、高度包含border和padding

```
{
    box-sizing: border-box;
}
```

### playsinline

手机 video 都可以在页面中播放，而不是全屏播放。

```
//待测试
<video id="myvideo" src="test.mp4" webkit-playsinline playsinline x5-playsinline x-webkit-airplay="allow"></video>
```
