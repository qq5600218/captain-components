<template>
  <div v-clickoutside="clickoutside" class="cap-bus-store" :class="disabled ? 'disabled':''">
    <div class="showBox clearfix" @click="focus">
      <div class="bi_content">
         <!--暂无店铺-->
         <template v-if="loading">
           <i class="el-icon-loading"/>
         </template>
         <template v-else>
          <span v-if="noShop" class="storeName">暂无授权店铺<a
              href="javascript:;"
              @click="toAuthorizate"
              class="toAuthorizate">&nbsp;去授权</a>
            </span>
          <!-- cpc店铺名展示 -->
            <div v-else-if="isCpc" class="bi_content">
                <!-- 全选不展示ico -->
                <span v-if="imgCode && !(multiple && ( cpcStoreList.length - 1 === cpcSelectIds.length))" ><i :class="`icon-site icon-${siteCofig[imgCode].site}`"/>&nbsp;</span>
                <!--单选-->
                <span class="storeName">{{ (multiple && (cpcStoreList.length - 1 === cpcSelectIds.length)) ? ALL_STORE.title : selectedVal }}</span>
                  <span v-if="((cpcStoreList.length -1) > cpcSelectIds.length ) && cpcSelectIds.length > 1 && multiple " class="selectedNum">
                   +{{ cpcSelectIds.length - 1 }}
                 </span>
            </div>
            <!-- bi店铺名展示 -->
            <div v-else class="bi_content">
                <span v-if="imgCode"><i :class="`icon-site icon-${siteCofig[imgCode].site}`" />&nbsp;</span>
                <span v-if="!numtags.show" class="storeName">{{ selectedVal}}</span>
                <span v-else class="mutilSelected">
                  <span class="storeName">{{ numtags.name }}</span>
                  <span v-if="numtags.length > 1" class="selectedNum"
                    >+{{ numtags.length - 1 }}</span>
                 </span>
            </div>
         </template>
      </div>
      <i
        slot="suffix"
        class="el-input__icon"
        v-if="!noShop"
        :class="['el-icon-arrow-up','diy-icon',{'is-reserve': !isShowPulldownMenu}]"
        :style="{display:iconArrows.isTwoThree&&iconArrows.isTwoThree==1?'none':'block'}"
      />
    </div>
      <transition name="el-zoom-in-top">
    <div v-if="isShowPulldownMenu" class="pulldown-menu clearfix ">
      <Tabs
        v-if="tabListObj.length > 0 && !isCpc"
        v-model="activeTabName"
        class="clearfix"
        @tab-click="handleClick"
      >
        <template v-for="tab in tabListObj">
          <TabPane
            :key="tab.id"
            class="deleteBorder"
            :label="tab.label"
            :name="tab.label"
          >
            <div class="search">
              <Input
                clearable
                v-model="searchKey"
                :placeholder="tab.searchPlaceholder"
                @change="value => search(value, tab)"
              />
              <img
                src="../../../assets/images/search-img.png"
                alt=""
                style="position: absolute; right:0px;font-size:14px;cursor: pointer"
                @click="search(searchKey, tab)"
              />
            </div>
            <div v-if="tab.filterList.length !== 0">
              <div
                v-if="!tab.multiple"
                class="menuList clearfix scrollbarWidth6"
                :class="{
                  allSelected: tab.allSelectItem && tab.allSelectItem.isSelected
                }"
              >
                <div
                  v-for="(item, index) in tab.filterList"
                  :key="item[tab.idKey]"
                  class="menuItem"
                  :class="{
                    selected:
                      selectedStore &&
                      selectedStore[tab.idKey] === item[tab.idKey]
                  }"
                  @click="singleSelect(item, index)"
                >
                  <!-- <div class="slotItem"> -->
                  <p class="name">
                    <i v-if="item.site_code" :class="'icon-site icon-' + item.site_code + ''" />
                    <i v-if="item.code" :class="'icon-site icon-' + item.code + ''" />
                    <span>{{ item[tab.labelName] }}</span>                    
                  </p>
                  
                  <p class="channel_count" v-if="tab.id==5||tab.id==6"><i></i><span>{{ item.channel_count }}</span></p>
                  <!-- </div> -->
                </div>
              </div>
              <div v-else class="clearfix menuList scrollbarWidth6">
                <div
                  v-for="(item, index) in tab.filterList"
                  :key="item[tab.idKey]"
                  class="menuItem"
                  :class="{ selected: item.isSelected}"
                  @click="multipleSelect(item, index)"
                >
                  <!-- <div class="slotItem"> -->
                  <i
                    v-if="item.site_code"
                    :class="'icon-site icon-' + item.site_code + ''"
                  />
                  <span>{{ item[tab.labelName] }}</span>
                  <!-- </div> -->
                </div>
              </div>
            </div>
            <div v-else class="noData">
              暂无匹配项
            </div>
            <p class="tip">
              未启用店铺已自动隐藏
            </p>
            <div v-if="tab.multiple" class="footer">
              <CapBaseButton type="primary" @click="conformSelect">确定</CapBaseButton> 
              <CapBaseButton @click="reset">取消</CapBaseButton> 
            </div>
          </TabPane>
        </template>
      </Tabs>
      <div v-else-if="isCpc">
        <div class="search">
          <Input
            clearable
            v-model="searchKey"
            placeholder="请输入关键字"
            @change="value => search(value, tab)"
          />
          <img
              src="../../../assets/images/search-img.png"
              alt=""
              style="position: absolute; right:0px;font-size:14px;cursor: pointer"
              @click="search(searchKey, tab)"
            />
        </div>
              
        <div
          class="menuList clearfix"
          style="height:340px"
        >
          <!-- item.selected=true||false，给多选使用（mutiple=true） -->
          <div
            v-for="(item,index) in cpcStoreList"
            :key="item.id"
            class="menuItem"
            :class="{ selected: item.site_code === 'all' ? ((cpcStoreList.length -1) === cpcSelectIds.length ) : cpcSelectIds.includes(item.id) }"
            @click="selectStore(item, index)"
          >
            <i
              v-if="item.site_code"
              class="icon-site"
              :class="
                item.site_code == 'all' ? 'isCpc_all_store' : 'icon-' + item.site_code
              "
            />
            <span>{{ item.title }}</span>
          </div>
        </div>

        <p class="tip">未启用店铺已自动隐藏</p>
        <div v-if="multiple" class="footer">
          <CapBaseButton type="primary" @click="notTabConformSelect">确定</CapBaseButton>
          <CapBaseButton @click="notTabCancelSelect">取消</CapBaseButton> 
        </div>
      </div>
      <div v-else-if="noShop" class="noData">
        请先授权店铺
      </div>
      <!-- </div> -->
      <div class="diy-popper" style="left: 35px;"></div>
    </div>
  </transition>
  </div>
</template>
<script>
import _ from 'lodash'
import { Tabs,TabPane,Input } from 'element-ui'
import { CapBaseButton } from '../../../packages/base/cap-button'
import clickoutside from 'element-ui/src/utils/clickoutside'
import siteCofig from '../../../utils/site_config'
import Cookies from 'js-cookie'
import selectCache from '../../../utils/selectCache'
import { throwMessage } from '../../../utils/throttleMessage.js'
import { getStyle , setStyle } from '../../../utils/index'
// import { EVENT_CLOSETAGSVIEW } from '@/enum/eventName'
// import { tabViewRefresh } from "@/utils/ads/adsTabViewRefresh"
let flag = false

const ALL_STORE = {
  title: '全部店铺(默认)',
  site_id: 'all',
  site_code: 'all'
}

export default {
  inheritAttrs: false,
  name: 'CapBusStore',
  mixins:[selectCache],
  components: {
    Tabs,
    TabPane,
    Input,
    CapBaseButton
  },
  directives: { clickoutside },
  props: {
    // 外部传递店铺数据
    storeData: {
      type: Object,
      default: ()=>{
        return {}
      }
    },
    // 是否需要重新加载店铺接口
    isReload: {
      type: Boolean,
      default: true
    },
    tabList: {
      type: Array,
      default: ()=>{
        return  [
        {
          id: 1,
          label: '按店铺', // tab标签名
          params: 'channel_id',
          searchPlaceholder: '查找店铺名',
          labelName: 'title', //
          idKey: 'id',
          allSelectItem: {
            id: 'all',
            title: '全部店铺(默认)',
            isSelected: true
          },
          listName: 'channel_list' // 要遍历的店铺数组名
        },
        {
          id: 2,
          label: '按国家',
          params: 'site_id',
          searchPlaceholder: '查找国家',
          labelName: 'site_name',
          idKey: 'site_id',
          listName: 'site_list' // 要遍历的国家数组名
        },
        {
          id: 3,
          label: '按站点',
          params: 'country_site',
          searchPlaceholder: '查找站点',
          labelName: 'site_group_name',
          idKey: 'site_group_id',
          listName: 'site_group' // //要遍历的站点数组名
        },
        {
          id: 4,
          label: '多选店铺',
          params: 'channel_id',
          searchPlaceholder: '查找店铺名',
          labelName: 'title',
          idKey: 'id',
          allSelectItem: {
            id: 'all',
            title: '全部店铺(默认)',
            isSelected: false
          },
          multiple: true,
          listName: 'channel_list' // 要遍历的店铺数组名
        },
        {
          id: 5,
          label: '子账号',
          params: 'admin_id',
          searchPlaceholder: '查找子账号',
          labelName: 'realname',
          idKey: 'id',
          listName: 'account_list' // 要遍历的子账号数组名
        },
        {
          id: 6,
          label: '部门',
          params: 'common_department_id',
          searchPlaceholder: '查找部门',
          labelName: 'department_name',
          idKey: 'department_id',
          listName: 'department_list' // 要遍历的子账号数组名
        },
      ]
      }
    },
    hideId: {
      type: Array,
      default:()=>[]
    },
    // 多选
    multiple: {
      type: Boolean,
      default: false
    },
    isCpc:{
      type: Boolean,
      default:false,
    },
    select_store_arr_post:{ //接收从iframe传递过来的店铺数据
      type: Object,
      default:()=>{}
    },
    single_store_arr_post:{ //接收从iframe传递过来的店铺数据
      type: Object,
      default:()=>{}
    },
    disabled:{
      type: Boolean,
      default:false,
    }
  },
  data() {
    return {
      selectChangeVal: '',
      selectedStore: '', // 选中的对象
      selectedStoreList: [], // 选中的对象集合
      searchKey: '', // 搜索值
      activeTabName: '', // 点击的tab
      selectedVal: '', // 选中后显示的值
      isShowPulldownMenu: false, // 是否显示下拉菜单
      selectedStoreListBackUps: [], // 选中的对象集合的备份
      numtags: {
        show: false,
        name: '',
        length: 0
      },
      storeParams: {}, // 要传出去的值
      siteCofig: siteCofig.data, // 国旗映射表
      imgCode: '', // 国旗图片
      cpc_store_list: [], // cpc模块备用列表
      cpcStoreList: [], // cpc模块列表
      cpcSelectIds: [], // cpc模块，选中店铺id
      noShop:false, //暂无店铺提示
      iconArrows:{},//是否隐藏2-3级页面的店铺选择箭头icon
      select_store_arr:{},
      single_store_arr:{},
      tabListObj: this.tabList,
      storeObj:{},
      cpc_storeData:{},
      cpc_store:{},
      loading:false,
      store:require('../../../store').default,
      style:undefined
    }
  },
  computed: {
    activedTap() {
      return this.tabListObj.find(item => item.label === this.activeTabName)
    }
  },
  watch: {
    /**
     * @params  {String}  {ids}  [选中店铺id]
     */
    'cpc_store.cpc_profiles_id' (ids) {
      this.normalizeCpcStoreList(ids)
    },
    // //获取2，3级页面
    'store.state.tagsView.visitedViews'(val){
      this.iconArrows = val.find(item=>window.location.hash.includes(item.fullPath)) || {}
    },
    'store.state.tagsView.currentViews'(val){
      this.iconArrows = val
    },
    storeObj:{
      handler(val){
        if (this.isCpc) return
        if (!val['channel_list'] || !val['channel_list'].length) {
          //没有店铺
          this.noShop = true
          this.$emit('change', this.storeParams, this.activeTabName)
          return
        }else{
          this.noShop = false
        }
        this.tabListObj.forEach((tab, index) => {
          const list = JSON.parse(JSON.stringify(val[tab.listName] || [])) || []
          // 全选按钮
          if (list.length > 0) {
            if (tab.allSelectItem) {
              list.unshift(tab.allSelectItem)
            }
            // 多选
            if (tab.multiple) {
              list.forEach(item => {
                this.$set(item, 'isSelected', false)
              })
            }

            tab.list = list
            tab.filterList = list
          }
        })
        this.tabListObj = this.tabListObj.filter(item => item.list.length != 0)
        if (this.tabListObj.length) {
          const tab = this.tabListObj[0]
          this.selectedVal = tab.filterList[0] && tab.filterList[0][tab.labelName]
          // 初始化数据
          if (
            Object.keys(this.select_store_arr).length > 0 ||
            Object.keys(this.single_store_arr).length > 0 && this.single_store_arr.channel_id !=''
          ) {
            this.getIframeStore()
            return
          }
          if(this.getCurrentCacheObj){
            const {select_store_arr,single_store_arr } = this.getCurrentCacheObj
            if(select_store_arr || single_store_arr){
              this.$nextTick(()=>{
                this.select_store_arr = this.getCurrentCacheObj.select_store_arr
                this.single_store_arr = this.getCurrentCacheObj.single_store_arr || ""
                this.cacheStoreData()
              })
              return
            }
          }

          this.all_singleSelect(this.tabListObj[0].allSelectItem)
        }
      },
      immediate:true
    },
    'store.state.shop.shopList': {
      immediate: true, // 新开页签取值问题不能去掉
      handler: function(val) {
        // 取公共接口的数据
        if (JSON.stringify(val) == JSON.stringify(this.storeObj)) return
        this.storeObj = val
      }
    },
    selectedStore(val) {
      if (val == null) return
      this.imgCode = val.site_id || ''
    },
    'numtags.name'(val) {
      if (val) {
        this.imgCode =
          (this.selectedStoreList && this.selectedStoreList[0].site_id) || ''
      }
    },
    select_store_arr_post:{
        handler(val){
          if(val){
            this.select_store_arr = val;
          }
        },
        deep:true
    },
    single_store_arr_post:{
       handler(val){
          if(val){
            this.single_store_arr = val;
          }
        },
        deep:true
    }
  },
  activated(){
    this.$nextTick(()=>{
      this.iconArrows =this.store.state.tagsView.visitedViews.find(item=>window.location.hash.includes(item.fullPath)) || {}
      this.getForwardParams()
    })
  },
  async created() {
    this.style = getStyle(this,['border-radius','borderRadius'])
    // 拿到当前页的currentViews 
    this.iconArrows = this.store && this.store.state.tagsView && this.store.state.tagsView.currentViews || {}
    this.ALL_STORE = ALL_STORE
    if (this.isCpc) {
      // cpc
      if(Object.keys(this.storeData).length > 0){
        this.cpc_storeData =  this.storeData
        this.cpc_store = {
          cpc_profiles_id: this.storeData.channel_list[0].id,
          site_id: this.storeData.channel_list[0].site_id,
          shoreName: this.storeData.channel_list[0].title
        }
      }else{
        if(this.store.getters.storeData.channel_list.length == 0 || !this.isReload){
          this.loading = true
          await this.store.dispatch('shop/getcpcStore')
          this.loading = false
        }
        this.cpc_store =  this.store.getters.cpc_store
        this.cpc_storeData =  this.store.getters.storeData
      }
      this.selectedVal = this.cpc_store.shoreName
      this.imgCode =
        this.cpc_store.site_id && this.cpc_store.site_id != 'all'
          ? this.cpc_store.site_id
          : ''
      this.setCpcStoreList()
      // 多选
      this.normalizeCpcStoreList(this.cpc_store && this.cpc_store.cpc_profiles_id || '')
    } else {
      // BI and 方舟
      this.tabListObj.forEach(item => {
        this.$set(item, 'list', [])
        this.$set(item, 'filterList', [])
        this.storeParams[item.params] = ''
      })
      this.activeTabName = this.tabListObj[0].label
      // 隐藏对应的tab
      if (this.hideId.length > 0)
        this.tabListObj = this.tabListObj.filter(
          item => !this.hideId.includes(item.id)
        )
      if(Object.keys(this.storeData).length > 0){
        this.storeObj = this.storeData
        return
      }
      if(Object.keys(this.store.getters.shopList).length == 0 || !this.isReload){
        this.loading = true
        const api =  require('../../../request/api.js')
        await api.getStore().then((res) => {
          if (res && res.code === 200) {
            this.loading = false
            this.store.commit('shop/SAVE_SHOP_LIST', res.data)
          }else{
            console.error('店铺选择器接口错误，原因：'+res.msg)
          }
        })
      }
      // this.getForwardParams()
    }

  },
  mounted(){
    setStyle(this.$el.querySelector('.showBox'),this.style)
  },
  methods: {
    //下转页获取店铺
    getForwardParams(){   
      if(this.$route.params.is_select_store_arr){         
        const isIframePage = this.$route.params.iframePage         
        const channel_arr = isIframePage?JSON.parse(Cookies.get('channel_arr')):''  
        const channel_id = isIframePage?channel_arr.channel_id_arr : this.$route.params.channel_id
        if(this.$route.params.channel_id){//运营分析带店铺
            this.select_store_arr =  {
              site_id: '',
              country_site: '',
              admin_id: '',
              all_channel: 0,
              tab_type: 1,
              channel_id_arr: channel_id + '',
              common_department_id: ''
            }
            this.single_store_arr = Cookies.get('single_store_arr') ? Object.assign(this.single_store_arr,JSON.parse(Cookies.get('single_store_arr'))): '';
            if( Object.keys(this.select_store_arr).length > 0 || Object.keys(this.single_store_arr).length > 0){
              this.$nextTick(()=>{           
                this.getIframeStore(isIframePage,channel_arr)            
              })
              return
            }
        }else{
          this.select_store_arr= isIframePage?JSON.parse(Cookies.get('channel_arr')):JSON.parse(Cookies.get('select_store_arr'));
          this.single_store_arr= Cookies.get('single_store_arr')? JSON.parse(Cookies.get('single_store_arr')):'';
          if( Object.keys(this.select_store_arr).length > 0 || Object.keys(this.single_store_arr).length > 0){
            this.$nextTick(()=>{
              this.getIframeStore()
            })
            return
          }
        }
      }
    },
    // 去授权
    toAuthorizate() {
      let obj = {
        id: '797',
        title: '店铺授权',
        m: 'amzcaptain',
        c: 'channel_and_cpc',
        a: 'amzAuthorizeList',
        is_vue: '0'
      }
      this.$root.$children[0].$children[0].switchUrl(obj)
    },
    setCpcStoreList() {
      const cpc_store_list = _.cloneDeep(this.cpc_storeData.channel_list)
      if (this.multiple) {
        cpc_store_list.unshift(ALL_STORE)
      }
      this.cpc_store_list = cpc_store_list
      this.cpcStoreList = cpc_store_list
      
    },
    focus() {
      if(this.disabled) return
      if (this.tabListObj.length == 0 || this.noShop) {
        return
      }
      this.isShowPulldownMenu = !this.isShowPulldownMenu
    },
    clickoutside() {
      this.isShowPulldownMenu = false
    },
    search(value, tab) {
      if (this.isCpc) {
        this.cpcStoreList = this.cpc_store_list.filter(
          item => item.title.indexOf(value) != -1
        )
      } else {
        tab.filterList = tab.list.filter(
          item =>
            item[tab.labelName].toUpperCase().indexOf(value.toUpperCase()) > -1
        )
      }
    },
    // 切换tab栏
    handleClick() {
      const activedTap = this.tabListObj.find(
        item => item.label === this.activeTabName
      )
    },
    normalizeCpcStoreList (ids) {
      let result = []
      if (ids) {
        if (ids.indexOf(',') > -1) {
          result = ids.split(',')
        } else {
          result = [ids]
        }
      }
      this.cpcSelectIds = result
    },
    //CPC
    selectStore (store) {
      const allSelect = store.site_code === 'all'
      if (this.multiple) {
         // 单选 || 多选
        const storeIds = []
        const storeList = this.cpcStoreList.filter(item => {
          if (item.site_code !== 'all') {
            storeIds.push(item.id)
            return true
          } else {
            return false
          }
        })

        if (allSelect) {
          this.cpcSelectIds = this.cpcSelectIds.length === storeList.length ?  [] : storeIds
        } else {
          // 多选
          const index = this.cpcSelectIds.findIndex(id => id == store.id)
          if (index > -1) {
            // 删除
            this.cpcSelectIds.splice(index, 1)
          } else {
            // 新增
            this.cpcSelectIds.push(store.id)
          }
        }
      } else {
        // 单选
        this.isCpc ? this.singleSelectCpc(store) : this.singleSelect(store)
        this.cpcSelectIds =[].concat(this.cpcStoreList.filter(item => item.id == store.id)[0].id)
      }
    },
    singleSelectCpc (item) {
      this.storeParams['country'] = item.site_name
      const arr = {}
      if (item.site_code == 'all') {
        arr.cpc_profiles_id = this.cpc_storeData.channel_list
          .map(item => item.id)
          .join()
      } else {
        arr.cpc_profiles_id = item.id
      }
      arr.shoreName = item.title
      arr.site_id = item.site_id
      this.selectedVal = item.title
      this.imgCode = item.site_id
      this.storeChange(arr)
      this.isShowPulldownMenu = false
      // this.store.dispatch('storeSel/cpcStore', arr)
      // this.store.dispatch('shop/changeShopConfig', { cpc_profiles_id: arr.cpc_profiles_id })
      // tabViewRefresh(4)
    },
    // 按店铺 按国家 按站点  按子账号 部门的 单选
    singleSelect(item) {
      this.storeParams['country'] = item.site_name
      // Bi end 方舟
      const activedTap = this.tabListObj.find(
        item => item.label === this.activeTabName
      )
      if (
        activedTap.allSelectItem &&
        item[activedTap.idKey] === activedTap.allSelectItem[activedTap.idKey]
      ) {
        this.all_singleSelect(item)
        return
      }
      this.selectedStore = item
      this.selectedVal = item[activedTap.labelName]
      this.storeChange(item, activedTap)
      if (activedTap.allSelectItem) {
        activedTap.allSelectItem.isSelected = false
      }
      this.selectedStoreList = []
      this.numtags.show = false
      this.clearStatus()
      this.isShowPulldownMenu = false
    },

    // 多选店铺里的多选
    multipleSelect(item) {
      const activedTap = this.tabListObj.find(
        item => item.label === this.activeTabName
      )
      const idKey = activedTap.idKey
      if (
        activedTap.allSelectItem &&
        item[idKey] === activedTap.allSelectItem[idKey]
      ) {
        this.all_mutilSelect(item)
        return
      }
      item.isSelected = !item.isSelected
      if (activedTap.allSelectItem) {
        activedTap.allSelectItem.isSelected = this.isAllSelected()
      }
      this.selectedStoreList = activedTap.list.filter(
        seletedIItem => seletedIItem.isSelected === true
      )
    },
    // 按店铺里的 全部店铺(点击第一个item)
    all_singleSelect(item) {
      item.isSelected = true
      this.isShowPulldownMenu = false
      const activedTap = this.tabListObj.find(
        item => item.label === this.activeTabName
      )
      const selectedList = activedTap.list.filter(
        item =>
          item[activedTap.idKey] !== activedTap.allSelectItem[activedTap.idKey]
      )
      this.selectedVal = activedTap.allSelectItem[activedTap.labelName]
      this.selectedStoreList = []
      this.clearStatus()
      this.selectedStore = ''
      this.numtags.show = false
      this.storeChange(selectedList, activedTap)
    },
    // 多选店铺里的全选按钮 (自己添加的 第一个item)
    all_mutilSelect(item) {
      item.isSelected = !item.isSelected
      //  let activedTap = this.tabListObj.find(item => item.multiple === true);
      const activedTap = this.tabListObj.find(
        item => item.label === this.activeTabName
      )
      const idKey = activedTap.idKey
      activedTap.list.forEach(val => {
        val.isSelected = item.isSelected
      })
      if (item.isSelected) {
        this.selectedStoreList = activedTap.list
      } else {
        this.selectedStoreList = []
      }
    },
    // 判断是否全选
    isAllSelected() {
      const activedTap = this.tabListObj.find(
        item => item.label === this.activeTabName
      )
      const list = activedTap.list.filter(
        item =>
          item[activedTap.idKey] !== activedTap.allSelectItem[activedTap.idKey]
      )
      const isSelected = list.every(item => item.isSelected === true)
      return isSelected
    },
    // 清除掉其他tab栏选中的状态
    clearStatus() {
      const clearTap = this.tabListObj.filter(
        item => item.allSelectItem && item.label !== this.activeTabName
      )
      clearTap.forEach(tapItem => {
        tapItem.allSelectItem.isSelected = false
        if (tapItem.multiple) {
          tapItem.list.forEach(item => {
            item.isSelected = false
          })
        }
      })
    },
    notTabCancelSelect () {
      this.normalizeCpcStoreList(this.cpc_store && this.cpc_store.cpc_profiles_id || '')
      this.isShowPulldownMenu = false
    },

    // CPC 多选店铺
    notTabConformSelect () {
      this.cpcSelectIds = this.cpc_storeData.channel_list.map(item=>{
        if (this.cpcSelectIds.includes(item.id)) return item.id
      }).filter(item=>item)

      //当全部取消勾选，给予提示
      if(!this.cpcSelectIds.length || this.cpcSelectIds.length<1)
      {
        throwMessage.warning('请至少选择一个店铺哦')
        return
      }
      this.isShowPulldownMenu = false
      const cpcSelectIds = this.cpcSelectIds
      const arrCpc = {}
      //当多选店铺等于全部店铺
      if ((this.cpcStoreList.length -1) === cpcSelectIds.length){
        arrCpc.cpc_profiles_id = this.cpc_storeData.channel_list.map(item => item.id).join().replace(/^,/, '')
        arrCpc.shoreName = this.cpcStoreList[0].title
        arrCpc.site_id = this.cpcStoreList[0].site_id
      }
      else{
        let firstStore = null
        for(let i=0;i<this.cpcStoreList.length;i++){
          let item = this.cpcStoreList[i]
          if(cpcSelectIds.find(items=>items==item.id)){
            firstStore = item
            break
          }
        }
        arrCpc.shoreName = firstStore.title
        arrCpc.site_id = firstStore.site_id
        arrCpc.cpc_profiles_id = this.cpcSelectIds.join()
      }
      this.storeChange(arrCpc)
      // this.store.dispatch('storeSel/cpcStore', arrCpc)
      // 切换店铺触发事件 
      // this.store.dispatch('shop/changeShopConfig', { cpc_profiles_id: arrCpc.cpc_profiles_id })
    },
    // 存在tab 多选店铺 确认按钮
    conformSelect() {
      if (this.selectedStoreList && this.selectedStoreList.length === 0) {
        return
      }
      const activedTap = this.tabListObj.find(
        item => item.label === this.activeTabName
      )

      // 每次改变之后备份一份，方便取消功能
      this.selectedStoreListBackUps = JSON.parse(
        JSON.stringify(this.selectedStoreList)
      )
      const selectedStoreList = this.selectedStoreList.filter(
        seletedIItem =>
          seletedIItem[activedTap.idKey] !==
          activedTap.allSelectItem[activedTap.idKey]
      )
      this.storeChange(selectedStoreList, activedTap)
      this.clearStatus()
      if (selectedStoreList.length !== this.selectedStoreList.length) {
        // 点击全选
        this.selectedVal = activedTap.allSelectItem[activedTap.labelName]
        this.selectedStore = activedTap.allSelectItem
        this.numtags.show = false
      } else {
        this.numtags.name = selectedStoreList[0][activedTap.labelName]
        this.numtags.length = selectedStoreList.length
        this.numtags.show = true
        this.selectedStore = this.selectedStoreList && this.selectedStoreList[0]
        this.selectedVal = ''
      }
      this.isShowPulldownMenu = false
    },
    // 多选店铺  取消按钮
    reset() {
      const activedTap = this.tabListObj.find(
        item => item.label === this.activeTabName
      )
      const idKey = activedTap.idKey
      activedTap.list.forEach(item => {
        if (
          this.selectedStoreListBackUps.findIndex(
            item2 => item2[idKey] === item[idKey]
          ) < 0
        ) {
          item.isSelected = false
        } else {
          item.isSelected = true
        }
      })
      this.selectedStoreList = this.selectedStoreListBackUps
      this.isShowPulldownMenu = false
    },
    storeChange(list, tab) {
      if(this.isCpc){
        this.$emit('change', list)
        return 
      }
      const key = tab.params
      const valueKey = tab.idKey
      Object.keys(this.storeParams).forEach(key => {
        if (key !== 'country') {
          this.storeParams[key] = ''
        }
      })
      if (list instanceof Array) {
        const channelArr = []
        list.forEach(item => {
          channelArr.push(item[valueKey])
        })
        this.storeParams[key] = channelArr.toString()
      } else {
        this.storeParams[key] = list[valueKey]
      }
      const activedTap = this.tabListObj.find(
        item => item.label === this.activeTabName
      )
      // debugger
      this.curList = activedTap.list.filter(item => item.id != 'all')
      // 判断是否全选店铺  全选1  非全选0
      list.length == this.curList.length
        ? this.$set(this.storeParams, 'all_channel', 1)
        : this.$set(this.storeParams, 'all_channel', 0)
      this.$emit('change', this.storeParams, this.activeTabName)
      if(tab.id == 1 || tab.id == 4){
        if(this.storeParams.channel_id && this.storeParams.channel_id.split(',').length == 1){//单选店铺
           let single_store_id = this.storeParams.channel_id;
           this.setCache('single_store_arr',single_store_id)
        }
      }

      let select_store_arr = {
        ...this.storeParams,
        tab_type:tab.id
      }
      this.setCache('select_store_arr',select_store_arr)
    },
    // 通过 inject 接收从iframe页面传递过来的 店铺数据
    getIframeStore(bol,channel_arr) {  
      try{
      const select_store_arr = bol?channel_arr:this.select_store_arr
      let channel_id_arr = select_store_arr.channel_id_arr
      channel_id_arr=channel_id_arr?channel_id_arr:'';
      // 多店铺数据
      if (Object.keys(select_store_arr).length > 0) {
        // 全选店铺 判断是按店铺tab 还是多选店铺tab
        if (select_store_arr.all_channel == 1) {
          if (select_store_arr.tab_type == 4) {
            this.activeTabName = this.tabListObj[3].label
            this.all_singleSelect(this.tabListObj[3].allSelectItem)
            this.tabListObj[3].filterList.forEach(item =>
              this.$set(item, 'isSelected', true)
            )
          } else {
            this.activeTabName = this.tabListObj[0].label
            this.all_singleSelect(this.tabListObj[0].allSelectItem)
            this.activeTabName = this.tabListObj[0].label
            this.tabListObj[0].filterList.forEach(item =>
              this.$set(item, 'isSelected', true)
            )
          }
          return
        } else {
          let newArr = {}
          if (channel_id_arr != '') {
            // 只选择一家店铺
            if (channel_id_arr.split(',').length == 1) {
              this.tabListObj[0].filterList.forEach(item => {
                if (channel_id_arr == item.id) newArr = item
              })
              this.activeTabName = this.tabListObj[0].label
            }
            // 选择多家店铺
            if (channel_id_arr.split(',').length > 1) {
              this.selectedStoreList = []
              this.tabListObj[3].filterList.forEach(item => {
                this.select_store_arr.channel_id_arr.split(',').map(_item => {
                  if (_item == item.id) {
                    this.$set(item, 'isSelected', true)
                    this.selectedStoreList.push(item)
                  }
                })
              })
              this.activeTabName = this.tabListObj[3].label
              this.conformSelect()
              return
            }
          }
          // 按国家
          if (this.select_store_arr.site_id != '') {
            this.tabListObj[1].filterList.forEach(item => {
              if (this.select_store_arr.site_id == item.site_id) newArr = item
            })
            this.activeTabName = this.tabListObj[1].label
          }
          // 按站点
          if (this.select_store_arr.country_site != '') {
            this.tabListObj[2].filterList.forEach(item => {
              if (this.select_store_arr.country_site == item.site_group_id)
                newArr = item
            })
            this.activeTabName = this.tabListObj[2].label
          }
          // 按子账号
          if (this.select_store_arr.admin_id != '') {
            this.tabListObj[4].filterList.forEach(item => {
              if (this.select_store_arr.admin_id == item.id) newArr = item
            })
            this.activeTabName = this.tabListObj[4].label
          }
          // 按部门
          if (this.select_store_arr.common_department_id != '') {
            this.tabListObj[5].filterList.forEach(item => {
              if (this.select_store_arr.common_department_id == item.department_id) newArr = item
            })
            this.activeTabName = this.tabListObj[5].label
          }
          if(newArr && Object.keys(newArr).length){
             this.singleSelect(newArr)
          }else {
             this.activeTabName = this.tabListObj[0].label
             this.all_singleSelect(this.tabListObj[0].allSelectItem);
          }
          return
        }
      }
      // 单店铺数据
      const single_store_arr = this.single_store_arr
      if (Object.keys(single_store_arr).length > 0) {
        //  暂空
      }
      } catch(e){
         console.log(e)
         this.activeTabName = this.tabListObj[0].label
         this.all_singleSelect(this.tabListObj[0].allSelectItem);
      }
    },
    cacheStoreData() {
      try{
      const select_store_arr = this.select_store_arr || {}
      const channel_id_arr = select_store_arr.channel_id || ''
      const tab_id = select_store_arr.tab_type;
      const tabItem = this.tabListObj.find(item=>item.id == tab_id) || {}
      // 多店铺数据
      if (Object.keys(select_store_arr).length > 0) {
        // 全选店铺 判断是按店铺tab 还是多选店铺tab
        if (select_store_arr.all_channel == 1) {
          if (tab_id == 4) {
            this.activeTabName = tabItem.label
            this.all_singleSelect(tabItem.allSelectItem)
           tabItem.filterList.forEach(item =>
              this.$set(item, 'isSelected', true)
            )
          } else {
            this.all_singleSelect(tabItem.allSelectItem)
            tabItem.filterList.forEach(item =>
              this.$set(item, 'isSelected', true)
            )
          }
          return
        } else {
          let newArr = {}
          if (channel_id_arr) {
            // 只选择一家店铺
            if (channel_id_arr.split(',').length == 1) {
              tabItem.filterList.forEach(item => {
                if (channel_id_arr == item.id) newArr = item
              })
            }
            // 选择多家店铺
            if (channel_id_arr.split(',').length > 1) {
              this.selectedStoreList = []

              this.tabListObj.find(item=>item.id == tab_id).filterList.forEach(item => {
                this.select_store_arr.channel_id.split(',').map(_item => {
                  if (_item == item.id) {
                    this.$set(item, 'isSelected', true)
                    this.selectedStoreList.push(item)
                  }
                })
              })
              this.activeTabName = tabItem.label
              this.conformSelect()
              return
            }
          }
          const tabIdObj = {
            site_id:'site_id',
            country_site:'site_group_id',
            admin_id:'id',
            common_department_id:'department_id'
          }
          for (const key in this.select_store_arr) {
            if (Object.keys(tabIdObj).includes(key) && this.select_store_arr[key] != '') {
              tabItem.filterList.forEach(item => {
                if (this.select_store_arr[key] == item[tabIdObj[key]]) newArr = item
              })
              this.activeTabName = tabItem.label
            }
          }
          // console.log(newArr,'newArr')
          if(newArr && Object.keys(newArr).length){
             this.singleSelect(newArr)
          }else{
             this.activeTabName = this.tabListObj[0].label
             this.all_singleSelect(this.tabListObj[0].allSelectItem);
          }
          return
        }
      }
      // 单店铺数据
      const single_store_arr = this.single_store_arr
      if (Object.keys(single_store_arr).length > 0) {
        //  暂空
      }
    } catch(e){
         console.log(e)
         this.activeTabName = this.tabListObj[0].label
         this.all_singleSelect(this.tabListObj[0].allSelectItem);
     }
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/assets/css/sitIcon.scss';
@import 'src/assets/css/color.scss';
.cap-bus-store {
  min-width: 162px;
  width: 162px;
  margin-right: 6px;
  position: relative;
  display: inline-block;
  border: 1px solid  $color-e9e9e9;
  cursor: pointer;
  border-radius: 2px;
  background: #fff;
  height: 30px;
  box-sizing: border-box;
  &:hover {
    border: 1px solid $blue;
  }
  &.disabled,
  &.disabled:hover{
    cursor: no-drop;
    border-color: $color-e9e9e9;
    .showBox{
      background-color: $color-f0f0f0;
      color: $color-b7b7b7;
      .storeName{
        color: $color-bfbfbf;
      }
    }
  }
  >>> .el-tabs__item:hover,
  >>> .el-tabs__item.is-active{
    color: $blue;
  }
  >>> .el-input__suffix{
    right: 22px;
  }
  >>> .el-tabs__active-bar{
    background-color: $blue;
  }
  /deep/.el-tabs__nav-wrap::after {
    height: 1px !important;
  }
  .search{
    position: relative;
    display:flex;
    align-items:center;
  }
  .icon-site {
    margin-right: 4px;
    margin-top: -5px;
  }
  .showBox {
    background: $color-fff;
    color: $color-666;
    height: 28px;
    position: relative;
    box-sizing: border-box;
    // border-radius: 2px;
    display: flex;
    padding-left: 10px;
    padding-right: 2px;
    .bi_content {
      flex: 1;
      align-self: center;
      display: flex;
      align-items: center;
      width: 0;
      .icon-flag {
        top: 0;
      }
    }
    .singleSelected {
      flex: 1;
    }
    .mutilSelected {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      flex: 1;
      width: 0;
    }
    &:hover {
      border-color: #dcdfe6 !important;
    }
  }
  .showBox /deep/ {
    .el-input__inner {
      cursor: pointer;
      height: 28px;
      line-height: 28px;
      transition: none;
      background: #e9e9e9;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border: none;
      padding-left: 28px;
    }
    .el-input__icon {
      line-height: 26px;
      flex: 0 0 25px;
      color: #C0C4CC;
      font-size: 14px;
    }
    .el-icon-arrow-down:before {
      font-size: 14px;
      color: #999;
    }
  }
  .pulldown-menu {
    position: absolute;
    width: 550px;
    left: 0;
    bottom: -5px;
    padding: 10px 24px;
    box-sizing: border-box;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    z-index: 2999;
    top: 42px;
    height: max-content;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  }
  .pulldown-menu /deep/ {
    .el-input__inner {
      border: none;
      border-radius: unset;
      border-bottom: 1px solid #e9e9e9;
      padding-left: 0px;
    }
  }
  .tip {
    font-size: 12px;
    font-family: Helvetica;
    color: #999999;
    line-height: 14px;
    margin: 15px 0;
  }
  .menuItem {
    float: left;
    width: 48.5%;
    border: 1px solid #f5f5f5;
    box-sizing: border-box;
    margin-bottom: 8px;
    background: #f5f5f5;
    border-radius: 1px;
    font-size: 12px;
    font-family: Helvetica;
    height: 32px;
    line-height: 32px;
    color: #666666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    .name{
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: flex;
      align-items: center;
      padding-right: 10px;
      span{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .isCpc_all_store{
      display: none;
    }
    &:nth-child(2n-1) {
      margin-right: 12px;
    }
    &:hover {
      border: 1px solid $blue;
      color: $blue;
      .channel_count i{
        background: url('../../../assets/images/icon_dianpu_moren.svg');
      }
      .channel_count span{
        color: $blue;
      }
    }
    .channel_count{
      flex: 0 0 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      i{
        width: 16px;
        height: 16px;
        display: inline-block;
        background: url('../../../assets/images/icon_dianpu_moren (1).svg');
        margin-right: 5px;
        vertical-align: text-bottom;
      }
      span{
        color: #BFBFBF;
      }
    }
    &.selected{
      .channel_count i{
        background: url('../../../assets/images/icon_dianpu_moren.svg');
      }
      .channel_count span{
        color: $blue;
      }
    }
  }

  .selected,
  .allSelected .menuItem {
    border: 1px solid $blue;
    color: $blue;
    position: relative;
    background: url('../../../assets/images/icon-checked.png') no-repeat;
    background-position: bottom right;
  }
  .menuList {
    padding: 18px 0;
    overflow-y: auto;
    height: 235px;
  }
  .storeLogo {
    position: absolute;
    left: 6px;
    top: 48%;
    transform: translateY(-50%);
    z-index: 999;
  }
  .inputInsert /deep/ {
    .el-input__inner {
      padding-left: 24px;
    }
  }
  .slotItem {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 10px;
  }
  .footer {
    text-align: right;
    margin-top: 40px;
  }
  .selectedNum {
    background-color: #f0f0f0;
    border-color: 1px solid #f0f0f0;
    color: #909399;
    padding: 0 5px;
    border-radius: 4px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
  }
  .storeName {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    // width: 80px;
    display: inline-block;
    vertical-align: bottom;
    font-size: 12px;
    flex: 1;
    color: #666;
  }
  .noData {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: 235px;
    font-size: 12px;
  }

  ::-webkit-scrollbar {
    position: relative;
    right: 0px;
  }
  .toAuthorizate {
    color: $blue;
    border-bottom: 1px solid $blue;
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #dddee0;
  }
  .diy-icon {
      transition: transform .3s;
      
      transform: rotate(0deg);
  }
  .is-reserve {
    transform: rotate(180deg);
  }
  .el-zoom-in-top-enter-active,
  .el-zoom-in-top-leave-active {
    opacity: 1;
    transform: scaleY(1);
    transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1), opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
    transform-origin: center top;
  }
  .el-zoom-in-top-enter,
  .el-zoom-in-top-leave-active {
    opacity: 0;
    transform: scaleY(0);
  }
  .diy-popper {
      position: absolute;
      top: -6px;
      left: 50%;
      border-width: 6px;
      margin-right: 3px;
      border-top-width: 0;
      border-bottom-color: #ebeef5;
      filter: drop-shadow(0 2px 12px rgba(0,0,0,.03));
      &::after {
            position: absolute;
            display: block;
            width: 0;
            height: 0;
            border-color: transparent;
            border-style: solid;
            content: " ";
            border-width: 6px;
            top: 1px;
            margin-left: -6px;
            border-top-width: 0;
            border-bottom-color: #fff;
      }
  }

}

</style>
