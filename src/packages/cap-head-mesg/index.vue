<template>
    <div class="system-message-remain">
        <a @click="forward('SiteMessage','?type=3')">
            <img :src="imgs.message" alt="">
        </a>
        <span class="message-number" v-if="count_show">{{count_num}}</span>
        <div class="message-con">
            <div class="message-header">
                <span class="fl spico cleaerfix" :class="{'on':notice_type == 2}" @click="getMesgInfo(2)">
                    {{$t('common.new_cpc_operating_msg')}}
                </span>
                <span class="fl spico  cleaerfix" :class="{'on':notice_type == 1}"  @click="getMesgInfo(1)">
                    {{$t('common.new_cpc_sys_msg')}}
                </span>
                <span class="fl spico cleaerfix" :class="{'on':notice_type == 3}"  @click="getMesgInfo(3)">
                    {{$t('common.new_cpc_account_msg')}}
                </span>
            </div>
            <div class="message-list" v-if="isShow == 1">
                <a v-for="(list, index) in list" v-if='index<5' style="display:block;" @click="forward('SiteMessage','?t_id='+notice_type+'&readid='+list.id)">
                    <div class="mes-list">
                        <span :title="list.message_title_content" class="message-title fl cleaerfix less-1">{{list.message_title_content}}</span>
                        <span class="time fr cleaerfix">{{list.send_time_field}}</span>
                        <p class="less-2" v-html="list.message_title"></p>
                    </div>
                </a>
            </div>
            <div class="message-list" v-else-if="isShow == 2">
                <!-- <p class="pt20 pb20 tc"><img width="20" src="../../assets/img/loading-3.gif"></p> -->
            </div>
            <div class="message-list tc" v-else-if="isShow == 0">
                <img class="pt20" width="100" :src="imgs.errorCap">
                <p class="pb20"><b class="f12" style="color:#666;">{{$t('common.new_cpc_no_message')}}</b></p>
            </div>
            <div class="message-bottom clearfix">
                <a @click="forward('SiteMessageRules')"><span class="fl cleaerfix goleft">{{$t('common.new_cpc_msg_setting')}}</span></a>
                <a @click="forward('SiteMessage','?type=3')"><span class="fr cleaerfix goright">{{$t('common.new_cpc_view_all')}}</span></a>
            </div>
        </div>
    </div>
</template>

<script>
import { getMessageList,getMessageInfo } from '@/request/api'
import { message,errorCap } from '@/assets/images/tags'
export default {
    name:'cap-head-mesg',
    data(){
        return{
            imgs:{errorCap,message},
            BIURL: process.env.VUE_APP_BI_API,
            count_num:0,
            count_show:false,
            notice_type: 2,
            isShow :0,
            list:[],
            forwardUrlMap:{
                'SiteMessageRules': {"id":"99991","is_vue":"0","title":"消息设置","m":"site_message","c":"SiteMessageRules","a":"index"}, //消息设置
                'SiteMessage': {"id":"99992","is_vue":"0","title":"全部消息","m":"site_message","c":"SiteMessage","a":"index"}, //全部消息
            },
        }
    },
    mounted(){
        this.getMessage();
        this.getMesgInfo(this.notice_type);
    },
    methods:{
        // 获取消息系统总条数
        getMessage() {
            getMessageList().then((res) => {
                if(res.code==200){
                    this.count_num  = res.data.count;
                if(this.count_num > 0){
                    this.count_show = true;
                    if(this.count_num > 99){
                        this.count_num = '99+';
                    }
                }
            }
            })
        },
        // 获取消息信息
        getMesgInfo(type) {
            this.notice_type = type;
            var param = {};
            param.notice_type
            param.notice_type = type;
            param.page = 1;
            param.page_size = 5;
            getMessageInfo(param).then((res) => {
                if(res.code==200){
                    this.isShow = 1;
                    this.list = res.rows;
                }else{
                    this.isShow = 0;
                }
            });
        },

        // 调用祖父级方法
        forward(key,params){
            this.$parent.$parent.switchUrl(this.forwardUrlMap[key],params)
        }
    }
}
</script>

<style lang="scss" scoped>
@import url('~@/assets/css/public.css');
    .system-message-remain {
        margin-right: 20px;
        position: relative;
        float: right;
    }
    .message-number {
        position: absolute;
        bottom: 12px;
        left: 12px;
        min-width: 12px;
        height: 16px;
        color: #fff;
        line-height: 16px;
        border-radius: 8px;
        background-color: #FF0000;
        font-size: 12px;
        padding: 0 2px;
        text-align: center;
    }
    .message-con {
        width: 321px;
        box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.15);
        border-radius: 0px 0px 2px 2px;
        position: absolute;
        top: 30px;
        right: -50px;
        z-index: 100;
        margin-top: 0!important;
        overflow: hidden;
        background-color: #fff;
        max-height: 0;
        transition: max-height .4s;
    }
    .system-message-remain:hover .message-con{
        max-height : 500px;
        transition: max-height .4s;
    }
    .message-con .spico {
        display: block;
        width: 107px;
        height: 50px;
        position: relative;
        line-height: 50px;
        text-align: center;
        color: #333333;
        font-size: 14px;
    }

    .message-con .spico.on,.message-con .spico:hover{
        color: #27B8D0!important;
        font-weight:bold;
        position: relative;
        cursor: pointer;
    }

    .message-con .spico.on:after{
        content: '';
        display: block;
        width: 100%;
        height:3px;
        position: absolute;
        bottom: 0;
        background-color: #27B8D0;
    }
    .site-font-color{
        color: #27B8D0!important;
    }

    .message-con .spico i {
        margin: 20px auto;
    }

    .message_ico {
        /* padding: 0 10px 35px; */
        width: 18px;
        height: 18px;
        display: inline-block;
    }
    .system-message-remain .message_remain_ico2{
        /* background:url("../../assets/img/message.svg")no-repeat center ; */
        background-size: 18px 18px;
    }
    .message-bottom {
        line-height: 20px;
        padding: 5px 15px;
        background-color: #fff;
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
    }
    .message-bottom span {
        display: inline-block;
        line-height: 30px;
        font-size: 12px;
        color: rgba(56, 188, 211, 1);
        line-height: 23px;
        cursor: pointer;
    }
    .message-header {
        height: 50px;
        background-color: #fff;
    }
    .message-list {
        border-top: 1px solid rgba(219, 218, 218, 1);
        background-color: #fff;
    }
    .mes-list {
        padding: 5px 15px;
        background-color: #fff;
        cursor: pointer;
        position: relative;
        color: #333;
        border-bottom: 1px solid #DBDADA;
    }
    .mes-list:hover {
        background: rgba(56, 188, 211, 0.2);
    }
    .mes-list .message-title {
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
        line-height: 23px;
        max-width: 140px;
    }
    .mes-list .time {
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
        line-height: 23px;
    }
    .mes-list p {
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
        line-height: 23px;
        width: 100%;
        word-break: break-all;
        overflow: hidden
    }
</style>
