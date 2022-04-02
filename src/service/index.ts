// service的统一出口

import XXRequest from './request/index'
import localCache from '@/utils/cache'

import { BASE_URL, TIME_OUT } from './request/config'

/* 现在有两个axios实例，每个axios实例都有不同的baseURL, 该怎么处理呢？*/

/* 现在有个需求是，我想让在通过new XXRequest()创建出来的实例时，不同的实例有不同的
拦截器(interceptors, 这个该怎么做呢？，我能直接在类XXRequest的原型上封装四个
  方法吗？如果是这样的话，肯定是不行的，因为类上的方法，默认是所有实例共享的，因此，
  这样做会有问题，也就是所有的实例需要有自己的方法(所有的实例需要有自己的属性，因此，需要
  在类的实例属性上想办法，去创建类的实例属性，既然，要创建类的实例属性，并且这个实例属性是
  动态变化的，因此，我们需要对类的constructor的参数进行改造(也就是它的数据类型)，
  因为，类的constructor属性中的AxiosRequestConfig的类型中，不包括，我要传递的类型，
  现在有两种处理方案，第一种对constructor传入的参数的类型进行改造(肯定是不能在第三库中的
    axios中的AxiosRequestConfig添加或者是删除某种类型) 第二种是：在保证仍然是传入AxiosRequestConfig
    的前提下，继续传递第二个或者是第三个参数等. 这里，我采用第一种方案
  constructor(config: AxiosRequestConfig) {
  }))
*/
/* const xxRequest = new XXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})
 */

const xxRequest = new XXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')

      if (token) {
        config!.headers!.Authorization = `Bearer ${token}`
      }

      // console.log('每个实例的：请求成功的拦截')
      return config
    },
    requestInterceptorCatch: () => {
      // console.log('每个实例的：请求失败的拦截')
    },
    responseInterceptor: (response) => {
      // console.log('每个实例的：响应成功的拦截')
      return response
    },
    responseInterceptorCatch: (err) => {
      // console.log('每个实例的：响应失败的拦截')
      console.log(err)
    }
  }
})

export default xxRequest
