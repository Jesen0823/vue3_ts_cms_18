/* eslint-disable */
/// <reference types="node" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 声明 CSS 文件模块（标准格式）
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
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
