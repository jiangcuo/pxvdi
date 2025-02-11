# 瘦客户端系统使用说明

## 1. PXVDI 瘦客户机系统和硬件兼容性

### 瘦客户机系统和硬件兼容性

| 显卡兼容性 | 核显 | A卡 | N卡 | N卡+核显     |
| ------------ | ------ | ----- | ----- | -------------- |
| intel处理器      | √   | √  | x   | 仅核显输出√ |
| amd处理器      | √   | √  | x   | 仅核显输出√ |


### PXVDI 瘦客户机系统不支持N卡，如果是双显卡，请使用核显输出。

| WIFI硬件 | WIFI兼容性 |
| ---------- | ------ |
| intel    | √         |
| broadcom | √         |
| marvell  | √         |
| mediatek | √         |
| realtek  | √         |

### PXVDI 支持以下启动环境

* 64位efi
* bios引导
* 不支持32为efi环境

### PXVDI要求系统盘大于等于8G

## 2. PXVDI 瘦客户机系统架构说明

PXVDI瘦客户机系统基于debian12系统，内置SPICE/RPD/Horizon组件
瘦客户机系统具有2个版本
- 版本小于等于2.2.6，老版本
- 版本大于2.2.6，新版本

本文将介绍新版本

![PXVDI client](../img/thinos1.png)


PXVDI使用双系统引导，用户在升级系统时，可以选择升级主备系统。同时具有还原模式，能够对系统数据进行清理。

如果要切换双系统，在出现grub的页面，快速点按方向键，中断自动启动，选择 Pxvdi 还原模式

## 3. PXVDI 瘦客户端系统安装
PXVDI瘦客户端ISO 重启将会还原，不会保存任何数据，需要安装到硬盘内
使用rufus将iso写入到U盘

直接使用U盘即可进入瘦客户机系统，瘦客户系统是运行在内存中的RAMOS，重启之后保存的数据将会消失，需要安装到硬盘。

系统默认会启动PXVDI程序，请使用ctrl+F4组合键，连续3次即可退出PXVDI程序守护程序。

右击打开终端，

运行lsblk查看需要安装的硬盘，如/dev/sda，可以根据大小来判断。
注意，安装磁盘最小为8G。
![PXVDI client](../img/thinos2.png)


执行命令`pxvdi-install /dev/sda` 进行安装。如果是新版本系统，版本号高于2.2.6，要安装旧版的系统，请使用`pxvdi-install-old /dev/sda` 进行安装。

![PXVDI client](../img/thinos3.png)

出现success就代表安装成功

## 4.PXVDI 基本操作

### 4.1 退出程序

PXVDI具有守护进程，连续按下操作键`ctrl + f4` 3次，即可退出守护进程，进入到桌面

### 4.2 网络连接

有线网卡
PXVDI 瘦客户端系统集成大部分主流的Linux驱动，并且开机dhcp获取ip，


无线WIFI

PXVDI 瘦客机系统截止目前没有可视化WIFI连接方法，未来会有，届时您将不会看到这句话。
 右击桌面空白处，点击设置网络
![PXVDI client](../img/thinos4.png)

点击左下角＋号，选择WIFI，点击创建。
![PXVDI client](../img/thinos5.png)

在SSID处输入WIFI名，在设备处选择WIFI硬件。
![PXVDI client](../img/thinos6.png)
随后点击WI-FI安全性，一般的WIFI，选择下图的认证即可，随后输入密码，并保存。
![PXVDI client](../img/thinos7.png)
不出意外，WIFI将会自动连接。

### 4.3 系统声音设置

必须要对系统层面的声音进行设置，才能够保证远程桌面能够有声音。

在桌面空白处，右击设置声音。

![PXVDI client](../img/thinos8.png)

声音设置页如下
![PXVDI client](../img/thinos9.png)

带锁的图标是锁定的意思，绿色图标是设为默认的意思，灰色带x的图标是音频静音图标。

如果有多个声卡，请前往配置中切换即可。

### 4.4 壁纸设置

请准备一个壁纸文件，jpg格式，替换掉/usr/share/bizhi.jpg文件，重新设置一下分辨率即可生效

### 4.5  系统分辨率设置

如果默认的分辨率不对，可以手动设置，默认提供了3个分辨率档次。
- 1920x1080@60
- 2560x1440@60
- 3840x2160@60

在桌面空白处右击，点击分辨率设置即可设置分辨率。
![PXVDI client](../img/thinos10.png)


如果是其他分辨率，请使用命令更改。
```
echo "1366x768" >/root/.screensetting
```
默认使用60刷新率，重新即可生效。
暂时不支持缩放设置，如果需要缩放设置，请手动使用xrandr配置

### 4.6 语言设置

在桌面空白处右击，点击lang setting就可以修改语言

![PXVDI client](../img/thinos11.png)

修改语言之后，不会重新生效，点击 `其他操作`-`重启桌面生效`

