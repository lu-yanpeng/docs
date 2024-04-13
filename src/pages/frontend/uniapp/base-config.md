# 基础项目配置


## eslint

这里直接从最新的vue3项目复制过来的配置

```shell
// 执行检查的命令，需要手动创建.gitignore
"lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"
pnpm lint

// 依赖项
pnpm add -D eslint eslint-plugin-vue @vue/eslint-config-typescript @rushstack/eslint-patch @vue/eslint-config-prettier eslint-plugin-cypress
```

::: 配置参考
.eslintrc.cjs

```js
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/support/**/*.{js,ts,jsx,tsx}'
      ],
      'extends': [
        'plugin:cypress/recommended'
      ]
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "vue/multi-word-component-names": "off"
  },
  settings: {
      'html/html-extensions': [
        ".erb",
        ".handlebars",
        ".hbs",
        ".htm",
        ".html",
        ".mustache",
        ".nunjucks",
        ".php",
        ".tag",
        ".twig",
        ".wxml",
        ".we",
      ]
  },
  globals: {      
      uni: true,      
    },
}

```
:::


## prettier

```shell
// scr需要手动替换成对应目录
"format": "prettier --write src/"
pnpm format

pnpm add -D prettier
```