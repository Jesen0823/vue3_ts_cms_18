<template>
  <div class="page-search">
    <c-m-form v-bind="searchFormConfig" v-model="formData">
      <template #form-header>
        <h1>高级检索</h1>
      </template>
      <template #form-footer>
        <div class="bottom-btns">
          <el-button type="primary" :icon="Delete">重置</el-button>
          <el-button type="primary" :icon="Search">搜索</el-button>
        </div>
      </template>
    </c-m-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CMForm from '@/base-ui/form'
import { Search, Delete } from '@element-plus/icons-vue'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    CMForm
  },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return {
      formData,
      // icon:
      Search,
      Delete
    }
  }
})
</script>

<style scoped>
.bottom-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
