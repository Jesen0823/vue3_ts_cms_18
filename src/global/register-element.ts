import {
  ElButton,
  ElCheckbox,
  ElCheckboxGroup,
  ElTableColumn,
  ElTabPane,
  ElTabs,
  ElIcon,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink
} from 'element-plus'
import 'element-plus/dist/index.css' // 全局引入样式
import { App } from 'vue'
const elComponents = [
  ElButton,
  ElCheckbox,
  ElLink,
  ElCheckboxGroup,
  ElTabs,
  ElTabPane,
  ElTableColumn,
  ElIcon,
  ElForm,
  ElFormItem,
  ElInput
]

export default function (app: App): void {
  for (const elComponent of elComponents) {
    if (elComponent.name) {
      app.component(elComponent.name, elComponent)
    }
  }
}
