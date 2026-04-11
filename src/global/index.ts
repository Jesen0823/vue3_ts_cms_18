import { App } from 'vue'
import registerElement from './register-element'
import registerElementIcon from './register-element-icon'
import registerProperties from './register-properties'
export function registerApp(app: App): void {
  // 全局引入组件
  registerElement(app)
  registerElementIcon(app)
  app.use(registerProperties)
}
