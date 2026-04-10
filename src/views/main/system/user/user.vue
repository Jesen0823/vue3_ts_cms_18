<template>
  <div class="user">
    <page-search :searchFormConfig="formConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { formConfig } from './config/user.config'
import PageSearch from '@/components/page-search'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch
  },
  setup() {
    return {
      formConfig
    }
  }
})
</script>

<style scoped></style>
