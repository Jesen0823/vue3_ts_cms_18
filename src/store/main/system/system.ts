import { Module } from 'vuex'
import { ISystemState } from './types'
import { IRootState } from '@/store/types'
import {
  createPageData,
  deletePageData,
  getPageListData,
  updatePageData
} from '@/service/main/system/system'
import { upperFirstLetter } from '@/utils/string-util'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, list: any[]) {
      state.usersList = list
    },
    changeUsersCount(state, count: number) {
      state.usersCount = count
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      console.log('getPageListAction', payload.pageName)

      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      console.log('pageResult', pageResult)

      const { list, totalCount } = pageResult.data
      const upperPageName = upperFirstLetter(pageName)
      commit(`change${upperPageName}List`, list)
      commit(`change${upperPageName}Count`, totalCount)
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await deletePageData(pageUrl)
      // 可以将搜索关键字存储在vuex共享，在这里获取queryInfo
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      console.log('createPageDataAction,newData:', newData)
      await createPageData(pageUrl, newData)

      // 请求最新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async updatePageDataAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await updatePageData(pageUrl, editData)

      // 请求最新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
