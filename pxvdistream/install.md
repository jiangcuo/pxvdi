<script setup>
import configExample from '../img/pxvdistream5.png'
</script>

# 安装与配置 PXVDIStream Agent

PXVDIStream Agent 安装在需要被远程访问的桌面上，适用于虚拟机和物理机。本文集中说明安装、服务配置与检查；平台授权在管理系统中完成。

## 安装前准备

先核对[系统兼容性](./SystemRequire.md)、[硬件要求](./HardwareRequire.md)、[网络要求](./NetworkRequire.md)，并根据[会话模式](./Sessions.md)确定使用控制台还是独立用户会话。系统和硬件支持矩阵在对应页面维护，本文不重复列出。

[下载 PXVDIStream 安装包](https://mirrors.lierfang.com/pxcloud/pxvdi/PxvdiStream/)，按目标操作系统和 CPU 架构选择版本。平台接入还需准备 PXVDI Server 地址和端口。

## Windows 安装

1. 在目标桌面运行 Windows 安装程序，按安装向导完成服务及相应组件安装。
2. 在实际安装目录找到 `pxvdistream.conf`。常见目录为 `C:\Program Files (x86)\lierfang\pxvdistream`，自定义安装时以实际位置为准。
3. 使用管理员权限编辑配置；也可先复制文件到可编辑位置，修改后再放回原安装目录。
4. 按下文配置平台地址，保存后在 Windows 服务管理器中重启 PXVDIStream 服务，或重启桌面系统。

需要虚拟显示或独立会话时，还应按系统兼容性页面准备相应驱动、角色和运行环境。安装后从客户端建立连接，验证桌面画面、输入和所需重定向功能。

## Linux 安装

Linux 标准部署采用 **XRDP + xorgxrdp** 提供独立的 X11 用户会话，适用于虚拟机、物理机及没有物理显示器的主机。PXVDIStream 使用本机 `xrdp-sesman` 认证系统用户、创建或恢复会话，再捕获对应桌面并向客户端串流。

### 准备 XRDP 会话环境

以 Debian/Ubuntu 和 XFCE 为例：

```bash
sudo apt update
sudo apt install xrdp xorgxrdp xfce4 dbus-x11 x11-utils -y
sudo systemctl enable --now xrdp
sudo systemctl status xrdp xrdp-sesman
```

已有可用桌面环境时，可按发行版的 XRDP 配置使用该桌面；其他发行版需安装对应的 XRDP、xorgxrdp 和桌面软件包。仅安装 XRDP 服务而没有可启动的 Xorg 桌面环境，不能完成会话部署。

为每位使用者准备实际的 Linux 系统账号和密码，并确认其主目录可写、PAM 和 XRDP 用户组策略允许登录。使用 XFCE 时，在**目标桌面用户**的登录终端中编辑 `~/.xsession`，写入以下内容：

```sh
exec startxfce4
```

该文件属于目标桌面用户，不是运行 Agent 服务的 root 账号。域用户还需先完成 Linux 的域接入，并确认系统能够识别账号、完成 PAM 认证和准备用户主目录。

### 安装 Agent 服务

本文以 AppImage 安装包和 systemd 为例。将下载的对应架构文件重命名为 `pxvdistream.AppImage` 后执行：

```bash
chmod +x pxvdistream.AppImage
sudo ./pxvdistream.AppImage install
```

AppImage 安装流程会提取程序并注册 `pxvdistream` 系统服务。使用发行版安装包时，按该包的安装说明处理。

### 配置文件位置

Linux 优先读取**运行账号**主目录下的 `~/.lierfang/pxvdistream.conf`。系统服务默认以 root 运行时，应检查 `/root/.lierfang/pxvdistream.conf`；修改普通登录用户的同名文件不一定影响系统服务。

确认服务的运行账号后，在该账号对应的位置编辑配置：

```bash
sudo systemctl cat pxvdistream
sudo mkdir -p /root/.lierfang
sudoedit /root/.lierfang/pxvdistream.conf
```

以上路径适用于默认 root 服务；自定义运行账号时改用该账号的配置路径。

### 启用 XRDP 独立会话

在 Agent 配置中启用 `rdsh`，并指定 X11 捕获。平台接入示例：

```ini
apiserver=192.0.2.10:3002
rdsh=true
capture_mode=x11
```

`rdsh` 默认关闭，标准 Linux 独立会话部署需显式设为 `true`。开启后，连接时使用**桌面系统账号及密码**，由本机 `xrdp-sesman` 按 PAM 和 XRDP 策略认证；配置文件中的 `username`、`password` 不作为该模式的认证依据。每个用户进入自己的会话，具体的创建、恢复和断开后保留行为由 XRDP 会话策略决定。

客户端仍使用 **PXVDIStream 协议**连接，XRDP 在这里负责本机会话环境。此流程不需要客户端连接 RDP 的 `3389` 端口；`xrdp-sesman` 应保持本机 Unix socket 或回环监听。

会话显示号由 XRDP 分配，无需固定 `display_number`、`x11_user` 或启动 Xvfb，也无需先在物理控制台登录。独立直连的账号说明见[独立直连](./direct.md#linux-xrdp-会话直连)。

当前版本使用 `capture_mode` 指定捕获方式，命令行参数对应 `--capture-mode`。旧 `display-mode` / `display_mode` 已废弃并被忽略；旧 `systemauth` 键仍兼容，但新配置应使用 `rdsh`，两者同时存在时以 `rdsh` 为准。

### 启动与检查服务

保存配置后执行：

```bash
sudo systemctl enable pxvdistream
sudo systemctl restart pxvdistream
sudo systemctl status pxvdistream
sudo journalctl -u pxvdistream -n 100 --no-pager
```

检查服务是否运行、配置是否读取，以及能否连接管理平台。随后从客户端使用目标系统用户连接，确认桌面能启动、画面和输入正常、窗口分辨率可以调整。多用户部署应使用不同账号分别连接，验证桌面彼此独立。

连接失败时，同时查看 XRDP 会话服务日志：

```bash
sudo journalctl -u xrdp -u xrdp-sesman -n 100 --no-pager
```

部分发行版还将详细信息写入 `/var/log/xrdp-sesman.log`。先检查认证与会话创建，再检查 Agent 捕获；具体排查项见下文。

## 配置 PXVDI Server 地址

在 `pxvdistream.conf` 中取消 `apiserver` 行前的注释，填写平台的**主机或域名与端口**：

```ini
apiserver=192.0.2.10:3002
```

例如管理系统通过 `https://192.0.2.10:3002` 访问，这里仍填写 `192.0.2.10:3002`，不添加 `https://`、`wss://` 或页面路径。Agent 会使用加密连接访问平台。

<DocScreenshot
  :src="configExample"
  alt="Windows 配置文件中填写 apiserver 主机与端口的示例"
  caption="图 1：apiserver 配置示例。请替换为实际管理平台地址。"
  variant="settings"
  :width="802"
  :height="483"
/>

### 桌面 UUID

外部桌面通过 UUID 与平台记录对应。在 Agent 配置中填写稳定且唯一的 UUID，并在平台中使用同一值：

```ini
uuid=64a27ef4-901c-0213-e48c-bd7922d1933b
```

示例 UUID 仅用于展示格式，请为每台桌面生成自己的值。平台内的添加入口和 UUID 生成工具见[外部桌面](../zong-kong-mo-shi/web/external-desktop.md)。平台管理的虚拟机应保持 Agent 与平台识别到的资源标识一致。

## 完成平台接入

| 后续任务 | 操作说明 |
| --- | --- |
| 纳管外部虚拟机或物理机 | [外部桌面管理](../zong-kong-mo-shi/web/external-desktop.md) |
| 配置协议、账号与资源策略 | [桌面池管理](../zong-kong-mo-shi/web/pool.md) |
| 为多用户配置池级授权与容量 | [共享会话桌面池](../zong-kong-mo-shi/web/shared-pool.md) |
| 配置 USB 重定向 | [USB 设备库](../zong-kong-mo-shi/web/usb-device.md)和[USB 策略](../zong-kong-mo-shi/web/usb-policy.md) |
| 从终端验证连接 | [客户端使用说明](../client/Usage.md) |

新版原生 USB 不要求配置 SPICE 代理。是否能够重定向还取决于 Agent、客户端、桌面系统及驱动支持；共享会话桌面池强制关闭 USB 重定向。具体规则在管理系统 USB 文档中统一维护。

## 验证与排查

| 现象 | 检查内容 |
| --- | --- |
| 服务启动失败 | 安装包架构、系统要求、运行权限和服务日志 |
| 服务运行但平台显示离线 | apiserver 格式、配置文件位置、网络可达性和 UUID 对应关系 |
| 平台在线但用户看不到桌面 | 资源是否加入池、池是否启用、用户分配或共享池授权 |
| Linux 系统账号认证失败 | rdsh 是否启用、账号和密码是否正确、PAM 与 XRDP 用户组策略 |
| Linux 认证成功但没有桌面 | xorgxrdp 是否安装、桌面启动配置、用户主目录权限，以及 sesman 和 Agent 日志 |
| 能连接但没有画面或声音 | 捕获环境、会话模式、显示与音频设备、客户端能力 |
| USB 无法使用 | 池总开关和匹配规则、版本及驱动支持 |

如需独立使用，请继续阅读[独立直连](./direct.md)。更多命令行选项以当前安装版本的 `pxvdistream --help` 为准。
