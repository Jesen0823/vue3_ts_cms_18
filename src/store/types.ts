import { ILoginState } from './login/types'

export interface IRootState {
  name: string
  age: number
}

// 可拓展
export interface IRootWithModule {
  loginMoudle: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
