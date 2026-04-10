import cmRequest from '@/service'
import { IDataType } from '@/service/types'

export function getPageListData(url: string, queryInfo: any) {
  return cmRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
