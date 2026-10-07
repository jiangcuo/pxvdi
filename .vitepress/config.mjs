import { defineConfig } from 'vitepress'

const mermaidPlugin = (md) => {
  const fence = md.renderer.rules.fence.bind(md.renderer.rules)
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (token.info.trim() === 'mermaid') {
      const code = token.content.trim()
      return `<div class="mermaid-wrapper"><pre class="mermaid">${code}</pre></div>`
    }
    return fence(tokens, idx, options, env, self)
  }
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcExclude: ['_book/**', 'extend/**', 'node_modules/**'],
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
    outline: {
      level: [2, 4],
      label: '本页目录'
    },
    sidebar: [
      
      // {
      //   text: '介绍',
      //   link: ''
      // },
      // {
      //   text: 'PXVDI For Hyper-V',
      //   items: [
      //      { text: '介绍', link: 'pxvdi-for-hyper-v/README'},
      //      { text: '安装', link: 'pxvdi-for-hyper-v/install' },
      //      { text: '系统管理', link: 'pxvdi-for-hyper-v/system' },
      //      { text: '策略管理', link: 'pxvdi-for-hyper-v/limit' },
      //      { text: '客户端使用', link: 'pxvdi-for-hyper-v/client' },
      //      { text: '更新日志', link: 'pxvdi-for-hyper-v/history' }
      //   ]
      // },

      // {
      //   text: 'PXVDI For Proxmox 直连模式',
      //   items: [
      //      { text: '介绍', link: 'zhi-lian-mo-shi/README'},
      //      { text: '入门', link: 'zhi-lian-mo-shi/ru-men' },
      //      { text: '用户管理', link: 'zhi-lian-mo-shi/user' },
      //      { text: '虚拟机管理', link: 'zhi-lian-mo-shi/vm' }
      //   ]
      // },
      {
        text: 'PXVDI For PXVIRT 总控模式',
        collapsed: false,
        items: [
           { text: '介绍', link: 'zong-kong-mo-shi'},
           { text: '产品优势', link: 'zong-kong-mo-shi/advantage'},
           { text: '信创与国产化', link: 'zong-kong-mo-shi/xinchuang'},
           { text: '激活产品', link: 'zong-kong-mo-shi/license'},
           { text: '管理系统使用指南', link: '/zong-kong-mo-shi/web/index', collapsed: true, items:
            [
              { text: '安装', link: '/zong-kong-mo-shi/web/install' },
              { text: '登录页面',link: '/zong-kong-mo-shi/web/login' },
              { text: '主页',link: '/zong-kong-mo-shi/web/home' },
              { text: '用户模块', link: '/zong-kong-mo-shi/web/user',
                collapsed: true,
                items: [
                  { text: '用户列表', link: '/zong-kong-mo-shi/web/user-list' },
                  { text: '注册审核', link: '/zong-kong-mo-shi/web/user-register' },
                  { text: '部门管理', link: '/zong-kong-mo-shi/web/department' },
                  { text: '域管理', link: '/zong-kong-mo-shi/web/domain' },
                  { text: 'AD 域目录', link: '/zong-kong-mo-shi/web/ad-directory' },
                ]
              },
              { text: '虚拟机管理',link: '/zong-kong-mo-shi/web/vm' ,
                collapsed: true,
                items: [
                  { text: '桌面管理', link: '/zong-kong-mo-shi/web/vmmgr' },
                  { text: '虚拟机详情', link: '/zong-kong-mo-shi/web/vmdetail' },
                  { text: 'PVE 模板管理', link: '/zong-kong-mo-shi/web/vm-pve-template' },
                  { text: 'PXVDI 模板管理', link: '/zong-kong-mo-shi/web/vm-pxvdi-template' },
                  { text: '备份管理', link: '/zong-kong-mo-shi/web/vm-backup' },
                ]
              },
              { text: '桌面池模块', link: '/zong-kong-mo-shi/web/deskpool',
                collapsed: true,
                items: [
                  { text: '桌面池管理', link: '/zong-kong-mo-shi/web/pool' },
                  { text: '共享会话桌面池', link: '/zong-kong-mo-shi/web/shared-pool' },
                  { text: '网关管理', link: '/zong-kong-mo-shi/web/gateway' },
                  { text: 'USB 设备库', link: '/zong-kong-mo-shi/web/usb-device' },
                  { text: 'USB 策略', link: '/zong-kong-mo-shi/web/usb-policy' },
                  { text: '外部桌面', link: '/zong-kong-mo-shi/web/external-desktop' },
                  { text: '桌面状态', link: '/zong-kong-mo-shi/web/desktop-status' },
                ]
              },
              { text: '集群模块', link: '/zong-kong-mo-shi/web/cluster',
                collapsed: true,
                items: [
                  { text: '集群概览', link: '/zong-kong-mo-shi/web/cluster-overview' },
                  { text: '节点管理', link: '/zong-kong-mo-shi/web/node' },
                  { text: '存储管理', link: '/zong-kong-mo-shi/web/storage' },
                ]
              },
              { text: '运维模块', link: '/zong-kong-mo-shi/web/operation',
                collapsed: true,
                items: [
                  { text: '系统摘要', link: '/zong-kong-mo-shi/web/system-overview' },
                  { text: '用户日志', link: '/zong-kong-mo-shi/web/user-log' },
                  { text: '集群日志', link: '/zong-kong-mo-shi/web/cluster-log' },
                  { text: '平台配置', link: '/zong-kong-mo-shi/web/platform-config' },
                  { text: '客户端管理', link: '/zong-kong-mo-shi/web/client-manage' },
                ]
              },
              { text: '机房模式', link: '/zong-kong-mo-shi/web/terminal',
                collapsed: true,
                items: [
                  { text: '机房管理', link: '/zong-kong-mo-shi/web/serverroom' },
                  { text: '终端管理', link: '/zong-kong-mo-shi/web/terminalmgr' },
                  { text: '教学桌面池', link: '/zong-kong-mo-shi/web/sdupool' },
                ]
              },
            ]
           },
           { text: '桌面部署与接入', link: '/zong-kong-mo-shi/vm',
              collapsed: true,
              items: [
                { text: '认识多种连接方式',link: '/lian-jie-xie-yi' },
                { text: '创建虚拟机', link: '/zong-kong-mo-shi/vm/createvm' },
                { text: '配置 RDP 服务', link: '/zong-kong-mo-shi/vm/rdpvm' },
                { text: 'SPICE 部署（旧版方案）', link: '/zong-kong-mo-shi/vm/spicevm' },
                { text: 'Moonlight 部署（旧版方案）', link: '/zong-kong-mo-shi/vm/moonlightvm' },
                { text: '模板虚拟机管理', link: '/zong-kong-mo-shi/vm/templatevm' },
              ]
           },
          
           { text: '部署案例', link: 'zong-kong-mo-shi/deploy/index' ,
            collapsed: true,
            items:[
              { text: '日常桌面',link: 'zong-kong-mo-shi/deploy/normal'},
              { text: '多用户会话',link: 'zong-kong-mo-shi/deploy/multi-user'},
              { text: '阅卷机房',link: 'zong-kong-mo-shi/deploy/exam'},
              { text: 'GPU桌面',link: 'zong-kong-mo-shi/deploy/gpu'},
              { text: '外网体验',link: 'zong-kong-mo-shi/deploy/nat'},
              { text: '与域集成',link: 'zong-kong-mo-shi/deploy/ad'},
            ]
           },
           { text: '常见问题', link: 'zong-kong-mo-shi/issue/index' },
        ]
      },
      {
        text: '客户端文档',
        collapsed: false,
        items: [
           { text: '介绍', link: 'client/README'},
           { text: '硬件要求', link: 'client/hardware' },
           { text: '客户端使用说明', link: 'client/Usage' },
           { text: '瘦客户端软件使用说明', link: 'client/ThinClient' },
           { text: '瘦客户端系统使用说明', link: 'client/ThinOS' },
           { text: 'HTML5客户端使用说明', link: 'client/html5' }
        ]
      },
      {
        text: 'PXVDIStream 文档',
        link: '/pxvdistream/index',
        collapsed: true,
        items: [
           { text: '技术白皮书', link: '/pxvdistream/README' },
           { text: '系统兼容性', link: '/pxvdistream/SystemRequire' },
           { text: '硬件要求', link: '/pxvdistream/HardwareRequire' },
           { text: '网络要求', link: '/pxvdistream/NetworkRequire' },
           { text: '会话模式', link: '/pxvdistream/Sessions' },
           { text: '安装与配置 Agent', link: '/pxvdistream/install' },
           { text: '手动 X11 桌面（高级）', link: '/pxvdistream/headless' },
           { text: '独立直连', link: '/pxvdistream/direct' },
        ]
      },
      {
        text: '其他信息',
        collapsed: false,
        items: [
           { text: '连接类型', link: 'lian-jie-xie-yi'},
           { text: '更新日志', link: 'history',
            collapsed: true,
            items: [
              { text: '服务端', link: 'history/server'},
              { text: '客户端', link: 'history/client' },
              { text: '瘦客户端系统', link: 'history/thinclient-gtk' },
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
    // en: {
    //   label: 'English',
    //   lang: 'en', 
    //   link: '/en/'
    // }
  },
  markdown: {
    config: (md) => {
      md.use(mermaidPlugin)
    },
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
