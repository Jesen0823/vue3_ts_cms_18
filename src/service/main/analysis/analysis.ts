import cmRequest from '@/service'
import { IDataType } from '@/service/types'

enum AnalysisAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getCategoryGoodsCount() {
  return cmRequest.get<IDataType>({
    url: AnalysisAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return cmRequest.get<IDataType>({
    url: AnalysisAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return cmRequest.get<IDataType>({
    url: AnalysisAPI.categoryGoodsFavor
  })
}

export function getAddressGoodsSale() {
  return cmRequest.get<IDataType>({
    url: AnalysisAPI.addressGoodsSale
  })
}
