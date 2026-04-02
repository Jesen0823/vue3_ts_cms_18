import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface CMRequstInterceptors<T = AxiosResponse> {
  requestIntercetor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseIntercetor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface CMRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: CMRequstInterceptors<T>
  showLoading?: boolean
}
