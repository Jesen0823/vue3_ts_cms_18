import axios from 'axios'

import type { AxiosInstance } from 'axios'
import type { CMRequestConfig, CMRequstInterceptors } from './type'
import { ElLoading } from 'element-plus'
const DEFAULT_LOADING = true

class CMRequest {
  instance: AxiosInstance
  interceptors?: CMRequstInterceptors
  showLoading: boolean
  loading?: any

  constructor(config: CMRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.interceptors = config.interceptors
    this.showLoading = config?.showLoading ?? DEFAULT_LOADING

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
        if (data?.returnCode === '-1001') {
          console.log('error', 'Data is null')
        } else {
          return res.data
        }
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
    // 使用自定义拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestIntercetor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseIntercetor,
      this.interceptors?.responseInterceptorCatch
    )
  }

  /*
  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((res) => {
      console.log('request', res.data)
    })
  }
  */

  request2<T = any>(config: CMRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestIntercetor) {
        // 暂时这样写，后续修改为 config = config.interceptors.requestIntercetor(config)
        config = config.interceptors.requestIntercetor(config as any)
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 对请求结果进行转化
          if (config.interceptors?.responseIntercetor) {
            res = config.interceptors.responseIntercetor(res)
          }
          console.log('request2', res)
          // 2.将showLoading设置true, 这样不会影响下一个请求
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

  get<T = any>(config: CMRequestConfig<T>): Promise<T> {
    return this.request2<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: CMRequestConfig<T>): Promise<T> {
    return this.request2<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: CMRequestConfig<T>): Promise<T> {
    return this.request2<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: CMRequestConfig<T>): Promise<T> {
    return this.request2<T>({ ...config, method: 'PATCH' })
  }
}

export default CMRequest
