import axios from 'axios'

import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { CMRequestConfig, CMRequstInterceptors } from './type'
import { ElLoading } from 'element-plus'
const DEFAULT_LOADING = true

class CMRequest {
  instance: AxiosInstance
  interceptors?: CMRequstInterceptors
  showLoading: boolean
  loading?: any

  constructor(config: CMRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config?.showLoading ?? DEFAULT_LOADING

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
        // 动画
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'loading...',
            background: 'rgba(0,0,0,0.5)'
          })
        }
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
        this.loading?.close() // 移除loading
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('error', 'Data is null')
        }
        return res.data
      },
      (err) => {
        console.log('public interceptor response faild.')
        this.loading?.close() // 移除loading
        // 根据HttpErrorCode显示对应的错误信息
        if (err.response.status === 404) {
          console.log('error-404')
        }
        return err
      }
    )
  }

  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((res) => {
      console.log('request', res.data)
    })
  }

  request2<T>(config: CMRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestIntercetor) {
        config = config.interceptors.requestIntercetor(config)
      }
      if (config.showLoading === false) {
        this.showLoading = false
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 对请求结果进行转化
          if (config.interceptors?.responseIntercetor) {
            res = config.interceptors.responseIntercetor(res)
          }
          console.log('request2', res)
          this.showLoading = DEFAULT_LOADING
          // 将结果通过resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: CMRequestConfig): Promise<T> {
    return this.request2<T>({ ...config, method: 'GET' })
  }

  post<T>(config: CMRequestConfig): Promise<T> {
    return this.request2<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: CMRequestConfig): Promise<T> {
    return this.request2<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: CMRequestConfig): Promise<T> {
    return this.request2<T>({ ...config, method: 'PATCH' })
  }
}

export default CMRequest
