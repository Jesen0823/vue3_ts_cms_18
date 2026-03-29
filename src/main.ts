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
