# 软件源

PXVDI 支持使用软件源来安装业务，例如客户端、服务端。

仅支持debian12系统，包括架构 arm64 amd64 armhf(嵌入式)

## 添加apt key

```bash
curl -L https://download.lierfang.com/pxcloud/lierfang.gpg -o /etc/apt/trusted.gpg.d/lierfang.gpg

```

## 添加源

```bash
echo "deb https://download.lierfang.com/pxcloud/pxvdi bookworm main" > /etc/apt/sources.list.d/pxvdi-sources.list
```

## 安装组件

客户端
```bash
apt update 
apt install pxvdi freerdp2-x11 freerdp3-x11 pxvdi-gtk

```

服务端
```bash
apt update 
apt install pxvdiserver 
```