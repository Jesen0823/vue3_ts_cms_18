import { createApp, App } from 'vue'
import rootApp from './App.vue'
import router from './router'
import store from './store'
import './service/axios_demo'
import { registerApp } from './global'
import cmRequest from './service'

const app: App = createApp(rootApp)

registerApp(app) // 注册Elementplugin

app.use(router).use(store)

app.mount('#app')

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
