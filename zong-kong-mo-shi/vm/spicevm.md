# 虚拟机开启SPICE功能

## 安装SPICE组件
请下载spice-guest-tools-latest.exe

Spice组件在virtio-win 驱动中已经集成

## 修改SPICE显示器
在虚拟机中安装，安装结束之后在PXVIRT或者PXVDI页面上，将显示修改成SPICE专用（PXVDI）。

如果在PXVIRT页面上没有显示SPCIE，使用命令`qm set vmid  --vga qxl`

## 添加SPICE USB重定向

在虚拟机详情页添加USB设备，后端选择spice。有几个这样的usb就代表客户端支持多少个usb重定向

## 添加SPICE 声音重定向

在虚拟机详情页添加声卡，设备选择ich9-intel-hda 后端选择spice





