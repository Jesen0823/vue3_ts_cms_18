import { ElButton, ElCheckbox, ElCheckboxGroup } from 'element-plus'
import 'element-plus/dist/index.css' // 全局引入样式
import { App } from 'vue'
const elComponents = [ElButton, ElCheckbox, ElCheckboxGroup]

export default function (app: App): void {
  for (const elComponent of elComponents) {
    if (elComponent.name) {
      app.component(elComponent.name, elComponent)
    }
  }
}
