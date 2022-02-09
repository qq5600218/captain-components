<template>
  <div class="system-monitor-box">
    <span class="js-monitor-open">
        <img class="icon-monitor-light" :src="has_total?imgs.warningNew:imgs.warningNewZero" @click="showMonitor()">
        <i class="monitor-num" v-if="has_total">{{total_num}}</i>
    </span>
    <div class="system-monitor-main" v-show="is_show" @click="is_show = !is_show" :class="{'act':is_act}">
        <div class="infor" @click.stop="is_show = true">
            <div class="card card1 act">
                <p class="monitor_title">
                    <span class="bold f16">{{$t('common.new_cpc_indicators_to_monitor')}}</span>
                    <el-tooltip class="light-green f12 ml5 pointer" popper-class="layer-tip" effect="orange" :content="$t('tips.new_cpc_tips_0012')" placement="right-start">
                        <span>{{$t('tips.new_cpc_tips_0371',{n:12})}}？</span>
                    </el-tooltip>
                    <a href="javascript:;" class="light-green f12 fr mt5" @click="viewHandle()">{{$t('common.new_cpc_was_handle')}}>></a>
                </p>
                <div class="clearfix">
                    <div class="system-monitor-left scrollbar">
                        <dl class="system-monitor-all">
                            <dt><span class="name">{{$t('common.new_cpc_my_campaigin')}}</span></dt>
                            <dd :class="{'active':type == 0}"  @click="getMesgList(0)">
                                <p class="clearfix">
                                    <span class="monitor_name">{{$t('common.new_cpc_all')}}</span>
                                    <span class="monitor_num">{{monitor_all}}</span>
                                </p>
                                <p class="clearfix">
                                    <span class="monitor_name2">{{$t('common.new_cpc_yester_campare')}}</span>
                                    <span class="monitor_num2">{{monitor_yesterday_all}}</span>
                                </p>
                            </dd>
                            <dd :class="{'active':type == 1}" @click="getMesgList(1)">
                                <p class="clearfix">
                                    <span class="monitor_name">{{$t('common.new_cpc_sell_sum')}}</span>
                                    <span class="monitor_num">{{monitor_sale}}</span>
                                </p>
                                <p class="clearfix">
                                    <span class="monitor_name2">{{$t('common.new_cpc_yester_campare')}}</span>
                                    <span class="monitor_num2">{{monitor_yesterday_sale}}</span>
                                </p>
                            </dd>
                            <dd :class="{'active':type == 2}" @click="getMesgList(2)">
                                <p class="clearfix">
                                    <span class="monitor_name">{{$t('common.new_cpc_selling_state')}}</span>
                                    <span class="monitor_num">{{monitor_state}}</span>
                                </p>
                                <p class="clearfix">
                                    <span class="monitor_name2">{{$t('common.new_cpc_yester_campare')}}</span>
                                    <span class="monitor_num2">{{monitor_yesterday_state}}</span>
                                </p>
                            </dd>
                            <dd :class="{'active':type == 3}" @click="getMesgList(3)">
                                <p class="clearfix">
                                    <span class="monitor_name">{{$t('common.new_cpc_price')}}</span>
                                    <span class="monitor_num">{{monitor_price}}</span>
                                </p>
                                <p class="clearfix">
                                    <span class="monitor_name2">{{$t('common.new_cpc_yester_campare')}}</span>
                                    <span class="monitor_num2">{{monitor_yesterday_price}}</span>
                                </p>
                            </dd>
                            <dd :class="{'active':type == 4}" @click="getMesgList(4)">
                                <p class="clearfix">
                                    <span class="monitor_name">Rank{{$t('common.new_cpc_ranking')}}</span>
                                    <span class="monitor_num">{{monitor_rank}}</span>
                                </p>
                                <p class="clearfix">
                                    <span class="monitor_name2">{{$t('common.new_cpc_yester_campare')}}</span>
                                    <span class="monitor_num2">{{monitor_yesterday_rank}}</span>
                                </p>
                            </dd>
                        </dl>
                        <dl class="system-monitor-all js-monitor-select" data-type="2">
                            <dt><span class="name">{{$t('common.new_cpc_my_jinpin')}}</span></dt>
                            <dd :class="{'active':type == 5}" @click="getMesgList2(5)">
                                <p class="clearfix">
                                    <span class="monitor_name">{{$t('common.new_cpc_jingdian_genzong')}}</span>
                                    <span class="monitor_num">{{compet_all}}</span>
                                </p>
                                <p class="clearfix">
                                    <span class="monitor_name2">{{$t('common.new_cpc_yester_campare')}}</span>
                                    <span class="monitor_num2">{{compet_yesterday_all}}</span>
                                </p>
                            </dd>
                        </dl>
                    </div>
                    <div class="system-monitor-ul">
                        <ul class="system-monitor-list list1 clearfix">
                            <li class="error-li tc" v-if="is_loading"><img width="250" :src="imgs.loadingImg"></li>  
                            <li class="error-li" v-if="is_noData">
                                <div class="system-monitor-tips" :style="{width:width+'px'}">
                                    <img class="img-tips" :src="imgs.errorCap">
                                        <p class="msg">
                                            <i class="error-robot middle"></i> &nbsp;
                                            <b class="middle" style="color:#666;" v-if="is_msg == 1">
                                                您暂未开启指标监控提醒，请前往 <a class="light-green" @click.stop="forward('site_message')">消息设置 </a>开启~
                                            </b>
                                            <b class="middle" style="color:#666;" v-if="is_msg == 2">
                                                您暂无运营分析 - 指标监控权限，可联系主账号开通
                                            </b>
                                            <b class="middle" style="color:#666;" v-if="is_msg == 3">
                                                指标监控”功能为您提供关键商品库存不足、销量异常（暴涨暴跌）、商品在售状态变更（下架）等问题警报通知，及时止损。前往 <a class="light-green" @click.stop="forward('monitor')">添加监控 </a>
                                            </b>
                                            <b class="middle" style="color:#666;" v-if="is_msg == 4">
                                                暂未授权店铺， <a class="light-green" @click.stop="forward('amzAuthorizeList')">去授权 </a>
                                            </b>
                                        </p>
                                    </div>
                                </li>
                                <template v-if="!is_loading&&!is_noData">
                                <li v-for="(elem,index) in list" :key="elem.id">
                                    <span class="ques-tips-t type" @click='setMesgHandle(2,2,elem.id,elem.monitor_main_type,index)'>
                                        <img class="read" :src="imgs.read">
                                        <b class="cont cont-l ques-fade" style="left: -16px;top: -44px;">{{$t('common.new_cpc_remark_was_handle')}}</b>
                                    </span>
                                    <div class="box">
                                        <p class="sku">
                                            <a @click.stop="forward('commodityoperation','?type=1&channel_id='+elem.channel_id+'&val='+elem.monitor_sku)" class="light-green js-go-asin js-layer-tip" data-tips="点击跳转到'商品运营分析'">{{elem.monitor_sku}}</a>
                                            <span class="fr light-gray">{{elem.create_time}}</span>
                                        </p>
                                        <p class="msg" v-html="elem.message"></p>
                                        <p class="user">
                                            <i class="icon-site" :class="'icon-'+elem.site_code"></i>
                                            <span class="middle" :title="elem.channel_name">{{elem.channel_name}}</span>
                                        </p>
                                        <span class="ques-tips-t roof-btn" :class="{'active':elem.is_up == 1}" @click="setMesgUp(3,elem.is_up,elem.id,index)">
                                            <img :src="imgs.pushpin">
                                            <b class="cont ques-fade" style="left: -15px;top: -44px;" v-if="elem.is_up == 1">{{$t('common.new_cpc_was_to_top')}}</b>
                                            <b class="cont ques-fade" style="left: -5px;top: -44px;" v-else>{{$t('common.new_cpc_to_top')}}</b>
                                        </span>
                                        <el-tooltip class="remark-btn active" effect="orange" v-if="elem.is_remark > 0" :content='elem.remark' placement="right">
                                            <el-button @click="showRemark($event,elem.remark,elem.id,index)">{{$t('common.new_cpc_zhu')}}</el-button>
                                        </el-tooltip>
                                        <span class="ques-tips-t remark-btn" v-else  @click="showRemark($event,'',elem.id,index)">
                                            注<b class="cont ques-fade" style="left: -10px;top: -44px;">{{$t('common.new_cpc_remark')}}</b>
                                        </span>
                                    </div>
                                </li>  
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="card card2">
                <p class="monitor_title">
                    <span class="bold">{{$t('common.new_cpc_was_handle')}}</span>
                    <span class="f12 ml5">{{$t('tips.new_cpc_tips_0370',{n:7})}}</span>
                    <a href="javascript:;" class="light-green f12 fr mt5" @click="viewReturn()"><<{{ $t('common.new_cpc_back') }}</a>
                </p>
                <ul class="system-monitor-list list2 scrollbar">
                    <li class="error-li tc" v-if="is_loading2"><img width="250" :src="imgs.loadingImg"></li>  
                    <li class="error-li" v-if="is_noData2"><div class="system-monitor-tips"><img class="img-tips" :src="imgs.errorCap"><p class="msg"><i class="error-robot middle"></i> &nbsp;<b class="middle">{{$t('common.new_cpc_no_ind_yujing')}}~</b></p></div></li>
                    <li v-for="(elem,index) in list2" v-if="!is_loading2&&!is_noData2" :key="elem.id">
                        <div class="box">
                            <p class="sku">
                                <a @click.stop="forward('commodityoperation','?type=1&channel_id='+elem.channel_id+'&val='+elem.monitor_sku)" class="light-green js-go-asin js-layer-tip" data-tips="点击跳转到'商品运营分析'">{{elem.monitor_sku}}</a>
                                <span class="fr light-gray">{{elem.create_time}}</span>
                            </p>
                            <p class="msg" v-html="elem.message"></p>
                            <p class="user">
                                <i class="icon-site" :class="'icon-'+elem.site_code"></i>
                                <span class="middle ml5" :title="elem.channel_name">{{elem.channel_name}}</span>
                            </p>
                            <el-tooltip class="remark-btn active" effect="orange" v-if="elem.is_remark > 0" :content='elem.remark' placement="right">
                                <el-button @click="showRemark($event,elem.remark,elem.id,index)">{{$t('common.new_cpc_zhu')}}</el-button>
                            </el-tooltip>
                            <span class="ques-tips-t remark-btn" v-else  @click="showRemark($event,'',elem.id,index)">
                                {{$t('common.new_cpc_zhu')}}<b class="cont ques-fade" style="left: -10px;top: -44px;">{{$t('common.new_cpc_remark')}}</b>
                            </span>
                        </div>
                    </li>  
                </ul>
            </div>
            <p class="tips">
                <a target="_blank" @click.stop="forward('site_message','?type=monitor')" class="light-green pointer f12">{{$t('common.new_cpc_msg_setting')}}</a>
                <a target="_blank" @click.stop="forward('monitor')" class="more light-green pointer f12 fr mt5">{{$t('common.new_cpc_see_more')}}>></a>
            </p>
        </div>
    </div>
    <div class="remark-cont" :class="{'left':remarkLeft}" :style='remarkStyle' v-show="remark_show">
        <textarea class="msg" ref="reamark_text"> </textarea>
        <a class="light-green pointer fr js-cancel-remark" @click="cancelRemark()"> {{$t('common.new_cpc_cancel')}}</a>
        <a class="light-green pointer fr mr10" @click="confirmRemark(1)">{{$t('common.new_cpc_confirm')}}</a>
    </div>
</div>
</template>
<script>
import { getMonitorInfo,getCompeInfo,getMonitorList,getCompeList,setMonitorRemark } from '@/request/api'
import site_config from '@/utils/site_config.js'
import { errorCap,warningNewZero,warningNew,read,pushpin } from '@/assets/images/tags'
import { loadingImg } from '@/assets/images/public'
export default {
    name:'cap-head-mont',
    data(){
        return{
            imgs:{errorCap,warningNewZero,warningNew,loadingImg,read,pushpin},
            BIURL: process.env.VUE_APP_BI_API,
            is_loading:false,
            is_noData:false,
            is_loading2:false,
            is_noData2:false,
            is_show:false,
            has_total:false,
            total : 0,
            total_num:0,
            type:0,
            monitor_all:0,
            monitor_yesterday_all:"+0",
            monitor_sale:0,
            monitor_yesterday_sale:"+0",
            monitor_state:0,
            monitor_yesterday_state:"+0",
            monitor_price:0,
            monitor_yesterday_price:"+0",
            monitor_rank:0,
            monitor_yesterday_rank:"+0",
            compet_all:0,
            compet_yesterday_all:"+0",
            list:[],
            list2:[],
            handle_result:1,
            monitor_main_type:0,
            remark_show:false,
            remarkStyle :{},
            // remark:'',
            remarkLeft:false,
            remark_id:0,
            remark_index: 0,
            is_act:false,
            status_code:'',
            is_msg:0,
            width:260,
            forwardUrlMap:{
                'monitor': {"id":"100007","is_vue":"0","title":"指标监控","m":"monitor","c":"IndexMonitor","a":"index"}, //指标监控
                'site_message': {"id":"99991","is_vue":"0","title":"消息设置","m":"site_message","c":"SiteMessageRules","a":"index"}, //消息设置
                'commodityoperation': {"id":"1232","is_vue":"1","title":"商品运营分析","m":"amzcaptain","c":"amazon_new_finance","a":"commodityoperation"}, //商品运营分析
                'amzAuthorizeList': {"id":"797","is_vue":"0","title":"店铺授权","m":"amzcaptain","c":"channel_and_cpc","a":"amzAuthorizeList"}, //授权
            },
        }
    },
    mounted(){
        this.getMesgInfo();
        this.getMesgInfo2();
    },
    methods:{
        showMonitor(){
            this.is_show = !this.is_show;
            if(this.is_show){
                this.getMesgList(this.monitor_main_type);
            }
        },
        // 我的店铺信息
        getMesgInfo() {
            getMonitorInfo().then(res => {
                this.status_code = res.data.status_code;
                if(res.code==200){
                    if(this.status_code == 200){
                        var data = res.data.count;
                        this.monitor_all = data[0].count;
                        this.monitor_yesterday_all = "+" + data[0].yesterday;
                        this.monitor_sale = data[1].count;
                        this.monitor_yesterday_sale = "+" + data[1].yesterday;
                        this.monitor_state = data[2].count;
                        this.monitor_yesterday_state = "+" + data[2].yesterday;
                        this.monitor_price = data[3].count;
                        this.monitor_yesterday_price = "+" + data[3].yesterday;
                        this.monitor_rank = data[4].count;
                        this.monitor_yesterday_rank = "+" + data[4].yesterday;
                        if(data[0].count > 0){
                            this.total  = parseInt(this.total) + parseInt(data[0].count);
                            if(this.total > 99){
                                this.total_num = '99+';
                            }else{
                                this.total_num = this.total;
                            }
                        }
                        if(parseInt(this.total) > 0){
                            this.has_total = true;
                        }else{
                            this.has_total = false;
                        }
                    }
                }
            });
        },
        // 我的竞品信息
        getMesgInfo2() {
            let param = {type:1};
            getCompeInfo(param).then(res => {
                if(res.code==200){
                    let data = res.data.count;
                    this.compet_all = data[1].count;
                    this.compet_yesterday_all = "+" + data[1].yesterday;
                    if(data[1].count > 0){
                        this.total  = parseInt(this.total) + parseInt(data[1].count);
                        if(this.total > 99){
                            this.total_num = '99+';
                        }else{
                            this.total_num = this.total;
                        }
                    }
                    if(parseInt(this.total) > 0){
                        this.has_total = true;
                    }else{
                        this.has_total = false;
                    }
                }
            });
        },

        // 我的店铺列表
        getMesgList(index) {
            this.is_loading = true;
            this.type = index;
            if(this.status_code == 200){
                this.is_noData = false;
            }else{
                this.is_noData = true;
                this.is_loading = false;
                if(this.status_code == 400){
                    // 未开启
                    this.is_msg = 1;
                    this.width = 400;
                }else if(this.status_code == -1){
                    // 无权限
                    this.is_msg = 2;
                    this.width = 400;
                }else if(this.status_code == 425){
                    // 开启无加入监控
                    this.is_msg = 3;
                    this.width = 500;
                }else if(this.status_code == 401){
                    // 未授权店铺
                    this.is_msg = 4;
                }
                return;
            }
            this.monitor_main_type = index;
            let param = {handle_result:this.handle_result,monitor_main_type:this.monitor_main_type,isajax:1};
            getMonitorList(param).then(res => {
                this.is_loading= false;
                if(res.code==200){
                    if(res.rows.length > 0){
                        this.list = res.rows;
                        this.list.forEach(item => {
                            this.$set(item,'site_code',site_config.data[item.site_id].site);
                        });
                    }else{
                        this.is_noData = true;
                    }
                }else{
                    this.is_noData = true;
                }
            });
        },

        // 我的店铺列表
        getMesgList2(index) {
            this.is_loading = true;
            this.is_noData = false;
            this.type = index;
            let param = {handle_result:1,isajax:1};
            getCompeList(param).then(res => {
                this.is_loading= false;
                if(res.code==200){
                    if(res.rows.length > 0){
                        this.list = res.rows;
                        this.list.forEach(item => {
                            this.$set(item,'site_code',site_config.data[item.site_id].site);
                        });
                    }else{
                        this.is_noData = true;
                    }
                }else{
                    this.is_noData = true;
                }
            });
        },

        // 我的店铺已处理
        // main_type 我的店铺类型
        // id 店铺id
        // type 操作类型
        // index 当前项
        setMesgHandle(type,handle_result,id,main_type,index) {
            let param = {handle_result:handle_result,isajax:1,id:id,type:type};
            setMonitorRemark(param).then(res => {
                if(res.code==200){
                    this.list.splice(index, 1);
                    this.monitor_all = parseInt(this.monitor_all) - 1;
                    this.total = parseInt(this.total) - 1;
                    if(this.total > 99){
                        this.total_num = '99+';
                    }else{
                        this.total_num = this.total;
                    }
                    if(main_type == 1){
                        this.monitor_sale --;
                    }else if(main_type == 2){
                        this.monitor_state --;
                    }else if(main_type == 3){
                        this.monitor_price --;
                    }else if(main_type == 4){
                        this.monitor_rank --;
                    }
                }
                this.$layer.msg(res.msg);
            });
        },
        // 置顶
        setMesgUp(type,is_up,id,index) {
            is_up = is_up == 1 ? 0 : 1;
            let param = {is_up:is_up,isajax:1,id:id,type:type};
            setMonitorRemark(param).then(res => {
                if(res.code==200){
                    if(is_up == 1){
                        this.list[index].is_up = is_up;
                        this.list.unshift(this.list[index]);
                        this.list.splice(index+1, 1);
                    }else{
                        for(let i in this.list){
                            if(this.list[i].is_up == 0){
                                this.list.splice(i, 0,this.list[index]);
                                this.list[index+parseInt(i)].is_up = 0;
                                this.list.splice(index, 1);
                                return false;
                            }
                        }
                    }
                }
                this.$layer.msg(res.msg);
            });
        },

        // 显示备注信息
        showRemark(e,remark,id,index){
            this.remark_id = id;
            this.remark_index = index;
            let rect = e.target.getBoundingClientRect();
            this.remark_show = true;
            this.$refs.reamark_text.value = '';
            if(rect.x+150 > document.body.clientWidth){
                this.remarkStyle = {"left":(rect.x-160)+"px","top":(rect.y-5)+"px"};
                this.remarkLeft = true;
            }else{
                this.remarkStyle = {"left":(rect.x+35)+"px","top":(rect.y-5)+"px"};
                this.remarkLeft = false;
            }
            if(remark && remark != ''){
                this.$refs.reamark_text.value = remark;
            }
            this.$nextTick(() => {
                let reamark_text = this.$refs.reamark_text;
                let len = reamark_text.value.length ;
                this.setSelectionRange(reamark_text,len);
            });
        },

        setSelectionRange(tObj,sPos) {
            if(tObj.setSelectionRange){
                tObj.setSelectionRange(sPos, sPos);
                tObj.focus();
            }else if(tObj.createTextRange){
                var rng = tObj.createTextRange();
                rng.move('character', sPos);
                rng.select();
            }
        },
        // 取消备注
        cancelRemark(){
            this.remark_show = false;
            this.$refs.reamark_text.value = '';
        },

        // 确定备注
        confirmRemark(type){
            let remarks = this.$refs.reamark_text.value;
            if(remarks == ""){
                this.$layer.msg(this.$t('tips.new_cpc_tips_0373'))
            }
            let param = {type:type,isajax:1,id:this.remark_id,remarks:remarks};
            setMonitorRemark(param).then(res => {
                if(res.code==200){
                    this.remark_show = false;
                    let that = this.list;
                    if(this.handle_result == 2){
                        that = this.list2;
                    }
                    that[this.remark_index].is_remark = 1;
                    that[this.remark_index].remark = remarks;
                }
                this.$layer.msg(res.msg);
            });
        },
        // 已处理
        viewHandle(){
            this.is_act = true;
            this.is_loading2 = true;
            this.is_noData2 = false;
            this.handle_result = 2;
            let param = {handle_result:this.handle_result,isajax:1,page:1};
            getMonitorList(param).then(res => {
                this.is_loading2= false;
                if(res.code==200){
                    if(res.rows.length > 0){
                        this.list2 = res.rows;
                        this.list2.forEach(item => {
                            this.$set(item,'site_code',site_config.data[item.site_id].site);
                        });
                    }else{
                        this.is_noData2 = true;
                    }
                }else{
                    this.is_noData2 = true;
                }
            });
        },
        //返回到已处理
        viewReturn(){
            this.handle_result = 1;
            this.is_act = false;
        },
        // 调用祖父级方法
        forward(key,params){
            this.is_show = false;
            this.$parent.$parent.switchUrl(this.forwardUrlMap[key],params)
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('~@/assets/css/sitIcon.scss');
@import url('~@/assets/css/public.css');
.js-monitor-open{
    width: 18px;
    height: 18px;
    display: block;
    position: relative;
}
.icon-monitor-light{
    width: 100%;
    height: 100%;
    cursor: pointer;
    display: block;
    
}
/*系统监控模块*/
.system-monitor-box{
    display: inline-block;
    width: 22px;
    height: 22px;
    float: right;
    margin-right: 16px;
    // margin: 12px 10px 10px 0;
}
.system-monitor-box .monitor-num{
    position: absolute;
    top: -7px;
    left: 15px;
    min-width: 12px;
    height: 16px;
    color: #fff;
    line-height: 16px;
    border-radius: 8px;
    background-color: #FF0000;
    font-size: 12px;
    padding: 0 2px;
    text-align: center;
    font-style: normal;
}

.system-monitor-main{
    position: fixed;
    width: 100%;
    height: calc(100% - 50px);
    left: 0;
    top: 47px;
    right: 0;
    bottom: 0;
    background:rgba(000,000,000,.4);
    /*display: none;*/
}
.system-monitor-main .infor{
    width: 98vw;
    height: 440px;
    background: #f6f7fb;
    position: relative;
    left: calc(50% + 24px);
    transform: translateX(-50%);
}
.system-monitor-main .card{
    position: absolute;
    padding: 0.4% 0 .4% 20px;
    left: 0;
    top:0;
    width: calc(100% - 20px);
    height: 96.5%;
    transition:all .6s ease-in 0s;
}
.system-monitor-main.act .card1{
    left:-100%;
}
.system-monitor-main .card2{
    left: 100%;
}
.system-monitor-main.act .card2{
    left:0;
}
.system-monitor-main .monitor_title{
    color: #073b49;
    margin-right: 20px;
    position: relative;
    z-index: 1;
}
.system-monitor-main .tips{
    width: calc(100% - 40px);
    padding: 0 20px;
    position: absolute;
    left: 0;
    bottom: 15px;
}
.system-monitor-left{
    float: left;
    width: 14%;
    max-height: 370px;
    overflow: auto;
}
.system-monitor-all{
    width: 100%;
}
.system-monitor-all dt{
    font-size: 12px;
    text-align: center;
    color: #073b49;
    width: 95%;
    line-height: 25px;
    margin-bottom: 5px;
    position: relative;
}
.system-monitor-all dt:after{
    content: "";
    width: 100%;
    height: 1px;
    background: #c6d1d7;
    position: absolute;
    left: 0;
    top: 12px;
}
.system-monitor-all dt .name{
    background: #f6f7fb;
    position: relative;
    z-index: 1;
    padding: 0 5px;
}
.system-monitor-all dd{
    border-radius: 4px;
    background: #fff;
    margin-bottom: 12px;
    box-shadow: 0 0 6px #ececec;
    border: 2px solid transparent;
    font-size: 12px;
    padding: 6px 10px;
    line-height: 18px;
    color: #666;
    cursor: pointer;
    margin-right: 12px;
}
.system-monitor-all dd.active,
.system-monitor-all dd:hover{
    border: 2px solid #27B8D0;
}
.system-monitor-all .monitor_name{
    color: #073b49;
    font-weight: bold;
}
.system-monitor-all .monitor_num,
.system-monitor-all .monitor_num2{
    float: right;
}
.system-monitor-all .monitor_num{
    color: #27B8D0;
    font-weight: bold;
    font-size: 16px;
}
.system-monitor-ul{
    margin: 0 0 0 20px;
    padding-top: 10px;
    float: left;
    width: calc(86% - 24px);
    border-left: 1px solid #c6d1d7;
    height: 376px;
    top: -16px;
    position: relative;
    overflow:hidden;
}
.system-monitor-list{
    position: relative;
    margin: 5px auto;
    padding-right: 20px;
}
.system-monitor-list li {
    width: calc(33.3% - 35px);
    font-size: 12px;
    float: left;
    margin: 10px 0 10px 35px;
    cursor: pointer;
    -webkit-transition: .3s ease-in-out;
    -o-transition: .3s ease-in-out;
    transition: .3s ease-in-out;
    position: relative;
    list-style: none;
}
.system-monitor-list .color-remind{
    font-weight: bold;
    margin: 0 2px;
    color: #ec414d;
}
.system-monitor-list .box{
    width: calc(100% - 40px);
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 0 6px #ececec;
    height: 62px;
    padding: 6px 15px 6px 25px;
    color: #666;
    position: relative;
    transition:all .2s ease-in 0s;
    box-sizing: border-box;
}
.system-monitor-list .box:hover{
    box-shadow: 0 0 6px #0bb4d0;
}
.system-monitor-list .sku{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.system-monitor-list .type{
    background: #d9d9d9;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    position: absolute;
    left: -14px;
    top:50%;
    margin: -14px 0 0;
    box-shadow: 0 0 6px #ececec;
    text-align: center;
    line-height: 32px;
    transition:all .2s ease-in 0s;
    z-index: 1;
}
.system-monitor-list .type:hover{
    background: #27B8D0;
    box-shadow: 0 0 6px #8ae7f7;
}
.system-monitor-list .type.active{
    background: #27B8D0;
}
.system-monitor-list .msg{
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.system-monitor-list .user{
    color: #cccccc;
    position: absolute;
    bottom: 6px;
    width: 75%;
}
.system-monitor-list .user .channel_name{
    display: inline-block;
    width: 88%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.system-monitor-list .roof-btn,
.system-monitor-list .remark-btn{
    width: 24px;
    height: 22px;
    text-align: center;
    position: absolute;
    right: -0px;
    bottom: -0px;
    background: #d9d9d9;
    padding: 0;
    font-size: 12px;
    color: #fff;
    border: none;
    line-height: 22px;
    border-bottom-right-radius: 5px;
}
.system-monitor-list .roof-btn{
    right: 26px;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 0;
}
.system-monitor-list .roof-btn.active{
    background: #ed777e;
}
.system-monitor-list .remark-btn.active{
    background: #ede577;
}
.system-monitor-box .remark-cont{
    position: absolute;
    width: 130px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 6px #ececec;
    font-size: 12px;
    padding: 10px 10px 5px;
    /*display: none;*/
}
.system-monitor-box .remark-cont:after,
.system-monitor-box .remark-cont:before{
    content: "";
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-right: 8px solid #fff;
    border-bottom: 5px solid transparent;
    position: absolute;
    left: -8px;
    top: 10px;
}
.system-monitor-box .remark-cont:before{
    left: -9px;
    border-right: 8px solid #ececec;
}
.system-monitor-box .remark-cont.left:after,
.system-monitor-box .remark-cont.left:before{
    border-right: 8px solid transparent;
    border-left: 8px solid #fff;
    left: initial;
    right: -16px;
}
.system-monitor-box .remark-cont.left:before{
    right: -17px;
    border-left: 8px solid #ececec;
}
.system-monitor-box .remark-cont .msg{
    border: 1px solid #27B8D0;
    border-radius: 4px;
    width: 118px;
    height: 40px;
    resize: none;
    overflow: hidden;
}
.system-monitor-list.list2{
    width: 100%;
    margin: 2px 0 0 0;
    border-left: none;
    max-height: 375px;
    overflow-y: auto;
}
.system-monitor-list.list2 li{
    float: left;
    line-height: 15px;
    font-size: 12px;
    position: relative;
    cursor: pointer;
    margin: 10px 7px;
    width: calc(25% - 17px);
}
.system-monitor-list.list2 .box{
    width: calc(100% - 30px);
    padding-left: 15px;
}
.system-monitor-list li.error-li{
    width: 100%;
    margin: 80px 0;
    cursor: inherit;
}
.table-tips, .system-monitor-tips, .system-favorites-tips {
    width: 260px;
    min-height: 145px;
    font-family: "Microsoft YaHei";
    text-align: center;
    margin: 0 auto;
    padding: 20px 0;
    line-height: 18px;
}
.system-monitor-tips .img-tips {
    width: 100px;
    max-width: 100%;
    max-height: 100%;
}
.system-monitor-list .system-monitor-tips .msg {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;    
    font-size: 12px;
    color: #044b7f;
    margin: 0 0 0 33px;
}
</style>