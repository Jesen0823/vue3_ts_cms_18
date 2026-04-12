<template>
  <div class="page-search">
    <c-m-form v-bind="searchFormConfig" v-model="formData">
      <template #form-header>
        <h1>高级检索</h1>
      </template>
      <template #form-footer>
        <div class="bottom-btns">
          <el-button type="primary" :icon="Delete" @click="handleResetClick"
            >重置</el-button
          >
          <el-button type="primary" :icon="Search" @click="handleSearchClick"
            >搜索</el-button
          >
        </div>
      </template>
    </c-m-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CMForm, { IFormItem } from '@/base-ui/form'
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
  emits: ['eventResetBtnClick', 'eventSearchBtnClick'],
  setup(props, { emit }) {
    const formItems: IFormItem[] = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    const handleResetClick = () => {
      Object.assign((formData as any).value, formOriginData)
      emit('eventResetBtnClick')
    }

    const handleSearchClick = () => {
      emit('eventSearchBtnClick', { ...(formData as any).value })
    }

    return {
      formData,
      // icon:
      Search,
      Delete,
      handleResetClick,
      handleSearchClick
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
