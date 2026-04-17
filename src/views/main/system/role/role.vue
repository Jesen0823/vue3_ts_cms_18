<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @createBtnClick="eventHandleCreate"
      @updateBtnClick="eventHandleUpdate"
    ></page-content>
    <page-modal
      ref="refModalPage"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      :otherInfo="otherInfo"
      pageName="role"
    >
      <!-- 默认插槽 -->
      <div class="menu-tree">
        <el-tree
          ref="refElTree"
          style="max-width: 600px"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="treeProps"
          @check="handleTreeChange"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search/src/page-search.vue'
import { computed, defineComponent, nextTick, ref } from 'vue'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import PageModal from '@/components/page-modal'
import { modalConfig } from './config/modal.config'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'
import { menuMapLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch,
    PageModal
  },
  setup() {
    const refElTree = ref<InstanceType<typeof ElTree>>()
    const updateCallback = (item: any) => {
      // 点击按钮后，ElTree可能还没有挂载，所以使用nextTick
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        ;(refElTree as any).value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [refModalPage, defaultInfo, eventHandleCreate, eventHandleUpdate] =
      usePageModal(undefined, updateCallback)

    const treeProps = {
      children: 'children',
      label: 'name'
    }

    // 可复选树结构的处理
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)
    const otherInfo = ref({})
    const handleTreeChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      ;(otherInfo as any).value = { menuList }
      console.log('handleTreeChange:', (otherInfo as any).value)
    }

    return {
      contentTableConfig,
      searchFormConfig,
      modalConfig,
      refModalPage,
      defaultInfo,
      eventHandleCreate,
      eventHandleUpdate,
      treeProps,
      menus,
      otherInfo,
      handleTreeChange,
      refElTree
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
