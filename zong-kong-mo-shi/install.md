# PXVDI 安装

## 了解PXVDI 总控模式组件


| 组件 | 说明 | 发行方式|安装位置 |安装教程 |
|------|------|----|-------------|------------|
| **PXVIRT** | 虚拟化底层，运行所有虚拟机(必须安装) |系统iso| 物理机 |[pxvirt](https://docs.pxvirt.lierfang.com)|
| **PXVDI Server** | VDI管理服务端，管理桌面池和用户(必须安装) | deb包 | 虚拟机 |本页|
| **PXVDI HTML5** | HTML5客户端/安全网关，可部署于DMZ (如果需要外外网或者浏览器访问安装)| 二进制文件 |虚拟机|[PXVDI HTML5 客户端](../client/html5.md)|
| **PXVDI Stream** | 自研的连接协议，带有远程和集中控制的功能，和向日葵一样的形式，被控端(必须安装) | exe或者appimage| 虚拟机或者需要被连接的物理机 |[虚拟机开启PXVDIStream连接功能](../zong-kong-mo-shi/vm/pxvdistreamvm.md)|
| **PXVDI 客户端** | 客户端程序 (可选)| exe或者appimage| 需要连接的终端 |[客户端使用说明](../client/Usage.md)|
| **PXVDI 瘦客户端** | 瘦客户端程序(可选) |  appimage| 低性能的瘦终端 |[瘦客户端使用说明](../client/ThinOS.md)|


## 配置PXVIRT主机

PXVIRT是梨儿方针对Proxmox VE 二次开发的虚拟化底层。PXVIRT是PXVDI的基础。所有的虚拟机均运行在PXVIRT上，类似于VMware Horizon的虚拟机运行在vsphere上一样！

PXVDI 依赖PXVIRT,同时对原本的Proxmox VE不兼容，如果你一定要使用原生的proxmox-ve，请联系商务获取支持补丁！

在安装pxvdi 之前，请先安装PXVIRT。参考文档https://docs.pxvirt.lierfang.com，PXVIRT在安装好后，请创建一个集群。

## 设计PXVDI服务端的安装位置。

<font color=red  size=5> PXVDI服务端可以安装到虚拟机或者硬件服务器。

如果您要购买授权，最好将PXVDI安装到虚拟机内。这样即便物理机彻底损坏，虚拟机迁移到新的机器，也不会影响授权。

如果安装到硬件服务器上，要请确保服务器的文件系统不出现问题。如果磁盘损坏，那么授权将丢失。所以推荐安装到虚拟机内部！
</font>

## PXVDI 服务端对系统的兼容性

PXVDI服务端仅兼容debian 12，如果需要其他的系统兼容，请联系商务！

## 安装数据库

PXVDI 服务端 使用mysql数据库，这是在debian 12上，执行命令

```
apt update
apt install default-mysql-server -y
```

修改数据的账号密码。

```
mysql -uroot -p #此时再回车一下
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
```

>如果您的数据库和PXVDI服务端不是在同一服务器上，请开启远程访问权限。
>
>如果您的数据库不用root访问，请确保用户具有数据库的所有权限。
>

如下

```
mysql -uroot -p #此时再回车一下
# 创建一个lierfang用户，% 代表所有主机，可以远程连接密码为P@SSw0rd
create user 'lierfang'@'%'  identified by 'P@SSw0rd';
# 授予 lierfang 所有权限
GRANT ALL PRIVILEGES ON *.* to 'lierfang'@'%';
```

## 安装主程序

我们仅支持debian12 安装PXVDI服务端

服务端程序下载地址为：

https://mirrors.lierfang.com/pxcloud/pxvdi/MIDServer/server/

请上传到服务器中

```
dpkg -i pxvdiserver.deb #安装服务端
systemctl enable pxvdiserver #开机启动
```

## 配置

服务端安装成功之后，会监听本地3002端口，请从浏览器打开主机的https://xxx:3002端口，初次使用会配置数据库。

第一步需要初始化数据库。

![alt text](../img/server3.png)

主机地址为数据库地址，端口为数据库端口，用户名和密码为数据的账号密码。数据库名需要指定一个。不需要新建

因为这里数据库和pxvdi服务端在同一个服务器，所以地址为127.0.0.1

`如果数据库配置成功，程序会自动重启，请耐心等待`。

![alt text](../img/server4.png)

服务器重启之后，需要配置Pxvirt的地址，必须使用root@pam账号。主机地址为pve的ip，不填端口。*如果点击测试之后，没有报错，还在这个页面上，请直接退出浏览器进去，不要再次配置。* 这里有个bug

![alt text](../img/server5.png)

配置成功之后即可进入系统的登录页面,默认的账号为`admin`，密码为`P@SSw0rd`

![alt text](../img/server6.png)


## 更新

PXVDI 服务端支持2种更新方式。

1. 从web上直接更新（免费版没有此功能）。
    
2. 在系统内更新。

### 在web后台更新

点击`运维`——`平台配置`

点击上传deb包，随后确认更新即可。更新之后需要重启一下平台才能生效。

### 在系统内更新。

如果配置了[软件源](../pxvdi-source.md)，
```
apt update
apt upgrade pxvdiserver
```

如果没有配置软件源，下载deb包到系统内

```
dpkg -i pxvdiserver_1.0.2_amd64.deb
systemctl restart pxvdiserver
```
