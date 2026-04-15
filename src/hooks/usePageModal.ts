import PageModal from '@/components/page-modal'
import { ref } from 'vue'
import type { Ref } from 'vue'

type CallbackFnType = () => void

export function usePageModal(
  createCb?: CallbackFnType,
  updateCb?: CallbackFnType
): [
  Ref<InstanceType<typeof PageModal> | null>,
  Ref<Record<string, any>>,
  () => void,
  (item: any) => void
] {
  const refModalPage = ref<InstanceType<typeof PageModal> | null>(null)
  const defaultInfo = ref<Record<string, any>>({})

  const eventHandleCreate = () => {
    defaultInfo.value = {}
    if ((refModalPage as any).value) {
      ;(refModalPage as any).value.dialogVisible = true
    }
    createCb && createCb()
  }

  const eventHandleUpdate = (item: any) => {
    console.log('usePageModal', 'eventHandleUpdate, item: ', item)
    ;(defaultInfo as any).value = { ...item }
    if ((refModalPage as any).value) {
      ;(refModalPage as any).value.dialogVisible = true
    }
    updateCb && updateCb()
    console.log('usePageModal', 'eventHandleUpdate, defaultInfo: ', defaultInfo)
  }

  return [refModalPage, defaultInfo, eventHandleCreate, eventHandleUpdate]
}
