import { createApp, App } from 'vue'
import rootApp from './App.vue'
import router from './router'
import store from './store'

import { registerApp } from './global'

const app: App = createApp(rootApp)

registerApp(app) // 注册Elementplugin

app.use(router).use(store)

app.mount('#app')
