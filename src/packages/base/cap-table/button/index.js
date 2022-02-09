import VxeButton from './src/button'

export const CapTableButton = Object.assign(VxeButton, {
  install (Vue) {
    Vue.component(VxeButton.name, VxeButton)
  }
})

export default CapTableButton
