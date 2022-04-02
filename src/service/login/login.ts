import xxRequest from '../index'

import type { IAccount, ILoginResult } from './types'

import { IDataType } from '@/service/types'
// 枚举类型(是可以给枚举类型赋值的)
enum loginAPI {
  accountLogin = '/login',
  userLogin = '/users/', //用法： /users/1
  userMenus = '/role/' // 用法： role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return xxRequest.post<IDataType<ILoginResult>>({
    url: loginAPI.accountLogin,
    data: account
  })
}

// 后面的请求，不想要让它实现loading加载特效
export function userInfoRequestById(id: number) {
  return xxRequest.get<IDataType>({
    url: loginAPI.userLogin + id,
    isShowLoading: false
  })
}

// 后面的请求，不想要让它实现loading加载特效
export function userMenusRequestByRoleId(id: number) {
  return xxRequest.get<IDataType>({
    url: loginAPI.userMenus + id + '/menu',
    isShowLoading: false
  })
}
