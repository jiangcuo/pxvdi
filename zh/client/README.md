# PXVDI 客户端架构

PXVDI使用高性能的rust框架，支持多种架构和操作系统。

![PXVDI client](../img/client1.png)


## PXVDI 客户端组件
下面是pxvdi客户端需要的组件

| 系统      | 组件        | 版本 | 调用路径   |
| ----------- | ------------- | ------ | ------------------------------------------------------------------------- |
| Linux     | Freerdp     | 2    | /usr/bin/xfreerdp                                                       |
| Linux     | Freerdp     | 3    | /usr/bin/xfreerdp3                                                      |
| Linux     | virt-viewer | 11   | /usr/bin/remote-viewer                                                  |
| Linux-Uos | Freerdp     | 2    | /opt/apps/com.lierfang.pxvdi/files/pxvd-xfreerdp                        |
| Windows   | Freerdp     | 2    | ./pxvdirdp.exe            |
| Windows   | Freerdp     | 3    | ./pxvdirdp.exe|
| Windows   | virt-viewer | 11   | `C:\Program Files (x86)\VirtViewer v10.0-256\bin\remote-viewer.exe` |
| Macos     | Freerdp     | 3    | /Applications/MacFreeRDP.app/Contents/MacOS/sdl-freerdp    |
| Macos     | virt-viewer | 11   | /usr/local/bin/remote-viewer                                            |

## PXVDI 客户端版本

| 版本名称    | 版本说明          |
| ----------------- | -------------------------------- |
| pxvdi\_{version}\_amd64.AppImage      | 适用于兆芯、海光、intel、amd、via等x86\_64架构的Linux通用包。                         |
| pxvdi\_{version}\_arm64.AppImage      | 适用于瑞芯微、飞腾、鲲鹏、ampere、博通等arm64架构的Linux通用包。                      |
| pxvdi\_{version}\_debian12\_amd64.deb | 适用于兆芯、海光、intel、amd、via等x86\_64架构的debian12 包括armbian bookworm包。     |
| pxvdi_{version}\_debian12\_arm64.deb | 适用于瑞芯微、飞腾、鲲鹏、amperes、博通等arm64架构的debian12 包括armbian bookworm包。 |
| pxvdi_{version}\_live\_amd64.iso     | 适用于兆芯、海光、intel、amd、via等x86\_64架构的瘦客户端系统。                        |
|pxvdi_{version}_arm64.dmg|适用于macos apple芯片，版本>= macos 12

## PXVDI 客户端支持的模式

| 平台    | 支持情况          |
| ----------------- | -------------------------------- |
| Linux      | 直连模式和总控模式 自由切换                         |
| Windows     |           总控模式          |
| MacOS | 总控模式  

## 下载地址
https://download.lierfang.com/pxvdi/Client/


