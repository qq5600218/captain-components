
let state = {
  currentIndex: null,
  fixedIndex: null,
  iframeItem: null,
  visitedViews: [],
  cachedViews: [],
  showViews: false,
  newUrl: false,
  newView: '',
  presentUrl: '',
  recentlyCloseVisitedView: null,
  currentViews: '',
}

const mutations = {
  set_tagsView: (state, obj) => {    
    state.currentIndex = obj.currentIndex,
    state.fixedIndex = obj.fixedIndex,
    state.iframeItem = obj.iframeItem,
    state.visitedViews = obj.visitedViews,
    state.cachedViews = obj.cachedViews,
    state.showViews = obj.showViews,
    state.newUrl = obj.newUrl,
    state.newView = obj.newView,
    state.presentUrl = obj.presentUrl,
    state.recentlyCloseVisitedView = obj.recentlyCloseVisitedView,
    state.currentViews = obj.currentViews
  }
}

export default {
  namespaced: true,
  state,
  mutations 
}