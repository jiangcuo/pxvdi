# PXVDI HTML5 客户端

使用debian12的系统

## 安装guacd

我们使用docker进行安装
```bash
docker run --name some-guacd  --restart=always  -idt -p 4822:4822 guacamole/guacd
```

## 安装pxvdihtml5

```bash
dpkg -i  pxvdihtml5.deb
systemctl enable pxvdihtml5 #开机启动
```

## 修改pxvdihtml5配置

安装好了之后，pxvdihtml5将会被安装到/usr/share/pxvdi/

配置文件为`/usr/share/pxvdi/pxvdiConfig.json`

```json
{
"webport":16002,   //pxvdihtml5的监听端口
"rdpport":16007,    //pxvdihtml5的rdp隧道端口
"security":"nla",    //默认的身份认证方式
"midserver":"10.1.2.1",   //服务端的地址
"midport":3002,           //服务端的端口
"guacdserver":"127.0.0.1", //guacd服务器的地址，如上面的guacd的安装
"guacdport":4822,           //guacd服务器的端口，如上面的guacd的安装
"log":"QUIET"   //日志等级
}
```

修改之后，使用命令重启服务

```bash
systemctl restart pxvdihtml5 #开机启动
```