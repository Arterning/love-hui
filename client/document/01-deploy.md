# deploy front-end

使用php nginx 增加一个web.conf文件存放在vhosts目录下

```
server {
        listen        8080;
        server_name  localhost;
        root   "D:\phpstudy_pro\web\xiaohui";
        location / {
            index  index.html;
            try_files $uri /index.html;

        }

        # 配置反向代理，将API请求转发到后端服务器
        location /api {
            proxy_pass http://localhost:7003;
        }

}

```


这一段代码是是解决react在nginx中404的问题
```
 try_files $uri /index.html;
```

关于环境变量的配置
```
VITE_HTTP_BASE=http://localhost:8080
VITE_DEV=false
```

VITE_HTTP_BASE 是前端项目的部署地址

比如你部署到1.2.3.4:8080端口这个地址

那么就应该这么配置

```
VITE_HTTP_BASE=http://1.2.3.4:8080
VITE_DEV=false
```