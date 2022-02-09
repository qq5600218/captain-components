<template>
  <div class="system-name" style="">
    <div class="pointer clearfix">
      <img class="hand" :src="userInfo.head_img" />
    </div>
    <div class="name-slider">
      <div class="name-cont">
        <div class="head-msg clearfix">
          <a @click="forward('accountSettings')" class="head-link">
            <img class="hand" :src="userInfo.head_img" />
          </a>
          <div class="fl tl">
            <p id="name" class="mt5 bold">{{ userInfo.username }}</p>
            <p>
              {{ $t('common.new_cpc_packages') }}：{{ tools_info.tools_title }}
            </p>
          </div>
        </div>
        <div class="payment">
          <ul>
            <li>
              {{ $t('common.new_cpc_rest_day') }}：
              <b style="color: #27b8d0" v-if="userInfo.tools_items_sub_id == 0">{{ $t('common.new_cpc_free') }}</b>
              <span v-else
                >
                 <b style="color: #27b8d0">{{ tools_info.tools_day }}</b>
                {{ $t('common.new_cpc_tips_day') }}</span
              >
              <a
                v-if="$L() !== 'vi-vn'"
                class="blue lineHover fr"
                @click="forward('buyPackage')"
                ><span v-if="tools_items_id == 19">{{
                  $t('common.new_cpc_buy_righnow')
                }}</span
                ><span v-else>{{ $t('common.new_cpc_contine_money') }}</span>
                ></a
              >
              <ul class="third-list">
                <li class="pt5">
                  {{ $t('common.new_cpc_re_monitor_pac')
                  }}<span class="fr"
                    ><b class="num">{{
                      tools_info.reviews_nums > 0 ? tools_info.reviews_nums : 0
                    }}</b
                    >{{ $t('common.new_cpc_count') }}</span
                  >
                </li>
                <li>
                  {{ $t('common.new_cpc_genmai_sum_pac')
                  }}<span class="fr"
                    ><b class="num">{{
                      tools_info.to_sell_nums > 0 ? tools_info.to_sell_nums : 0
                    }}</b
                    >{{ $t('common.new_cpc_count') }}</span
                  >
                </li>
                <li>
                  {{ $t('common.new_cpc_intell_ajust_package')
                  }}<span class="fr"
                    ><b class="num">{{
                      tools_info.adjustment_price_nums > 0
                        ? tools_info.adjustment_price_nums
                        : 0
                    }}</b
                    >{{ $t('common.new_cpc_count') }}</span
                  >
                </li>
                <li>
                  {{ $t('common.new_cpc_was_genmai_monitor')
                  }}<span class="fr"
                    ><b class="num">{{
                      tools_info.monitor_nums > 0 ? tools_info.monitor_nums : 0
                    }}</b
                    >{{ $t('common.new_cpc_count') }}</span
                  >
                </li>
                <li>
                  {{ $t('common.new_cpc_goods_qa_monitor')
                  }}<span class="fr"
                    ><b class="num">{{
                      tools_info.qa_nums > 0 ? tools_info.qa_nums : 0
                    }}</b
                    >{{ $t('common.new_cpc_count') }}</span
                  >
                </li>
                <li>
                  {{ $t('common.new_cpc_email_rest_sum')
                  }}<span class="fr"
                    ><b class="num">{{ tools_info.email_nums }}</b
                    >{{ $t('common.new_cpc_count') }}</span
                  >
                </li>
                <li>
                  {{ $t('common.new_cpc_bi_order_nums')
                  }}<span class="fr" v-if="tools_info.order_nums > 999999999">
                    <b class="num">{{ $t('common.new_cpc_no_limit') }}</b>
                  </span>
                  <span
                    class="fr"
                    v-else-if="tools_info.order_nums == '加载中'"
                  >
                    拼命加载中，请稍后
                  </span>
                  <span class="fr" v-else>
                    <b class="num">{{
                      tools_info.order_nums - tools_info.use_order_nums
                    }}</b>
                    {{ $t('common.new_cpc_count') }}
                  </span>
                </li>
                <li class="pb5">
                  {{ $t('common.new_cpc_water_rest_sum')
                  }}<span class="fr"
                    ><b class="num">{{ tools_info.water_nums }}</b
                    >{{ $t('common.new_cpc_count') }}</span
                  >
                </li>
                <li class="pb5">
                  {{ $t('common.new_cpc_cap_erp')
                  }}<span class="fr"
                    ><b class="num">{{ tools_info.erp_tools_day }}</b
                    >{{ $t('common.new_cpc_tips_day') }}</span
                  >
                </li>
                <li class="pb5">
                  {{ $t('common.new_cpc_cap_fangzhou')
                  }}<span class="fr"
                    ><b class="num">{{ tools_info.ark_tools_day }}</b
                    >{{ $t('common.new_cpc_tips_day') }}</span
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="payment" v-if="arkPermission && arkPermission.is_probation == 1">
          <ul>
            <li>
              {{$t("common.new_cpc_ark_use")}}{{ $t('common.new_cpc_rest_day') }}:
              <span :title="arkDaysAfterTrial + $t('common.new_cpc_tips_day')" style="display:inline-block;line-height:0.8;max-width:26px;overflow:hidden;text-overflow:ellipse;white-space:nowrap" >{{arkDaysAfterTrial}}</span> {{ $t('common.new_cpc_tips_day') }}
              <a class="blue lineHover fr"
                @click="forward('buyPackage','?is_fangzhou=1')">{{
                     $t('common.new_cpc_buy_righnow')
                }}&gt;</a>
            </li>
          </ul>
        </div>
        <ul class="setting">
          <li>
            <a @click="forward('accountSettings')"
              >{{ $t('common.new_cpc_account_setting') }}
              <span class="fr">></span></a
            >
          </li>
          <li v-if="$L() !== 'vi-vn'">
            <a @click="forward('accountSettings', '#chat')"
              >{{ $t('common.new_cpc_weichat_bind') }}
              <span class="fr" v-if="wei_bind == 1"
                ><i class="icon icon-weixin sub"></i>
                <b>{{ $t('common.new_cpc_binded') }}</b> ></span
              >
              <span class="fr" v-else>
                <img :src="imgs.weixin" class="weixin">
                <b>{{ $t('common.new_cpc_unbinding') }}</b> ></span
              >
            </a>
          </li>
          <li v-if="$L() !== 'vi-vn'">
            <a target="_blank" href="https://www.captainbi.com/amz_faq.html"
              >{{ $t('common.new_cpc_use_help') }} <span class="fr">></span></a
            >
          </li>
        </ul>
        <ul class="setting">
          <li>
            <a href="javascript:;"
              >{{ $t('common.new_cpc_goods_info_col')
              }}<span class="fr">></span></a
            >
            <div class="third-list">
              <ul class="setting">
                <li
                  :class="{ active: table_zoomMode != 1 }"
                  @click="zoomMode(0)"
                >
                  <a href="javascript:;">{{ $t('common.new_cpc_entire_mode')}}
                    <img :src="imgs.gou" class="gou">
                  </a>
                  <img class="img" :src="imgs.tableFull" />
                </li>
                <li
                  :class="{ active: table_zoomMode == 1 }"
                  @click="zoomMode(1)"
                >
                  <a href="javascript:;">{{ $t('common.new_cpc_easy_mode') }}
                    <img :src="imgs.gou" class="gou">
                  </a>
                  <img class="img" :src="imgs.tableReduced" />
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <ul class="setting">
          <li>
            <a @click="forward('reportItemList')"
              >{{ $t('common.new_cpc_report_center') }}
              <span class="fr">></span></a
            >
          </li>
        </ul>
        <ul class="setting">
          <li>
            <a
            @click="logout"
              :href="
                BIURL + 'amzcaptain-personal_information-public_logout.php'
              "
              >{{ $t('common.new_cpc_login_out') }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {tableFull,tableReduced,amzHead,weixin,gou} from '@/assets/images/tags'
import { getUserInfo,getArkPermission } from '@/request/api.js'
export default {
  name: 'cap-head-user',
  data() {
    return {
      imgs:{
        tableFull,
        tableReduced,
        amzHead,
        weixin,
        gou
      },
      BIURL: process.env.VUE_APP_BI_API,
      tools_items_id: 19,
      wei_bind: 1,
      table_zoomMode: 0,
      userInfo: '',
      tools_info: '',
      wei_bind: '',
      tools_title: '',
      tools_day: '',
      is_paid_user: '',
      arkPermission:'',//方舟权限
      forwardUrlMap: {
        reportItemList: {
          id: '100010',
          is_vue: '0',
          title: '报告中心',
          m: 'datas',
          c: 'DatasReport',
          a: 'reportItemList'
        }, //报告中心
        accountSettings: {
          id: '99992',
          is_vue: '0',
          title: '个人账号',
          m: 'amzcaptain',
          c: 'personal_information',
          a: 'accountSettings'
        }, //个人账号
        buyPackage: {
          id: '99990',
          is_vue: '0',
          title: '购买套餐',
          m: 'amzcaptain',
          c: 'personal_information',
          a: 'buyPackage'
        } //购买套餐
      }
    }
  },
  props:{
    $L:{
      default: ()=>{
        return 'zh-cn'
      },
      type: Function
    }
  },
  computed:{
    arkDaysAfterTrial(){
      let today = new Date()
      let trialDay = new Date(this.arkPermission.expire_time)
      let trial = (trialDay.getTime() - today.getTime()) / (24 * 60 * 60  * 1000)
      trial = parseInt(trial)
      if(trial < 0 || !trial){
        trial = 0
      }

      return trial
    },
  },
  mounted() {   
    window.resetUserInfo = this.getUserInfo
    this.table_zoomMode = localStorage.getItem('table_zoomMode1')   
    this.getUserInfo()
    // 获取方舟权限
    getArkPermission().then(res=>{
      this.arkPermission = res.data
    })
  },

  methods: {
    logout(){
      window.sessionStorage.setItem('currentUrl',{})
    },
    zoomMode: function (type) {
      this.table_zoomMode = type
      localStorage.setItem('table_zoomMode1', type)
      this.$emit('table-zoomMode', type)
    },
    getUserInfo(type) {
      getUserInfo().then((response) => {
        if (response.code == 200) {
          if (!response.data.user_info.head_img) {
            response.data.user_info.head_img = this.imgs.amzHead
          }
          window.getUserInfo = ()=>{
            return response.data
          }
          this.userInfo = response.data.user_info
          this.tools_info = response.data.tools_info
          this.tools_info.water_nums = this.tools_info.water_nums.toFixed(2)
          this.wei_bind = response.data.wei_bind
          this.tools_title = response.data.tools_title
          this.is_paid_user = response.data.is_paid_user
          // 只重置个人中心各加油包数量
          if (type == 'reset') return
          this.$emit('ready')
          if (
            response.data.user_info.is_master == '1' &&
            response.data.user_info.is_new_user == 0
          ) {
            this.$emit('showMaster', true)
          }
          if (response.data.user_info.is_master == '1') {
            this.$parent.$parent.$refs.Authorizationpop.getStatus()
          }
        }
      })
    },
    // 调用祖父级方法
    forward(key, params) {
      let item = this.forwardUrlMap[key]
      location.href = `/#/amz/${item.m}/${item.c}/${item.a}${params||''}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('~@/assets/css/public.css');
ul{
  list-style: none;
}
.system-name {
  color: #fff;
  float: right;
  position: relative;
  font-size: 14px;
}

.system-name .name {
  float: left;
  margin-left: 10px;
  font-size: 14px;
}

.system-name .hand {
  width: 19px;
  height: 19px;
  border-radius: 50%;
  float: left;
  object-fit: contain;
}

.system-name .protect {
  display: inline-block;
  width: 15px;
  height: 18px;
  /* background: url(../../assets/img/protect.png) 0 0 no-repeat; */
  background-size: 100%;
  position: absolute;
  z-index: 1;
  right: inherit;
  left: -6px;
  top: 4px;
}

.system-head .system-name i.icon-down {
  position: absolute;
  right: -22px;
  top: 25px;
}

.system-name .name-slider {
  position: absolute;
  top: 30px;
  right: 0;
  width: 280px;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s;
}

.system-name:hover .name-slider {
  max-height: 500px;
  overflow: visible;
  transition: max-height 0.3s;
}

.system-name .name-cont {
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 0px 0px 6px #d4d4d4;
  text-align: center;
  color: #333;
}
.system-name .name-cont .head-msg {
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
  overflow: hidden;
}
.system-name .name-cont .hand {
  width: 50px;
  height: 50px;
  margin: 0;
}
.system-name .name-cont .head-msg .head-link {
  float: left;
  margin-right: 10px;
}
.system-name .payment {
  text-align: left;
  padding: 4px 0;
  border-bottom: 1px solid #eee;
  line-height: 40px;
}
.system-name .payment li {
  padding: 0 22px;
  transition: all 0.2s ease-in 0s;
}
.system-name .payment li:hover {
  background: #dff4f8;
}
.system-name .payment > ul > li {
  cursor: pointer;
}
.system-name .payment .third-list {
  position: absolute;
  left: -304px;
  top: 0;
  width: 300px;
  line-height: 26px;
  padding-right: 4px;
  font-size: 12px;
  border-radius: 4px;
  box-shadow: 0px 0px 6px #eee;
  color: #777;
  cursor: auto;
  overflow: hidden;
  display: none;
}
.system-name .payment .third-list li {
  background: #fff;
  height: 26px;
  overflow: hidden;
}
.system-name .payment li:hover .third-list {
  display: block;
}
.system-name .payment .third-list .num {
  margin-right: 5px;
  font-size: 14px;
  color: #27b8d0;
}
.system-name li{
  position: relative;
}
.system-name .setting {
  text-align: left;
  padding: 4px 0;
  border-bottom: 1px solid #eee;
  line-height: 40px;
}
.system-name .setting a {
  display: inline-block;
  width: 100%;
  padding: 3px 20px;
  color: #333;
  box-sizing: border-box;
}
.system-name .setting li:hover > a {
  background: #dff4f8;
}
.system-name .setting .third-list {
  position: absolute;
  left: -204px;
  top: 0;
  width: 200px;
  padding: 0 4px 0 0;
  cursor: pointer;
  display: none;
}
.system-name .setting li:hover .third-list {
  display: block;
}
.system-name .setting .third-list ul {
  box-shadow: 0px 0px 6px #eee;
  background: #fff;
  border-radius: 4px;
  color: #777;
}
.system-name .setting .third-list img {
  display: none;
}
.system-name .setting .third-list li.active a {
  position: relative;
  background: #dff4f8;
}
.system-name .setting .third-list li.active .gou {
  display: block;
}
.system-name .setting .third-list .img {
  width: 300px;
  position: absolute;
  left: -300px;
  top: -4px;
  display: none;
}
.system-name .setting .third-list li:hover .img {
  display: block;
}
.weixin{
  vertical-align: middle;
  margin-top: -2px;
}
.gou{
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
