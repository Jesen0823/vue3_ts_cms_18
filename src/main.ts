import { createApp, App } from 'vue'
import rootApp from './App.vue'
import router from './router'
import store, { setupStore } from './store'
// import './service/axios_demo'
import './assets/css/index.css'
import 'normalize.css'
import { registerApp } from './global'

const app: App = createApp(rootApp)

registerApp(app) // 注册Elementplugin
app.use(store)
setupStore() // 先加载本地登录信息，包括用户菜单和动态路由
app.use(router) // 再注册路由，确保路由守卫执行时动态路由已经注册

app.mount('#app')
