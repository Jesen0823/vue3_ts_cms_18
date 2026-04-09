<template>
  <div class="user">
    <div class="search">
      <c-m-form v-bind="formConfig"></c-m-form>
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CMForm from '@/base-ui/form'
import { formConfig } from './config/user.config'
export default defineComponent({
  name: 'user',
  components: {
    CMForm
  },
  setup() {
    return { formConfig }
  }
})
</script>

<style scoped></style>
