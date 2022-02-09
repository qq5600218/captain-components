
// 引入组件
import capStore from './index.vue';

export const CapBusStore = Object.assign(capStore, {
  install(Vue) {
    Vue.component(capStore.name, capStore)
  }
})
export default CapBusStore
