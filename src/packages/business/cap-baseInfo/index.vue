<template></template>
<!--此组件用来存储用户信息!-->
<script>
import Cookies from 'js-cookie'
import Vue from 'vue'
// 和Captain_VUE的element设置统一
Vue.prototype.$ELEMENT = { size: Cookies.get('size') || 'medium', zIndex: 99999 };
export default {
  inheritAttrs: false,
  name: 'CapBusBaseInfo',
  data(){
    return {
      store : ''
    }
  },
  props:{
    // 接收用户信息
    baseInfo:{
      type:Object,
      default:{}
    },
    //接收路由信息
    tagsView:{},
  },
  watch:{
    baseInfo:{
      handler(val){
        if(val){
          import('../../../store').then(module => {
            this.store = module.default
            if(this.store.commit && Object.keys(val).length > 0){
              this.store.commit('shop/BASE_INFO', val)
              this.store.commit('cacheSelectData/set_user_select_cache', val.user_info)
            }
          })
        }
      },
      immediate:true
    },
    tagsView:{
      handler(val){
        if(val){
          import('../../../store').then(module => {
            this.store = module.default
            this.store.commit('tagsView/set_tagsView', val)
          })
        }
      },
      immediate:true,
      deep:true
    }
  }
}
</script>