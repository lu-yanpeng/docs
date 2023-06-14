// 导航栏和侧边栏的配置

export const navConfig = {
  // 导航栏
  nav: [
    {text: 'vue', link: '/vue/base/install',},
    {text: 'js', link: '/js/intro'},
    {text: 'css', link: '/css/pseudo-classes'},

    {
      text: '前端',
      items: [
        {text: 'vue router', link: '/frontend/vue-router/intro'},
        {text: 'axios', link: '/frontend/axios/retry'},
        {text: 'pinia', link: '/frontend/pinia/intro'},
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
        {text: 'Python', link: '/backend/python/typing'},
        {text: 'FastAPI', link: '/backend/fastapi/intro'},        
        {text: 'Docker', link: '/backend/docker/base/install'},        
      ]
    },
    {
      text: '工具',
      items: [
        {text: 'git', link: '/tools/git/index'},
        {text: 'vite', link: '/tools/vite/config'},
        {text: 'vitepress', link: '/tools/vitepress/overview'},
        {text: 'npm', link: '/tools/npm/registry'},
      ],
    },
  ],


  // 侧边栏
  sidebar: {
    '/vue/': [
      {
        text: '基础',
        collapsed: false,
        items: [
          {text: '安装', link: '/vue/base/install'},
          {text: '手动创建项目', link: '/vue/base/manually-creating-projects'},
          {text: '响应式 ref', link: '/vue/base/ref'},
          {text: '模板', link: '/vue/base/template'},
          {text: '监听器 watch', link: '/vue/base/watch'},
          {text: '计算属性 computed', link: '/vue/base/computed'},
          {text: '方法 method', link: '/vue/base/method'},
          {text: '样式', link: '/vue/base/style'},
          {text: '指令', link: '/vue/base/directive'},
          {text: '事件处理', link: '/vue/base/event'},
        ],
      },
      {
        text: '组件',
        collapsed: false,
        items: [
          {text: '基础', link: '/vue/component/base'},
          {text: '传参 props', link: '/vue/component/props'},
          {text: '样式绑定', link: '/vue/component/class-and-style'},
          {text: '动态组件', link: '/vue/component/dynamic-component'},
          {text: '自定义事件', link: '/vue/component/event'},
        ],
      },
      {
        text: '高级',
        collapsed: false,
        items: [
          {text: 'test', link: '/vue/senior/index'}
        ],
      },
      {
        text: '案例',
        collapsed: false,
        items: [
            {text: '小技巧', link: '/vue/example/tips'},
            {text: '动态路由', link: '/vue/example/add-routes'},
        ],
      },
    ],
    '/js/': [
      {text: '介绍', link: '/js/intro'},
      {
        text: '对象',
        items: [
          {text: '访问器属性 setter/getter', link: '/js/object/getter-setter'},
          {text: '代理 Proxy', link: '/js/object/proxy'},
        ]
      }
    ],
    '/css/': [
      {
        text: 'CSS',
        items: [
          {text: '伪类', link: '/css/pseudo-classes'}
        ]
      }
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
    '/frontend/axios/': [
      {
        text: 'axios',
        items: [
          {text: '重试', link: '/frontend/axios/retry'},
          {text: '封装', link: '/frontend/axios/package'},
          {text: '取消请求', link: '/frontend/axios/cancellation'},
        ]
      },
    ],
    '/frontend/pinia/': [
      {
        text: 'pinia',
        items: [
          {text: '介绍', link: '/frontend/pinia/intro'},
          {text: 'store', link: '/frontend/pinia/store'},
          {text: 'state', link: '/frontend/pinia/state'},
          {text: 'getter', link: '/frontend/pinia/getter'},
          {text: 'action', link: '/frontend/pinia/action'},
          {text: '插件', link: '/frontend/pinia/plugins'},
          {text: '常见问题', link: '/frontend/pinia/tips'},
        ]
      }
    ],
    '/frontend/vue-demo/': [
      {
        text: 'vue示例',
        items: [
          {text: '开关按钮', link: '/frontend/vue-demo/switch'},
          {text: 'markdown', link: '/frontend/vue-demo/markdown'},
          {text: '瀑布流', link: '/frontend/vue-demo/masonry'},
          {text: '对话框', link: '/frontend/vue-demo/dialog'},
          {text: '按钮组', link: '/frontend/vue-demo/button-group'},
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


    '/backend/python/': [
      {text: '虚拟环境', link: '/backend/python/env'},
      {text: '类型提示', link: '/backend/python/typing'},
      {text: '时间处理', link: '/backend/python/datetime'},
      {text: 'pip', link: '/backend/python/pip'},
    ],
    '/backend/fastapi/': [      
      {text: '介绍', link: '/backend/fastapi/intro'},
      {text: '请求前缀', link: '/backend/fastapi/proxy'},
      {text: '项目结构', link: '/backend/fastapi/project-dir'},
      {text: '请求体', link: '/backend/fastapi/body'},
      {text: '跨域', link: '/backend/fastapi/cors'},
      {text: 'api 文档', link: '/backend/fastapi/openapi'},
      {text: '依赖项', link: '/backend/fastapi/dependencies'},
      {text: '路由', link: '/backend/fastapi/router'},
      {
        text: '登录', 
        items: [
          {text: '介绍', link: '/backend/fastapi/login/intro'},
        ]
      },
      {
        text: 'pydantic',
        items: [
          {text: '示例', link: '/backend/fastapi/pydantic/example'},
          {text: '验证器', link: '/backend/fastapi/pydantic/validator'},
          {text: '环境变量', link: '/backend/fastapi/pydantic/settings'},
        ]
      }
    ],
    '/backend/docker/': [
      {
        text: '基础',
        items: [
          {text: '安装', link: '/backend/docker/base/install'},          
        ]
      }
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
          {text: '模板语法', link: '/tools/vitepress/template'},
        ]
      }
    ],
    '/tools/vite/': [
      {
        text: 'vite',
        items: [
          {text: '配置', link: '/tools/vite/config'},
        ]
      }
    ],
    '/tools/npm/': [
      {text: '国内源', link: '/tools/npm/registry'},
    ]
  }
}