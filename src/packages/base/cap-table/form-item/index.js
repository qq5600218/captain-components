import VxeFormItem from '../form/src/form-item'

export const CapTableFormItem = Object.assign(VxeFormItem, {
  install (Vue) {
    Vue.component(VxeFormItem.name, VxeFormItem)
  }
})

export default CapTableFormItem
