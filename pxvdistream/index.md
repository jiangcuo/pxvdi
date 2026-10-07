# PXVDIStream 文档

PXVDIStream 是桌面端串流服务，可部署在虚拟机或物理机上，并通过 PXVDI 平台交付或由客户端直接连接。本分区集中维护产品说明、运行要求和安装配置。

## 按任务阅读

| 任务 | 文档 |
| --- | --- |
| 了解产品架构和能力 | [技术白皮书](./README.md) |
| 确认操作系统与功能支持 | [系统兼容性](./SystemRequire.md) |
| 评估桌面端 CPU/GPU 和终端能力 | [硬件要求](./HardwareRequire.md) |
| 评估带宽、时延和丢包 | [网络要求](./NetworkRequire.md) |
| 选择远程控制或独立用户会话 | [会话模式](./Sessions.md) |
| 安装桌面端服务并配置平台地址 | [安装与配置 Agent](./install.md) |
| 部署 Linux 独立会话或无头主机 | [Linux 安装：XRDP 会话环境](./install.md#linux-安装) |
| 定制单一 Xvfb 桌面环境 | [手动 X11 桌面（高级参考）](./headless.md) |
| 脱离平台直接连接主机 | [独立直连](./direct.md) |

## 与其他文档的关系

**PXVDIStream** 负责桌面端安装、会话与协议能力；[桌面部署与接入](../zong-kong-mo-shi/vm.md)负责平台交付顺序和不同桌面来源的接入入口；[管理系统](../zong-kong-mo-shi/web/index.md)负责账号、桌面池和策略；[客户端使用说明](../client/Usage.md)负责用户终端的登录与连接操作。

安装步骤只在本分区维护。物理机、外部虚拟机与平台管理的虚拟机使用同一份安装说明，再按资源来源完成平台纳管。
