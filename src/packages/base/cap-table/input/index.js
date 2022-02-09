import VxeInput from './src/input'

export const CapTableInput = Object.assign(VxeInput, {
  install (Vue) {
    Vue.component(VxeInput.name, VxeInput)
  }
})

export default CapTableInput
