---
description: Proxmox VE desktop virtualization solution
---

# PXVDI

PXVDI is a desktop virtualization product based on Proxmox VE, developed and maintained by Lierfang. We utilize the Proxmox VE API to retrieve virtual machine IP addresses and invoke external programs to access the virtual machines. It supports three protocols: RDP, SPICE, and Blast.

### PXVDI two working modes

#### Direct connection mode

The client communicates directly with the Proxmox VE API, supporting additional features such as snapshots, automatic startup, and restoration.

#### Central control mode

We have developed a backend management system for managing Proxmox VE clusters, which also supports external user authentication, automatic user account registration, batch management, and other functionalities.

The client requests the server's API, with user permissions, virtual machine resources, and connection protocols controlled by the server.

###  Architecture


The desktop client is based on the Tauri framework.

PXVDI-Desktop Components

* freerdp
* remote-viewer
* horizon client
* axmsrdp (Windows)

PXVDI-html

* guacamole

