import { Module } from 'vuex'
import { ISystemState } from './types'
import { IRootState } from '@/store/types'
import { getPageListData } from '@/service/main/system/system'
import { upperFirstLetter } from '@/utils/string-util'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    changeUsersList(state, list: any[]) {
      state.usersList = list
    },
    changeUserCount(state, count: number) {
      state.usersCount = count
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'user':
            return state.usersList
          case 'role':
            return state.roleList
        }
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      let pageUrl = ''
      switch (pageName) {
        case 'uses':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
      }
      console.log('getPageListAction', payload.pageName)
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      console.log('pageResult', pageResult)
      const { list, totalCount } = pageResult.data
      commit(`change${upperFirstLetter(pageName)}List`, list)
      commit(`change${upperFirstLetter(pageName)}Count`, totalCount)
    }
  }
}

export default systemModule
