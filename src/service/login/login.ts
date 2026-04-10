import cmRequest from '..'
import { IDataType } from '../types'
import { IAcount, ILoginResult } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenu = '/role/'
}

export function accountLoginRequest(account: IAcount) {
  return cmRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function reqUserInfoById(id: number) {
  return cmRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusByRoleId(id: number) {
  return cmRequest.get<IDataType>({
    url: LoginAPI.UserMenu + id + '/menu',
    showLoading: false
  })
}
