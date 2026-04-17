<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @eventResetBtnClick="handleResetClick"
      @eventSearchBtnClick="handleSearchClick"
    />
    <page-content
      ref="refPageContent"
      pageName="users"
      :contentTableConfig="contentTableConfig"
      @createBtnClick="eventHandleCreate"
      @updateBtnClick="eventHandleUpdate"
    />
    <page-modal
      ref="refModalPage"
      pageName="users"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfigRef"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'

import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/usePageSearch'

import { modalConfig } from './config/modal.config'
import PageModal from '@/components/page-modal'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [refPageContent, handleResetClick, handleSearchClick] =
      usePageSearch()

    // 对弹窗中密码选项的处理：
    const createCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const updateCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    // 对弹窗中部门与角色列表的处理
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })

      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })

      return modalConfig
    })

    // 使用hook拿取公共处理逻辑
    const [refModalPage, defaultInfo, eventHandleCreate, eventHandleUpdate] =
      usePageModal(createCallback, updateCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleSearchClick,
      refPageContent,
      modalConfigRef,
      refModalPage,
      eventHandleCreate,
      eventHandleUpdate,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
