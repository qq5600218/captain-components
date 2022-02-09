import VxeRadioButton from '../radio/src/button'

export const CapTableRadioButton = Object.assign(VxeRadioButton, {
  install (Vue) {
    Vue.component(VxeRadioButton.name, VxeRadioButton)
  }
})

export default CapTableRadioButton
