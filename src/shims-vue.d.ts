/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

import 'vue'
import type { Ref as VueRef } from '@vue/reactivity'

declare module 'vue' {
  interface ComponentCustomProperties {
    $filters: {
      foo(): void
      formatTime(value: string): string
    }
  }
  
  export type Ref<T = any> = VueRef<T>
}
