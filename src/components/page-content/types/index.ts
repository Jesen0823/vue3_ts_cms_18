import { ITableType } from '@/base-ui/table'

export interface IContentTableConfig {
  title: string
  showIndexColumn: boolean
  showSelectColumn: boolean
  propList: ITableType[]
}
