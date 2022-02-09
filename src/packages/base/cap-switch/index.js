// 引入组件
import Switch from './index.vue';

export const CapBaseSwitch = Object.assign(Switch, {
  install (Vue) {
    Vue.component(Switch.name, Switch)
  }
})

export default CapBaseSwitch
