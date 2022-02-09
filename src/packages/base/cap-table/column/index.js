import VxeTableColumn from '../table/src/column'

export const CapTableColumn = Object.assign(VxeTableColumn, {
  install (Vue) {
    Vue.component(VxeTableColumn.name, VxeTableColumn)
    // 兼容旧用法
    Vue.component('VxeTableColumn', VxeTableColumn)
  }
})

export default CapTableColumn
