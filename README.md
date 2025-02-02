---
description: Proxmox VE 桌面虚拟化解决方案
---

# PXVDI

PXVDI是基于Proxmox VE为底层的桌面虚拟化产品，由梨儿方开发维护。

我们利用Proxmox VE API获取虚拟机的ip，调用外部的程序去访问到虚拟机。

支持 RDP/spice/horizon 3重协议。

### PXVDI 双模式

#### 直连模式

客户端直接和Proxmox VE api互通，支持快照、自动开机、还原等额外功能功能

#### 总控模式

我们开发了一套后台管理系统，用于管理Proxmox VE集群，同时支持外部的用户认证，用户账号自动注册，批量管理等多功能。

客户端请求服务端的API，用户权限、虚拟机资源、连接协议由服务端控制

### 软件架构 

桌面客户端基于tauri框架。

PXVDI-Desktop 组件

* freerdp
* remote-viewer
* horizon client
* axmsrdp (Windows)

PXVDI-html

* guacamole

