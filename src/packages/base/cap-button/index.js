// 引入组件
import Button from './index.vue';

export const CapBaseButton = Object.assign(Button, {
  install (Vue) {
    Vue.component(Button.name, Button)
  }
})

export default CapBaseButton
