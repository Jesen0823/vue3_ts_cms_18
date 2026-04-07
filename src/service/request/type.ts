import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

export interface CMRequstInterceptors<T = AxiosResponse> {
  requestIntercetor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseIntercetor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface CMRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: CMRequstInterceptors<T>
  showLoading?: boolean
}
