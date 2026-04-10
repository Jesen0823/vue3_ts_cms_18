import { Module } from 'vuex'
import { ISystemState } from './types'
import { IRootState } from '@/store/types'
import { getPageListData } from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, count: number) {
      state.userCount = count
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      console.log('getPageListAction', payload.pageUrl)
      const pageResult = await getPageListData(
        payload.pageUrl,
        payload.queryInfo
      )
      console.log('pageResult', pageResult)
      const { list, totalCount } = pageResult.data
      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    }
  }
}

export default systemModule
