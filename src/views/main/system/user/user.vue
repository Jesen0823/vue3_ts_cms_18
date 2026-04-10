<template>
  <div class="user">
    <div class="search">
      <c-m-form v-bind="formConfig" v-model="formData"></c-m-form>
    </div>
    <div class="content">TEST: {{ formData.name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CMForm from '@/base-ui/form'
import { formConfig } from './config/user.config'
export default defineComponent({
  name: 'user',
  components: {
    CMForm
  },
  setup() {
    const formData = ref({
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
