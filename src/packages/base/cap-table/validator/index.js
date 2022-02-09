import Table from '../table'
import mixin from './src/mixin'
import VXETable from '../v-x-e-table'

export const CapTableValidator = {
  install () {
    VXETable.reg('valid')
    Table.mixins.push(mixin)
  }
}

export default CapTableValidator
