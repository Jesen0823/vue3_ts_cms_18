import PageContent from '@/components/page-content'
import { ref } from 'vue'
import type { Ref } from 'vue'

export function usePageSearch(): [
  Ref<InstanceType<typeof PageContent> | null>,
  () => void,
  (queryInfo: any) => void
] {
  const refPageContent = ref<InstanceType<typeof PageContent> | null>(null)
  const handleResetClick = () => {
    ;(refPageContent as any).value?.getPageData?.()
  }
  const handleSearchClick = (queryInfo: any) => {
    ;(refPageContent as any).value?.getPageData?.(queryInfo)
  }

  return [refPageContent, handleResetClick, handleSearchClick]
}
