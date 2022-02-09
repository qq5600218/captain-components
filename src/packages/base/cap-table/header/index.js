import VxeTableHeader from './src/header'

export const CapTableHeader = Object.assign(VxeTableHeader, {
  install (Vue) {
    Vue.component(VxeTableHeader.name, VxeTableHeader)
  }
})

export default CapTableHeader
