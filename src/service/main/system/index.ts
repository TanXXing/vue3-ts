import xxRequest from '@/service/index'
import { IDataType } from '@/service/types'

export function requestPageListData(url: string, queryInfo: any) {
  return xxRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

//  /user/id
export function deletePageData(url: string) {
  return xxRequest.delete<IDataType>({
    url
  })
}

// 创建数据的请求
export function createPageData(url: string, newData: any) {
  return xxRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

// 编辑数据的请求
export function editPageData(url: string, editData: any) {
  return xxRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}



