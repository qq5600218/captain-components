
const state = {
  baseInfo: {},
  shopList: {},
  cpc_store: {
    cpc_profiles_id: '',
    site_id: '',
    shoreName: ''
  },
  storeData: {
    channel_list: []
  },
}

const mutations = {
  BASE_INFO(state, data) { 
    state.baseInfo = data
  },
  SAVE_SHOP_LIST(state, data) {
    state.shopList = data
  },
  cpc_store: (state, log) => {
    sessionStorage.setItem('cpc_profiles_id', log.cpc_profiles_id)
    for (const key in log) {
      state.cpc_store[key] = log[key]
    }
  },
  SET_STORE_DATA: (state, data) => {
    state.storeData = data
  },
  SET_IS_LOADING: (state, bool) => {
    state.isLoading = bool
  },
  
}
const actions = {
  // 获取cpc店铺列表
  getcpcStore: ({ commit, dispatch }, to) => {
    commit('SET_IS_LOADING', true)
    const api =  require('../../request/api.js')
    return api.getcpcStore().then((res) => {
      commit('SET_IS_LOADING', false)
      if (res.IsSuccess) {
        const storeData = {}
        // 只保留状态为开启的站点
        storeData.channel_list = res.data.channel_list.filter(item => item.status == '1')
        commit('SET_STORE_DATA', storeData)

        let storeObj = {
          cpc_profiles_id: '',
          shoreName: ''
        }

        // 概览页面 缓存里没有且是概览页,或者缓存里的是全店铺,就都归为全店铺
        let local_cpc_profiles_id = sessionStorage.getItem('cpc_profiles_id') || ''
        if(local_cpc_profiles_id){
          let cpc_profiles_id_list = local_cpc_profiles_id.split(',')
          for(let i=0;i<cpc_profiles_id_list.length;i++){
            let item = cpc_profiles_id_list[i]
            if(!storeData.channel_list.find(items=>items.id==item)){
              cpc_profiles_id_list.splice(i,1)
              i--
            }
          }
          local_cpc_profiles_id = cpc_profiles_id_list.join(',')
          sessionStorage.setItem('cpc_profiles_id', local_cpc_profiles_id)
        }
        if (to && to.path && to.path.indexOf('/cpc/dashboard') != -1 && (!local_cpc_profiles_id || (local_cpc_profiles_id && local_cpc_profiles_id.split(',').length > 1))) {
          // 数据概览 多选情况下
          if(local_cpc_profiles_id){
            const selectedStoreList = storeData.channel_list.filter(val => (local_cpc_profiles_id.indexOf(val.id) > -1))
            const firstStore = selectedStoreList[0]
            storeObj = {
              cpc_profiles_id: selectedStoreList.map(s => s.id).join(','),
              site_id: firstStore.site_id,
              shoreName: firstStore.title
            }
          }else{
            storeObj = {
              cpc_profiles_id: storeData.channel_list.map(s => s.id).join(','),
              site_id: storeData.channel_list[0].site_id,
              shoreName: storeData.channel_list[0].title
            }
          }
          commit('cpc_store', storeObj)
        } else {
          // 非概览页面
          dispatch('setStoreSelect')
        }
      }
    })
  },
  setStoreSelect: ({ commit }) => {
    const list = state.storeData.channel_list
    const cpc_profiles_id = sessionStorage.getItem('cpc_profiles_id')
    let firstSelectedStore = {}
    if (list.length > 0) {
      if(cpc_profiles_id){
        firstSelectedStore = list.find(val => cpc_profiles_id.indexOf(val.id) > -1)
      }
      if (!firstSelectedStore.id) {
        firstSelectedStore = list[0]
      }
    }
    const storeObj = {
      cpc_profiles_id: firstSelectedStore.id,
      site_id: firstSelectedStore.site_id,
      shoreName: firstSelectedStore.title
    }
    commit('cpc_store', storeObj)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

