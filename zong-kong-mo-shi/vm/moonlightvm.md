# Moonlight 操作说明
Moonlight 是开源的游戏串流方案，目前PXVDI 服务端在1.0.5版本，客户端3.0.9版本支持了moonlight的连接。

## 安装要求

### 虚拟机要求

Sunshine需要使用硬件解码，建议在开启了vGPU的桌面上使用。

安装我们提供的Sunshine 程序。目前仅支持Windows

http://mirrors.lierfang.com/pxvdi/Extra/Sunshine-moonlight/Sunshine.exe

安装完了之后，打开`C:\Program Files\Sunshine\config`文件夹，复制`sunshine.conf`到桌面，然后用记事本编辑

加上下面这一行

```inf
apiserver = 10.13.16.249:3002
```

`10.13.16.249:3002` 请更换成服务端的地址。不要加https。

编辑好了之后，复制到`C:\Program Files\Sunshine\config`文件夹，覆盖掉原有的`sunshine.conf`。

随后重启sunshine服务或者重启虚拟机即可。

### 客户端要求

如果是Linux客户端，使用我们提供的瘦客机系统即可。

如果是Windows或者Macos，请前往 https://mirrors.lierfang.com/pxvdi/Extra/Sunshine-moonlight/ 下载。

Windows是zip，请解压zip文件，确保文件夹名为`Moonlight`,移动到C盘`C:\Program Files\`下面。一定要路径正确。如下

![](/img/moonlight.png)


如果是Macos客户端，直接拖到应用程序中即可。

