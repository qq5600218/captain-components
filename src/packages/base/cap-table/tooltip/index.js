import VxeTooltip from './src/tooltip'
import VXETable from '../v-x-e-table'

export const CapTableTooltip = Object.assign(VxeTooltip, {
  install (Vue) {
    VXETable._tooltip = 1
    Vue.component(VxeTooltip.name, VxeTooltip)
  }
})

export default CapTableTooltip
