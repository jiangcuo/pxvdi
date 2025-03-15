在 PXVDI 服务端创建虚拟机 和 在 PXVIRT 创建虚拟机完全兼容。

在PXVIRT创建虚拟机时，请务必都选Qemu代理，如若没有勾选，请去虚拟机的选项中打开。

这里为大家演示一下PXVDI服务端创建Windows11虚拟机的过程。


# 基本设置

![alt text](../../img/servercreatevm1.png)

选择对应的节点，输入虚拟机的名称（可以中文），选择架构，机型选择。

# 硬件

![alt text](../../img/servercreatevm2.png)

这里CPU输入数量，内存输入数量，注意内存大小为G。系统类型选择win11，bios选择ovmf，同时开启安全启动和TPM用于Windows11 安装。

# 磁盘

![alt text](../../img/servercreatevm3.png)

磁盘控制器选择默认的`VirtIO控制器`

磁盘类型选择scsi，选择对应的存储池和大小。大小是以G为单位


![alt text](../../img/servercreatevm4.png)

这里添加2个光驱，光驱0和光驱1。

光驱0是windows的iso，光驱1是驱动iso。


# 网络

在网络处选择对应的网桥，即可，注意如果是Windows11，强制要求联网安装，硬件类型选择e1000.


![alt text](../../img/servercreatevm5.png)

# 完成

![alt text](../../img/servercreatevm6.png)

没问题即可点击完成。


# 开机

![alt text](../../img/servercreatevm7.png)

点开机键即可开机。

随后打开控制台，会出现Press any key to boot from cdrom

![alt text](../../img/servercreatevm8.png)

此时一定要按任意键，触发启动iso，否则会提示启动失败，如下图

![alt text](../../img/servercreatevm9.png)

如果未及时触发，请发送ctrl alt del键重启

![alt text](../../img/servercreatevm10.png)

# 进入安装流程

选择对应的Windows版本

![alt text](../../img/servercreatevm11.png)

选择自定义安装

![alt text](../../img/servercreatevm12.png)

默认是没有驱动程序的，请点击加载驱动程序

![alt text](../../img/servercreatevm13.png)

导航到驱动光盘，找到amd64，找到win11并确定。安装程序会自己搜索驱动

![alt text](../../img/servercreatevm14.png)

选中驱动，点击下一页

![alt text](../../img/servercreatevm15.png)

驱动加载完毕之后，就能认到硬盘了。

![alt text](../../img/servercreatevm16.png)

之后和windows安装步骤一样。

如果虚拟机需要联网，且不能安装驱动，请打开虚拟机详情，添加一个e1000的网卡

![alt text](../../img/servercreatevm17.png)

# 安装Windows驱动

打开任务管理器，找到驱动光盘

![alt text](../../img/servercreatevm18.png)

双击Virto-win-guest-tools.exe文件，即可安装所有驱动

![alt text](../../img/servercreatevm19.png)

此时虚拟机的安装完成。对于虚拟机如何配置，请参考其他内容

如果没有意外，虚拟机详情页可以显示虚拟机的ip.

![alt text](../../img/servercreatevm20.png)

