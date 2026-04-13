<template>
  <div class="page-content">
    <!-- v-model:page 而不直接v-model，是为了防止直接绑定给modelValue属性 -->
    <cm-table
      :listData="dataList"
      :dataCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- header的插槽 -->
      <template #header-handler>
        <el-button type="primary" size="small" v-if="isCreate"
          >新建用户</el-button
        >
      </template>
      <!-- 列的插槽: -->
      <template #status="scope">
        <el-button
          size="small"
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
          <el-button :disabled="!isUpdate" size="small" type="text"
            >编辑</el-button
          >
          <el-button :disabled="!isDelete" size="small" type="text"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 动态插槽的动态插入: -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>>
        </template>
      </template>
    </cm-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import { useStore } from '@/store'
import CmTable from '@/base-ui/table'
import { IContentTableConfig } from '../types'
import { usePermission } from '@/hooks/usePermission'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object as PropType<IContentTableConfig>,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    CmTable
  },
  setup(props) {
    const store = useStore()

    // 获取权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')
    console.log('permission:', isCreate, isUpdate, isDelete, isQuery)

    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    watch(pageInfo, () => {
      getPageData()
    })

    // 发送网络请求:
    const getPageData = (querryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('systemModule/getPageListAction', {
        pageName: props.pageName,
        pageUrl: 'users/list',
        queryInfo: {
          offset:
            (pageInfo as any).value.currentPage *
            (pageInfo as any).value.pageSize,
          size: (pageInfo as any).value.pageSize,
          ...querryInfo
        }
      })
    }

    getPageData()

    // 从vuex获取数据:
    //const userList = computed(() => store.state.systemModule.userList)
    //const userCount = computed(() => store.state.systemModule.userCount)
    const dataList = computed(() =>
      store.getters[`systemModule/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`systemModule/pageListCount`](props.pageName)
    )

    // 获取其他动态插槽
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    return {
      dataList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border: 1px;
}
</style>
