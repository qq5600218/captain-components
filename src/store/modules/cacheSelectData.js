
const state = {
 userIdCacheKey:'',
 selectCacheObj:{}
}

const mutations = {
  //设置当前用户缓存key值
  set_user_select_cache: (state, obj) => {    
    state.userIdCacheKey = `user${obj.id}`    
  },
  //设置用户选择页面的缓存数据
  set_cache_data: (state, val) => { 
    state.selectCacheObj['aaa'] = val
    if(!state.userIdCacheKey) return  
    state.selectCacheObj[state.userIdCacheKey] = Object.assign({},
    state.selectCacheObj[state.userIdCacheKey],val)    
  }
}

export default {
  namespaced: true,
  state,
  mutations 
}