export default {
  data(){
    return {
      getCurrentCacheObj:{}, //当前用户缓存对象
      pageCacheObj:{}//页面缓存数据
    }
  },
  watch: {
    'this.store.getters.userIdCacheKey'() {     
      this.getCurrentCache()     
    }
  },
  mounted(){    
    this.getCurrentCache() 
  },
  methods:{
    setCache(name, value, introductionName) {   
      const Store = this.store
      let item = {}
      if(Store.getters.selectCacheObj[Store.getters.userIdCacheKey] ){
        item = Store.getters.selectCacheObj[Store.getters.userIdCacheKey][introductionName || (this.$route && this.$route.path)] || {}
      }
      item[name] = value;     
      let obj ={}
      if(introductionName) obj[introductionName]  = item   
      else obj[(this.$route && this.$route.path)] = item  
      Store.commit('cacheSelectData/set_cache_data',obj)
    },
    getCurrentCache(key) {    
      const Store = this.store
      let obj = Store.getters.selectCacheObj[Store.getters.userIdCacheKey] || {}
      this.getCurrentCacheObj = obj[key || (this.$route && this.$route.path)] || null
    }
  }
}