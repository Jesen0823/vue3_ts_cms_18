import { TIME_OUT, BASE_URL } from './config'
import CMRequest from './request'

const cmRequest = new CMRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestIntercetor: (config) => {
      console.log('requestIntercetor')
      const token = ''
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (error) => {
      console.log('requestInterceptorCatch')
      return error
    },
    responseInterceptorCatch: (error) => {
      console.log('responseInterceptorCatch')
      return error
    },
    responseIntercetor: (res) => {
      console.log('responseIntercetor')
      return res
    }
  }
})

export default cmRequest
