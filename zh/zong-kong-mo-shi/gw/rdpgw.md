# rdpGW网关

rdpGW网关是rdp协议的开源实现


# 部署rdpGW

梨儿方为PXVDI 封装了rdpGW，是rdpGW的安装变得简单容易。


如果需要更多的配置，参考github 

https://github.com/bolkedebruin/rdpgw


在debian12的服务器上执行一下命令就可以安装。

```
wget https://download.lierfang.com/pxcloud/pxvdi/dists/bookworm/main/binary-amd64/rdpgw_2.0.2_amd64.deb
dpkg -i rdpgw_2.0.2_amd64.deb
```

安装结束之后，rdpgw会监听443 地址。

# 修改rdpGW默认的账号密码

rdpGW的账号密码位于`/etc/rdpgw/rdpgw-auth.yaml`。

编辑`/etc/rdpgw/rdpgw-auth.yaml`文件，进行添加或者修改对应的账号密码即可。

请务必遵守yaml格式。

修改之后重启`systemctl restart rdpgw-auth  rdpgw`即可

# SSL修正

默认用的是自签名证书。

如果申请了证书，请替换`/etc/rdpgw/`目录下的`key.pem`和`server.pem`

替换之后重启`systemctl restart rdpgw-auth  rdpgw`即可
