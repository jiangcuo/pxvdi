<script setup>
import exampleShot1 from '../../img/terminal-1.png'
import exampleShot2 from '../../img/terminal-2.png'
import exampleShot3 from '../../img/terminal-3.png'
import exampleShot4 from '../../img/terminal-4.png'
</script>

# 终端管理

## 如何启用终端管理

### 1. 准备终端服务

瘦客户端系统通常已内置 PXVDIStream。确认终端服务已运行，并将其接入实际 PXVDI Server。

服务安装、配置文件位置、apiserver 格式与重启方法统一见[安装与配置 Agent](../../pxvdistream/install.md)。已内置服务的终端按需完成配置，随后进行 MAC 注册与机房关联。

### 2. 注册 MAC 用户

瘦客户端设置中启用mac模式，返回到主页，进行注册。请准确输入

<DocScreenshot
  :src="exampleShot1"
  alt="MAC 用户注册操作示例，第 1 图"
  caption="图 1：MAC 用户注册操作示例。"
  variant="settings"
  :width="838"
  :height="610"
/>
注册成功后，可以在管理系统的 **用户 → 用户管理 → 用户注册** 中审核申请；通过后检查用户状态，再继续添加终端

<DocScreenshot
  :src="exampleShot2"
  alt="MAC 用户注册操作示例，第 2 图"
  caption="图 2：MAC 用户注册操作示例。"
  variant="full"
  :width="2384"
  :height="702"
/>
### 3. 在机房中添加终端

<DocScreenshot
  :src="exampleShot3"
  alt="机房添加终端操作示例，第 3 图"
  caption="图 3：机房添加终端操作示例。"
  variant="full"
  :width="1102"
  :height="1198"
/>
此时就可以操作终端了

<DocScreenshot
  :src="exampleShot4"
  alt="机房添加终端操作示例，第 4 图"
  caption="图 4：机房添加终端操作示例。"
  variant="full"
  :width="2580"
  :height="1066"
/>