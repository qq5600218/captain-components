import VxeFormGather from '../form/src/form-gather'

export const CapTableFormGather = Object.assign(VxeFormGather, {
  install (Vue) {
    Vue.component(VxeFormGather.name, VxeFormGather)
  }
})

export default CapTableFormGather
