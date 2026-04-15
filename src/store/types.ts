import { ILoginState } from './login/types'
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
}

export type IStoreType = IRootState & IRootWithModule
