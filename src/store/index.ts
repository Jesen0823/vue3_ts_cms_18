import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import loginMoudle from './login/login'
import systemModule from './main/system/system'
import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'jesen',
      age: 1,
      entireDepartment: [],
      entireRole: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 999
      })
      console.log('department:', departmentResult.data)
      const { list: departmentList } = departmentResult.data

      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 999
      })
      const { list: roleList } = roleResult.data

      // 保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
    }
  },
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
