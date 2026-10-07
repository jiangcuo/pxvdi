<script setup>
import exampleShot1 from '../../img/extenddesk2.png'
import exampleShot2 from '../../img/extenddesk3.png'
import exampleShot3 from '../../img/extenddesk4.png'
</script>

# 外部桌面管理

入口：**主页 → 桌面池 → 外部桌面**。

外部桌面用于纳管 VMware、Hyper-V、KVM 或物理机上的桌面，通过 PXVDIStream Agent 与平台通信，再加入桌面池交付给用户。

## 网络与能力

桌面 Agent 需要能够连接 PXVDI Server，客户端需要能够通过所选协议访问桌面或对应网关。同一局域网可采用直接连接；跨网络场景应按实际部署准备网关或中继，分别验证管理通道与桌面连接通道。

外部桌面不提供 PXVIRT/PVE 原生的虚拟机电源和快照管理。USB 重定向是否可用由池策略、客户端、桌面 Agent 和协议支持共同决定，参阅[USB 策略](./usb-policy.md)。

## 部署

1. 准备可访问管理平台的目标桌面。

2. 按照[安装与配置 Agent](../../pxvdistream/install.md)完成服务安装、平台地址及桌面 UUID 配置。

3. 记录 Agent 使用的 UUID，添加平台记录时填写同一值。每台桌面需使用唯一 UUID；如需生成新值，可使用下方工具，再按安装说明更新 Agent 配置。

<div data-uuid-generator style="margin:12px 0 18px;padding:16px;border:1px solid var(--vp-c-divider);border-radius:12px;background:var(--vp-c-bg-soft);">
  <div style="display:flex;flex-wrap:wrap;gap:10px;">
    <button data-role="generate" type="button" style="border:0;border-radius:999px;padding:8px 14px;background:var(--vp-c-brand-1);color:var(--vp-c-bg);cursor:pointer;font:inherit;">生成随机 UUID</button>
    <button data-role="copy" type="button" disabled style="border:0;border-radius:999px;padding:8px 14px;background:var(--vp-c-default-2);color:var(--vp-c-text-1);cursor:pointer;font:inherit;opacity:0.55;">复制 UUID</button>
  </div>
  <p style="margin:12px 0 0;">
    <code data-role="output" style="display:block;overflow-wrap:anywhere;padding:10px 12px;border-radius:10px;background:var(--vp-c-default-soft);">点击按钮生成一个 UUID</code>
  </p>
</div>

4. 添加`外部桌面`

输入自定义的桌面名称 和 UUID

<DocScreenshot
  :src="exampleShot1"
  alt="部署操作示例，第 1 图"
  caption="图 1：部署操作示例。"
  variant="full"
  :width="1300"
  :height="632"
/>
如果外部桌面在线的话！这里可以列出来，并且在桌面池内添加外部桌面即可！

<DocScreenshot
  :src="exampleShot2"
  alt="部署操作示例，第 2 图"
  caption="图 2：部署操作示例。"
  variant="full"
  :width="2676"
  :height="620"
/>
<DocScreenshot
  :src="exampleShot3"
  alt="部署操作示例，第 3 图"
  caption="图 3：部署操作示例。"
  variant="settings"
  :width="954"
  :height="936"
/>