<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @eventResetBtnClick="handleResetClick"
      @eventSearchBtnClick="handleSearchClick"
    />
    <page-content
      ref="refPageContent"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @createBtnClick="eventHandleCreate"
      @updateBtnClick="eventHandleUpdate"
    />
    <page-modal
      :defaultInfo="defaultInfo"
      ref="refModalPage"
      :modalConfig="modalConfig"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'

import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/usePageSearch'

import { modalConfig } from './config/modal.config'
import PageModal from '@/components/page-modal'
import { usePageModal } from '@/hooks/usePageModal'

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
    const [refModalPage, defaultInfo, eventHandleCreate, eventHandleUpdate] =
      usePageModal()

    return {
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleSearchClick,
      refPageContent,
      modalConfig,
      refModalPage,
      eventHandleCreate,
      eventHandleUpdate,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
