import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import loginMoudle from './login/login'
import systemModule from './main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'jesen',
      age: 1
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    loginMoudle,
    systemModule
  }
})

export function setupStore() {
  store.dispatch('loginMoudle/loadLocalLogin')
}

// 包装useStore
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
