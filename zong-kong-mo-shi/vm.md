# 桌面部署与接入

本章说明如何准备桌面资源，并通过 PXVDI 平台交付给用户。桌面可以来自 PXVIRT/PVE 虚拟机，也可以是已有虚拟机或物理机。

## 部署顺序

1. 准备桌面操作系统，确认所用连接方式的系统、硬件与网络要求。
2. 安装对应的桌面端服务。使用 PXVDI 协议时，按照[PXVDIStream 安装说明](../pxvdistream/install.md)部署 Agent。
3. 将资源纳入平台：平台虚拟机从虚拟机模块管理；其他来源通过[外部桌面](./web/external-desktop.md)纳管。
4. 准备[用户](./web/user.md)，创建[桌面池](./web/pool.md)，添加桌面并分配用户或配置共享池授权。
5. 使用[桌面客户端](../client/Usage.md)验证资源可见性、连接和所需重定向功能。

## 按资源来源选择入口

| 资源来源 | 操作入口 |
| --- | --- |
| 新建 PXVIRT/PVE 虚拟机 | [创建虚拟机](./vm/createvm.md) → 安装桌面端服务 → [桌面池管理](./web/pool.md) |
| 已有 VMware、Hyper-V、KVM 虚拟机或物理机 | [安装 PXVDIStream Agent](../pxvdistream/install.md) → [外部桌面](./web/external-desktop.md) |
| 多用户会话桌面 | [会话模式](../pxvdistream/Sessions.md) → [系统兼容性](../pxvdistream/SystemRequire.md) → [共享会话桌面池](./web/shared-pool.md) |
| Linux 独立会话或无头主机 | [XRDP 与 Agent 安装](../pxvdistream/install.md#linux-安装) → 纳入平台 → [桌面池管理](./web/pool.md) |
| 批量交付的模板桌面 | [模板虚拟机管理](./vm/templatevm.md)及管理系统中的模板管理 |

## 按连接方式查找部署说明

协议比较统一维护在[认识多种连接方式](../lian-jie-xie-yi.md)。本章提供对应部署入口：

| 连接方式 | 部署说明 |
| --- | --- |
| PXVDIStream | [安装与配置 Agent](../pxvdistream/install.md)；运行要求、会话模式和独立直连统一见[PXVDIStream 分区](../pxvdistream/index.md) |
| RDP | [配置 RDP 服务](./vm/rdpvm.md) |
| SPICE | [SPICE 部署（旧版方案）](./vm/spicevm.md) |
| Moonlight | [Moonlight 部署（旧版方案）](./vm/moonlightvm.md) |

安装服务不等于完成桌面交付。平台中的资源关联、用户授权和策略以[管理系统使用指南](./web/index.md)为准。
