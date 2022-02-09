// 引入组件
import capHeadMesg from './index.vue';

// 提供 install 安装方法，供按需引入
capHeadMesg.install = function (Vue) {
    // 注册组件
    Vue.component(capHeadMesg.name, capHeadMesg)
}
// 暴露组件
export default capHeadMesg