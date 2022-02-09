import VxeOptgroup from '../select/src/optgroup'

export const CapTableOptgroup = Object.assign(VxeOptgroup, {
  install (Vue) {
    Vue.component(VxeOptgroup.name, VxeOptgroup)
  }
})

export default CapTableOptgroup
