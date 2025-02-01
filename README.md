# PXVDI
Proxmox VDI solution.

Pxvdi is a vdi client for proxmox ve. Power by lierfang.com.

We use proxmox-ve's api to obtain the ip address of the vm and then invoke an external program to connect to the virtual machine desktop through this ip address.

## Protocols
We support RDP/spice/horizon protocols.



## Dual management mode

PXVDI has two modes

### Direct connection mode

The client directly calls the api of Proxmox VE.User registration and permissions are managed by pve.

### Master control mode

We built a service application (pxvdi-server) that centrally manages the pve cluster, has independent permission management, and also supports external ldap.

The client requests our pxvdi-server api interface.

## Architecture

### Client

The desktop program is based on the tauri framework

    - PXVDI-linux
        - freerdp
        - remote-viewer
        - horizon client

    - PXVDI-Windows
        - tauri 
        - axmsrdp
        - remote-viewer
        - horizon client

    - PXVDI-Macos
        - tauri 
        - MacFreerdp
        - remote-viewer
        - horizon client

    - PXVDI-html
        - guacamole


## Notice

This repository hosts only documents