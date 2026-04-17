import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色描述',
      placeholder: '请输入角色描述'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
