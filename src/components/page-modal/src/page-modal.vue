<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="创建用户"
      width="30%"
      center
      destroy-on-close
    >
      <c-m-form
        title="创建用户"
        v-model="formData"
        v-bind="modalConfig"
      ></c-m-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import CMForm from '@/base-ui/form'
import { useStore } from '@/store'
export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    CMForm
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    /** watch(props.defaultInfo, callback)，- Vue 只做 浅监听 （shallow watch）
     * 只有当 props.defaultInfo 的 引用 发生变化时（即被替换成新对象），监听器才会触发
     * 如果只是对象内部的属性变化（如 props.defaultInfo.name = 'new' ），监听器 不会 触发
     */

    /**watch(() => props.defaultInfo, callback) - 函数式监听
     * Vue 会执行这个函数，并追踪函数内部使用的 所有响应式依赖
     * 相当于创建了一个 计算属性 来监听
     * 当 props.defaultInfo 本身或其内部属性变化时，都可能触发监听器
     */
    // 所以如果使用watch(props.defaultInfo, callback)监听一个对象属性变化，要添加参数{ deep: true }
    watch(
      () => props.defaultInfo,
      (newVal: any) => {
        // console.log('watch, defaultInfo: ', props.defaultInfo)
        console.log('watch, newVal: ', newVal)
        for (const item of props.modalConfig.formItems) {
          ;(formData as any).value[`${item.field}`] = newVal[`${item.field}`]
        }
        // console.log('watch, formData: ', (formData as any).value)
        // console.log('watch, modalConfig: ', props.modalConfig)
      }
    )

    // 点击确定按钮
    const store = useStore()
    const handleConfirmClick = () => {
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch('systemModule/updatePageDataAction', {
          pageName: props.pageName,
          editData: { ...(formData as any).value },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        store.dispatch('systemModule/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...(formData as any).value }
        })
      }
      ;(dialogVisible as any).value = false
    }

    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
