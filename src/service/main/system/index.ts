import xxRequest from '@/service/index'
import { IDataType } from '@/service/types'

export function requestPageListData(url: string, queryInfo: any) {
  return xxRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
