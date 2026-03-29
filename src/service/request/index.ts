import axios from 'axios'

import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { CMRequestConfig, CMRequstInterceptors } from './type'

class CMRequest {
  instance: AxiosInstance
  interceptors?: CMRequstInterceptors

  constructor(config: CMRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 使用自定义拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptorCatch,
      this.interceptors?.requestIntercetor
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptorCatch,
      this.interceptors?.responseIntercetor
    )
    // 添加公共拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('public interceptor request success.')
        return config
      },
      (err) => {
        console.log('public interceptor request faild.')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('public interceptor response success.')
        return res
      },
      (err) => {
        console.log('public interceptor response faild.')
        return err
      }
    )
  }

  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((res) => {
      console.log('request', res.data)
    })
  }

  request2(config: CMRequestConfig): void {
    if (config.interceptors?.requestIntercetor) {
      config = config.interceptors.requestIntercetor(config)
    }
    this.instance.request(config).then((res) => {
      // 对请求结果进行转化
      if (config.interceptors?.responseIntercetor) {
        res = config.interceptors.responseIntercetor(res)
      }
      console.log('request2', res.data)
    })
  }
}

export default CMRequest
