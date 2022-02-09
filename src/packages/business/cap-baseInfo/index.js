
// 引入组件
import capBaseInfo from './index.vue';

export const CapBusBaseInfo = Object.assign(capBaseInfo, {
  install(Vue) {
    Vue.component(capBaseInfo.name, capBaseInfo)
  }
})
export default CapBusBaseInfo
