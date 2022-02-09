
// 引入组件
import capSearch from './index.vue';

export const CapBusSearch = Object.assign(capSearch, {
  install(Vue) {
    Vue.component(capSearch.name, capSearch)
  }
})
export default CapBusSearch
