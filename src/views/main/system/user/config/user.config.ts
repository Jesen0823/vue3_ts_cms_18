import { IForm } from '@/base-ui/form'

export const formConfig: IForm = {
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: 'id',
      rules: [],
      placeholder: '请输入ID'
    },
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      rules: [],
      placeholder: '请输入用户名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      rules: [],
      placeholder: '请输入密码'
    },
    {
      field: 'sport',
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
      field: 'createTime',
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
  ],
  labelWidth: '120px',
  itemLayout: {
    padding: '12px 24px'
  },
  colLayout: {
    span: 8
  }
}
