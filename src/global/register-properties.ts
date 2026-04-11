import { formatUtcTime } from '@/utils/date-format'
import { App } from 'vue'

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    foo() {
      console.log('global properrity')
    },
    formatTime(value: string) {
      return formatUtcTime(value)
    }
  }
}
