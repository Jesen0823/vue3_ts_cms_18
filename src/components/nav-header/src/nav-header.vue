<template>
  <div class="nav-header">
    <!--用法1：-->
    <!--
    <el-icon @click="handleFoldChange">
      <template v-if="isFold">
        <Fold />
      </template>
      <template else>
        <Expand />
      </template>
    </el-icon>
    -->
    <!--用法2：-->
    <el-icon class="fold-menu" @click="handleFoldChange">
      <component :is="isFold ? 'Fold' : 'Expand'" />
    </el-icon>
    <div class="content">
      <nav-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import UserInfo from './user-info.vue'
import NavBreadcrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    UserInfo,
    NavBreadcrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false) as any
    const handleFoldChange = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.loginMoudle.userMenus
      console.log('header userMenus:', userMenus)
      const route = useRoute()
      console.log('route is what:', route)
      const curPath = route.path
      return pathMapBreadcrumbs(userMenus, curPath)
    })

    return {
      isFold,
      handleFoldChange,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
