export interface IRootState {
  name: string
  age: number
}

import type { ISystemState } from '@/store/main/system/types'
import type { ILoginState } from '@/store/login/types'

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
