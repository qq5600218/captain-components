import VxeList from './src/list'

export const CapTableList = Object.assign(VxeList, {
  install (Vue) {
    Vue.component(VxeList.name, VxeList)
  }
})

export default CapTableList
