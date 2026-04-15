import cmRequest from '@/service'
import { IDataType } from '@/service/types'

export function getPageListData(url: string, queryInfo: any) {
  return cmRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string) {
  return cmRequest.delete<IDataType>({ url: url })
}

export function createPageData(cUrl: string, cData: any) {
  return cmRequest.post<IDataType>({ url: cUrl, data: cData })
}

export function updatePageData(eUrl: string, eData: any) {
  return cmRequest.patch<IDataType>({ url: eUrl, data: eData })
}
