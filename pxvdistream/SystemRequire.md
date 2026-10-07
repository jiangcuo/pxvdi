# 系统兼容性

本页按远程控制、虚拟屏和远程会话分别列出系统支持范围。Windows 企业版、Windows Server 及其他版本的功能差异以对应表格为准；macOS 的会话限制见[会话模式](./Sessions.md)。

## Windows

### 桌面操作系统

| 操作系统 | 远程控制 | 虚拟屏 | 远程会话 |
|---|:---:|:---:|:---:|
| Windows 10 Enterprise LTSC 2019 | ✓ | ✗ | ✗ |
| **Windows 10 Enterprise LTSC 2021** | ✓ | ✓ | ✓ |
| Windows 11 Enterprise 21H2 ～ 25H2 | ✓ | ✓ | ✓ |
| **Windows 11 Enterprise LTSC 2024** | ✓ | ✓ | ✓ |
| Windows 10 / 11 专业版及家庭版 | ✓ | ✗ | ✗ |

### 服务器操作系统

| 操作系统 | 远程控制 | 虚拟屏 | 远程会话 |
|---|:---:|:---:|:---:|
| Windows Server 2019 | ✓ | ✗ | ✗ |
| **Windows Server 2022** | ✓ | ✓ | ✓ |
| **Windows Server 2025** | ✓ | ✓ | ✓ |

> 加粗行为推荐版本。

**说明：**

- **虚拟屏要求 Windows 10 1903 及以上版本**。更低版本（如 Windows 10 LTSC 2019、Windows Server 2019）无法使用虚拟屏，但仍可通过物理屏幕进行远程控制。
- 部署于服务器操作系统时，需启用**远程桌面会话主机**角色服务。

> **Windows 10 已于 2025 年 10 月 14 日终止支持。** 新部署建议优先选择 Windows 11 Enterprise LTSC 2024 或 Windows Server 2022 及以上版本。

## Linux

支持 x86_64、ARM64 与 LoongArch 三种体系结构，覆盖 openEuler、麒麟、统信等主流国产发行版，以及 Ubuntu、Debian、RHEL 系发行版。

要求 glibc 2.17 及以上；LoongArch 新世界需 glibc 2.36 及以上。

Linux 环境使用 X11。标准远程会话部署需要 **XRDP、xorgxrdp 和可用的桌面环境**：XRDP 负责系统账号认证和会话管理，xorgxrdp 提供独立的 X11 桌面与虚拟显示，PXVDIStream 负责捕获和串流。不使用 Wayland 作为该会话的捕获环境，也不受上述 Windows 版本限制。

具体安装、`rdsh=true` 配置和连接验证见[Linux 安装](./install.md#linux-安装)。无物理显示器的 Linux 主机同样按此流程部署。
