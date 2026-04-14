import PageModal from '@/components/page-modal'
import { ref } from 'vue'
import type { Ref } from 'vue'

export function usePageModal(): [
  Ref<InstanceType<typeof PageModal> | null>,
  Ref<Record<string, any>>,
  () => void,
  (item: any) => void
] {
  const refModalPage = ref<InstanceType<typeof PageModal> | null>(null)
  const defaultInfo = ref<Record<string, any>>({})

  const eventHandleCreate = () => {
    if ((refModalPage as any).value) {
      ;(refModalPage as any).value.dialogVisible = true
    }
  }

  const eventHandleUpdate = (item: any) => {
    console.log('usePageModal', 'eventHandleUpdate, item: ', item)
    ;(defaultInfo as any).value = { ...item }
    if ((refModalPage as any).value) {
      ;(refModalPage as any).value.dialogVisible = true
    }
    console.log('usePageModal', 'eventHandleUpdate, defaultInfo: ', defaultInfo)
  }

  return [refModalPage, defaultInfo, eventHandleCreate, eventHandleUpdate]
}
