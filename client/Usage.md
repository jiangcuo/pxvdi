# PXVDI 客户端使用说明


## 1. 安装

### 1.1 主程序安装

#### Windows

请下载windows客户端，直接解压，运行install.bat，之后会被安装到"C:\Program Files\pxvdi"
。如果不能运行，请下载webview2

https://developer.microsoft.com/zh-cn/microsoft-edge/webview2

同时支持pxvdihtml5网页调用。

#### Linux OS

根据客户端的cpu架构，下载对应的版本。


```
wget https://download.lierfang.com/pxvdi/Client/linux/pxvdi_latest_amd64.AppImage
OR
curl -L -O https://download.lierfang.com/pxvdi/Client/linux/pxvdi_latest_amd64.AppImage
```

授予权限并执行

```
chmod +x pxvdi_latest_amd64.AppImage
./pxvdi_latest_amd64.AppImage
```


#### Debian OS

我们基于debian构建了安装包，可以直接使用debian进行安装，并且会自动下载组件
```
wget https://download.lierfang.com/pxvdi/Client/linux/pxvdi_3.0.1_debian12_amd64.deb
apt update
apt install -f ./pxvdi_3.0.1_debian12_amd64.deb
```

#### MacOS

下载客户端，直接打开dmg文件

https://download.lierfang.com/pxvdi/Client/macos/pxvdi_latest_arm64.dmg

将程序拖动到应用程序中

### 1.2 组件安装

debian系
```
apt update && apt -y install freerdp2-x11 virt-viewer
```

rhel系
```
dnf makecache --refresh && dnf -y install freerdp virt-viewer
```

archlinux
```
pacman -S freerdp virt-viewer
```

macos
```
brew install virt-viewer
```
### 1.3 Linux上与glibc兼容性
- GLIBC_2.3
- GLIBC_2.35
- GLIBC_2.27
- GLIBC_2.2.5
- GLIBC_2.29
- GLIBC_2.11
- GLIBC_2.14
- GLIBC_2.32
- GLIBC_2.34
- GLIBC_2.4
- GLIBC_2.3.4
- GLIBC_2.7
- GLIBC_2.33


## 2. 使用说明

### 2.1 初次使用

点击`设置`，选择对应的语言，输入服务器地址,服务器地址是带协议和端口号地址，如`https://gw.pxvdi.lierfang.com:16003`。点击`保存`,随后点击`测试`,如果测试通过代表服务端可用。

![PXVDI client](../img/client5.png)

回到首页点击登录：

![PXVDI client](../img/client6.png)

![PXVDI client](../img/client7.png)

点击虚拟机即可连接。

### 2.2 设置说明

#### 登录页

启用`autologin`之后，程序会自动登录

点击`SignUp`,可以向服务端进行注册

点击`Setting`,可以进入设置页面

点击`Shutdown`，可进行关机（仅linux生效）

点击`Reboot`,可进行重启（仅linux生效）

#### 注册页

进入注册页面，用户可以自主注册。

![PXVDI client](../img/client8.png)

#### 设置页

![PXVDI client](../img/client9.png)

在Linux上，可以自由切换连接模式。

`Mac mode`, 客户端可以使用mac进行注册和登录，而无需账号密码验证，仅在总控模式中启用

`Server address`,服务端地址或者pve的地址

`Language setting`, 语言设置

`Test`, 测试服务器地址是否有效

`Saveconfig`,保存当前页数据

`Advanced settings`,高级设置

#### 高级设置

- 全屏开关
  - 控制软件是否全屏，以及以后的连接是否全屏。所有的协议均能控制
- Debug
  - 启用DEBUG模式
- 自动登录
  - 自动登录
- 回滚
  - 运行用户使用快照回滚桌面
- 独立连接
  - 开启一个选项，可以使用本程序，连接到指定的rdp或者vnc服务器
- 连接方式
  - 可选SPICE/Freerdp/Horizon协议。
- freerdp设置
  - freerdp版本：配置freerdp的版本，3是最新版本，修复了2存在的bug，2是稳定版本。
  - 编解码：配置freerdp的解码方式，推荐使用420，如果不支持硬件解码，请使用软件解码
  - 色深：配置freerdp的色彩深度，值越大，色彩越好。
  - 缩放：配置freerdp的缩放比率，适合在高分辨率屏中使用
- VMware设置
  - 连接协议：Blast和PCOIP，PCOIP适合性能差的瘦客户机。
  - 状态栏开关：是否显示连接的状态栏，开启后，可以在云桌面中显示高级选项，如USB重定向，配置连接解码方式等
- ipv6设置：是否开启IPV6
- 网关设置：
  - AD模式：将用户的登录信息作为云桌面的登录账户，用户无需输入2次密码，如果配置自动登录，用户可以开机登录到桌面。需要云桌面和服务器端加域。
  - 使用网关：配置使用rdp的网关。在ipv6启用的情况下，会忽略网关。
  - 使用用户账号密码：将用户的账户密码作为rdp网关凭据
  - 网关账号：rdp网关账号
  - 网关密码：rdp网关密码。
该功能可以让外部客户端访问内网桌面。
- 资源设置：
  - 多监视器：允许使用多个屏幕，勾选此项之后，无论是否全屏，云桌面都会全屏。
  - 驱动器重定向：允许重定向瘦客户端的磁盘，如移动磁盘、内置磁盘等等。
  - 声音重定向：允许云桌面播放声音，并从瘦客户端发出来。
  - 打印重定向：允许云桌面使用本地打印机。
  - usb重定向：允许云桌面读取本地的USB设备。
  - 麦克风重定向：允许云桌面使用麦克风。
  - 剪切板重定向：运行云桌面进行剪切板同步。
  - 串口重定向：将串口重定向给rdp


#### 虚拟机列表页

![PXVDI client](../img/client10.png)

- 连接类型：
    - RDP
    - Horizon
    - SPICE

- 电源管理：
    - 关机
    - 强行关机
    - 重启
    - 强制重启

- 快照管理

![PXVDI client](../img/client11.png)

选中快照即可回滚


- 五角星图标 设置虚拟机登录之后就启动

- 刷新列表 更新虚拟列表

- 头像 注销登录


### 2.3 特殊设置

####  UserMode
在Usermode下，pxvdi调用的freerdp路径位于~/.xfreerdp，该方案无需用户拥有root权限就可以连接到桌面。

如以下场景

普通用户下载pxvdi.appimage，下载freerdp.appimage。将freerdp.appimage改名到~/.xfreerdp双击pxvdi就可以连接到桌面，在此过程中完全不需要root权限。

#### 独立连接

开启独立连接之后，会在首页出现独立连接按钮。独立连接可以手动连接到桌面
![PXVDI client](../img/client12.png)

#### 设置隐藏

使用终端，编辑~/.pxvdiconfig.json， 将setting这个值改成false，重启软件即可隐藏设置功能。