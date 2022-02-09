import VxePager from './src/pager'

export const CapTablePager = Object.assign(VxePager, {
  install (Vue) {
    Vue.component(VxePager.name, VxePager)
  }
})

export default CapTablePager
