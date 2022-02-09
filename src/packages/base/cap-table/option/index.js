import VxeOption from '../select/src/option'

export const CapTableOption = Object.assign(VxeOption, {
  install (Vue) {
    Vue.component(VxeOption.name, VxeOption)
  }
})

export default CapTableOption
