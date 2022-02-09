import Vue from 'vue'
import ELEMENT from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/cap-table/index.scss'
import '@/assets/css/table.scss'
import Mycomponents from '@/packages/components'
import tableComponents from '@/packages/base/cap-table/all'
import _ from 'lodash'
Vue.use(ELEMENT, {
  size: 'medium'
})
// 存储组件列表
const components = [
    ...Mycomponents,
    ...tableComponents,
]
export default ({ Vue }) => {
  if (typeof process === 'undefined') {
    components.map(component => component && component.name && Vue.component(component.name, component))
  }
}