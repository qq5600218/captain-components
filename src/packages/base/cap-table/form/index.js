import VxeForm from './src/form'

export const CapTableForm = Object.assign(VxeForm, {
  install (Vue) {
    Vue.component(VxeForm.name, VxeForm)
  }
})

export default CapTableForm
