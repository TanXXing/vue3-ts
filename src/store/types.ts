export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

import type { ISystemState } from '@/store/main/system/types'
import type { ILoginState } from '@/store/login/types'
import type { IDashboardState } from '@/store/main/analysis/types'

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
