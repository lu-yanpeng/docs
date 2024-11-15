import type { Component } from 'vue'

type ComponentType =
    | 'Input'
    | 'Select'

export interface FormOptions {
  schema: {
    /** 组件 */
    component: Component | ComponentType
    /** 组件参数 */
    // componentProps?: ComponentProps;
    componentProps?: any
    /** 默认值 */
    defaultValue?: any
    /** 依赖 */
    // dependencies?: FormItemDependencies;
    /** 描述 */
    description?: string
    /** 字段名 */
    fieldName: string
    /** 帮助信息 */
    help?: string
    /** 表单项 */
    label?: string
    // 自定义组件内部渲染
    // renderComponentContent?: RenderComponentContentType;
    /** 字段规则 */
    // rules?: FormSchemaRuleType;
    /** 后缀 */
    // suffix?: CustomRenderType;
  }[]
}
