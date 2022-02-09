import VxeSwitch from './src/switch'

export const CapTableSwitch = Object.assign(VxeSwitch, {
  install (Vue) {
    Vue.component(VxeSwitch.name, VxeSwitch)
  }
})

export default CapTableSwitch
