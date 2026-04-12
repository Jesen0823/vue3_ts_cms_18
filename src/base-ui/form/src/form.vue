<template>
  <div class="cm-form">
    <div class="header">
      <slot name="form-header"></slot>
    </div>
    <el-form label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              class="form-item"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  style="width: 100%"
                  :type="item.otherOptions.type"
                  :start-placeholder="item.otherOptions.startPlaceholder"
                  :end-placeholder="item.otherOptions.endPlaceholder"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="form-footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px;'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    // 屏幕适配
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 这样引用的是同一个对象，子组件Form会修改父组件引用的值
    // 不符合数据单向流动
    // const formData = ref(props.modelValue)
    // 这样数据props.modelValue解构后，重新创建ref对象，不影响父组件
    // const formData = ref({ ...props.modelValue })
    // 监听数据改变，发送给父组件，深度监听
    // watch(formData, (newVal) => emit('update:modelValue', newVal), {
    //   deep: true
    // })
    // return { formData }

    // 另一种实现方式：
    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    return { handleValueChange }
  }
})
</script>

<style scoped lang="less">
.cm-form {
  padding-top: 22px;
  .form-item {
    padding: 5px 8px;
  }
}
</style>
