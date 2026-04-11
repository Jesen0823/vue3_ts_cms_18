<template>
  <div class="user">
    <page-search :searchFormConfig="formConfig" />
    <div class="content">
      <cm-table
        :listData="userList"
        :propList="propList"
        :showIndexColumn="showIndexColumn"
        :showSelectColumn="showSelectColumn"
      >
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
      </cm-table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { formConfig } from './config/user.config'
import PageSearch from '@/components/page-search'
import { useStore } from '@/store'
import CmTable from '@/base-ui/table'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
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
    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'realname', label: '真实姓名', minWidth: '100' },
      { prop: 'cellphone', label: '手机号码', minWidth: '100' },
      { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '250',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '250',
        slotName: 'updateAt'
      },
      { label: '操作', minWidth: '120', slotName: 'handler' }
    ]
    const showIndexColumn = true
    const showSelectColumn = true

    return {
      formConfig,
      userList,
      propList,
      showIndexColumn,
      showSelectColumn
    }
  }
})
</script>

<style scoped>
.centent {
  padding: 20px;
  border: 1px;
}
</style>
