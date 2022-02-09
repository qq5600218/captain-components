
import zhCN from '@/packages/base/cap-table/locale/lang/zh-CN'
import tableComponents from '@/packages/base/cap-table/all'
import { VXETable } from '@/packages/base/cap-table/v-x-e-table'
import XEUtils from 'xe-utils'

import { Menu } from './cap-menu'
import { Tag } from './cap-tag'

import myComponents from '@/packages/components'
// 按需加载的组件
const components = [
    Menu,
    Tag,
    ...myComponents,
    ...tableComponents
]

// 默认安装
export function install (Vue, options) {
  if (XEUtils.isPlainObject(options)) {
    VXETable.setup(options)
  }
  
  components.map(component => component.install(Vue))
}
// 默认中文
VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
})

export * from '@/packages/base/cap-table/all'
export * from './cap-menu'
export * from './cap-tag'
export * from '@/packages/components'