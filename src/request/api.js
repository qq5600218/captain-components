import request from './index'
import qs from 'qs'
let baseUrl = process.env
if(window.process) baseUrl = window.process.env

// 获取菜单列表
export function getMenuList() {
  return request({
    url: '/index.php?m=common&c=CommonMethod&a=get_menu_list',
    method: 'POST'
  })
}
// 获取多语言json
export function getTranslate(params){
  return request({
    headers:{
      lang:'vi-vn'
    },
    baseURL: baseUrl.VUE_APP_CPC_API,
    url: '/cpc/common/get_language',
    method: 'GET',
    params:params
  })
}
// 主账号切换新旧版本
export function switchTemplateType(data) {
  return request({
    baseURL: baseUrl.VUE_APP_BI_API,
    url: 'index.php?m=amzcaptain&c=personal_information&a=switchTemplateType',
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({ 'isajax': 1 })
  })
}
// 获取用户信息
export function getUserInfo() {
  return request({
    baseURL: baseUrl.VUE_APP_BI_API,
    url: 'index.php?m=common&c=CommonMethod&a=get_all_base_info',
    method: 'post',
    data: qs.stringify({ 'isajax': 1 }),
    exclude: true
  })
}
// 获取消息系统总条数
export function getMessageList() {
  return request({
    baseURL: baseUrl.VUE_APP_BI_API,
    url: 'site_message-SiteMessage-getUnread.php',
    method: 'get',
    exclude:true
  })
}
// 获取指标监控我的店铺数据
export function getMonitorInfo() {
  return request({
    baseURL: baseUrl.VUE_APP_BI_API,
    url: 'monitor-IndexMonitor-getCount.php?&isajax=1',
    method: 'get',
    exclude:true
  })
}
// 获取指标监控我的竞品数据
export function getCompeInfo(query) {
  return request({
    baseURL: baseUrl.VUE_APP_BI_API,
    url: 'monitor-IndexMonitor-getRaceShopCount.php',
    method: 'get',
    params: query,
    exclude:true
  })
}
// 获取指标监控我的店铺列表
export function getMonitorList(query) {
  return request({
    baseURL: baseUrl.VUE_APP_BI_API,
    url: 'monitor-IndexMonitor-monitorHistoryMessageList.php',
    method: 'get',
    params: query
  })
}
// 获取消息信息
export function getMessageInfo(query) {
  return request({
    baseURL: baseUrl.VUE_APP_BI_API,
    url: 'site_message-SiteMessage-getMessageList.php',
    method: 'get',
    params: query,
    exclude:true
  })
}
// 获取指标监控我的店铺列表
export function getCompeList(query) {
  return request({
    baseURL: baseUrl.VUE_APP_IS_ERP == 1 ? baseUrl.VUE_APP_ERP_API : baseUrl.VUE_APP_BI_API,
    url: 'monitor-IndexMonitor-getRaceShopList.php',
    method: 'get',
    params: query
  })
}
// 指标监控我的店铺操作
export function setMonitorRemark(data) {
  let datas = '';
  for (var index in data) {
    datas += '&' + index + '=' + data[index]
  }
  return request({
    baseURL: baseUrl.VUE_APP_IS_ERP == 1 ? baseUrl.VUE_APP_ERP_API : baseUrl.VUE_APP_BI_API,
    url: 'monitor-IndexMonitor-historyDetailsRemark.php',
    method: 'post',
    data: datas
  })
}
// 获取方舟权限
export function getArkPermission(data) {
  return request({
    baseURL: baseUrl.VUE_APP_ARK_API,
    url: 'index.php?m=datas_ark&c=DatasPermission&a=getArkPermission',
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
// 获取店铺信息
export function getStore(data) {
  return request({
    url: '/index.php?m=common&c=CommonMethod&a=get_channel_list',
    method: 'post',
    exclude: true,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },

    data: qs.stringify({ ...data, 'isajax': 1 })
  })
}
// 获取CPC店铺信息
export function getcpcStore() {
  return request({
    url: 'index.php?m=common&c=CommonMethod&a=get_channel_list',
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({ 'isajax': 1, 'channel_type': 2 }),
    exclude: true
  })
}