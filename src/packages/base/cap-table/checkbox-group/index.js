import VxeCheckboxGroup from '../checkbox/src/group'

export const CapTableCheckboxGroup = Object.assign(VxeCheckboxGroup, {
  install (Vue) {
    Vue.component(VxeCheckboxGroup.name, VxeCheckboxGroup)
  }
})

export default CapTableCheckboxGroup
