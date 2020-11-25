### 查看npm全局安装列表

`npm list -g --depth 0`

### 查看yarn全局安装列表

`yarn global list`

> 如果有些包我们只会使用一次，或者只想尝试一下，不想安装到全局，也不想作为当前项目的依赖
可以使用 npx 的方式来执行  
npx 是 npm 5.2+ 版本之后自带的工具，能够帮助我们更高效的执行 npm 软件仓库里的安装包

```
$ npx create-react-app my-app

# 执行以上这条命令 npx 会按以下顺序工作：
# 1. 先查看当前项目有没 create-react-app
# 2. 如果当前项目找不到，会去全局查找 create-react-app
# 3. 如果全局还找不到，会帮我们临时从 npm 包仓库安装 create-react-app，不会污染到当前项目，也不会装到全局
```

