# PXVDI 客户端使用说明


## 1. 安装

### 1.1 主程序安装

#### Windows

下载客户端之后，运行exe，程序之后会被安装到"C:\Program Files(x86)\lierfang\Pxvdi"


#### Linux OS

根据客户端的cpu架构，下载对应的版本。


```
wget https://mirrors.lierfang.com/pxcloud/pxvdi/Client/linux/pxvdi_latest_amd64.AppImage
OR
curl -L -O https://mirrors.lierfang.com/pxcloud/pxvdi/Client/linux/pxvdi_latest_amd64.AppImage
```

授予权限并执行

```
chmod +x pxvdi_latest_amd64.AppImage
./pxvdi_latest_amd64.AppImage
```


<!-- #### Debian OS

我们基于debian构建了安装包，可以直接使用debian进行安装，并且会自动下载组件
```
wget https://download.lierfang.com/pxvdi/Client/linux/pxvdi_3.0.1_debian12_amd64.deb
apt update
apt install -f ./pxvdi_3.0.1_debian12_amd64.deb
``` -->

#### MacOS 仅支持apple soc

下载客户端，直接打开dmg文件

https://mirrors.lierfang.com/pxcloud/pxvdi/Client/macos/pxvdi-latest.dmg

将程序拖动到应用程序中

### 1.2 组件安装

debian系
```
apt update && apt -y install freerdp3-x11 virt-viewer 
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

点击`设置`，选择对应的语言，输入服务器地址,服务器地址是带协议和端口号地址，如`https://gw.pxvdi.lierfang.com:16003`。

点击`保存`,随后点击`测试`,如果测试通过代表服务端可用。

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

`Sudo 权限`，针对macos上使用sudo 重定向usb设备

#### 高级设置

- 连接类型 
  当服务端桌面池设置连接方式为all的时候，这里的首选连接方式
- 串口 需要重定向串口 （已废弃）
- 比特率 视频的比特率，适用于moonlight和pxvdi
- 帧率 视频的帧率，适用于moonlight和pxvdi
- 调试模式 开启debug日志，开启此项会影响性能
- 显示菜单栏 废弃
- 全屏模式 全屏启动
- 自动登录 打开程序之后，自动登录
- mac模式 使用mac地址登录模式
- Moonlight 设置
  - 编码器 moonlight的视频流编码器
  - 解码器 moonlight的视频流解码器
  - 游戏优化 moonlight的游戏优化
  - 444色深 moonlight的444色深
- PXVDI 设置
  - 外网模式 开启PXVDI的外网模式！允许通过外网访问
  - 瘦客户端模式 使用瘦客户端模式
  - 远程管理 运行服务器管理本客户端
  - 隐藏设置  把设置隐藏，如果需要启用，编辑配置文件~/.lierfang/pxvdi-config.json 将setting设置为true
  - SDL客户端 使用SDL客户端而不是程序集成的客户端，SDL客户端性能会好一点，
    - 解码器 SDL客户端的解码器
    - 渲染器 SDL客户端的渲染器，使用canvas性能和兼容性都很好！

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

