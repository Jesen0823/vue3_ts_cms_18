<template>
  <div class="login-account">
    <el-form
      label-width="80px"
      :rules="phoneRules"
      :model="phoneUser"
      ref="formRef"
    >
      <el-form-item label="手机" prop="phone">
        <el-input v-model="phoneUser.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="验证码" prop="verify_code">
        <div class="reqVerify">
          <el-input v-model="phoneUser.verifyCode" placeholder="验证码" />
          <el-button type="primary" class="req-ver-button"
            >获取验证码</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { phoneRules } from '../config/account-config'
// import { ElForm } from 'element-plus'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const phoneUser = reactive({
      phone: '',
      verifyCode: ''
    })

    const formRef = ref<any>()
    //const formRef = ref<InstanceType<typeof ElForm> | null>(null)
    const store = useStore()

    const loginAction = () => {
      if ((formRef as any).value) {
        ;(formRef as any).value?.validate((valid: boolean) => {
          if (valid) {
            store.dispatch('loginMoudle/phoneLoginAction', { ...phoneUser })
          }
        })
      }
    }

    return {
      phoneUser,
      phoneRules,
      formRef,
      loginAction
    }
  }
})
</script>

<style scoped>
.reqVerify {
  display: flex;
}
.req-ver-button {
  margin-left: 10px;
}
</style>
