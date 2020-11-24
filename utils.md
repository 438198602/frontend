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

### 判断PC还是移动端

```
var browser =  navigator.userAgent;
var isiPad = browser.indexOf('iPad') > -1;
var isMobile = !!browser.match(/AppleWebKit.*Mobile.*/) && !!browser.match(/AppleWebKit/) && !isiPad;

if (isMobile) {
  console.log('Mobile Browser');
} else {
  console.log('Desktop Browser');
}
```

### js拦截所有的console

```
// 在正式环境中替换掉console
if (process.env.NODE_ENV !== "development") {
  window.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  };
}
```

### 导出excel

```
/**
 * 导出excel
 * @param {*} data  接口返回的blob数据
 * @param {String} fileName  excel名字
 */
export const exportExcel = (data, fileName) => {
  let url = window.URL.createObjectURL(data);
  let link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
};
```

### 解析URL参数

```
/**
 * 把URL参数解析为一个对象
 * @param {String} urlStr  url search获取的字符串
 */
export const parseQueryString = (urlStr) => {
  let pos = urlStr.indexOf("?") + 1;
  let paramsStr = urlStr.substring(pos);

  let obj = {};
  let paramsArr = paramsStr.split("&");

  paramsArr.forEach((element) => {
    let _arr = element.split("=");
    obj[_arr[0]] = _arr[1];
  });

  return obj;
};
```

### 时间格式化

```
/**
 * 时间格式化
 * @param {String} fmt  格式：YYYY-mm-dd HH:MM:SS
 * @param {Number} date  时间
 */
export const dateFormat = (fmt, date) => {
  date = new Date(date);
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
  };

  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }

  return fmt;
};
```

### 判断网络图片是否404

```
// 判断网络图片是否404
const CheckImgExists = (imgurl) => {
  let ImgObj = new Image(); //判断图片是否存在
  ImgObj.src = imgurl;
  //存在图片
  if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
    return true;
  } else {
    return false;
  }
};
```

### 对象去重

```
/**
 * 去重
 * @param {String} key 去重的关键参数
 * @param {Object} data 去重的对象
 */
export function uniqueObject(key = 'id', data) {
	let result = {};
	let finalResult = [];
	for (let i = 0; i < data.length; i++) {
		result[data[i][key]] = data[i];
	}
	for (let item in result) {
		finalResult.push(result[item]);
	}

	return finalResult;
}
```
