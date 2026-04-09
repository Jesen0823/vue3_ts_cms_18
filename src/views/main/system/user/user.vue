<template>
  <div class="user">
    <div class="search">
      <c-m-form
        :formItems="formItems"
        :label-width="labelWidth"
        :item-style="itemStyle"
        :colLayout="colLayout"
      ></c-m-form>
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CMForm from '@/base-ui/form'
import type { IFormItem } from '@/base-ui/form'
export default defineComponent({
  name: 'user',
  components: {
    CMForm
  },
  setup() {
    const formItems: IFormItem[] = [
      {
        type: 'input',
        label: '用户名',
        rules: [],
        placeholder: '请输入用户名'
      },
      {
        type: 'password',
        label: '密码',
        rules: [],
        placeholder: '请输入密码'
      },
      {
        type: 'select',
        label: '喜欢的运动',
        rules: [],
        placeholder: '请选择',
        options: [
          { title: '球类', value: 'Ball' },
          { title: '户外', value: 'Outside' }
        ]
      },
      {
        type: 'datepicker',
        label: '创建时间',
        rules: [],
        placeholder: '请选择时间范围',
        otherOptions: {
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
          type: 'daterange'
        }
      }
    ]
    const labelWidth = '120px'
    const itemStyle = {
      padding: '12px 24px'
    }
    const colLayout = {
      span: 8
    }

    return { formItems, labelWidth, itemStyle, colLayout }
  }
})
</script>

<style scoped></style>
