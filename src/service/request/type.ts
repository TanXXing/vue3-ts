import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 定义拦截器的数据类型
export interface XXinterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (response: T) => T

  //这个地方想要利用泛型来解决问题，但是是可行的“具体见：视频：33 时间：02：38：27”
  /* 为什么要这么做呢?因为返回一个Promise对象之后，得到的结果的类型有冲突
  res = config.interceptors.responseInterceptor(res)，
  类型“T”的参数不能赋值给类型“AxiosResponse的参数”
  出现这种情况是由于：封装方式一(不同实例具有不同的拦截器)和封装方式二(不同实例具有相同的拦截器)均
  用到了内置的函数interceptors.request/response.use()，其中，封装方式一：我们在外界定义了use中的两个回调函数，
  它们是responseInterceptor，但是，在封装方式三中，我们又采用了不使用默认内置的use函数，并且
  为了拿到请求后的数据，并返回了一个promise之后，得到的结果，将config.interceptors.responseInterceptor(res)
  中res的类型修改了，其修改后的类型为泛型T，但是config.interceptors.responseInterceptor要求传入的参数是AxiosResponse(
    此时，实际上是axios作为第三方库传递过来是数据是一个AxiosResponse类型的实参，我们通过形参config可以获得这个
    类型为AxiosResponse的数据
  )，因此，这里出问题了
  ，之前想要通过responseInterceptor<T = AxiosResponse>?: (response: T) => T来解决，也就是说把这个
  地方当作泛型来处理，但是，显然，这里不行，
  */
  // responseInterceptor<T = AxiosResponse>?: (response: T) => T

  /*
  解决上面问题的方案如下：
  第一种方案：responseInterceptor?: (response: any) => any
  思路是：任何类型都可以传递给any类型，即使是axios这个第三库中的AxiosResponse和泛型，它们也都可以传递过给any类型

  第二种方案：见视频：34：时间：00：22：57
  */
  responseInterceptorCatch?: (error: any) => any
}

// 定义constructor中的配置类型
export interface XXRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: XXinterceptors<T>
  isShowLoading?: boolean
}
