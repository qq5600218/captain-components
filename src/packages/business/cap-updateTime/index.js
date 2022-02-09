
// 引入组件
import capUpdateTime from './index.vue';

export const CapBusUpdateTime = Object.assign(capUpdateTime, {
  install(Vue) {
    Vue.component(capUpdateTime.name, capUpdateTime)
  }
})
export default CapBusUpdateTime
