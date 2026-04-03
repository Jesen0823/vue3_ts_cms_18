import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { App } from 'vue'

export default function (app: App): void {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    if (
      typeof component === 'object' &&
      component !== null &&
      'name' in component
    ) {
      app.component(key, component)
    }
  }
}
