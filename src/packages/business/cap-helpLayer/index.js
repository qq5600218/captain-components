
// 引入组件
import capHelpLayer from './index.vue';

export const CapBusHelpLayer = Object.assign(capHelpLayer, {
  install(Vue) {
    Vue.component(capHelpLayer.name, capHelpLayer)
  }
})
export default CapBusHelpLayer
