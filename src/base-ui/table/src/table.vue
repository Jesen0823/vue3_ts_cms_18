<template>
  <div class="cm-table">
    <div class="header">
      <slot name="table-header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="header-handler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectChange"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { ITableType } from '../types'
export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    showIndexColumn: {
      type: Boolean,
      default: true
    },
    showSelectColumn: {
      type: Boolean,
      default: true
    },
    propList: {
      type: Array as PropType<ITableType[]>,
      required: true
    }
  },
  emits: ['selectionChange'],
  setup(props, { emit }) {
    const currentPage4 = ref(4)
    const pageSize4 = ref(100)
    const background = ref(false)
    const disabled = ref(false)
    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
    }
    const handleSelectChange = (value: any) => {
      emit('selectionChange', value)
    }
    return {
      handleSelectChange,
      currentPage4,
      pageSize4,
      background,
      disabled,
      handleCurrentChange,
      handleSizeChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
