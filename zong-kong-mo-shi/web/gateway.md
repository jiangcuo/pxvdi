<script setup>
import exampleShot1 from '../../img/gw1.png'
import exampleShot2 from '../../img/gw2.png'
import exampleShot3 from '../../img/gw3.png'
import exampleShot4 from '../../img/gw4.png'
import exampleShot5 from '../../img/gw5.png'
import exampleShot6 from '../../img/gw6.png'
import exampleShot7 from '../../img/gw7.png'
import exampleShot8 from '../../img/gw8.png'
import exampleShot9 from '../../img/gw9.png'
import exampleShot10 from '../../img/gw10.png'
import exampleShot11 from '../../img/gw11.png'
import exampleShot12 from '../../img/gw12.png'
import exampleShot13 from '../../img/gw13.png'
import exampleShot14 from '../../img/gw14.png'
import exampleShot15 from '../../img/gw15.png'
import exampleShot16 from '../../img/gw16.png'
import exampleShot17 from '../../img/gw17.png'
import exampleShot18 from '../../img/gw18.png'
import exampleShot19 from '../../img/gw19.png'
import exampleShot20 from '../../img/gw20.png'
import exampleShot21 from '../../img/gw21.png'
import exampleShot22 from '../../img/gw22.png'
import exampleShot23 from '../../img/gw23.png'
import exampleShot24 from '../../img/gw24.png'
import exampleShot25 from '../../img/gw25.png'
import exampleShot26 from '../../img/gw26.png'
</script>

# 网关管理

入口：**主页 → 桌面池 → 网关管理**。

网关用于按部署方案转发跨网络的桌面连接。先在此处维护网关，再到[桌面池向导](./pool.md#网关策略)选择对应网关；桌面网关与 Moonlight 网关分别配置。

## 添加与使用网关

填写网关名称、类型、地址和备注，并按所选类型填写账号、密码或 API Key。当前支持域网关、公用网关、PXVDI 网关和 Moonlight 网关，具体字段会随类型变化。

网关记录本身不会部署网关服务。保存前应确认实际服务已运行、客户端可达，并与桌面池所用协议一致。配置后用已授权账号验证实际连接路径。

以下为 RDP 网关的部署示例。

## rdpGW网关

rdpGW网关是rdp协议的开源实现，部署简单，省资源

### 部署rdpGW

梨儿方为PXVDI 封装了rdpGW，是rdpGW的安装变得简单容易。客户端版本请使用3.0.2及其以上版本


如果需要更多的配置，参考github 

https://github.com/bolkedebruin/rdpgw


在debian12的服务器上执行一下命令就可以安装。

```
wget https://mirors.lierfang.com/pxcloud/pxvdi/dists/bookworm/main/binary-amd64/rdpgw_2.0.2_amd64.deb
dpkg -i rdpgw_2.0.2_amd64.deb
```

安装结束之后，rdpgw会监听443 地址。

### 修改rdpGW默认的账号密码

rdpGW的账号密码位于`/etc/rdpgw/rdpgw-auth.yaml`。

编辑`/etc/rdpgw/rdpgw-auth.yaml`文件，进行添加或者修改对应的账号密码即可。

请务必遵守yaml格式。

修改之后重启`systemctl restart rdpgw-auth  rdpgw`即可

### SSL修正

默认用的是自签名证书。

如果申请了证书，请替换`/etc/rdpgw/`目录下的`key.pem`和`server.pem`

替换之后重启`systemctl restart rdpgw-auth  rdpgw`即可



## 微软MSRDP网关

最终用户可以通过 RD 网关从企业防火墙外部安全地连接到内部网络资源。同时RD网关可以监控RD的会话，可以选择断开注销，配置RD会话的权限，使用端口等等。

<DocScreenshot
  :src="exampleShot1"
  alt="微软MSRDP网关操作示例，第 1 图"
  caption="图 1：微软MSRDP网关操作示例。"
  variant="full"
  :width="1626"
  :height="890"
/>
如上图所示，部署了RD网关，终端从互联网的流量将全部通过网关转发到内部的其他地方。相对于DMZ 或者端口映射，RD网关只需要一个端口即可代理所有的流量。并且这个端口是承载了https的。意味着这比端口映射和DMZ更加的安全，方便。

本节内容将以Pxvdi的网关需求，展示如何去部署远程桌面网关。

### 添加远程桌面网关角色

新建一个Windows Server的虚拟机，虚拟机名称为gw.

打开服务器管理器，勾选`远程桌面服务`，


<DocScreenshot
  :src="exampleShot2"
  alt="添加远程桌面网关角色操作示例，第 2 图"
  caption="图 2：添加远程桌面网关角色操作示例。"
  variant="full"
  :width="1630"
  :height="1148"
/>
接着下一步，勾选`远程桌面网关`，会提示增加IIS，`继续`，然后一直下一步

<DocScreenshot
  :src="exampleShot3"
  alt="添加远程桌面网关角色操作示例，第 3 图"
  caption="图 3：添加远程桌面网关角色操作示例。"
  variant="full"
  :width="1570"
  :height="1108"
/>
随后勾选安装。

<DocScreenshot
  :src="exampleShot4"
  alt="添加远程桌面网关角色操作示例，第 4 图"
  caption="图 4：添加远程桌面网关角色操作示例。"
  variant="full"
  :width="1598"
  :height="1152"
/>
安装之后关闭即可。


### 配置网关

可在开始菜单——Windows管理工具找到远程桌面网关管理器.

<DocScreenshot
  :src="exampleShot5"
  alt="配置网关操作示例，第 5 图"
  caption="图 5：配置网关操作示例。"
  variant="full"
  :width="1482"
  :height="1012"
/>
或者在服务器管理——远程桌面服务——服务器，选中GW，右击，点击远程桌面网关管理器

<DocScreenshot
  :src="exampleShot6"
  alt="配置网关操作示例，第 6 图"
  caption="图 6：配置网关操作示例。"
  variant="full"
  :width="1606"
  :height="950"
/>
打开网关之后，如下图

<DocScreenshot
  :src="exampleShot7"
  alt="配置网关操作示例，第 7 图"
  caption="图 7：配置网关操作示例。"
  variant="full"
  :width="1590"
  :height="716"
/>
右击属性，切换到ssl设置，点击创建自签名证书

<DocScreenshot
  :src="exampleShot8"
  alt="配置网关操作示例，第 8 图"
  caption="图 8：配置网关操作示例。"
  variant="full"
  :width="1582"
  :height="1226"
/>
然后弹出来提示，确认即可

<DocScreenshot
  :src="exampleShot9"
  alt="配置网关操作示例，第 9 图"
  caption="图 9：配置网关操作示例。"
  variant="full"
  :width="1564"
  :height="730"
/>
### 添加策略


网关有2个策略，一个是连接策略（RD CAP），规定了谁谁谁可以连接上来。另外一个是资源策(RP RAP)，规定了谁谁谁可以连接谁谁。

选中策略，右击新建授权策略

<DocScreenshot
  :src="exampleShot10"
  alt="添加策略操作示例，第 10 图"
  caption="图 10：添加策略操作示例。"
  variant="full"
  :width="1158"
  :height="712"
/>
使用推荐，点击下一步

<DocScreenshot
  :src="exampleShot11"
  alt="添加策略操作示例，第 11 图"
  caption="图 11：添加策略操作示例。"
  variant="full"
  :width="1558"
  :height="992"
/>
然后起个连接策略名，然后下一步

<DocScreenshot
  :src="exampleShot12"
  alt="添加策略操作示例，第 12 图"
  caption="图 12：添加策略操作示例。"
  variant="full"
  :width="1576"
  :height="974"
/>
如果是域网关 可以将domain Users添加进组成员，这样所有domain Users组的成员都能使用网关。

如果不是作为域网关，可以添加单个用户，作为公共网关。

<DocScreenshot
  :src="exampleShot13"
  alt="添加策略操作示例，第 13 图"
  caption="图 13：添加策略操作示例。"
  variant="full"
  :width="1586"
  :height="1018"
/>
然后启用重定向，接着就是下一步，下一步了。

<DocScreenshot
  :src="exampleShot14"
  alt="添加策略操作示例，第 14 图"
  caption="图 14：添加策略操作示例。"
  variant="full"
  :width="1590"
  :height="976"
/>
起一个资源授权策略名

<DocScreenshot
  :src="exampleShot15"
  alt="添加策略操作示例，第 15 图"
  caption="图 15：添加策略操作示例。"
  variant="full"
  :width="1556"
  :height="962"
/>
这里默认有了刚才添加的用户组，下一步

<DocScreenshot
  :src="exampleShot16"
  alt="添加策略操作示例，第 16 图"
  caption="图 16：添加策略操作示例。"
  variant="full"
  :width="1570"
  :height="982"
/>
到网络资源这里，选择允许用户连接到任意资源

<DocScreenshot
  :src="exampleShot17"
  alt="添加策略操作示例，第 17 图"
  caption="图 17：添加策略操作示例。"
  variant="full"
  :width="1604"
  :height="982"
/>
在允许的端口，选择允许连接到任意端口。也可以灵活选择端口

<DocScreenshot
  :src="exampleShot18"
  alt="添加策略操作示例，第 18 图"
  caption="图 18：添加策略操作示例。"
  variant="full"
  :width="1582"
  :height="970"
/>
随后完成即可。

<DocScreenshot
  :src="exampleShot19"
  alt="添加策略操作示例，第 19 图"
  caption="图 19：添加策略操作示例。"
  variant="full"
  :width="1624"
  :height="544"
/>
此时网关就完成创建了。

但是并没有结束。

### SSL修正

由于网关创建时使用的是自签名的证书，自签名的证书在msrdp上会被拒绝，无法访问，因此需要使用正式的SSL证书。
!! 但是使用freerdp模式，将不会验证证书的有效性。可以使用自签名证书，直接连接。

SSL证书可以在阿里云 腾讯云 华为云申请。

我们申请Windows 证书 pfx格式。一般下载下载有2个东西，一个证书，一个密码。

注意！ 证书名可以不和网关的fqdn一样。但是必须证书和访问名一样。比如网关fqdn是gw.pxvdi.com。

你可以申请rdpgw.wwwff.cn来使用。然后用rdpgw.wwwff.cn来连接。但是不能用xxx.wwwff.cn来连接。


假设你已经获得了证书，双击证书，导入到本地计算机。

打开网关管理器，进入属性-ssl证书，选择导入证书。

<DocScreenshot
  :src="exampleShot20"
  alt="SSL修正操作示例，第 20 图"
  caption="图 20：SSL修正操作示例。"
  variant="settings"
  :width="800"
  :height="846"
/>
选择刚才导入的证书

<DocScreenshot
  :src="exampleShot21"
  alt="SSL修正操作示例，第 21 图"
  caption="图 21：SSL修正操作示例。"
  variant="settings"
  :width="802"
  :height="438"
/>
然后确定，最后应用，会提示网关会重启，点击确定


<DocScreenshot
  :src="exampleShot22"
  alt="SSL修正操作示例，第 22 图"
  caption="图 22：SSL修正操作示例。"
  variant="settings"
  :width="702"
  :height="490"
/>
打开IIS，选中Default Web Site，点击右边的绑定

<DocScreenshot
  :src="exampleShot23"
  alt="SSL修正操作示例，第 23 图"
  caption="图 23：SSL修正操作示例。"
  variant="settings"
  :width="824"
  :height="432"
/>
双击https ，点击选择

<DocScreenshot
  :src="exampleShot24"
  alt="SSL修正操作示例，第 24 图"
  caption="图 24：SSL修正操作示例。"
  variant="settings"
  :width="782"
  :height="706"
/>
选择自己申请的证书

<DocScreenshot
  :src="exampleShot25"
  alt="SSL修正操作示例，第 25 图"
  caption="图 25：SSL修正操作示例。"
  variant="settings"
  :width="760"
  :height="544"
/>
最后重启下IIS就配置完成

### 对网关进行端口映射

网关只需要一个 tcp端口和 3391 udp端口。如果存在UDP qos的情况。建议只映射一个 tcp端口。

<DocScreenshot
  :src="exampleShot26"
  alt="对网关进行端口映射操作示例，第 26 图"
  caption="图 26：对网关进行端口映射操作示例。"
  variant="settings"
  :width="762"
  :height="638"
/>
比如在示例中，将路由的1443 映射到 网关的443即可。

之后就可以配置gw到配置文件中，使用网关了。

