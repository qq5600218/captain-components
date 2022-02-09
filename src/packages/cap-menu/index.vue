<template>
  <div class="nav-box" ref="imgs">
    <div>
      <div class="logo-box" :style="hideLogo ? 'margin-bottom: 0;' : ''">
        <a href="https://www.captainbi.com/" target="_blank" rel="noopener noreferrer">
          <img class="img" :src="imgs.logo" alt="船长logo" />
        </a>
      </div>
      <ul class="navList">
        <li v-for="(nav,navIndex) in navList" :key="nav.id" @mouseover="selectNav(nav, navIndex)">
          <span class="line" v-if="nav.id == 1219"></span>
          <div class="itemBox" :class="[{small:hideLogo},selectIndex==navIndex?'active':'']" @click="setClick(nav, navList, navIndex)">
            <template v-if="hideTitile">
              <el-tooltip :content="nav.title || nav.text" placement="right">
              <img class="icon" v-if="imgs[nav.id] && !hideLogo" :src="imgs[nav.id]" alt="icon"/>
              </el-tooltip>
            </template>
            <template v-else>
              <img class="icon" v-if="imgs[nav.id] && !hideLogo" :src="imgs[nav.id]" alt="icon"/>
              <p class="text-item">{{ nav.title || nav.text }}</p>
            </template>
          </div>
        </li>
      </ul>
      <div class="mask" v-if="childMenu.sub_menu" @click="cancelPop">
        <div class="sub-content" ref="subCon">
          <div class="head">
            <img class="captain-bi" :src="imgs.captain" alt="captainBi"/>
          </div>
          <div class="row-box">
            <div class="row" v-for="seceondItem in childMenu.sub_menu" :key="seceondItem.id">
              <template v-if="seceondItem.sub_menu && seceondItem.sub_menu.length">
                <div class="second-title" v-if="seceondItem.title && childMenu.sub_menu.length>1">
                  {{ seceondItem.title }}
                </div>
                <div class="third-title-box" :class="{ secondTitle: seceondItem.title == '' }">
                  <a class="third-title" v-for="thirdItem in seceondItem.sub_menu" :key="thirdItem.id" @click="goPage(thirdItem)"
                    :class="{
                      'active-class': thirdItem.is_active
                    }">
                      {{ thirdItem.title || thirdItem.text }}
                    </a>
                </div>
              </template>
              <template v-else>
                <div class="second-title-click" @click="goPage(seceondItem)"
                  :class="{
                    'active-class': thirdItem.is_active
                  }">
                  {{ seceondItem.title || seceondItem.text }}
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="independent">
        <img :src="imgs.erp" alt="" @click="openErp">
      </div>
      <ul class="independent-nav">
        <li>
          <el-tooltip class="item" placement="right" popper-class="feedback-tooltip">
            <img :src="imgs.kefu" @click="showService()" alt="">
            <div slot="content" class="feedback">
              在线客服
            </div>
          </el-tooltip>
        </li>
        <li>
          <el-tooltip class="item" placement="right" popper-class="feedback-tooltip">
            <img :src="imgs.liwuIcon" @click="goSkip()" alt="">
            <div slot="content" class="feedback">
              反馈有奖
            </div>
          </el-tooltip>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getMenuList } from "@/request/api";
import { logo } from "@/assets/images/public";
import { kanban,xuanpin,fenxi,guanggao,kucun,caiwu,jixiao,shouquan,ark,home,captain,captainErp,fuwu,erp,kefu,liwuIcon } from "@/assets/images/nav";
var selectIndex = 0
export default {
  name: "captain-menu",
  props: {
    menuType: {
      default: 'apps',
      type: String,
    },
    routerList:{
      default: [],
      type: Array
    },
  },
  watch:{
    routerList(e){
      this.routers = this.routerListMap(e)
    }
  },
  computed: {
    hideLogo() {
      return this.clientHeight < 930;
    },
  },
  data() {
    return {
      imgs: {
        logo,
        captain,
        erp,
        kefu,
        liwuIcon,
        779: kanban,
        883: xuanpin,
        996: fenxi,
        898: guanggao,
        943: kucun,
        960: caiwu,
        859: jixiao,
        780: kanban,
        796: shouquan,
        1219: ark,
        1259: home,
        1674: fuwu
      },
      navList:[],
      erpList: [
        {
          img: captainErp,
          text: '进销存管理、FBA智能补货，支撑船长BI算清财务利润',
          url: process.env.VUE_APP_BI_erp
        }
      ],
      childMenu:{},
      isClick:false,
      clientHeight:document.documentElement.clientHeight, //浏览器高度
      hideTitile: false, //越南版字太长，隐藏菜单文字只展示图标
      selectIndex:null,
      routers:[],
      childAppRouter:'', //匹配出的顶级路由
    };
  },
  methods:{
    routerListMap(e){
      return e.filter(item=>{
        delete item.component
        if(item.children && item.children.length){
          item.children = this.routerListMap(item.children)
        }
        return !item.hidden
      })
    },
    setClick(nav, index) {     
      if (nav.sub_menu.length==1 &&  nav.sub_menu[0].sub_menu.length==1) {
        let item = nav.sub_menu && nav.sub_menu[0]['sub_menu'][0]
        this.goPage(item)
        this.childMenu = {}
      }else{
        this.isClick = true
        this.selectNav(nav, index)
      }
    },
    // 选择某个nav
    selectNav(nav,index) {
      if(!this.isClick) return
      this.selectIndex = index
      this.childMenu = nav.sub_menu.length==1 &&  nav.sub_menu[0].sub_menu.length==1 ? {}: nav
    },
    cancelPop(){
      this.isClick = false
      this.childMenu = {}
      this.selectIndex = selectIndex
    },
    openErp(){
      window.open(`${process.env.VUE_APP_ERP_MENU_HOST}/app/#/amz/erp/index/home`)
    },
    goSkip() {
      const url = {
        m: 'amzcaptain',
        c: 'personal_information',
        a: 'userFeedback',
        title: '用户问题反馈',
        is_vue:0
      }
      this.goPage(url)
    },
    showService(){
      _MEIQIA('showPanel')
    },
    // 监听浏览器url变动
    hashChange(){
      if(location.hash && location.hash.indexOf('#/amz/')==-1){
        // 首先匹配vue路由，得到与当前url匹配的顶级路由
        let locationUrl = location.hash.split('#')[1].split('?')[0] 
        this.routers.forEach(item=>{
          this.detectionChidrenRouter(item,item,locationUrl)
        })
      }
      // 再拿顶级路由匹配菜单路由
      this.navList.forEach((item,index) => {
        item.sub_menu.forEach(item2 => {
          this.autoActive(index,item2)
        });
      });
    },
    // 匹配出vue路由的顶级路由用于菜单栏选中项
    detectionChidrenRouter(item,parent,locationUrl){
      //有配置 activeMenu
      if(item.meta && item.meta.activeMenu && item.meta.activeMenu == locationUrl){
        this.childAppRouter = item.meta.activeMenu
      }
      //普通路由
      if(item.path.indexOf(':')==-1){
        if(item.path == locationUrl){  //如果当前路由path==当前浏览器url
          this.childAppRouter = parent.path
        }
      }else{//动态路由
        let routerUrl = item.path.split('/')  //当前做匹配的路由的path
        let pathUrl = locationUrl.split('/')  //当前浏览器url
        let is_equal = true //各个节点是否相等
        routerUrl.forEach((item,index)=>{
          if(item.indexOf(':')!=-1) return //动态路由节点不匹配
          if(item!=pathUrl[index]){
            is_equal=false //不相等
          }
        })
        if(is_equal == true){
          this.childAppRouter = parent.path
        }
      }
      // 如果有子路由，继续匹配子路由
      if(item.children && item.children.length){
        item.children.forEach(chitem=>{
          this.detectionChidrenRouter(chitem,parent,locationUrl)
        })
      }
    },
    // 菜单路由自动匹配方法
    autoActive(parentIndex,item){
      // 如果有下一级，则匹配下一级
      if(item.sub_menu){
        item.sub_menu.forEach(item1=>{
          this.autoActive(parentIndex,item1)
        })
        return
      }
      // 如果路由匹配上了
      if((item.is_vue==0 && `#/amz/${item.m}/${item.c}/${item.a}` == location.hash.split('?')[0]) || (item.is_vue==1 && item.vue_url == this.childAppRouter)){
        item.is_active = true
        this.selectIndex = parentIndex
        selectIndex = parentIndex
      }else{
        item.is_active = false
      }
    },
    // 跳转页面
    goPage(item){
      if(item.is_vue==0){
        location.href = `/#/amz/${item.m}/${item.c}/${item.a}`
      }else{
        location.href = '/#'+(this.menuType=='admin'?'/app_ads':'')+item.vue_url
      }
    },
  },
  mounted() {
    window.onresize=()=>{
      this.clientHeight = document.documentElement.clientHeight;
    }
    this.routers = this.routerListMap(this.routerList)
      console.log(this.routers)
    // this.routers = JSON.parse('[{"path":"/cpc/dashboard/index","name":"dashboard/index","meta":{"biRootMenuId":"898","biSubMenuId":"1188","title":"common.new_cpc_data_overview","customIcon":"sidebar-icon-menu ad-dashboard","noCache":false}},{"path":"/cpc/analytics/index","name":"analytics/index","meta":{"biRootMenuId":"898","biSubMenuId":"1189","title":"common.new_cpc_adanalysis","customIcon":"sidebar-icon-menu ad-analyse","noCache":false}},{"path":"/cpc/manager/index","name":"manager/index","meta":{"biRootMenuId":"898","biSubMenuId":"1190","title":"common.new_cpc_ad_manger","customIcon":"sidebar-icon-menu ad_manager","noCache":false},"children":[{"path":"/cpc/newActivity","name":"newActivity","meta":{"noCache":true,"biRootMenuId":"898","biSubMenuId":"1190","title":"create.new_cpc_add_ad_campaign","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"}}},{"path":"/cpc/manager/SD/:campaignId","name":"managerSD","meta":{"biRootMenuId":"898","biSubMenuId":"1190","dynamic":true,"ppc_type":3,"title":"menu.new_cpc_ad_manger_sd","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"icon":"user","noCache":false}},{"path":"/cpc/manager/SB/:campaignId","name":"SB","meta":{"biRootMenuId":"898","biSubMenuId":"1190","dynamic":true,"ppc_type":2,"title":"menu.new_cpc_ad_manger_sb","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"icon":"user","noCache":true}},{"path":"/cpc/manager/SB/newSBV/sbvConfig","name":"manager/SB/newSBV/sbvConfig","meta":{"biRootMenuId":"898","biSubMenuId":"1190","title":"create.new_cpc_empty_create","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"icon":"user","noCache":true}},{"path":"/cpc/manager/SB/newSBV/sbvEdit","name":"manager/SB/newSBV/sbvEdit","meta":{"biRootMenuId":"898","biSubMenuId":"1190","title":"create.new_cpc_video_edit","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"icon":"user","noCache":true,"noAddtag":true}},{"path":"/cpc/manager/SB/newSBV/sbvCreate","name":"manager/SB/newSBV/sbvCreate","meta":{"biRootMenuId":"898","biSubMenuId":"1190","title":"create.new_cpc_video_create","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"icon":"user","noCache":true}},{"path":"/cpc/manager/SPManual/:campaignId","name":"SPManual","meta":{"biRootMenuId":"898","biSubMenuId":"1190","dynamic":true,"ppc_type":1,"title":"create.new_cpc_spmanual","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"icon":"user","noCache":true}},{"path":"/cpc/manager/SPManual/:campaignId/:adGroupId","name":"SPManualGroup","meta":{"biRootMenuId":"898","biSubMenuId":"1190","dynamic":true,"ppc_type":1,"title":"admanage.new_cpc_ad_group","activeMenu":"/cpc/manager/index","parent":{"name":"SPManual"},"icon":"user","noCache":true}},{"path":"/cpc/manager/SPAuto/:campaignId","name":"SPAuto","meta":{"biRootMenuId":"898","biSubMenuId":"1190","dynamic":true,"ppc_type":1,"title":"admanage.new_cpc_sp_automatic","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"icon":"user","noCache":true}},{"path":"/cpc/SPAuto/:campaignId/:adGroupId","name":"SPAutoGroup","meta":{"biRootMenuId":"898","biSubMenuId":"1190","dynamic":true,"ppc_type":1,"title":"admanage.new_cpc_sp_automatic","activeMenu":"/cpc/manager/index","parent":{"name":"SPAuto"},"icon":"user","noCache":true}},{"path":"/cpc/manager/createSB","name":"createSB","meta":{"biRootMenuId":"898","biSubMenuId":"1190","title":"menu.new_cpc_brand_sb_act","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"icon":"user","noAddtag":true}},{"path":"/cpc/manager/createSD","name":"createSD","meta":{"biRootMenuId":"898","biSubMenuId":"1190","title":"menu.new_cpc_show_sd_ad","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"icon":"user","noCache":true}},{"path":"/cpc/manager/SD/:campaignId/viewRemarket/:adGroupId","name":"viewRemarket","meta":{"biRootMenuId":"898","biSubMenuId":"1190","dynamic":true,"ppc_type":3,"title":"menu.new_cpc_sd_marking_review","activeMenu":"/cpc/manager/index","parent":{"name":"managerSD"},"noCache":true}},{"path":"/cpc/manager/SD/:campaignId/productLaunch/:adGroupId","name":"productLaunch","meta":{"biRootMenuId":"898","biSubMenuId":"1190","dynamic":true,"ppc_type":3,"title":"menu.new_cpc_sd_goods_delivery","activeMenu":"/cpc/manager/index","parent":{"name":"managerSD"},"noCache":true}},{"path":"cpc/manager/keyWord/commodityList","name":"commodityList/index","meta":{"biRootMenuId":"898","biSubMenuId":"1190","title":"商品列表","activeMenu":"/cpc/manager/index","parent":{"name":"manager/index"},"noCache":true}}]},{"path":"/cpc/manager/draft","name":"manager/draft","meta":{"title":"广告异常箱","noCache":false}},{"path":"/cpc/intelligence/index","name":"intelligence/index","meta":{"biRootMenuId":"898","biSubMenuId":"1191","title":"common.new_cpc_intelligent_tool","customIcon":"sidebar-icon-menu ad_tool","noCache":true}},{"path":"/cpc/journal/index","name":"journal/index","meta":{"title":"intelligent.new_cpc_operation_log","biRootMenuId":"898","biSubMenuId":"1663","customIcon":"sidebar-icon-menu ad_journal","noCache":true}},{"path":"/cpc/rankingMonitoring/index","name":"rankingMonitoring/index","meta":{"biRootMenuId":"898","biSubMenuId":"1666","title":"排名监控","customIcon":"sidebar-icon-menu ad_manager","noCache":false}},{"path":"/cpc/manager/keyWord/monitoringLog","name":"monitoringLog","meta":{"biRootMenuId":"898","biSubMenuId":"1666","title":"监控日志","activeMenu":"/cpc/manager/index","noCache":true}}]')
    getMenuList().then((res) => {
      this.navList = res.data
      this.hashChange()
    });
    window.addEventListener("hashchange", this.hashChange);
    },
};

(function(m, ei, q, i, a, j, s) {
  m[i] = m[i] || function() {
    (m[i].a = m[i].a || []).push(arguments)
  };
  j = ei.createElement(q),
    s = ei.getElementsByTagName(q)[0];
  j.async = true;
  j.charset = 'UTF-8';
  j.src = '//static.meiqia.com/dist/meiqia.js';
  s.parentNode.insertBefore(j, s);
})(window, document, 'script', '_MEIQIA');
_MEIQIA('entId', 'ce8d6d08e4273599aa5ae016cf58473f');
_MEIQIA('withoutBtn');
_MEIQIA('getPanelVisibility', yourFunction);
var a = true;
function yourFunction(visibility) {
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    if (visibility === 'visible') {
    } else {
      if(a){
        a = false;
      }else{
        location.reload();
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-box {
  width: 40px;
  background-color: #182730;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  position: fixed;
  z-index: 99;
  .logo-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    margin-bottom: 30px;
    cursor: pointer;
    img,
    a {
      display: block;
      width: 26px;
    }
  }
  .navList {
    >li{
      align-items: center;
      transition: border-color .3s,background-color .3s,color .3s;
      cursor: pointer;
      &:hover{
        background-color: #0a6a85;
      }
      .itemBox{
        padding-top: 4px;
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-bottom: 13px;
        .icon {
          width: 16px;
        }
        >p{
          display: block;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: pre-wrap;
          line-height: 20px;
          padding: 0 8px;
          font-size: 12px;
          color: #fff;
        }
        &.small{
          height: 38px;
          margin-bottom: 0px;
          justify-content: center;
        }
        &.active{
          background: #27b8d0!important;
        }
      }
      .line {
        width: 100%;
        height: 1px;
        display: block;
        background: #fff;
        opacity: 0.2;
        margin-bottom: 14px;
      }
    }
  }
  .mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 40px;
    z-index: 99999;
    .sub-content {
      position: absolute;
      height: 100%;
      background-color: #fff;
      top: 0;
      left: 0;
      overflow: hidden;
      width: max-content;
      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 48px;
        background: #f2f2f2;
        padding: 0 19px;
        box-sizing: border-box;
        .captain-bi {
          width: 110px;
        }
      }
      .row-box{
        height: 100%;
        width: auto;
        writing-mode: vertical-lr;
        -webkit-writing-mode: vertical-lr;
        -ms-writing-mode: vertical-lr;
        display: flex;
        flex-wrap: wrap;
        padding-top: 17px;
        box-sizing: border-box;
        .row {
          color: rgb(156, 146, 146);
          font-size: 16px;
          writing-mode: horizontal-tb;
          -webkit-writing-mode: horizontal-tb;
          -ms-writing-mode: horizontal-tb;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 170px;
          border-right: 1px solid #F0F0F0;
          padding: 17px 0;
          cursor: pointer;
          .second-title {
            font-size: 14px;
            font-weight: 500;
            color: #333;
            line-height: 20px;
            height: 20px;
            padding: 0 20px;
            font-weight: 700;
          }
          .second-title-click {
            font-size: 13px;
            cursor: pointer;
            font-weight: 500;
            color: #333333;
            line-height: 20px;
            height: 20px;
            padding: 0 20px;
          }
          .third-title-box {
            margin-top: 7px;
            &.secondTitle {
              margin-top: 0;
            }
            .third-title {
              display: block;
              font-size: 12px;
              font-weight: 500;
              color: #666;
              line-height: 19px;
              padding: 6px 20px;
              &:hover {
                background: #f2f2f2;
              }
              &.active-class {
                color: #27B8D0;
              }
            }
          }
        }
      }
      &.active-style {
        width: max-content;
      }
      &.leave-style {
        width: 0;
      }
    }
  }
  .independent{
    padding-bottom: 30px;
    text-align: center;
    img{
      width: 28px;
      height: 28px;
    }
  }
  .independent-nav{
    border-top: 1px solid rgba(250, 250, 250, 0.2);
    padding: 30px 0;
    li{
      height: 18px;
      text-align: center;
      &:not(:last-of-type){
        margin-bottom: 16px;
      }
      img{
        width: 18px;
        height: 18px;
      }
    }
  }
}


.feedback {
  cursor: pointer !important;
  background-color: #27b8d0 !important;
  box-sizing: border-box !important;
  padding: 10px !important;
  margin: 0 !important;
  color: #fff !important;
}
</style>

<style>
.feedback-tooltip {
  left: 30px !important;
  box-shadow:none;
  padding: 0 !important;
  background: none !important;
  border: 0px;
  z-index: 100000 !important;
}
.feedback-tooltip .popper__arrow{
  width: 8px !important;
  height: 8px !important;
  background-color: #27b8d0 !important;
  transform: rotateZ(45deg);
  left: -4px !important;
  padding: 0;
  border: 0px !important;
}
.feedback-tooltip .popper__arrow::after{
  display: none !important;
}
</style>