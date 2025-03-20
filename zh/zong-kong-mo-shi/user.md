# PXVDI 用户管理


# PXVDI 具有3种用户

1. PXVDI 平台用户
2. PXVDI MAC地址用户
3. ldap/ad 域用户


## 平台用户

PXVDI 服务端内置的用户管理。

例如管理员admin就是平台用户。

平台用户存放在PXVDI的数据库中。

## MAC地址用户

MAC地址用户便是通过瘦终端的mac地址进行登录的用户。无需身份验证，根据mac做凭据。PXVDI瘦客户端使用mac地址注册后，即可使用mac地址进行登录

## ldap/ad 域用户

这个是连接到外部的ldap服务器，例如微软的ad域服务器。PXVDI服务端借助ldaps协议与这些ad服务器进行通信。
