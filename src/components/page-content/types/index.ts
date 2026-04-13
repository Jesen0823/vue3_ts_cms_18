import { ITableType } from '@/base-ui/table'

export interface IContentTableConfig {
  title: string
  showIndexColumn: boolean
  showSelectColumn: boolean
  propList: ITableType[]
}

export interface IPageContentInstance {
  getPageData: (queryInfo?: any) => void
}
