import {
  ElButton,
  ElLink,
  ElIcon,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElRow,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElMenuItemGroup,
  ElTabs,
  ElTabPane,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElAvatar,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElConfigProvider
} from 'element-plus'

import type { App } from 'vue'

const components = [
  ElButton,
  ElLink,
  ElIcon,
  ElContainer,
  ElHeader,
  ElMain,
  ElAside,
  ElRow,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElCheckbox,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElMenu,
  ElMenuItem,
  ElSubMenu,
  ElMenuItemGroup,
  ElTabs,
  ElTabPane,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElAvatar,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElConfigProvider
]

export default function (app: App) {
  for (const component of components) {
    app.component(component.name, component)
  }
}
