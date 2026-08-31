# PXVDIStream 操作说明

PXVDIStream 是我们自研的一个串流工具，可以完整的发挥CPU和GPU性能，在多媒体场景中，可以获得更好的体验，例如视频，ppt放映。剪映，直播等。还可以进行云游戏，如饥荒等单机游戏。即便虚拟机不带GPU，我们也可以实现60fps 低延迟高性能远程。

相比其他的远程工具，我们深度将PXVDIStream 和PXVDI 结合起来，远程权限全部由PXVDI 管理平台管理。

同时PXVDIStream 和我们的新版本客户端v4.0 完美结合，实现了PC\手机\平板\WEB的共同兼容，我们同时还提供嵌入式的系统包，利用嵌入式的GPU进行硬件解码，在极低的配置中，我们也可以获得更好的性能体验！

PXVDIStream原生支持外网映射，通过部署我们的PXVDI HTML5组件 即可完成网页版访问和外网连接，更加的简单易用


## 产品架构

在Windows上我们使用dxgi进行屏幕捕获，
在Linux上，我们支持x11 和drm捕获，默认以root权限进行drm捕获。

最后通过gstreamer 进行编码使用硬件编码或者openh264进行编码串流

声音部分需要用户在后台中添加一个声卡，选择spice或者none，或者在系统中创建虚拟声卡！否则将没有声音！

### 进程模型
在进程模型中！PXVDIStream支持双进程模式，针对Linux和Windows，PXVDIstream做为系统服务，常驻内存。

当收到连接请求时，PXVDIstream会fork出一个子进程，子进程负责处理连接请求，PXVDIstream则负责处理其他请求，比如新连接或者和PXVDI server通信。

用户断开连接，这个子进程会自动退出。

## 注意！

PXVDIStream是一个依赖硬件编码的协议，如果虚拟机内部没有硬件编码器，那么编码任务会全部由CPU承担，在1080@60的场景中，约会消耗2个CPU的性能（以e5-2670v4为基准）。如果由vGPU设备承担编码，则会降低至0.2-0.4个CPU（以e5-2670v4为基准）的使用率！

如果没有硬件编码且CPU资源紧张，请勿使用pxvdistream协议。

## PXVDIStream 支持的系统

|系统|架构|最低系统版本|
|-|-|-|
|windows10| x86_64 | 1809 |
|windows11| arm64 | 24h2 |
|开源系统|
|Ubuntu| x86_64 |  20.04 |
|Ubuntu| arm64 |  20.04 |
|debian| x86_64 |  11 |
|debian| arm64 |  11 |
|debian| riscv64 |  13 |
|debian| loongarch64 |  13 |
|openeuler| x86_64 | 2203|
|openeuler| arm64 |  2203 |
|openeuler| loongarch64 |  2203 |
|Fedora|x86_64| 42|
|Fedora|arm64| 42|
|商业系统|
|UOS| x86_64 |  1070 |
|UOS| arm64 |  1070 |
|UOS| loongarch64 |  1070 |
|Kylin| x86_64 |  v10 |
|Kylin| arm64 |  v10 |
|Kylin| loongarch64 |  v10 |
|MacOS| arm64 | sonoma |

Linux 系统使用Appimage构建，基本兼容现代主流的linux，如果需要适配目标的linux或者bsd，请联系商务进行处理

## PXVDIStream 虚拟机GPU要求

|系统类型|GPU类型|状态|
|-|-|-|
|windows|virtio-gpu|支持|
|windows|nvidia-vgpu|支持|
|windows|intel-vgpu|不支持|
|windows|直通|不支持|
|linux|virtio-gpu|支持|
|linux|其他|不支持|

## PXVDIStream 各客户端硬件解码支持状态

某些平台不支持硬件解码，因此体验不是很好。这个问题会在以后完善硬件解码！

在不受支持的硬件解码平台上，建议使用web访问！

|系统类型|GPU类型|状态|
|-|-|-|
|windows|amd|仅sdl客户端支持|
|windows|nvidia|仅sdl客户端支持|
|windows|intel|仅sdl客户端支持|
|linux|any|sdl客户端支持|
|andriod|any|支持硬件解码|
|ios|any|支持硬件解码|
|macos|any|支持硬件解码|

## PXVDIStream 下载和安装

### 下载地址

https://mirrors.lierfang.com/pxcloud/pxvdi/PxvdiStream


## Windows 安装

## 安装PxvdiStream

https://mirrors.lierfang.com/pxcloud/pxvdi/PxvdiStream/

文件名为pxvdistream---版本号

随后直接双击即可，一直下一步即可

此时打开浏览器 ，输入https://127.0.0.1:9923

![alt text](../../img/pxvdistream4.png)

这样出现404，就代表服务安装成功

### 配置pxvdiserver地址

进入以下路径

`C:\Program Files (x86)\lierfang\pxvdistream`

将 `pxvdistream.conf` 复制到桌面，然后编辑，

![alt text](../../img/pxvdistream5.png)

去掉apiserver前的`#`号。 后面改成pxvdiserver的地址

例如你的pxvdiserver地址为 https://192.168.1.250:3002 这样访问的，你就填

```
apiserver=192.168.1.250:3002
```

重启系统就完成了

如果你是外部桌面，可以直接指定 uuid={随机UUID}，在平台中添加这个UUID即可完成外部桌面的配置


## Linux 安装

### Linux前置要求

Linux 分为2种捕获模式，一种为x11捕获，一种为drm捕获。

|捕获类型|性能|声音捕获|权限要求|登录画面|wayland支持|
|-|-|-|-|-|-|
|drm|高|无声音|root|支持|支持|
|x11|一般|声音|普通用户|不支持|不支持|

x11 是指使用xserver环境，一般的国产系统，如uos kylin还有debian基本用的都是xserver，比较现代的例如Ubuntu 25 和 fedora 等用的是wayland

如果桌面用的是waylan的，那么只能使用root权限运行 drm模式，也不支持声音捕获。

如果桌面用的是x11，那么既支持drm，又支持x11。


普通用户的x11，只能由普通用户发起进程，请勿用root发起进程。

由于x11 无法捕获登录窗口输入账号密码那个页面，所以需要设置自动登录到桌面

如果没有声音要求，建议使用 drm捕获，性能更好


下载地址

https://mirrors.lierfang.com/pxcloud/pxvdi/PxvdiStream/

请选择对应的架构下载

|架构 |常见cpu|
|-|-|
|x86_64| intel amd 海光 兆芯|
|aarch64| 飞腾 鲲鹏 |
|loongarch64| 龙芯|


软件包均为appimage格式，特殊的国产系统，我们深度适配包，请联系销售获取


这里以ubuntu 22 x86_64 架构  为例 

下载pxvdistream-{version}-common_x86_64.AppImage

添加可执行权限
```
chmod +x pxvdistream-1.0.0-common_x86_64.AppImage
```
复制到bin目录

```
mv pxvdistream-1.0.0-common_x86_64.AppImage /usr/bin/pxvdistream
```

执行安装
```
pxvdistream install
```

### 以drm方式捕获

配置文件在用户的主目录下，`~/.lierfang/pxvdistream.conf`

和Windows一致

```
apiserver=192.168.1.250:3002
display-mode=drm
```

修改之后，重启一下虚拟机，即可生效


### 以x11 用户模式捕获

配置文件在用户的主目录下，`~/.lierfang/pxvdistream.conf`

和Windows一致

```
apiserver=192.168.1.250:3002
display-mode=x11
```

修改之后，重启一下虚拟机，即可生效

## 使用容器——以Linux 无头模式部署

#### 优势
针对LXC 和 Docker 用户，PxvdiStream 支持无头模式部署，使用容器技术，可以极大的节省CPU 和内存开销，还能共享主机硬件，如nvidia,intel-gpu等，同时也有很好的隔离性，也可以作为Linux桌面使用。

#### 限制

1. 无法使用任何外置设备！ 这是容器的限制！因此usb重定向是不可用的！

#### 部署

无头模式需要使用xvfb，请先安装xvfb。

另外管理员可以选择用户需要的桌面类型！目前较为简单的是

- LXDE
- LXQt
- XFCE4 

例如ubuntu
```
apt update
apt install lxde xorg xserver-xorg-input-all pulseaudio -y
```

这时候创建一个启动脚本，用于启动桌面环境

```
#!/bin/bash
pulseaudio --start &

pactl load-module module-null-sink sink_name=virtmic \
    sink_properties=device.description=Virtual_Microphone_Sink

pactl load-module module-remap-source \
    master=virtmic.monitor source_name=virtmic \
    source_properties=device.description=Virtual_Microphone

export DISPLAY=:99
Xvfb :99 -screen 0 1920x1080x24 &
sleep 2
startlxde &
```

可以把最后的startlxde 替换为其他桌面环境，如startxfce4

之后 请参考上文 将pxvdistream 作为`x11` 捕获，即可完成部署！

容器仅支持使用外部桌面管理！


## USB重定向部署

PXVDIStream 通过SPICE完成USB重定向，如果要实现USB重定向，需要为虚拟机配置多个USB设备，后端选择spice。同时在连接协议处，配置SPICE代理地址。

## 直连模式

PXVDIStream 也支持直连模式，通过pxvdistreamclient直接连接到pxvdistream server。 pxvdistreamclient 位于 pxvdi 同样的目录当中！

请在配置文件中加入
```
username=admin
password=123456
```
即可配置完成。

使用pxvdistreamcient --address youip --username admin --password 123456 即可连接。

额外的参数 --fps 60|120|144  --bitreate 10|20|50（码率单位为M）

## 额外的参数

管理员可以执行命令 `pxvdistream --help` 查看所有参数
