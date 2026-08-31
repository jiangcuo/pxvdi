# Moonlight 操作说明
Moonlight 是开源的游戏串流方案，目前PXVDI 服务端在1.0.5版本，客户端3.0.9版本支持了moonlight的连接。

## 安装要求

### 虚拟机要求

Sunshine需要使用硬件解码，建议在开启了vGPU的桌面上使用。

安装我们提供的Sunshine 程序。目前仅支持Windows

https://mirrors.lierfang.com/pxcloud/pxvdi/Extra/Sunshine-moonlight/

安装完了之后，打开`C:\Program Files\Sunshine\config`文件夹，复制`sunshine.conf`到桌面，然后用记事本编辑

加上下面这一行

```inf
apiserver = 10.13.16.249:3002
```

`10.13.16.249:3002` 请更换成服务端的地址。不要加https。

编辑好了之后，复制到`C:\Program Files\Sunshine\config`文件夹，覆盖掉原有的`sunshine.conf`。

随后重启sunshine服务或者重启虚拟机即可。

如果是原版PVE或者是其他的VM，请再加一行

`uuid=xxxxx` 这个uuid必须和虚拟机uuid（pxvirt）或者smbios uuid(原版pve)一致，否则无法连接

### 客户端要求

使用最新客户端
