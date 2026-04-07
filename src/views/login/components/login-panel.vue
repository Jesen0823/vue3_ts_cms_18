<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><UserFilled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon><Iphone /></el-icon>
            <i class="el-icon-user-solid">手机登录</i>
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="keepPwd">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { UserFilled, Iphone } from '@element-plus/icons-vue'
import loginAccount from './login-account.vue'
import loginPhone from './login-phone.vue'
// import LoginAccount from './login-account.vue'

export default defineComponent({
  setup() {
    const keepPwd = ref(true)
    // LoginAccount是组件对象，不是一个泛型类型的类
    // InstanceType会返回一个拥有构造函数的类型
    // nstanceType 会返回什么样的数据类型
    // 在 TypeScript 中，InstanceType<T> 是一个内置的工具类型，用于从构造函数类型的 T 中提取实例类型。
    // 具体来说，当你有一个类或组件的构造函数类型时，InstanceType<T> 可以帮助你获取该类或组件实例的具体类型。
    // const accountRef = ref<InstanceType<typeof LoginAccount> | null>(null)
    const accountRef = ref<any>(null)
    const phoneRef = ref<any>(null)
    // const phoneRef = ref<InstanceType<typeof LoginPhone> | null>(null)
    const currentTab = ref<string>('account')

    const handleLoginClick = () => {
      if ((currentTab as any).value === 'account') {
        if ((accountRef as any).value) {
          ;(accountRef as any).value.loginAction(keepPwd)
        }
      } else {
        // 手机登录
        if ((phoneRef as any).value) {
          ;(phoneRef as any).value.loginAction()
        }
      }
    }

    return {
      UserFilled,
      Iphone,
      keepPwd,
      accountRef,
      currentTab,
      phoneRef,

      handleLoginClick
    }
  },
  components: {
    loginAccount,
    loginPhone
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
}
.account-control {
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
}
.login-btn {
  width: 100%;
  margin-top: 10px;
}
</style>
