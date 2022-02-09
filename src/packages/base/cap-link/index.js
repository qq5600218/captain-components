// 引入组件
import capLink from './index.vue';

export const CapBaseLink = Object.assign(capLink, {
  install (Vue) {
    Vue.component(capLink.name, capLink)
  }
})

export default CapBaseLink