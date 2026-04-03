<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      :rules="accountRules"
      :model="account"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          placeholder="输入密码"
          show-password
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { accountRules } from '../config/account-config'
// import { ElForm } from 'element-plus'
import { localCache } from './../../../utils/cache'

export default defineComponent({
  setup() {
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    // const formRef = ref<InstanceType<typeof ElForm> | null>(null)
    const formRef = ref<any>(null)

    const loginAction = (isKeepPwd: boolean) => {
      if ((formRef as any).value) {
        ;(formRef as any).value.validate((valid: boolean) => {
          console.log('account login....', valid)
          if (valid) {
            if (isKeepPwd) {
              // 本地缓存
              localCache.setCache('name', account.name)
              localCache.setCache('password', account.password)
            } else {
              localCache.deleteCache('name')
              localCache.deleteCache('password')
            }
            // 执行登录
          }
        })
      }
    }

    return {
      account,
      accountRules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
