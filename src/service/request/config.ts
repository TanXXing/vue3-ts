//

// 方式二：根据process.env.NODE_ENV的值来进行区分

let BASE_URL = ''

// 10s
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
  // BASE_URL = 'http://httpbin.org/'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coderwhy.org/pro'
} else {
  BASE_URL = 'http://coderwhy.org/test'
}

export { BASE_URL, TIME_OUT }
