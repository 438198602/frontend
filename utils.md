### 判断是否支持webp

```
/**
 * 判断浏览器是否支持webp
 * isSupportWebp true--支持||false--不支持
 * !![].map 主要是判断是否是IE9+，以免 toDataURL 方法会挂掉。
 */
window.isSupportWebp = !![].map && document
  .createElement('canvas')
  .toDataURL('image/webp')
  .indexOf('data:image/webp') == 0;
```
