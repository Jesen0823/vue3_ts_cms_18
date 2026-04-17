import { ILoginState } from './login/types'
import { IAnalysisState } from './main/analysis/types'
import { ISystemState } from './main/system/types'

export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

// 可拓展
export interface IRootWithModule {
  loginMoudle: ILoginState
  systemModule: ISystemState
  analysisModule: IAnalysisState
}

export type IStoreType = IRootState & IRootWithModule
