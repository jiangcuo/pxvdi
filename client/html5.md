# PXVDI HTML5 客户端

PXVDI HTML5 有3个功能。

1. 支持HTML5 访问桌面会话
2. 位于DMZ区域，安全将服务端的用户接口暴露到外网。（需要1.0.6版本及其以上）
3. 可以调用本地程序访问云桌面

![](/img/WX20251114-164725@2x.png)

利用 PXVDI HTML5 可以创建内外网访问安全代理，外部的客户端可以通过HTML5的地址进行连接，而不需要将PXVDI 服务端暴露到公网，极大地增加架构安全性。

## 硬件要求
PXVDI HTML5 客户端需要cpu大于4核 内存大于1G 即可

架构支持arm64、amd64、loongarch64、riscv64、嵌入式设备

## 安装pxvdihtml5

### Docker 安装

```bash
docker run -idt --name pxvdihtml5 --restart=awlays -p 443:443 -p 9091:9091 -v ~/.lierfang:/root/.lierfang lierfang/pxvdihtml5
```

或者使用镜像站点

```bash
docker run -idt --name pxvdihtml5 --restart=awlays -p 443:443 -p 9091:9091 -v ~/.lierfang:/root/.lierfang docker.1ms.run/lierfang/pxvdihtml5
```


### debian 系列
添加apt key

```bash
curl -L https://mirrors.lierfang.com/pxcloud/lierfang.gpg -o /etc/apt/trusted.gpg.d/lierfang.gpg

```
添加源

```bash
echo "deb https://mirrors.lierfang.com/pxcloud/pxvdi bookworm main" > /etc/apt/sources.list.d/pxvdi-sources.list
```

安装pxvdihtml5

```bash
apt update 
apt install pxvdihtml5
systemctl enable pxvdihtml5
```

### 其他系统

前往https://mirrors.lierfang.com/pxcloud/pxvdi/Html5/ 下载对应的架构和版本

文件类似如下
```
文件名 + 版本 + 架构
pxvdihtml5_v1.0.6_aarch64
```

可以使用下面命令快速下载
```
wget https://mirrors.lierfang.com/pxcloud/pxvdi/Html5/pxvdihtml5_latest_`arch`
```

如果没有wget，可以使用curl

```
curl -L -O https://mirrors.lierfang.com/pxcloud/pxvdi/Html5/pxvdihtml5_latest_`arch`
```

下载好了 赋予执行权限
```
chmod +x pxvdihtml5_latest_`arch`
```

移动文件到/usr/sbin/下面
```
mv  pxvdihtml5_latest_`arch` /usr/sbin/pxvdihtml5
```

随后执行命令 安装服务
```
pxvdihtml5 --install
```

启动服务
```
systemctl start pxvdihtml5
```



## 配置 pxvdihtml5

pxvdihtml5 配置文件在`~/.lierfang/pxvdihtml5.conf`中，第一次启动会创建配置文件

```
{ 
  "webport": 9999, -> 前台端口，默认为443
  "primary_midserver": "10.13.14.121:3002", -> pxvdiserver的地址
  "backup_midserver": "10.13.14.99:3002", -> pxvdiserver的冗余地址 。当主地址不可用，系统会自动切换到备用地址
  "log": "4", -> 日志级别
  "adminport": 9091, -> 管理后端端口
  "adminpasswd": "IBbxKtJS0WVxv32Q1",  -> 管理后台密码
  "noweb": false, ->是否关闭前台的网页页面，启用之后，只能通过客户端访问，本平台仅做安全外网暴露
  "allowed_domains": [ ->  白名单域名，配置完成之后，只允许这个域名访问
    "*"
  ]
}
```

管理员可以通过访问https://{pxvdi html5 ip}:{adminport} 进行访问

登录账号为admin，密码为配置文件里面的。

这些 都可以在网页上修改

## 管理平台和用户前台

pxvdihtml5 有2个服务器，一个是管理后台，是管理一些配置的地方，而用户前台是用户访问的地址

在dmz 暴露到外网的时候，务必只暴露前台端口！


## 反向代理

PXVDI HTML5客户端可以被nginx 反向代理，配置如下

```nginx
server{
listen 443 ssl;
server_name vdesk.lierfang.com;
ssl_certificate /etc/letsencrypt/live/vdesk.lierfang.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/vdesk.lierfang.com/privkey.pem;
ssl_protocols         TLSv1.1 TLSv1.2 TLSv1.3;
add_header Access-Control-Allow-Origin *;

  location / {
          proxy_pass https://10.13.16.250;
          proxy_buffering off;
          proxy_buffer_size 4k;
          proxy_connect_timeout 300s;
          proxy_read_timeout 300s;
          proxy_send_timeout 300s;
          send_timeout 300s;
          #开启websocket
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection "upgrade";
  }
}

```