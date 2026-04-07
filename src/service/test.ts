import cmRequest from './index'

/*
cmRequest.request({
  url: '/home/multidata',
  method: 'GET'
})
*/

cmRequest.request2({
  url: '/home/multidata',
  method: 'GET',
  interceptors: {
    requestIntercetor: (config) => {
      // 修改config
      console.log('单个request请求的config修改')
      return config
    },
    responseIntercetor: (res) => {
      console.log('单个response的config修改')
      // 修改res
      return res
    }
  }
})

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

cmRequest
  .request2<DataType>({
    url: '/home/multidata',
    method: 'GET'
  })
  .then((res) => {
    console.log('main res: ', res.data)
    console.log('main res: ', res.success)
  })
