
// 引入组件
import capDropdown from './index.vue';

export const CapBaseDropdown = Object.assign(capDropdown, {
  install (Vue) {
    Vue.component(capDropdown.name, capDropdown)
  }
})

export default CapBaseDropdown