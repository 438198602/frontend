# 一些常见的css样式

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
    // outline: 5px dotted red; 也可以设置样式
}
```

### contenteditable 设置element是否可编辑

```
<p contenteditable="true">可编辑</p>
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
    user-select: none; /* Standard syntax */
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

### box-sizing 让元素的宽度、高度包含border和padding

```
{
    box-sizing: border-box;
}
```

### webkit-playsinline

手机 video 都可以在页面中播放，而不是全屏播放了。

```
<video id="myvideo" src="test.mp4" webkit-playsinline="true"></video>
```
