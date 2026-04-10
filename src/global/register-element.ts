import {
  ElButton,
  ElCheckbox,
  ElCheckboxGroup,
  ElTable,
  ElTableColumn,
  ElTabPane,
  ElTabs,
  ElIcon,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItemGroup,
  ElSubMenu,
  ElMenuItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem
} from 'element-plus'
import 'element-plus/dist/index.css' // 全局引入样式
import { App } from 'vue'
const elComponents = [
  ElButton,
  ElCheckbox,
  ElLink,
  ElCheckboxGroup,
  ElTabs,
  ElTabPane,
  ElTable,
  ElTableColumn,
  ElIcon,
  ElForm,
  ElFormItem,
  ElInput,
  ElContainer,
  ElAside,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItemGroup,
  ElSubMenu,
  ElMenuItem,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElAvatar,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElBreadcrumb,
  ElBreadcrumbItem
]

export default function (app: App): void {
  for (const elComponent of elComponents) {
    if (elComponent.name) {
      app.component(elComponent.name, elComponent)
    }
  }
}
