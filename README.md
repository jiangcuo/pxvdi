---
description: Proxmox VDI solution.
---

# PXVDI

Pxvdi is a vdi client for proxmox ve. Power by lierfang.com.&#x20;

We use proxmox-ve's api to obtain the ip address of the vm and then invoke an external program to connect to the virtual machine desktop through this ip address.

We support RDP/spice/horizon protocols.

### PXVDI has two modes

#### &#x20;Direct connection mode

The client directly calls the api of Proxmox VE.User registration and permissions are managed by pve.&#x20;

#### Master control mode

We built a service application (pxvdi-server) that centrally manages the pve cluster, has independent permission management, and also supports external ldap.&#x20;

The client requests our pxvdi-server api interface.

### &#x20;Architecture&#x20;

The desktop program is based on the tauri framework

PXVDI-Desktop&#x20;

* freerdp&#x20;
* remote-viewer&#x20;
* horizon client
* axmsrdp (Windows)

PXVDI-html

* &#x20;guacamole

