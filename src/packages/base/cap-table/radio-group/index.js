import VxeRadioGroup from '../radio/src/group'

export const CapTableRadioGroup = Object.assign(VxeRadioGroup, {
  install (Vue) {
    Vue.component(VxeRadioGroup.name, VxeRadioGroup)
  }
})

export default CapTableRadioGroup
