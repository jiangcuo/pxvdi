# Pxvdi Hyperv Client

## 下载

前往`https://download.lierfang.com/pxvdi/Client/windows/`,下载`pxvdi-hyperv-client.exe` 程序


## 兼容的系统

本程序使用.net4编写，理论上win8.1以上原生支持

win7请安装.net4 或者直接安装所有的补丁。

建议最低的系统为Win8.1,以便拥有更好的RDP性能

## 安装

双击exe即可安装，安装完会创建一个Pxvdi-Client的快捷方式。

## 使用

### 设置页

在登陆页按CTRL + ALT + K 即可打开设置页面

服务器地址填写 服务端的地址，如果服务端开启了https，那么就是https://xxxx:9921，否就是http://xxxx:9921。默认没有开启


1. 全屏
    
    开启之后，会全部使用全屏

2. 增强模式

    以增强模式连接到HyperV 会话。需要Guest为Windows8.1 以上为二代虚拟机之上才能启用，如果`增强模式`进不去系统，请取消`增强模式`。

3. 首选连接方式 - 控制虚拟机内页，`RDP连接`的默认方式

    RDP连接，使用RDP连接到虚拟机，需要提供虚拟机的账号密码。
    
    控制台连接，连接到HyperV控制台，直接登陆

4. RDP工具

    axrdp 程序集成的rdp工具。在窗口模式下，可以调整桌面的分辨率。

    mstsc 系统的调用。如果是控制台连接,
    
    freerdp 未来会增加这个选项，以在Windows7的客户机上提高rdp性能。

### 虚拟机内页

在虚拟机内页，可以查看到虚拟机的状态，通过`刷新`按钮刷新页面。`修改密码`可以更新用户信息

用户可以点击电源管理。对虚拟机进行强制开关机等电源操作。


## 客户端信息自定义

程序默认的配置文件位于 `"C:\Users\{USERNAME}\pxvdiconfig.ini"` 用户的主配置文件中

```ini
[Settings]
Username=admin
Password=
Fullscreen=False
Server=http://127.0.0.1:9921
Welcome=欢迎使用云桌面！
Footer=成都市梨儿方信息技术有限责任公司
SaveUser=True
EnhanceMode=True
Version=1.0
RdpSecurityMode=1
PreferredConnection=console
RdpTool=axrdp
```

其中Welcome和Footer都可以自定义。

## 开机启动

按 Win + R 打开运行，输入`shell:startup`把要`pxvdi-client`的快捷方式放到打开的窗口中即可。此方法是打开`开始菜单-程序-启动文件夹`。
