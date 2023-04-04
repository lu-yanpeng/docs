// 导航栏和侧边栏的配置

export const navConfig = {
  nav: [
    {
      text: 'vue',
      link: '/vue/base/index',
    },
    {
      text: '前端',
      items: [
        {text: 'vue示例', link: '/frontend/vue-demo/index'}
      ]
    },
    {
      text: '工具',
      items: [
        {text: 'git', link: '/tools/git/index'}
      ],
    },
  ],
  sidebar: {
    '/tools/git/': [
      {
        text: 'GIT',
        items: [
          {text: '安装', link: '/tools/git/index'},
          {text: '基本操作', link: '/tools/git/overview'},
        ]
      }
    ],
    '/vue/': [
      {
        text: '基础',
        items: [
          {text: '安装', link: '/vue/base/index'}
        ]
      },
      {
        text: '高级',
        items: [
          {text: 'test', link: '/vue/senior/index'}
        ],
      }
    ],
    '/frontend/': [
      {
        text: 'vue示例',
        items: [
          {text: '开关', link: '/frontend/vue-demo/index'}
        ]
      }
    ]
  }
}