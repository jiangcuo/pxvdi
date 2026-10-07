# 手动 X11 桌面（高级参考）

Linux 标准部署，包括无物理显示器的主机，统一使用 **XRDP + xorgxrdp**，具体步骤见[Linux 安装](./install.md#linux-安装)。

本页保留手动创建单一 X11 桌面的历史示例，供已明确需要 Xvfb 的定制主机或容器环境参考。该方案不能替代 XRDP 的系统用户认证与独立多用户会话。Agent 安装、平台地址和服务检查统一见[安装与配置 Agent](./install.md)。

## 准备桌面环境

以 Debian/Ubuntu 和 LXDE 为例，安装 Xvfb、桌面及音频组件：

```bash
sudo apt update
sudo apt install xvfb lxde xorg xserver-xorg-input-all x11-utils pulseaudio -y
```

下面的脚本在目标桌面用户环境中创建 `:99` 显示和 LXDE 会话：

```bash
#!/bin/bash
export DISPLAY=:99
Xvfb :99 -screen 0 1920x1080x24 &

pulseaudio --start
pactl load-module module-null-sink sink_name=virtmic \
  sink_properties=device.description=Virtual_Microphone_Sink
pactl load-module module-remap-source \
  master=virtmic.monitor source_name=virtmic \
  source_properties=device.description=Virtual_Microphone

sleep 2
startlxde
```

使用其他桌面时，将 `startlxde` 替换为相应启动命令，例如 `startxfce4`，并先安装对应桌面组件。该脚本用于准备显示和音频环境，实际部署还需将桌面进程纳入所用环境的服务管理。

## 对接 Agent

手动桌面的目标账号需已存在，且与脚本的运行用户一致。配置示例：

```ini
rdsh=false
capture_mode=x11
virtual_display=true
display_number=:99
x11_user=desktop-user
```

将 `desktop-user` 替换为实际桌面账号。Agent 会按目标账号检查 X11 会话访问能力；配置文件位置与服务重启方法见[安装说明](./install.md#配置文件位置)。启动前先在目标账号环境下验证 `DISPLAY=:99 xdpyinfo`，并确认 X11 授权可用。配置项和命令以安装版本的 `pxvdistream --help` 为准。

容器场景通过[外部桌面](../zong-kong-mo-shi/web/external-desktop.md)纳管：Agent 与平台使用相同 UUID，再加入桌面池并授权用户。容器还需单独验证显示、音频、设备和网络访问能力；本示例不自动配置这些运行权限。

当前新版原生 USB 桌面端仅支持 Windows，不能将本示例作为 Linux USB 重定向方案；平台配置见[USB 策略](../zong-kong-mo-shi/web/usb-policy.md)。
