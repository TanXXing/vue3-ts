export interface IAccount {
  name: string
  password: string
}

/*
可以像下面这样写，但是，这样的话不好，因为出现了any
export interface IDataType {
  code: number,
  data: any
}
 */

/*
下面的写法，就可以保证不any来表示类型，而且，data的类型是可变的
*/
export interface ILoginResult {
  id: number
  name: string
  token: string
}


