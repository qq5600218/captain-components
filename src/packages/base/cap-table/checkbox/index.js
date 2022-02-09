import VxeCheckbox from './src/checkbox'

export const CapTableCheckbox = Object.assign(VxeCheckbox, {
  install (Vue) {
    Vue.component(VxeCheckbox.name, VxeCheckbox)
  }
})

export default CapTableCheckbox
