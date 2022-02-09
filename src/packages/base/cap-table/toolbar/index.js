import VxeToolbar from './src/toolbar'

export const CapTableToolbar = Object.assign(VxeToolbar, {
  install (Vue) {
    Vue.component(VxeToolbar.name, VxeToolbar)
  }
})

export default CapTableToolbar
