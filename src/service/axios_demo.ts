import axios from 'axios'

console.log('------------')

axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res.data.data)
})

/* axios
  .get('http://httpbin.org/get', {
    params: {
      name: 'why',
      age: 18
    }
  })
  .then((res) => {
    console.log(res)
  }) */

/* new Promise<string>((resolve) => {
  resolve('123')
}).then((res) => {
  console.log(res)
})
 */
