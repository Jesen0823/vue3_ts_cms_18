import { localCache } from '@/utils/cache'
import { TIME_OUT, BASE_URL } from './config'
import CMRequest from './request'

const cmRequest = new CMRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestIntercetor: (config) => {
      // console.log('requestIntercetor')
      const token = localCache.getCache('token')
      console.log('cmRequest token', token)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (error) => {
      // console.log('requestInterceptorCatch')
      return error
    },
    responseIntercetor: (res) => {
      // console.log('responseIntercetor')
      return res
    },
    responseInterceptorCatch: (error) => {
      // console.log('responseInterceptorCatch')
      return error
    }
  }
})

export default cmRequest
