### whistle rules


# 修改返回结果
# https://dev.com resBody://{resData}

```resData
{"code":101,"data":[],"message":"标题不能少于6个汉字，请修改标题后再上传"}
```


# 延迟返回（ms）
# https://dev.com resDelay://60000


# 修改响应状态码
# https://dev.com replaceStatus://500


# 修改页面
# 	js - jsAppend://`{sourcemap}`
# 	html - htmlAppend://{injectConsole} - 在body底部插入
# 	html - htmlPrepend://{injectConsole} - 需要尽早执行的代码，在head顶部插入
# https://dev.com htmlAppend://{injectConsole}

```injectConsole
<script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"></script>
<script>
  var vConsole = new window.VConsole();
</script>
```


# 设置跨域
# https://dev.com resCors://*


# 请求转发
# 先把本地请求转到dev环境
# https://local.com https://dev.com

# 替换dev环境请求中的token
# xxx.dev.cn reqHeaders://{testTodev}
```testTodev
authorization: 这里填写token
```


