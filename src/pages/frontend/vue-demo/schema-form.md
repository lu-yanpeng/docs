# 配置式表单

通过定义好的schema生成对应表单，参考[这个](https://doc.vben.pro/components/common-ui/vben-form.html)项目，
[效果](https://stackblitz.com/edit/vitejs-vite-soddef?file=src%2FApp.vue)

原理，在`my-form.vue`组件里面遍历schema来渲染表单控件，formData通过props传递进来，这个组件只负责渲染数据。
创建`use-form.tsx`在这个组合式函数里面导入myForm，通过`defineComponent`创建组件并返回，然后在useForm这个函数里面管理表单状态，
最终返回Form组件和formApi

::: details 代码
::: code-group
<<< @/../components/frontend/vue-demo/schema-form/index.vue
<<< @/../components/frontend/vue-demo/schema-form/use-form.tsx
<<< @/../components/frontend/vue-demo/schema-form/my-form.vue
<<< @/../components/frontend/vue-demo/schema-form/global-state.ts
<<< @/../components/frontend/vue-demo/schema-form/types.ts
:::
