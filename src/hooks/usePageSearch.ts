import PageContent from '@/components/page-content'
import { ref } from 'vue'

export function usePageSearch() {
  const refPageContent = ref<InstanceType<typeof PageContent> | null>(null)
  const handleResetClick = () => {
    ;(refPageContent as any).value?.getPageData?.()
  }
  const handleSearchClick = (queryInfo: any) => {
    ;(refPageContent as any).value?.getPageData?.(queryInfo)
  }

  // 也可以返回一个对象
  return [refPageContent, handleResetClick, handleSearchClick]
}
