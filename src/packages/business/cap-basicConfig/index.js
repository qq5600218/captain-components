
// 引入组件
import capBasicConfig from './index.vue';

export const CapBusBasicConfig = Object.assign(capBasicConfig, {
  install(Vue) {
    Vue.component(capBasicConfig.name, capBasicConfig)
  }
})
export default CapBusBasicConfig
