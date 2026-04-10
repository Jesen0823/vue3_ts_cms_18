<template>
  <div class="user">
    <div class="search">
      <c-m-form v-bind="formConfig" :form-data="formData"></c-m-form>
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import CMForm from '@/base-ui/form'
import { formConfig } from './config/user.config'
export default defineComponent({
  name: 'user',
  components: {
    CMForm
  },
  setup() {
    const formData = reactive({
      id: '',
      name: '',
      password: '',
      sport: ''
    })
    return { formConfig, formData }
  }
})
</script>

<style scoped></style>
