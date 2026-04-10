<template>
  <div class="user">
    <page-search :searchFormConfig="formConfig" />
    <div class="content">
      <cm-table :listData="userList" :propList="propList">
        <template #status="scope">
          <el-button>{{ scope.row.enable ? '启用' : '禁用' }}</el-button>
        </template>
        <template #createAt="scope">
          <!-- <strong>测试</strong> -->
          <strong>{{ scope.row.createAt }}</strong>
        </template>
      </cm-table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { formConfig } from './config/user.config'
import PageSearch from '@/components/page-search'
import { useStore } from 'vuex'
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
    return {
      formConfig,
      userList,
      propList
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
