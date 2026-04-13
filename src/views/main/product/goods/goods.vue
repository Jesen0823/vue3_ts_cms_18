<template>
  <div class="goods">
    <page-content page-name="goods" :content-table-config="contentTableConfig">
      <!-- goods独有的插槽，不要放在page-content: -->
      <template #image="scope">
        <el-image
          style="width: 56px; height: 100px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
      <template #oldPrice="scope">{{ '￥' + scope.row.oldPrice }}</template>
    </page-content>
  </div>
</template>

<script lang="ts">
import PageContent from '@/components/page-content'
import { defineComponent } from 'vue'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  name: 'goods',
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped>
.goods {
  height: 100%;
  background-color: aliceblue;
}
</style>
