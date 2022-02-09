<template>
  <div class="tags-view-container">
    <ul class="tag-list">
      <li v-for="(item,index) in tagList" :class="{active:item.active}" :key="index" @click="goPage(item.url+item.search)">
        <span class="title">{{$t(item.title)}}</span>
        <i class="el-icon-close" v-if="index" @click.stop="closeItem(item)"></i>
      </li>
    </ul>
    <div class="right-side">
        <el-button
          plain
          class="switch-btn"
          @click="switchEdition"
          v-if="isMaster"
          >切换旧版</el-button
        >
        <Cap-head-mont />
        <Cap-head-mesg />
        <Cap-head-user @showMaster="showMaster" :$L="$L" @ready="()=>{}" />
      </div>
  </div>
</template>
<script>
import CapHeadMont from '@/packages/cap-head-mont'
import CapHeadUser from '@/packages/cap-head-user'
import CapHeadMesg from '@/packages/cap-head-mesg'
export default {
  name:'captain-tag',
  props: {
    routerList:{
      default: [],
      type: Array
    },
    $L:{
      default: ()=>{
        return 'zh-cn'
      },
      type: Function
    }
  },
  data(){
    return{
      tagList:[],
      // vue路由集合
      routers:[],
      // 所有iframe页面的路由集合
      oldNavList: [{path:"amzcaptain/integrated_kanban_v2/showData",title:"首页"},{path:"choice/ExplosionSection/explosionSection",title:"选品调研"},{path:"choice/AsinKeyword/keywordList",title:"寻找流量词"},{path:"choice/AsinKeyword/asinList",title:"竞品词反查"},{path:"choice/ProductMonitor/productMonitorList",title:"竞品监控"},{path:"choice/ShopMonitor/shopMonitorList",title:"竞店跟踪"},{path:"choice/ChoiceReviewAnalysis/reviewAnalysis",title:"review分析"},{path:"goods/Isku/index",title:"iSKU"},{path:"amzcaptain/amazon_finance/refund_analysis",title:"退款分析"},{path:"amzcaptain/amazon_finance/refund_analysis_list",title:"退款明细"},{path:"monitor/IndexMonitor/index",title:"指标监控"},{path:"amzcaptain/amazon_finance_operate/finance_add_keywords_product_analysis",title:"关键词排名"},{path:"goods/GoodsBusinessPrice/business_price_goods_list",title:"企业售价"},{path:"goods/GoodsBusinessPrice/recommend_goods_list",title:"商品机会"},{path:"amzcaptain/amazon_finance_operate/finance_inputset_product_analysis",title:"业务报告"},{path:"kanban/AllChannelKanban/getLogs",title:"操作日志"},{path:"FBA/fba_inventory_v3/kanban",title:"FBA看板"},{path:"FBA/fba_inventory_v3/fba_inventory_list",title:"库存列表"},{path:"FBA/fba_inventory_v3/fba_stock_asin_list",title:"冗余库存"},{path:"FBA/fba_inventory_v3/fba_calculationVal_list",title:"库存成本预估"},{path:"FBA/fba_inventory_v3/abnormal_distribution_fee",title:"FBA配送费异常"},{path:"FBA/fba_replenishment_plan/replenishment_plan_list",title:"FBA货件管理"},{path:"FBA/fba_claim/fbaClaimView",title:"索赔统计"},{path:"FBA/fba_claim/fbaClaimDetail",title:"索赔明细"},{path:"crm/mail_activity_manage/mailActivityList",title:"邮件活动管理"},{path:"crm/mail_template_manage/mailTemplateList",title:"邮件模版管理"},{path:"crm/customer_manage/customerOverview",title:"客户总览"},{path:"crm/customer_manage/amzMemberList",title:"客户列表"},{path:"crm/customer_manage/amzMemberSysGrouping",title:"客户分组"},{path:"amzcaptain/email_sys/emailList",title:"买家消息"},{path:"crm/amazon_review_v2/reviewersList",title:"Reviews监控"},{path:"amzcaptain/amazon_evaluation_management/feedBackList",title:"Feedback监控"},{path:"review/Qa/qaAsinList",title:"商品QA"},{path:"order/finance_store/performance_overview_product_analysis",title:"全店铺绩效"},{path:"order/finance_store/achievements_info_product_analysis",title:"店铺绩效"},{path:"crm/mail_activity_manage/crmOperatingLogs",title:"操作日志"},{path:"amzcaptain/amazon_finance/profit_report",title:"店铺利润报告"},{path:"amzcaptain/amazon_finance/pay_ment",title:"交易数据"},{path:"finance/ProfitReturnMonthRecerd/finance_parent_money_back",title:"回款记录"},{path:"finance/ProfitReturnMonthRecerd/monthly_profit_report_list",title:"利润月报"},{path:"amzcaptain/amazon_operate/yunyin_detail",title:"运营费用明细"},{path:"amzfinance/vat_rate_calculation/vat_calculation_report_view",title:"VAT报告"},{path:"amzfinance/vat_rate_calculation/vat_calculation_set",title:"报税国家设置"},{path:"amzfinance/vat_rate_calculation/vat_calculation_view",title:"VAT手动计算"},{path:"amzcaptain/amazon_operate/yunyin_set",title:"运营费用"},{path:"amzcaptain/amazon_operate/set_finance_pressent",title:"财务相关设置"},{path:"tosell/MonitorSelling/amazonAsinMonitorList",title:"被跟卖监控列表"},{path:"tosell/BatchTimingAndSell/priceAdjustmentGoodsList",title:"智能调价"},{path:"tosell/BatchTimingAndSell/amazonPriceAdjustmentRuleList",title:"调价规则"},{path:"tosell/ToSell/toSellInit",title:"创建跟卖"},{path:"tosell/ToSell/toSellList",title:"我的跟卖"},{path:"tosell/BatchTimingAndSell/toSellLog",title:"操作日志"},{path:"amzcaptain/channel_and_cpc/amzAuthorizeList",title:"店铺授权"}],
      isMaster:false
    }
  },
  components: {
    CapHeadMont,
    CapHeadMesg,
    CapHeadUser
  },
  watch:{
    routerList(e){
      this.routers = this.routerListMap(e)
      this.hashChange()
    },
  },
  methods:{
    // 关闭tag
    closeItem(event){
      this.tagList = this.tagList.filter((item,index)=>{
        if(item.url==event.url && event.active){
          if(this.tagList[index+1]){
            this.tagList[index+1].active=true
            location.href = this.tagList[index+1].url+this.tagList[index+1].search
          }else{
            this.tagList[index-1].active=true
            location.href = this.tagList[index-1].url+this.tagList[index-1].search
          }
        }
        return item.url!=event.url
      })
      sessionStorage.setItem('tagList',JSON.stringify(this.tagList))
    },
    goPage(url){
      location.href=url
    },
    // 监听路由变化
    hashChange(){
      if(!location.hash || location.href.indexOf('/404')!=-1 || location.href.indexOf('/401')!=-1) return //不必要路由
      if(!this.detectionChidrenRouter()) return //查不到名字
      this.tagList = JSON.parse(sessionStorage.getItem('tagList')) || [{url:`${location.origin}/#/amz/amzcaptain/integrated_kanban_v2/showData`,title:'首页',active:true,search:''}]
      let tagPresent = {
        url:location.href.split('?')[0],
        search:location.href.split('?')[1] || '',
        active:true,
        title:this.detectionChidrenRouter()
      }
      if(!this.tagList.find(item=>item.url == tagPresent.url)){ //没有当前路由
        this.tagList.forEach(item => {
          item.active = false
        });
        this.tagList.push(tagPresent)
      }else{
        this.tagList.forEach((item,index) => {
          if(item.url == tagPresent.url){
            this.tagList[index] = tagPresent
          }else{
            item.active = false
          }
        });
      }
      sessionStorage.setItem('tagList',JSON.stringify(this.tagList))
    },
    // 过滤无效路由
    routerListMap(e){
      return e.filter(item=>{
        if(item.children && item.children.length){
          item.children = this.routerListMap(item.children)
        }
        return !item.hidden
      })
    },
    // 筛选路由
    detectionChidrenRouter(){
      let locationUrl = ''
      if(location.hash.indexOf('#/amz/')!=-1){
        locationUrl = location.hash.split('#/amz/')[1].split('?')[0]
        return queryIframe(this.oldNavList)
      }else{
        locationUrl = location.hash.split('#')[1].split('?')[0]
        var activeTitle = ''
        queryVue(JSON.parse(JSON.stringify(this.routers)),'')
        return activeTitle || ''
      }
      function queryVue(routers,parentPath){
        for(let i=0;i<routers.length;i++){
          let item = routers[i]
          // 如果是子路由，则拼接父级路由再做匹配
          if(parentPath){
            item.path = `${parentPath}/${item.path}`
          }
          //普通路由
          if(item.path.indexOf(':')==-1){
            if(item.path == locationUrl){  //如果当前路由path==当前浏览器url
              activeTitle = item.meta.title
            }
          }else{//动态路由
            let routerUrl = item.path.split('/')  //当前做匹配的路由的path
            let pathUrl = locationUrl.split('/')  //当前浏览器url
            let is_equal = true //各个节点是否相等
            routerUrl.forEach((item,index)=>{
              if(item.indexOf(':')==-1) {//动态路由节点不匹配
                if(item!=pathUrl[index]){
                  is_equal=false //不相等
                }
              }
            })
            if(is_equal){
              activeTitle = item.meta.title
            }
          }
          // 如果有子路由，继续匹配子路由
          if(item.children && item.children.length){
            queryVue(item.children,item.path)
          }
        }
      }
      function queryIframe(oldNavList){
        for (let i = 0; i < oldNavList.length; i++) {
          let item = oldNavList[i];
          if(item.path==locationUrl){
            return item.title
          }
        }
      }
    },
    showMaster(flag) {
      this.isMaster = flag
    },
  },
  computed:{
    menuList(){
      return JSON.parse(localStorage.getItem('menuList'))
    }
  },
  mounted(){
    window.addEventListener("hashchange", this.hashChange);
    this.routers = this.routerListMap(this.routerList)
    this.routers = JSON.parse('[{"path":"/cpc/dashboard/index","name":"dashboard/index","meta":{"biRootMenuId":"898","biSubMenuId":"1188","title":"common.new_cpc_data_overview","customIcon":"sidebar-icon-menu ad-dashboard","noCache":false}},{"path":"/cpc/analytics/index","name":"analytics/index","meta":{"biRootMenuId":"898","biSubMenuId":"1189","title":"common.new_cpc_adanalysis","customIcon":"sidebar-icon-menu ad-analyse","noCache":false}},{"path":"/cpc/manager/index","name":"manager/index","meta":{"biRootMenuId":"898","biSubMenuId":"1190","title":"common.new_cpc_ad_manger","customIcon":"sidebar-icon-menu ad_manager","noCache":false},"children":[{"path":"cpc/newActivity","name":"newActivity","meta":{"noCache":true,"biRootMenuId":"898","biSubMenuId":"1190","title":"create.new_cpc_add_ad_campaign","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"}}},{"path":"cpc/manager/draft","name":"manager/draft","meta":{"title":"广告异常箱","noCache":false}},{"path":"cpc/manager/SD/:campaignId","name":"managerSD","meta":{"biRootMenuId":"898","biSubMenuId":"1190","dynamic":true,"ppc_type":3,"title":"menu.new_cpc_ad_manger_sd","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"icon":"user","noCache":false}},{"path":"cpc/manager/SB/:campaignId","name":"SB","meta":{"biRootMenuId":"898","biSubMenuId":"1190","dynamic":true,"ppc_type":2,"title":"menu.new_cpc_ad_manger_sb","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"icon":"user","noCache":true}},{"path":"cpc/manager/SB/newSBV/sbvConfig","name":"manager/SB/newSBV/sbvConfig","meta":{"biRootMenuId":"898","biSubMenuId":"1190","title":"create.new_cpc_empty_create","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"icon":"user","noCache":true}},{"path":"cpc/manager/SB/newSBV/sbvEdit","name":"manager/SB/newSBV/sbvEdit","meta":{"biRootMenuId":"898","biSubMenuId":"1190","title":"create.new_cpc_video_edit","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"icon":"user","noCache":true,"noAddtag":true}},{"path":"cpc/manager/SB/newSBV/sbvCreate","name":"manager/SB/newSBV/sbvCreate","meta":{"biRootMenuId":"898","biSubMenuId":"1190","title":"create.new_cpc_video_create","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"icon":"user","noCache":true}},{"path":"cpc/manager/SPManual/:campaignId","name":"SPManual","meta":{"biRootMenuId":"898","biSubMenuId":"1190","dynamic":true,"ppc_type":1,"title":"create.new_cpc_spmanual","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"icon":"user","noCache":true}},{"path":"cpc/manager/SPManual/:campaignId/:adGroupId","name":"SPManualGroup","meta":{"biRootMenuId":"898","biSubMenuId":"1190","dynamic":true,"ppc_type":1,"title":"admanage.new_cpc_ad_group","activeMenu":"/cpc/manager/index","parent":{"name":"SPManual"},"icon":"user","noCache":true}},{"path":"cpc/manager/SPAuto/:campaignId","name":"SPAuto","meta":{"biRootMenuId":"898","biSubMenuId":"1190","dynamic":true,"ppc_type":1,"title":"admanage.new_cpc_sp_automatic","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"icon":"user","noCache":true}},{"path":"cpc/SPAuto/:campaignId/:adGroupId","name":"SPAutoGroup","meta":{"biRootMenuId":"898","biSubMenuId":"1190","dynamic":true,"ppc_type":1,"title":"admanage.new_cpc_sp_automatic","activeMenu":"/cpc/manager/index","parent":{"name":"SPAuto"},"icon":"user","noCache":true}},{"path":"cpc/manager/createSB","name":"createSB","meta":{"biRootMenuId":"898","biSubMenuId":"1190","title":"menu.new_cpc_brand_sb_act","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"icon":"user","noAddtag":true}},{"path":"cpc/manager/createSD","name":"createSD","meta":{"biRootMenuId":"898","biSubMenuId":"1190","title":"menu.new_cpc_show_sd_ad","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"icon":"user","noCache":true}},{"path":"cpc/manager/SD/:campaignId/viewRemarket/:adGroupId","name":"viewRemarket","meta":{"biRootMenuId":"898","biSubMenuId":"1190","dynamic":true,"ppc_type":3,"title":"menu.new_cpc_sd_marking_review","activeMenu":"/cpc/manager/index","parent":{"name":"managerSD"},"noCache":true}},{"path":"cpc/manager/SD/:campaignId/productLaunch/:adGroupId","name":"productLaunch","meta":{"biRootMenuId":"898","biSubMenuId":"1190","dynamic":true,"ppc_type":3,"title":"menu.new_cpc_sd_goods_delivery","activeMenu":"/cpc/manager/index","parent":{"name":"managerSD"},"noCache":true}},{"path":"cpc/manager/keyWord/commodityList","name":"commodityList/index","meta":{"biRootMenuId":"898","biSubMenuId":"1190","title":"商品列表","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"noCache":true}}]},{"path":"/cpc/intelligence/index","name":"intelligence/index","meta":{"biRootMenuId":"898","biSubMenuId":"1191","title":"common.new_cpc_intelligent_tool","customIcon":"sidebar-icon-menu ad_tool","noCache":true}},{"path":"/cpc/journal/index","name":"journal/index","meta":{"title":"intelligent.new_cpc_operation_log","biRootMenuId":"898","biSubMenuId":"1663","customIcon":"sidebar-icon-menu ad_journal","noCache":true}},{"path":"cpc/rankingMonitoring/index","name":"rankingMonitoring/index","meta":{"biRootMenuId":"898","biSubMenuId":"1666","title":"排名监控","customIcon":"sidebar-icon-menu ad_manager","noCache":false}},{"path":"cpc/manager/keyWord/monitoringLog","name":"monitoringLog","meta":{"biRootMenuId":"898","biSubMenuId":"1666","title":"监控日志","activeMenu":"/cpc/manager/index","noCache":true}}]')
    this.hashChange()
   }
}
</script>
<style lang="scss" scoped>
.tags-view-container {
  width: calc(100% - 40px);
  height: 35px;
  background: #fff;
  border-bottom: 1px solid #e9e9e9;
  margin-bottom: 13px;
  position: fixed;
  z-index: 98;
  top: 0;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  .tag-list{
    flex: 1;
    display: flex;
    li{ 
      display: flex;
      padding: 5px 6px 5px 10px;
      align-items: center;
      position: relative;
      cursor: pointer;
      user-select: none;
      .title{
        width: 90px;
        height: 16px;
        line-height: 16px;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        color: #666;
        text-align: center;
      }
      .el-icon-close{
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
        transition: all .3s cubic-bezier(.645,.045,.355,1);
        -webkit-transform-origin: 100% 50%;
        transform-origin: 100% 50%;
        margin-left: 8px;
        width: 15px;
      }
      &::before{
        width: 1px;
        height: 9px;
        background: #d9d9d9;
        content: "";
        display: inline-block;
        position: absolute;
        right: -1px;
        top: 13px;
      }
      &.active{
        background-color: #f4f5f8;
        &::before{
          display: none;
        }
      }
    }
  }
  .right-side{
    width: 274px;
    height: 100%;
    min-width: 106px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 18px 0 24px;
  }
}
</style>