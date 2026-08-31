## 1. 瘦客户端硬件要求

### CPU 要求

|协议|架构|目标效果|系统|最低要求|备注|
|-|-|-|-|-|-|
|rdp|x86_64|1080@60|windows|j1800+|需要windows 1809+以上的系统|
|rdp|x86_64|2k@60|windows|j1800+|需要windows 1809+以上的系统|
|rdp|x86_64|1080@60|linux|j4125+|视频播放较为流畅|
|rdp|x86_64|2k@60|linux|j4125+|视频播放较为流畅|
|rdp|x86_64|4k@60|linux|j4125+|视频播放较为流畅|
|rdp|aarch64|1080@60|linux|4核A72|视频播放卡顿|
|rdp|aarch64|2k@60|linux|4核A72|视频播放卡顿|
|rdp|aarch64|4k@60|linux|8核A72|视频播放卡顿|
|rdp|loongarch64|1080@60|linux|3k3000||
|rdp|loongarch64|2k@60|linux|3k3000||
|rdp|loongarch64|4k@60|linux|3k3000||
|pxvdistream&moonglight|x86_64|1080@60|windows|j1800+|需要windows 1809+以上的系统|
|pxvdistream&moonglight|x86_64|1080@60|windows|j1800+|需要windows 1809+以上的系统|
|pxvdistream&moonglight|x86_64|2k@60|windows|j1800+|基本流畅|
|pxvdistream&moonglight|x86_64|4k@60|windows|j4125+|流畅|
|pxvdistream|x86_64|1080@60|linux|x5-Z8350+|流畅|
|pxvdistream&moonglight|x86_64|2k@60|linux|j1800+|基本流畅|
|pxvdistream&moonglight|x86_64|4k@60|linux|j4125+||
|pxvdistream|aarch64|1080@60|linux|4核A55(rk3568)||
|pxvdistream|loongarch64|1080@60|linux|3k3000||
|pxvdistream|loongarch64|4k@60|linux|3k3000||
|horizon|x86_64|1080@60|windows|j1800+||
|horizon|x86_64|1080@60|linux|j1800+||
|horizon|x86_64|2k@60|windows|j1800+||
|horizon|x86_64|2k@60|linux|j1800+||
|horizon|x86_64|4k@60|windows|j4125+||
|horizon|x86_64|4k@60|linux|j4125+||

备注

针对pxvdistream&moonglight，瘦客户端的解码性能或者CPU性能越强，延迟就会更低！上表是在一个可以接受的延迟范围内的最低要求！

### 内存要求

Linux系统 >=1G。
Windows系统 >=2G。

### GPU要求

- 支持vaapi解码。
- 支持rockchip mpp解码