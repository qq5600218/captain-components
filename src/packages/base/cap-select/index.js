// 引入组件
import Select from './index.vue';

export const CapBaseSelect = Object.assign(Select, {
  install (Vue) {
    Vue.component(Select.name, Select)
  }
})

export default CapBaseSelect
