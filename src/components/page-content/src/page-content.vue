<template>
  <div class="page-content">
    <cm-table :listData="userList" v-bind="contentTableConfig">
      <!-- header的插槽 -->
      <template #header-handler>
        <el-button type="primary" size="mini">新建用户</el-button>
      </template>
      <!-- 列的插槽: -->
      <template #status="scope">
        <el-button
          size="mini"
          plain
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <!--不用拿数据，所以不用作用域scope-->
      <template #handler>
        <div class="handlee-btns">
          <el-button size="mini" type="text">编辑</el-button>
          <el-button size="mini" type="text">删除</el-button>
        </div>
      </template>
      <template #table-header>
        <div></div>
      </template>
    </cm-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useStore } from '@/store'
import CmTable from '@/base-ui/table'
import { IContentTableConfig } from '../types'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object as PropType<IContentTableConfig>,
      required: true
    }
  },
  components: {
    CmTable
  },
  setup() {
    const store = useStore()
    store.dispatch('systemModule/getPageListAction', {
      pageUrl: 'users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() => store.state.systemModule.userList)
    const userCount = computed(() => store.state.systemModule.userCount)

    return { userList }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border: 1px;
}
</style>
