import VxeRadio from './src/radio'

export const CapTableRadio = Object.assign(VxeRadio, {
  install (Vue) {
    Vue.component(VxeRadio.name, VxeRadio)
  }
})

export default CapTableRadio
