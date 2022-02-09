import VxeTableColgroup from '../table/src/group'

export const CapTableColgroup = Object.assign(VxeTableColgroup, {
  install (Vue) {
    Vue.component(VxeTableColgroup.name, VxeTableColgroup)
    // 兼容旧用法
    Vue.component('VxeTableColgroup', VxeTableColgroup)
  }
})

export default CapTableColgroup
