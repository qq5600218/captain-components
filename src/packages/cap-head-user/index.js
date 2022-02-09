// 引入组件
import capHeadUser from './index.vue';

// 提供 install 安装方法，供按需引入
capHeadUser.install = function (Vue) {
    // 注册组件
    Vue.component(capHeadUser.name, capHeadUser)
}
// 暴露组件
export default capHeadUser