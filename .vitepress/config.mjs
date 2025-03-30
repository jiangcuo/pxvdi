import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  title: "PXVDI",
  description: "梨儿方 文档中心",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/index.md' },
      { text: '梨儿方', link: 'https://www.lierfang.com' },
      { text: 'PXVIRT文档', link: 'https://docs.pxvirt.lierfang.com' },
    ],
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text: '介绍',
        link: 'README'
        // items: [
        //   { text: '介绍', link: '/zh/README' },
        //   { text: 'Runtime API Examples', link: '/api-examples' }
        // ]
      },
      {
        text: '直连模式',
        items: [
           { text: '介绍', link: 'zhi-lian-mo-shi/README'},
           { text: '入门', link: 'zhi-lian-mo-shi/ru-men' },
           { text: '用户管理', link: 'zhi-lian-mo-shi/user' },
           { text: '虚拟机管理', link: 'zhi-lian-mo-shi/vm' }
        ]
      },
      {
        text: '总控模式',
        items: [
           { text: '介绍', link: 'zong-kong-mo-shi'},
           { text: '安装', link: 'zong-kong-mo-shi/install' },
           { text: '虚拟机管理', link: 'zong-kong-mo-shi/vm',
            items: [
              { text: '创建虚拟机', link: 'zong-kong-mo-shi/vm/createvm' },
              { text: '虚拟机开启RDP功能', link: 'zong-kong-mo-shi/vm/rdpvm' },
              { text: '虚拟机开启SPICE功能', link: 'zong-kong-mo-shi/vm/spicevm' },
              { text: '虚拟机开启VMware horizon功能', link: 'zong-kong-mo-shi/vm/horizonvm' },
              { text: '模板虚拟机管理', link: 'zong-kong-mo-shi/vm/templatevm' },
            ]
           },
           { text: '桌面池管理', link: 'zong-kong-mo-shi/pool',
            items: [
              { text: '普通桌面池', link: 'zong-kong-mo-shi/pool/normalpool' },
              { text: '快照桌面池', link: 'zong-kong-mo-shi/pool/snapshotpool' }
            ]
           },
           { text: '网关管理', link: 'zong-kong-mo-shi/gw',
            items: [
              { text: 'msrdp网关', link: 'zong-kong-mo-shi/gw/msrdpgw' },
              { text: 'rdpGW网关', link: 'zong-kong-mo-shi/gw/rdpgw' }
            ]
           },
           { text: '用户管理', link: 'zong-kong-mo-shi/user',
            items: [

              { text: '添加用户', link: 'zong-kong-mo-shi/user/adduser' },
            ]
            },
           { text: '域管理', link: 'zong-kong-mo-shi/user/ad',
            items:[
              { text: '创建域',link: 'zong-kong-mo-shi/user/aduser/createad'},
              { text: '添加域',link: 'zong-kong-mo-shi/user/aduser/addad'},
            ]
            },
           { text: '节点管理', link: 'zong-kong-mo-shi/node' },
           { text: '存储管理', link: 'zong-kong-mo-shi/storage' },
           { text: '日志', link: 'zong-kong-mo-shi/log',
            items:[
              { text: '用户日志',link: 'zong-kong-mo-shi/log/user'},
              { text: '集群日志',link: 'zong-kong-mo-shi/log/cluster'},
            ]
            },
           { text: '平台配置', link: 'zong-kong-mo-shi/platform' },
           { text: '客户端管理', link: 'zong-kong-mo-shi/client' },
           { text: '部署案例', link: 'zong-kong-mo-shi/deploy/index' ,
            items:[
              { text: '日常桌面',link: 'zong-kong-mo-shi/deploy/normal'},
              { text: '阅卷机房',link: 'zong-kong-mo-shi/deploy/exam'},
              { text: 'GPU桌面',link: 'zong-kong-mo-shi/deploy/gpu'},
              { text: '外网体验',link: 'zong-kong-mo-shi/deploy/nat'},
              { text: '与域集成',link: 'zong-kong-mo-shi/deploy/ad'}
            ]
           },
           { text: '常见问题', link: 'zong-kong-mo-shi/issue/index' },
        ]
      },
      {
        text: '客户端文档',
        items: [
           { text: '介绍', link: 'client/README'},
           { text: '客户端使用说明', link: 'client/Usage' },
           { text: '瘦客户端系统使用说明', link: 'client/ThinOS' },
           { text: 'HTML5客户端使用说明', link: 'client/html5' }
        ]
      },
      {
        text: '其他信息',
        items: [
           { text: '连接类型', link: 'lian-jie-xie-yi'},
           { text: '更新日志', link: 'history',
            items: [
              { text: '服务端', link: 'history/server'},
              { text: '客户端', link: 'history/client' },
              { text: '嵌入式客户端', link: 'history/client-gtk' },
              { text: '网页版', link: 'history/html5' },
           ]
           },
           { text: 'PXVDI软件源', link: 'pxvdi-source' },
           { text: 'PXVDI工具', link: 'pxvdi-tools' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN'
      },
    en: {
      label: 'English',
      lang: 'en', 
      link: '/en/'
    }
  },
  markdown: {
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    }
  },
  head: [
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
    ],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ],
    [
      'link',
      { href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet' }
    ]
  ]
})


