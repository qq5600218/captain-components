// 引入组件
import capRangeInput from './index.vue';

export const CapBaseRangeInput = Object.assign(capRangeInput, {
  install (Vue) {
    Vue.component(capRangeInput.name, capRangeInput)
  }
})

export default CapBaseRangeInput