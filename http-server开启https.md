### 首先使用以下命令生成一个证书密钥对 key.pem 和 cert.pem，它将有效期约10年（准确地说是3650天）

> openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem


### 然后便可以起服务了, 下面两个命令都可以，后者会自动打开默认浏览器运行页面

> http-server -S

> http-server -S -C cert.pem -o
