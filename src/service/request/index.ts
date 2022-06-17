import axios from 'axios'

import type { AxiosInstance } from 'axios'

import type { XXinterceptors, XXRequestConfig } from './type'

import { ElLoading } from 'element-plus'

import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
/* class XXRequest {
  instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
  }

  request(config: AxiosRequestConfig) {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
} */

// 将某个反复用到的常量提取出来，
const DEFAULT_LOADING = true

class XXRequest {
  instance: AxiosInstance
  interceptors?: XXinterceptors
  loading?: LoadingInstance
  isShowLoading: boolean

  constructor(config: XXRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    //对isShowLoading进行初始化：当config.isShowLoading为null或者是undefined时，取??后面的值
    this.isShowLoading = config.isShowLoading ?? DEFAULT_LOADING

    /* 创建所有实例共有的拦截器 */
    // 所有实例共有的请求拦截(使用的两个回调函数是内置的定义好的函数类型)
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例共有的：请求成功拦截')

        if (this.isShowLoading) {
          this.loading = ElLoading.service({
            lock: true,
            background: 'grba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (error) => {
        // console.log('所有实例共有的：请求失败的拦截')
        return error
      }
    )

    // 所有实例共有的响应拦截
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有实例共有的：响应成功的拦截')

        // 将loading移除
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~，错误信息')
        } else {
          return data
        }
      },
      (error) => {
        console.log(error)
        // console.log('所有实例共有的：响应失败的拦截')

        // 例子：判断不同的HttpErrorCode显示不同的错误信息
        if (error.response.status === 404) {
          console.log('404的错误')
        }
        return error
      }
    )

    /* 从config中取出来的每个实例的拦截器*/
    // 请求拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    // 响应拦截
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }
 
  /* 创建每个实例的每种请求才具有的拦截器(比如：get, post, push等，因此，需要
    对下面的代码进行改造) */

  /*   // 改造前
  request(config: AxiosRequestConfig) {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  } */

  // 改造后

  request<T>(config: XXRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.isShowLoading === false) {
        /*
        当某个实例的某种请求方式下isShowLoading为false时，将this.isShowLoading设置为false
        ，但是，这会影响到同样实例的下一次的请求，this.isShowLoading仍然为true，因此，需要
        在此次请求完成之后，this.isShowLoading重置为默认值：true
        */
        this.isShowLoading = config.isShowLoading
      }

      // 该请求传递了“关于请求的拦截器”
      if (config.interceptors?.requestInterceptor) {
        // 执行请求拦截
        /* this.instance.interceptors.request.use(config.interceptors.requestInterceptor) */
        config = config.interceptors?.requestInterceptor(config)
      }

      // 上面通过对每个实例对应的每种请求做了一个拦截后(对请求的数据做一个处理)，然后发起真正地网络请求
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 对每个实例的每种请求的响应拦截
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          // 将isShowLoading设置为true，这样不会影响下一个请求
          this.isShowLoading = DEFAULT_LOADING

          // 将拿到的结果返回出去，使得xxRequest.request()可以拿到请求的结果
          resolve(res)
        })
        .catch((err) => {
          // 将isShowLoading设置为true，这样不会影响下一个请求
          this.isShowLoading = DEFAULT_LOADING

          reject(err)
        })
    })
  }

  // get请求
  get<T>(config: XXRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  // post请求
  post<T>(config: XXRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  // delet请求
  delete<T>(config: XXRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }

  // patch请求
  patch<T = any>(config: XXRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default XXRequest
