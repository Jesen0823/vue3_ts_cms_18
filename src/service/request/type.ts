import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface CMRequstInterceptors {
  requestIntercetor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseIntercetor?: (res: any) => any
  responseInterceptorCatch?: (error: any) => any
}

export interface CMRequestConfig extends AxiosRequestConfig {
  interceptors?: CMRequstInterceptors
  showLoading?: boolean
}
