// 引入组件
import capHeadMont from './index.vue';

// 提供 install 安装方法，供按需引入
capHeadMont.install = function (Vue) {
    // 注册组件
    Vue.component(capHeadMont.name, capHeadMont)
}
// 暴露组件
export default capHeadMont