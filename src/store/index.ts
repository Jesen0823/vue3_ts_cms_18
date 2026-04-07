import { createStore } from 'vuex'
import { IRootState } from './types'
import loginMoudle from './login/login'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'jesen'
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    loginMoudle
  }
})

export function setupStore() {
  store.dispatch('/login/loadLocalLogin')
}

export default store
