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
      <div>面剥削</div>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserInfo from './user-info.vue'

export default defineComponent({
  components: {
    UserInfo
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false) as any
    const handleFoldChange = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    return {
      isFold,
      handleFoldChange
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
