
// import Vue from 'vue'
import App from './App'
import packages from './index.js'
import i18n from "@/utils/i18n.js";
import ELEMENT from 'element-ui'
import Cookies from 'js-cookie'
import 'element-ui/lib/theme-chalk/index.css';
// 和Captain_VUE的element设置统一
Vue.use(ELEMENT, {
  size: Cookies.get('size') || 'medium',
  zIndex: 99999
})

Vue.use(packages)
Vue.use(VueI18n)
new Vue({
  el: '#app',
  i18n,
  render: h => h(App)
})