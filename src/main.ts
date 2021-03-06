import { createApp } from 'vue'
import rootApp from './App.vue'

import router from '@/router/index'
import store from '@/store/index'
import { setupStore } from '@/store/index'

import { globalRegister } from './global/index'

// import xxRequest from './service/index'

// 引入全局样式(已经安装了normalize.css的模块，npm install)
import 'normalize.css'

// 自己定义一些样式
import 'assets/css/index.less'

const app = createApp(rootApp)

// registerApp(app)

app.use(globalRegister)

app.use(store)

// 初始化store中的某些数据，避免vuex中的数据在登录后，因为“刷新”或者是其它的情况而导致vuex中的数据消失
setupStore()

app.use(router)

app.mount('#app')

/* interface DataType {
  data: any
  returnCode: string
  success: boolean
} */
// 发起真正地请求

/* xxRequest.request({
  url: '/home/multidata',
  method: 'get',
  interceptors: {
    requestInterceptor: (config) => {
      console.log('每种请求的：请求成功的拦截')
      return config
    },
    responseInterceptor: (res) => {
      console.log('每种请求的：响应成功的拦截')
      return res.data
    }
  }
}) */

// import './service/axios_demo'
