# Proxmox VE Virtual Machine Management

## Optimal Configuration for Virtual Machines

The configuration of virtual machines can vary widely, but we only recommend this specific configuration, as it has demonstrated the best performance and stability in our production environment.

| Configuration Items  | Type | Advantages  | Disadvantages | 
| ------- | ------ | ------ |------ |
| CPU  | host/max/default | This type can pass through CPU information to the virtual machine.  | Online migration between different CPUs may encounter issues. |
| BIOS | UEFI| UEFI supports Windows 11. If the VM is running Windows 7 or earlier, please do not select it.”   | Does not support VMs running Windows 7 or earlier. |
| vga 1 | Virtio-GPU | Virtio-GPU can provide better performance and supports access via SPICE, VNC, RDP, and other protocols. | Virtio-GPU does not support Windows 7, and drivers need to be installed on the VM.|
| vga 2 | spice | In a SPICE scenario, it can provide better performance. Supports SPICE, RDP, and VNC.| equires the VM to install drivers and needs a SPICE client. |
| vga 3| Nvidia vGPU  | Applicable in scenarios using Nvidia vGPU. Provides vGPU functionality. Supports SPICE, RDP, and VNC | Requires Nvidia vGPU drivers.|
| SCSI controller                 | VirtIO SCSI single                                           | provides better I/O throughput                                    | Description |
| Disk type                       | SCSI                                                         | provides better I/O throughput and supports hot-swapping.                   | Description |
| Network Card                       | virtio                                                       | provides better I/O throughput                                    | Description |
| EFI disk                   | pre-enroll keys key                                                   | Provides secure boot                                          | The operating system within the VM needs to support secure boot. |
| TPM                        | 2.0                                                          | Provides TPM devices.                                          | Snapshots require the storage to be block storage, such as LVM-thin, ZFS, or CEPH. |
| USB                        | spice                                                        | Provides a virtual USB for SPICE usage.                        |  |
|Other configurations (located in the VM options page).| 
| Qemu-ga   | Must be enabled.  | Provides communication interfaces between Proxmox VE and virtual machines. | QEMU Guest Agent needs to be installed inside the VM.|
| OSType                     | Must be selected correctly.                                                     | Proxmox VE will optimize the configuration based on the OS type.                    |  |
| SPICE增强                  | Needs to be enabled.                                                    | Using SPICE enhances performance, such as folder sharing and video streaming. | Requires more bandwidth. |
| KVM hardware virtualization.             | Must be enabled.                                                     | Provides KVM hardware acceleration.                                       | 
 |


### 1. CPU configuration.
| Type   | Value   | Description                                                                                                                          |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| socket   | 1    | This is the physical number of CPUs; if it is 1, it represents a single socket, and if it is 2, it represents a dual socket. Recommended value is 1.                                                                  |
| cors   | 4    | This is the maximum number of CPUs in the system; for example, if set to 4, it represents 4 cores.                                                                                     |
| type   | default | Default provides the best compatibility, refer to guide[https://foxi.buduanwang.vip/virtualization/599.html/](https://foxi.buduanwang.vip/virtualization/599.html/) |
| other | default | Some advanced options may have adverse effects if not understood; it is recommended to stick with the defaults.                                                                                |

### 2. Memory configuration.

| Type          | Value   | Description                                                                                                                        |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Memory          | 8192 | Unit: MB, total memory size                                                                                                           |
| Ballooning | off | Memory ballooning allows you to allocate a certain amount of memory initially. If the host runs low on memory, it can reclaim memory from the virtual machine. You can enable it to save memory, but for stability, it is recommended not to enable it. |

> Note that the ballooning device does not allocate memory based on usage; it initially provides all the allocated memory, and only reclaims it if the host runs low on memory.

### 3. BIOS
| Value   | Description                              |
| ------ | ------------------------------------- |
| OVMF | Modern UEFI BIOS models support Secure Boot. |

### 4. vga
| Value     | Description                                                                                    |
| -------- | ------------------------------------------------------------------------------------------ |
| virtio | This is the optimal option.                                                                           |
| spice  | SPICE connection requires                                                                   |
| mdev   | When using Nvidia vGPU, the web console will display the vGPU output. (This feature is unofficial and available only with PXVIRT. )|


### 5. Machine
| Type | Description                           |
| ------ | --------------------------------- |
| q35  | Q35 is a modern motherboard model with PCIe support. |

### 6. Scsi Controller

| Type               | Description                                                                                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| VirtIO SCSI Single | Paravirtualization offers the best performance. Note that in Windows virtual machines, you need to install the disk controller driver. Reference[https://foxi.buduanwang.vip/virtualization/pve/1214.html/](https://foxi.buduanwang.vip/virtualization/pve/1214.html/) |


### 7. Disk device

| Type     | Value   | Description                                                            |
| ---------- | ------ | -------------------------------------------------------------------- |
| Device Type | SCSI | Using SCSI can provide better performance and hot-swapping support. You need to install the disk controller driver. |
| SSD Emulation  | enable | Once enabled, the disk is recognized as an SSD by the system and supports TRIM.             |
| TRIM     | enable | Enabling TRIM allows the system to periodically perform low-level disk cleanup to save more disk space.       |


### 8. Network Card

| Type   | Description                                                   |
| -------- | ----------------------------------------------------------- |
| VirtIO | Paravirtualization offers the best performance. Note that in Windows virtual machines, you need to install the network card driver. |


### 9. EFI Disk

Under the OVMF BIOS, EFI disks can store some BIOS configuration information. If not configured, a warning will be issued. 

| Type       | Description                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------- |
| pre-enroll keys  |Once enabled, Secure Boot will be activated, and some systems that do not support Secure Boot will fail to start. If it is an ARM virtual machine, please do not add it.|


### 10. TPM

| Type | Description            |
| ------ | ------------------- |
| v2.0 | v2.0 is the new standard for TPM (Trusted Platform Module). |

>Note! After adding TPM, the virtual machine only supports snapshots when using block storage.


### 11. Qemu Guest Agent

| Type                 | Value   | Description                                             |
| ---------------------- | ------ | ---------------------------------------------------- |
| Qemu Guest Agent | enable | This option must be enabled; it is a necessary procedure for communication between Proxmox VE and the virtual machine. |

### 12. OS type

PXVDI will read the value of ostype and perform targeted optimizations.

| Type                 |  Description                                             |
| ----------------------  | ---------------------------------------------------- |
| ostype < win8.1 | PXVDI will use RDP encryption to establish the connection |
| ostype >= win8.1 | PXVDI will use NLA (AD mode) and TLS encryption to establish the connection.|



## PXVDI and Virtual Machine System Compatibility

| OS                | Windows10/windows11                   | Windows8.1  | Windows7 | WindowsXP |
| --------------------- | --------------------------------------- | ------------- | ---------- | ----------- |
| Freerdp（ad mode）   | Support                                  | Support        | Support     | Support      |
| Freerdp（non-ad mode） | Need to disable NLA authentication.                       |
| Spice               | Support                                  | Support | Support | Support |
| Horizon             | https://kb.vmware.com/s/article/78714 | Not support | Not support | Not support |

## Download materials

1. Windows ISO can be downloaded from 

https://msdn.itellyou.cn

2. Windows KVM drivers can be downloaded here.

https://download.lierfang.com/proxmox/drivers/

3. Spice guest tools

https://download.lierfang.com/proxmox/drivers/spice-guest-tools-latest.exe
