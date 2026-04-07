let BASE_URL = ''
let BASE_NAME = ''
const TIME_OUT = 10000
// http://152.136.185.210:5000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api' // 参考vue.config.js对api的配置
  BASE_NAME = 'bate'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://jesen.org/dprodct'
  BASE_NAME = 'dev'
} else {
  BASE_URL = 'http://jesen.org/test'
  BASE_NAME = 'test'
}

export { BASE_URL, BASE_NAME, TIME_OUT }
