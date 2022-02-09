import VxePulldown from './src/pulldown'

export const CapTablePulldown = Object.assign(VxePulldown, {
  install (Vue) {
    Vue.component(VxePulldown.name, VxePulldown)
  }
})

export default CapTablePulldown
