import VxeTableFooter from './src/footer'

export const CapTableFooter = Object.assign(VxeTableFooter, {
  install (Vue) {
    Vue.component(VxeTableFooter.name, VxeTableFooter)
  }
})

export default CapTableFooter
