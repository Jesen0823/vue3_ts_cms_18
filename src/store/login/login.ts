import { Module } from 'vuex'
import { IRootState } from '../types'
import { ILoginState } from './types'
import {
  accountLoginRequest,
  requestUserMenusByRoleId,
  reqUserInfoById
} from '@/service/login/login'
import { IAcount } from '@/service/login/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import {
  clearFirstMenu,
  mapMenusToPermissions,
  mapMenusToRoutes
} from '@/utils/map-menus'

// Module的泛型参数，第一个是模块的State,第二个是全局State
const loginMoudle: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
      clearFirstMenu()
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 处理main的动态子路由
      const routes = mapMenusToRoutes(userMenus)
      console.log('routes:', routes)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户菜单权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAcount) {
      console.log('accountLoginAction', payload)
      // 开始登录
      const loginResult = await accountLoginRequest(payload)
      console.log('loginResult', loginResult)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      console.log('request 1', loginResult)
      localCache.setCache('token', token)

      // 拿到token后，获取初始化数据
      dispatch('getInitialDataAction', null, { root: true })

      // 请求用户信息
      const userInfoResult = await reqUserInfoById(id)
      console.log('request 2', userInfoResult)
      const userInfo = userInfoResult?.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 请求用户主菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      console.log('request 3', userMenusResult)
      const userMenus = userMenusResult?.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 跳转首页
      router.push('/main')
    },

    phoneLoginAction({ commit }, payload: any) {
      console.log('phoneLoginAction', payload)
      console.log(typeof commit)
    },

    // 防止页面刷新后，存储在vuex内存的数据丢失，备份到store
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        dispatch('getInitialDataAction', null, { root: true })
      }

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginMoudle
