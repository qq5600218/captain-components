// 引入组件
import Pagination from './index.vue';

export const CapBasePagination = Object.assign(Pagination, {
  install (Vue) {
    Vue.component(Pagination.name, Pagination)
  }
})

export default CapBasePagination
