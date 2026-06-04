# 信创与国产化兼容

PXVDI 面向自主可控场景设计，从 CPU 架构、操作系统、GPU 到终端设备，提供端到端的国产化适配。本页汇总完整的兼容矩阵，便于在政企、教育等信创采购场景中直接选型。

## CPU 架构

PXVDI Server 同时提供 Debian 系（deb）与 RHEL 系（rpm）安装包，覆盖主流国产与通用架构：

| 架构 | 适用处理器示例 | deb | rpm |
| --- | --- | --- | --- |
| x86 / c86 | Intel、AMD、海光 | 支持 | 支持 |
| arm64 | 鲲鹏、飞腾 | 支持 | 支持 |
| loongarch64 | 龙芯 3C5000 | 支持 | 支持 |
| riscv64 | riscv64 系列机器 | 支持 | 支持 |

> 安装包下载与部署步骤参考 [PXVDI 安装](./web/install.md)。

## 操作系统

- 服务端：Debian 12 / 13、openEuler 24、麒麟、统信。
- 虚拟桌面：Windows、各国产及开源 Linux 发行版（具体版本以 PXVDIStream 等协议组件的系统要求为准）。

## GPU 与 vGPU

PXVDI 不锁定单一 GPU 厂商，支持国产与主流 vGPU 方案以及物理直通：

| GPU 类型 | 支持情况 |
| --- | --- |
| 摩尔线程 | 支持（x86_64 / aarch64） |
| Intel SR-IOV | 支持 |
| AMD vGPU | 支持 |
| NVIDIA vGPU | 支持（含 L40S / L40 / L4 / A 系列 / Tesla 等完整型号列表） |
| 物理 GPU 直通 | 支持 |

不同架构、系统与 GPU 组合下可用的连接协议有所差异，完整对照与 NVIDIA vGPU 型号清单参考 [GPU 桌面](./deploy/gpu.md)。

## 瘦终端

PXVDI 瘦客户端使用 Rust 开发，资源消耗低，覆盖国产与嵌入式架构：

- 支持 arm64、amd64、riscv64、loongarch64。
- 即便在 RK3566 等低功耗嵌入式设备上也能流畅使用。
- 配合 PXVDIStream 的嵌入式系统包，可利用嵌入式 GPU 做硬件解码，在极低配置终端上获得良好体验。

> 终端形态与硬件要求参考 [客户端文档](../client/README.md)。

## 国产化闭环总结

| 层级 | 国产化覆盖 |
| --- | --- |
| 芯片 | 龙芯、鲲鹏、飞腾、海光、riscv64 |
| 操作系统 | openEuler 及国产 Linux 发行版 |
| GPU | 摩尔线程、Intel SR-IOV、AMD、物理直通 |
| 终端 | arm64 / riscv64 / loongarch64 瘦终端，含嵌入式设备 |

从底层芯片到桌面交付终端，PXVDI 提供完整的国产化技术栈，满足自主可控的采购与建设要求。
