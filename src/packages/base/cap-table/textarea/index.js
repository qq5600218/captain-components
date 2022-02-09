import VxeTextarea from './src/textarea'

export const CapTableTextarea = Object.assign(VxeTextarea, {
  install (Vue) {
    Vue.component(VxeTextarea.name, VxeTextarea)
  }
})

export default CapTableTextarea
