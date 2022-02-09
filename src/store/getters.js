const getters = {
  userInfo: state => state.shop.userInfo,
  shopList: state => state.shop.shopList,
  cpc_store: state => state.shop.cpc_store,
  storeData: state => state.shop.storeData,
  userIdCacheKey: state => state.cacheSelectData.userIdCacheKey,
  selectCacheObj: state => state.cacheSelectData.selectCacheObj,
}
export default getters
