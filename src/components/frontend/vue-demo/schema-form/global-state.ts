import { Input, Select } from 'ant-design-vue'

// 所有需要用到的表单控件都需要提前在这里导入
const _components = {
  Input,
  Select
} as const;
type ComponentType = keyof (typeof _components);

type ComponentMap = {
  [key in ComponentType]: typeof _components[key]
}

export class GlobalState {
  // 所有需要用到的表单控件
  #Components: ComponentMap = _components

  public getComponents(
      componentName?: ComponentType,
  ) {
    if (componentName) {
      return this.#Components[componentName]
    }
    return this.#Components
  }
}

export const globalState = new GlobalState()
