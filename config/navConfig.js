// 导航栏和侧边栏的配置

export const navConfig = {
  // 导航栏
  nav: [
    {text: 'vue', link: '/vue/base/install',},
    {text: 'js', link: '/js/intro'},
    {text: 'python', link: '/python/typing',},    

    {
      text: '前端',
      items: [
        {
          text: 'vue router', link: '/frontend/vue-router/intro'
        },
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
      text: '后端',
      items: [
        {text: 'FastAPI', link: '/backend/fastapi/intro'},        
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


  // 侧边栏
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
    '/python/': [
      {text: '类型提示', link: '/python/typing'}
    ],
    '/js/': [
      {text: '介绍', link: '/js/intro'}
    ],


    // 前端
    '/frontend/vue-router/': [
      {
        text: 'vue router',
        items: [
          {text: '介绍', link: '/frontend/vue-router/intro'},
          {text: '安装', link: '/frontend/vue-router/install'},
          {text: '路由', link: '/frontend/vue-router/route'},
          {text: '嵌套路由', link: '/frontend/vue-router/children'},
        ]
      }
    ],
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

    '/backend/fastapi': [      
      {text: '介绍', link: '/backend/fastapi/intro'},
      {text: '请求前缀', link: '/backend/fastapi/proxy'},
      {
        text: '登录', 
        items: [
          {text: '介绍', link: '/backend/fastapi/login/intro'},
        ]
      },
    ],

    '/tools/git/': [
      {
        text: 'GIT',
        items: [
          {text: '安装', link: '/tools/git/index'},
          {text: '基本操作', link: '/tools/git/overview'},
          {text: '删除', link: '/tools/git/delete'},
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