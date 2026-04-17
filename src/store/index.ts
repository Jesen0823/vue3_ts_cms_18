import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import loginMoudle from './login/login'
import systemModule from './main/system/system'
import { getPageListData } from '@/service/main/system/system'
import analysisModule from './main/analysis/analysis'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'jesen',
      age: 1,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      // 1. 部门列表
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 999
      })
      console.log('department:', departmentResult.data)
      const { list: departmentList } = departmentResult.data
      // 保存数据
      commit('changeEntireDepartment', departmentList)

      // 2. 角色列表
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 999
      })
      const { list: roleList } = roleResult.data
      commit('changeEntireRole', roleList)

      // 3. 菜单列表
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    loginMoudle,
    systemModule,
    analysisModule
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
