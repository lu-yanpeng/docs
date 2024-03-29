import type { DefaultTheme } from 'vitepress'

type NavConfig = {
  nav: (DefaultTheme.NavItem)[]
  sidebar: DefaultTheme.Sidebar
}

export const navConfig: NavConfig = {
  // https://vitepress.dev/zh/reference/default-theme-config
  // 导航栏，页头位置，点击打开不同项目
  nav: [
    {text: 'vue', link: '/vue/base/install',},
    {text: 'js', link: '/js/base/intro'},
    {text: 'css', link: '/css/pseudo-classes'},

    {
      text: '前端',
      items: [
        {text: 'ts', link: '/frontend/type-script/example'},
        {text: 'vue router', link: '/frontend/vue-router/intro'},
        {text: 'axios', link: '/frontend/axios/retry'},
        {text: 'pinia', link: '/frontend/pinia/intro'},
        {text: 'echarts', link: '/frontend/echarts/base/concepts'},
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
        {text: 'Python', link: '/backend/python/base/typing'},
        {text: 'FastAPI', link: '/backend/fastapi/intro'},
        {text: 'Docker', link: '/backend/docker/base/install'},
        {text: 'Linux', link: '/backend/linux/command'},
        {text: 'MongoDb', link: '/backend/mongodb/install'},
      ]
    },
    {
      text: '工具',
      items: [
        {text: 'git', link: '/tools/git/install'},
        {text: 'vite', link: '/tools/vite/config'},
        {text: 'vitepress', link: '/tools/vitepress/overview'},
        {text: 'npm', link: '/tools/npm/registry'},
      ],
    },
  ],


  // 侧边栏，页面左边，点击后跳转到不同md文件
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
          {text: '过渡', link: '/vue/base/transition'},
          {text: '双向绑定 v-model', link: '/vue/base/v-model'},
          {text: '组件缓存 keep-alive', link: '/vue/base/keep-alive'},
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
          {text: '插槽', link: '/vue/component/slot'},
          {text: '组件实例 ref', link: '/vue/component/ref'},
        ],
      },
      {
        text: '高级',
        collapsed: false,
        items: [
          {text: '组合式函数', link: '/vue/senior/composables'},
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
      {
        text: '基础',
        items: [
          {text: '介绍', link: '/js/base/intro'},
          {text: '循环', link: '/js/base/while'},
        ]
      },
      {
        text: '对象',
        items: [
          {text: '代理 Proxy', link: '/js/object/proxy'},
          {text: '深拷贝', link: '/js/object/deep-clone'},
          {text: '成员检测 in', link: '/js/object/own'},
          {text: '判断对象是否相等', link: '/js/object/is-equal'},
          {text: '访问器属性 setter/getter', link: '/js/object/getter-setter'},
          {text: '属性标志', link: '/js/object/property-descriptors'},
        ]
      },
      {
        text: '文档对象 document',
        items: [
          {text: '选择元素 querySelector', link: '/js/document/select'},
        ]
      }
    ],
    '/css/': [
      {
        text: 'CSS',
        items: [
          {text: '伪类', link: '/css/pseudo-classes'},
          {text: '定位 position', link: '/css/position'},
        ]
      },
      {
        text: '脑图笔记',
        items: [
          {text: 'css 1', link: '/css/x-mind/css1'},
          {text: 'css 2', link: '/css/x-mind/css2'}
        ]
      }
    ],


    // 前端
    '/frontend/type-script/': [
      {text: '示例', link: '/frontend/type-script/example'},
      {
        text: '常见问题',
        items: [
          {text: '第三方库无类型', link: '/frontend/type-script/FAQ/cdn-load'}
        ]
      }
    ],
    '/frontend/vue-router/': [
      {
        text: 'vue router',
        items: [
          {text: '介绍', link: '/frontend/vue-router/intro'},
          {text: '安装', link: '/frontend/vue-router/install'},
          {text: '路由', link: '/frontend/vue-router/route'},
          {text: '嵌套路由', link: '/frontend/vue-router/children'},
          {text: '路由传参', link: '/frontend/vue-router/props'},
          {text: '示例', link: '/frontend/vue-router/example'},
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
    '/frontend/echarts/': [
      {
        text: '基础',
        items: [
          {text: '概念', link: '/frontend/echarts/base/concepts'},
        ]
      },
      {
        text: '示例',
        items: [
          {text: '柱状图', link: '/frontend/echarts/example/bar'}
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
          {text: '监听元素改变', link: '/frontend/vue-demo/resize-observer'},
          {text: '取消请求', link: '/frontend/vue-demo/cancellation'},
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
      {
        text: '基础',
        items: [
          {text: '虚拟环境', link: '/backend/python/base/env'},
          {text: '类型提示', link: '/backend/python/base/typing'},
          {text: '时间处理', link: '/backend/python/base/datetime'},
          {text: 'pip', link: '/backend/python/base/pip'},
        ]
      },
      {
        text: '高级',
        items: [
          {text: '异步', link: '/backend/python/advanced/async'}
        ]
      },
      {
        text: '常见问题',
        items: [
          {text: 'C++ is required', link: '/backend/python/FAQ/C++_is_required'}
        ]
      },
      {
        text: '脑图笔记',
        items: [
          {text: 'python', link: '/backend/python/x-mind/python'}
        ]
      }
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
      },
      {
        text: '脑图笔记',
        items: [
          {text: 'fastapi', link: '/backend/fastapi/x-mind/fastapi'}
        ]
      }
    ],
    '/backend/docker/': [
      {
        text: '基础',
        items: [
          {text: '安装', link: '/backend/docker/base/install'},
          {text: '示例', link: '/backend/docker/base/example'},
        ]
      },
      {
        text: '脑图笔记',
        items: [
          {text: 'docker', link: '/backend/docker/x-mind/docker'}
        ]
      }
    ],
    '/backend/linux/': [
      {
        text: 'linux',
        items: [
          {text: '命令', link: '/backend/linux/command'},
        ]
      }
    ],
    '/backend/mongodb/': [
      {text: '安装', link: '/backend/mongodb/install'},
      {text: '基础操作', link: '/backend/mongodb/simple'},
      {text: '事务', link: '/backend/mongodb/transaction'},
    ],

    '/tools/git/': [
      {
        text: 'GIT',
        items: [
          {text: '安装', link: '/tools/git/install'},
          {text: '基本操作', link: '/tools/git/overview'},
          {text: '推送 push', link: '/tools/git/push'},
          {text: '拉取 pull', link: '/tools/git/pull'},
          {text: '提交 commit', link: '/tools/git/commit'},
          {text: '分支 branch', link: '/tools/git/branch'},
          {text: '合并 merge', link: '/tools/git/merge'},
          {text: '变基 rebase', link: '/tools/git/rebase'},
          {text: '日志 log', link: '/tools/git/log'},
          {text: '临时存储 stash', link: '/tools/git/stash'},
          {text: '签出 checkout', link: '/tools/git/checkout'},
          {text: '删除', link: '/tools/git/delete'},
          {text: 'pull requests', link: '/tools/git/PR'},
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
          {text: 'ssr 兼容性', link: '/tools/vitepress/ssr'},
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