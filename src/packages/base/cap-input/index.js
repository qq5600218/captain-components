// 引入组件
import capInput from './index.vue';

export const CapBaseInput = Object.assign(capInput, {
  install (Vue) {
    Vue.component(capInput.name, capInput)
  }
})

export default CapBaseInput