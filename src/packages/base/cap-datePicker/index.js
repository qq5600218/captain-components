// 引入组件
import DatePicker from './index.vue';

export const CapBaseDatePicker = Object.assign(DatePicker, {
  install (Vue) {
    Vue.component(DatePicker.name, DatePicker)
  }
})

export default CapBaseDatePicker
