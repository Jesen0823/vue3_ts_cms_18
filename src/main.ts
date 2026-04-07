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

app.use(router).use(store)
setupStore()
app.mount('#app')
