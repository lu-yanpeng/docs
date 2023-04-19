// 导航栏和侧边栏的配置

export const navConfig = {
  nav: [
    {
      text: 'vue',
      link: '/vue/base/install',
    },
    {
      text: '前端',
      items: [
        {
          text: '示例',
          items: [
            {text: 'vue', link: '/frontend/vue-demo/switch'},
            {text: 'css', link: '/frontend/css-demo/table'},
          ]
        },        
      ]
    },
    {
      text: '工具',
      items: [
        {text: 'git', link: '/tools/git/index'},
        {text: 'vitepress', link: '/tools/vitepress/overview'},
      ],
    },
  ],
  sidebar: {
    '/vue/': [
      {
        text: '基础',
        items: [
          {text: '安装', link: '/vue/base/install'}
        ]
      },
      {
        text: '高级',
        items: [
          {text: 'test', link: '/vue/senior/index'}
        ],
      }
    ],

    // 前端代码示例
    '/frontend/vue-demo/': [
      {
        text: 'vue示例',
        items: [
          {text: '开关按钮', link: '/frontend/vue-demo/switch'},
          {text: 'markdown', link: '/frontend/vue-demo/markdown'},
        ]
      },
    ],
    '/frontend/css-demo/': [
      {
        text: 'css示例',
        items: [
          {text: 'table', link: '/frontend/css-demo/table'},
          {text: '展开动画', link: '/frontend/css-demo/fold'},
        ]
      }
    ],

    '/tools/git/': [
      {
        text: 'GIT',
        items: [
          {text: '安装', link: '/tools/git/index'},
          {text: '基本操作', link: '/tools/git/overview'},
        ]
      }
    ],
    '/tools/vitepress/': [
      {
        text: 'vitepress',
        items: [
          {text: '介绍', link: '/tools/vitepress/overview'},
          {text: '翻页链接', link: '/tools/vitepress/prev-next-links'},
        ]
      }
    ],
  }
}