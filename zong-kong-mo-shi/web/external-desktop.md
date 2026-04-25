# 外部桌面管理

PXVDI 服务端添加局域网的桌面，支持VMware\HyperV\KVM\物理机等等其他非管理类型桌面！此类桌面必须和PXVDI 服务端处于同一局域网，或者和客户端能够联通


![alt text](../../img/extenddesk1.png)


`PXVDI Server` 和 外部桌面通过`pxvdistream` websocket通信！`pxvdistream`处理用户的会话以及认证。

基于本架构，如果为局域网模式

只需要 外部桌面可以和`PXVDI Server`通信即可！用户需要和外部桌面位于同一个局域网。

例如`PXVDI Server` 在一个公网，外部桌面是局域网A的一台机器，那么局域网A的用户可以直接连接到外部桌面。

如果需要外网访问，需要 `PXVDI Server`直接和外部桌面通信。

例如`PXVDI Server` 在一个局域网A，外部桌面必须是局域网A的一台机器，那么不管是外网还是内网，用户都可以连接到外部桌面。

如果RDP 协议！可以单独配置网关即可，也可以实现外部链接。

注意！外部桌面不支持电源管理、快照管理、usb重定向等操作

## 部署

1. 外部桌面需要`PXVDI Server` 版本达到`1.0.7`

2. 按照我们 [部署pxvdistream](./../vm/pxvdistreamvm.md)

3. 创建一个随机的UUID,写到pxvdistream的配置文件当中，例如`uuid=64a27ef4-901c-0213-e48c-bd7922d1933b`，不区分大小写，用户也可以直接点击下面的按钮，生成uuid。

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

![alt text](../../img/extenddesk2.png)

如果外部桌面在线的话！这里可以列出来，并且在桌面池内添加外部桌面即可！

![alt text](../../img/extenddesk3.png)

![alt text](../../img/extenddesk4.png)
