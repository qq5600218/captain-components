
// 引入组件
import capHead from './index.vue';

export const CapBusHead = Object.assign(capHead, {
  install(Vue) {
    Vue.component(capHead.name, capHead)
  }
})
export default CapBusHead
