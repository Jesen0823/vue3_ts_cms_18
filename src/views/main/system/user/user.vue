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
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'

import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/usePageSearch'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const [refPageContent, handleResetClick, handleSearchClick] =
      usePageSearch()

    return {
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleSearchClick,
      refPageContent
    }
  }
})
</script>

<style scoped></style>
