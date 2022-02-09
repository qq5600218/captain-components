<template>
  <div class="cap-bus-basicConfig-box">
    <div @click="open">
      <slot name="btn" v-if="$slots.btn"></slot>
      <Cap-base-button v-else>{{btn}}</Cap-base-button>
    </div>
    <Dialog
      title="自定义列表"
      :visible="displayStatus"
      width="908px"
      class="cap-bus-basicConfig-dialog"
      @close="hiddenVieew"
      :close-on-click-modal="false"
    >
      <div v-loading="loading" class="cap-bus-basicConfig">
        <div class="left">
          <p class="head">
            <span class="title">字段</span>
            <Button class="allChoose" type="text" :disabled="allFieldList.length == 0" @click="allCheckek">{{allFieldList.length > 0&&allFieldList.length == checkLength? '取消全选':'全选'}}</Button>
          </p>        
          <Row v-for="(Bitem, Bkey) in tabItemData" :key="Bkey">
            <template v-if="Bitem.is_can_setting == 1">
              <div class="handlebox">
                <span> {{ Bitem.name }}</span>
                <p v-if="Bitem.child.length == Bitem.CheckedIds.length">
                  <span @click="handleCheckAllChange(Bkey, 2)">取消全选</span>
                </p>
                <p v-else>
                  <span @click="handleCheckAllChange(Bkey, 1)">全选</span>
                </p>
              </div>
              <div>
                <CheckboxGroup
                  v-model="Bitem.CheckedIds"
                  size="small"
                  @change="handleCheckLengthChange"
                >
                  <CheckboxButton
                    v-for="sitem in Bitem.child"
                    :key="sitem.key"
                    :disabled="sitem.check_can_cancel == 0"
                    :label="sitem.key"
                  >
                    {{ sitem.name }}
                  </CheckboxButton>
                </CheckboxGroup>
              </div>
            </template>
          </Row>
        </div>
        <div class="right">
            <p class="flex restore-default">
              <span>
                已选（{{checkLength}}）<Popover
                  popper-class="table-config-popover"
                  content="最多支持冻结5个字段"
                  placement="top-start"
                  trigger="hover"
              ><i slot="reference" class="el-icon-warning-outline"></i>
              </Popover>
              </span>
              <Button type="text" @click="getRight">恢复默认</Button>
            </p>
            <div class="content scrollbar">
              <span>已冻结字段</span>
              <div class="dragBox">
                  <div class="alreadyChoose fixedHeight">
                    <vuedraggable v-model="alreadyFreeze" forceFallback="true" handle=".mover"  group="list">
                      <transition-group>
                        <div v-for="(item,index) in alreadyFreeze" :key="index" class="item flex">
                            <span class="order">{{index+1}}</span>
                            <div class="sort flex">
                              <span>
                                <i class="icon-list-sort mover"></i>
                                <span class="line"></span>
                                <span class="name">{{item.name}}</span>
                              </span>
                              <div class="operate">
                                <span class="box">
                                  <Button class="jd" v-show="item.frozen_can_cancel == 1" @click="unfreeze(item)">解冻</Button>
                                </span>
                                <span class="box">
                                  <Button class="zd abled" v-show="index !== 0" @click="stick(item,1)">置顶</Button> 
                                </span>
                                <span class="box"><i v-show="item.frozen_can_cancel == 1 && item.check_can_cancel == 1" class="el-dialog__close el-icon el-icon-close" @click="clearItem(item,'alreadyFreeze')"></i></span>
                              </div>
                            </div>
                        </div>
                      </transition-group>
                    </vuedraggable>
                    <vuedraggable v-model="alreadyFreeze" forceFallback="true"  group="list" v-if="alreadyFreeze.length == 0">
                        <p class="flex noData">暂无冻结数据</p>
                    </vuedraggable>
                  </div>
                  <div class="noAlreadyChoose fixedHeight">
                    <vuedraggable v-model="alreadyChecked" forceFallback="true" handle=".mover" group="list" :move="onMove">
                      <transition-group>                    
                        <div v-for="(item,index) in alreadyChecked" :key="index" class="item flex">                           
                            <span class="order">{{alreadyFreeze.length+index+1}}</span>                         
                            <div class="sort flex">
                              <span>
                                <i class="icon-list-sort mover"></i>
                                <span class="line"></span>
                                <span class="name">{{item.name}}</span>
                              </span>
                              <div class="operate">
                                <span class="box">
                                  <Button class="abled" @click="freeze(item)" :disabled="disabled">冻结</Button>
                                </span>
                                <span class="box">
                                  <Button class="zd abled" @click="stick(item,2)" :disabled="disabled">置顶</Button>       
                                </span>                       
                                <span class="box"><i v-show="item.check_can_cancel == 1" class="el-dialog__close el-icon el-icon-close" @click="clearItem(item,'alreadyChecked')"></i></span> 
                              </div>
                            </div>
                        </div>
                      </transition-group>
                    </vuedraggable>
                    <vuedraggable v-model="alreadyChecked" forceFallback="true"  group="list" v-if="alreadyChecked.length == 0">
                        <p class="flex noData">暂无选中数据</p>
                    </vuedraggable>
                  </div>
              </div>
            </div>
        </div>
      </div>
      <div slot="footer" class="flex dialog-footer">
        <div class="switchModel flex">
          <div class="flex" v-if="switchText != ''">
              <CapBaseSwitch
              style="display: block"
              v-model="isSwitchData"
            >
            </CapBaseSwitch>
            <span class="switchModelTxt">{{switchText}}</span>
          </div>
        </div>
        <div class="btnWrap">
          <CapBaseButton @click="hiddenVieew">取 消</CapBaseButton>
          <CapBaseButton type="primary" @click="confirm">确 定</CapBaseButton>
        </div>
      </div>
    </Dialog>
  </div>
</template>
<script>
import _ from 'lodash'
import { Dialog,Row,Button,CheckboxGroup,CheckboxButton,Popover } from 'element-ui'
import { CapBaseSwitch } from '../../../packages/base/cap-switch'
import { CapBaseButton } from '../../../packages/base/cap-button'
import vuedraggable from 'vuedraggable';
export default {
  inheritAttrs: false,
  name: 'CapBusBasicConfig',
  components:{
    Dialog,
    vuedraggable,
    Row,
    CheckboxGroup,
    CheckboxButton,
    Button,
    Popover,
    CapBaseSwitch,
    CapBaseButton
  },
  props: {
    btn:{
      type: String,
      default: ''
    },
    tabItem: {
      // 初始化数据
      type: Object,
      default: () => {}
    },
    customFields:{
      type: Array,
      default: () => []
    },
    switchText: {
      type: String,
      default: ''
    },
    isSwitch: {
      type: Boolean,
      default: false
    }             
  },
  data() {
    return {
      displayStatus:false,
      allFieldList: [],
      newCheckedIds: [],
      defaultObj: {},
      defaultCustom: [],
      loading: false,
      checkLength:0,//已选数量
      alreadyFreeze:[],
      alreadyChecked:[],
      tabItemData:this.tabItem,
      custom_fieldsData:this.customFields,
      isSwitchData:this.isSwitch
    }
  },
  watch: {
     //左侧数据
    tabItemData:{    
      handler(e){
        if(Object.keys(e).length > 0){
          this.defaultObj = e && JSON.parse(JSON.stringify(e))  
          this.allFieldList = []    
          // 一进来的时候 给对象的每一个key 都添加一个用来保存id的数组
          for (const key in this.tabItemData) {
            const  isCanSetting = this.tabItemData[key].child
            const List = isCanSetting.filter(item => item.is_checked == 1).map(item => item.key)
            this.$set(this.tabItemData[key], 'CheckedIds', List)
            if(this.tabItemData[key].is_can_setting == 1){
              this.allFieldList =  this.allFieldList.concat(isCanSetting)
            }
          }
          this.handleCheckLengthChange()
        }
      },
      immediate:true
    },
    //右侧数据
    custom_fieldsData:{
      handler(e){
        if(Object.keys(e).length > 0){
          this.defaultCustom = e && JSON.parse(JSON.stringify(e))//存储右侧数据  取消关闭弹窗时恢复上次保存的数据
          let list = e && JSON.parse(JSON.stringify(e))
          this.alreadyChecked =list.filter(item => {
            const par = _.find(this.tabItemData,function(el){
              return _.find(el.child,['key',item.key])
            })
            return item.is_checked == 1 && item.is_frozen == 0 && par.is_can_setting
          }) //是否冻结 0非冻结 1 冻结
          this.alreadyFreeze =list.filter(item =>{
            const par = _.find(this.tabItemData,function(el){
              return _.find(el.child,['key',item.key])
            })
            return item.is_checked == 1 && item.is_frozen == 1 && par.is_can_setting
          })
        }
      },
      immediate:true
    }
  },
  computed:{
    disabled(){        
      return this.alreadyFreeze.length >= 5
    }
  },
  methods: {    
    open(){
      this.displayStatus = true
    },
    onMove(){
      if(this.alreadyFreeze.length >= 5) return false     
    }, 
    //清除单个item
    clearItem(item,el){
      this[el] = this[el].filter(e=>e.key !=item.key);
       this.checkLength = 0
      for (const key in this.tabItemData){
        if(this.tabItemData[key].is_can_setting != 1 || this.tabItemData[key].CheckedIds.length == 0) continue
         this.tabItemData[key].CheckedIds = this.tabItemData[key].CheckedIds.filter(e=>e !=item.key)
         this.checkLength +=this.tabItemData[key].CheckedIds.length
      }
    },
    //全选 取消全选
    allCheckek(){
      const isAll = this.allFieldList.length == this.checkLength
      if(isAll){
        for (const key in this.tabItemData) {
          let CheckedIds = this.tabItemData[key].child.map(item => {
              return item.check_can_cancel == 0 && item.key
          }).filter(item=>item)
          this.$set(this.tabItemData[key], 'CheckedIds', CheckedIds)
          this.tabItemData[key].child.map(item=>this.$set(item,'is_frozen',0))
        }
      } else {
        for (const key in this.tabItemData) {
          if(this.tabItemData[key].is_can_setting == 1){
            const List = this.tabItemData[key].child.map(item => item.key)
            this.$set(this.tabItemData[key], 'CheckedIds', List)
          }
        }
      }
      this.handleCheckLengthChange()
    },
    //冻结
    freeze(item){    
       if(this.alreadyFreeze.length >= 5) return
       this.alreadyChecked.splice(this.alreadyChecked.findIndex(e=>e.key == item.key),1)
       this.$set(item,'is_frozen',1)
       this.alreadyFreeze.push(item)
    },
    //解冻
    unfreeze(item){
      this.alreadyFreeze = this.alreadyFreeze.filter(e=>e.key !==item.key)
      this.$set(item,'is_frozen',0)
      this.alreadyChecked.push(item)
    },
    //置顶
    stick(item,type){  
      if(this.alreadyFreeze.length >= 5 && type == 2) return
      let data = type == 1?this.alreadyFreeze:this.alreadyChecked
      let index = data.findIndex(e=>e.key == item.key)
      if(type == 1) this.alreadyFreeze.splice(index,1)
      else this.alreadyChecked.splice(index,1)
      this.$set(item,'is_frozen',1)
      this.alreadyFreeze.unshift(item)
    },
    //关闭，取消
    hiddenVieew() {
      this.loading = false
      if(!this.defaultObj.length){
        this.tabItemData = JSON.parse(JSON.stringify(this.defaultObj))
        this.custom_fieldsData = JSON.parse(JSON.stringify(this.defaultCustom))
      }
      this.displayStatus = false
    },
    // 确认改变
    confirm() { 
      const {alreadyFreeze,alreadyChecked,isSwitchData} = this;       
      const alreadyFreezeKey =  alreadyFreeze.map(item=>item.key) 
      const saveList = (JSON.parse(JSON.stringify([...alreadyFreeze,...alreadyChecked]))).map(item=>item.key)  
      if (saveList.length == 0) {
        this.$message({
          type: 'warning',
          message: `请至少选择一个指标`
        })
        return
      }      
      const arr = {ItemKeys:saveList,FreezeKeys:alreadyFreezeKey}
      if(this.switchText != '') arr['isSwitch'] = isSwitchData
      this.$emit('confirm',arr)
      this.displayStatus = false
    },  
    // 全选
    handleCheckAllChange(key, type) {
      if (type == 1) { //全选
        this.tabItemData[key]['CheckedIds'] = this.tabItemData[key].child.map(item => item.key)
      } else {
        this.tabItemData[key]['CheckedIds'] = this.tabItemData[key].child.map(item => {
            return item.check_can_cancel == 0 && item.key
        }).filter(item=>item)
      }
      this.handleCheckLengthChange()
    },
    //字段发生改变的时候调用
    handleCheckLengthChange(){
        this.checkLength=0
        let allCheckedIds = []   // 保存所有被选中的ids数组
        this.alreadyChecked = [] //每次调用之前先清空

      for (const key in this.tabItemData) {
        if(this.tabItemData[key].is_can_setting ==1){ //判断是否可以设置
          const  itemChild = this.tabItemData[key].child //每个类型的子元素
          const  CheckedIds = this.tabItemData[key]['CheckedIds']  //每个类型被选中的keys数组
          allCheckedIds = allCheckedIds.concat(CheckedIds)  // 保存所有被选中的ids
          let List= itemChild.filter(item=>CheckedIds.includes(item.key))  //过滤出被选中的字段
          this.alreadyChecked =  this.alreadyChecked.concat(List) //把选中的对象加入到右边已选行列
        }
      }
      if(allCheckedIds.length == 0) this.alreadyFreeze = []  //判断是否有选中的ids,没有就清空冻结字段
      this.checkLength = allCheckedIds.length
      const alreadyFreezeKeys = this.alreadyFreeze.map(item=>item.key) //获取被冻结字段的keys
      this.alreadyChecked = this.alreadyChecked.filter(item=>!alreadyFreezeKeys.includes(item.key)) //判断已选中的对象是否在已冻结，如果冻结就 过虑掉
      this.alreadyFreeze  = this.alreadyFreeze.filter(item=>allCheckedIds.includes(item.key)) //在选中的数组里判断有没有冻结对象
    },
    // 恢复默认
    getRight() {
       this.checkLength = 0
       let defaultList = [] //默认字段
       this.alreadyChecked = [] //每次调用之前先清空
       this.alreadyFreeze = []
        for (const key in this.tabItemData) {
          let List = this.tabItemData[key].child
            .filter(item => item.is_default == 1)
            .map(item => item.key)
          this.$set(this.tabItemData[key], 'CheckedIds', List)
          defaultList = defaultList.concat(this.tabItemData[key].child.filter(item => item.is_default == 1))//判断是否默认字段
        }
        this.alreadyChecked = defaultList.filter(item => item.is_default_frozen !== 1) //是否冻结 0非冻结 1 冻结
        this.alreadyFreeze = defaultList.filter(item => item.is_default_frozen == 1)  //从默认字段中筛选出是否冻结
        this.checkLength = defaultList.length
      }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/assets/css/color.scss';
.cap-bus-basicConfig-box{
  display: inline-block;
  p{
    margin:0;
    padding:0;
  } 
  .flex{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cap-bus-basicConfig-dialog{
    .dialog-footer {
        .btnWrap{
          button{
            width: 100px;
            height: 30px;
            line-height: 10px;
            &+button{
              margin-left: 6px;
            }
          }
        }
      .CompactModelTxt{
        color: #666;
        margin-left: 5px;
      }
      .isSwitch >>> {
        .el-switch{
          top: -2px;
        }
      }
    }
    /deep/ .el-dialog__header {
      padding: 25px 20px 30px;
      border: none;
      .el-dialog__headerbtn{
        top: 29px;
      }
      .el-icon-close:before{
        font-weight: 600;
        color: $color-999;
        font-size: 16px;
      }
    }
    /deep/ .el-dialog__title {
      color: $color-666;
      margin-right: 25px;
      font-size: 16px;
      font-weight: bold;
    }
    /deep/ .el-dialog__footer {
      padding: 24px 20px 20px;
    }
    >>> .el-dialog__body {
      overflow: auto;
      height: 447px;
      border-radius: 4px;
      padding: 0 20px !important;
    }
    /deep/.el-dialog {
      margin-top: 3vh !important;
      height: 600px;
      max-height: inherit !important;
    }
    .switchModelTxt{
      font-size: 12px;
      margin-left: 10px;
      margin-top: 2px;
      color: $color-666;
    }
  }
  .cap-bus-basicConfig{
    display: flex;
    .el-button--text{
      color: $blue;
    }
    .left{
      width: 524px;
      flex-shrink: 0;
      font-size: 12px;
      color: #999;
      padding-right: 6px;
      .head{
        display: flex;
        justify-content: space-between;
        margin-bottom: 14px;
        .allChoose{
          color: $color-666;
          font-size: 12px;
          padding: 0;
        }
      }
      .el-row{
        margin-bottom: 14px;
      }
    }
    .left,.right{
      height: 444px;
      overflow: auto;
    }
    .right{
      border: 1px solid;
      margin-left: 14px;
      background: #F5F5F5;
      border: 1px solid $color-e9e9e9;
      border-radius: 2px;
      font-size: 12px;
      flex-grow: 1;
      .restore-default{
        height: 30px;
        border-bottom: 1px solid $color-e9e9e9;
        padding: 0 12px;
        button{
          padding: 0;
          font-size: 12px;
        }
        .tishi{
          margin-left: -7px;
          color: $color-999;
          font-size: 14px;         
          position: relative;
          top: 1px;
        }
      }
      .content{
        padding: 10px 3px 12px 12px;
        // height: 412px;
        max-height: calc(100% - 55px);
        overflow: auto;
        >span{
          color: $color-999;
          margin-bottom: 5px;
          display: inline-block;
          }
        .icon-list-sort{
          display: inline-block;
          width: 16px;
          height: 14px;
          background: url('../../../assets/images/icon-listsort.png') 0 0 no-repeat;
          background-size: 100%;
          &.mover{
            cursor: move;
            vertical-align: middle;
          }
        }
        .icon-guanbi:before{
          color: $color-999;
          font-size: 12px;
        }
        .dragBox{
          .item{
            justify-content: flex-start;
            .order{
              display: inline-block;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: #fff;
              text-align: center;
              line-height: 30px;
              border: 1px solid $color-e9e9e9;
              flex-shrink: 0;
              margin-right: 4px;
            }
            .sort{
              width: 100%;
              background: $color-fff;
              height: 30px;
              margin-bottom: 4px;
              border-radius: 2px;
              padding: 0 10px 0 8px;
              >span{
                color: $color-333;
              }
              .abled{
                color: $blue;
                padding: 0;
                font-size: 12px;
                border: none; 
              }
              .zd{
                margin: 0 10px 0 5px;
              }
              .jd{
                color: $color-666;
                border: none;
                padding: 0;
                font-size: 12px;
              }
            }
          }
          .el-icon-close{
            font-size: 15px;
            color: $color-999;
            line-height: 17px;
            cursor: pointer;
          }
          .line{
            width: 1px;
            height: 17px;
            margin: 0 6px 0 6px;
            background: $color-e9e9e9;
            display: inline-block;
            align-self: center;
            vertical-align: middle;
          }
        }
        .fixedHeight{
          min-height: 20px;
        }
        .noAlreadyChoose {
          margin-top: 5px;
          border-top: 1px solid $color-d9d9d9;
          padding-top: 12px;
        }
      }
    }
    >>> .el-switch{
      width: 26px;
      height: 14px;
      line-height:14px;
      .el-switch__core{
        border-radius: 2px;
        width: 26px !important;
        height: 14px;
        line-height:14px;
        &:after{
          border-radius: 2px;
          width: 10px !important;
          height: 10px !important;
        }
      }
      &.is-checked{
        .el-switch__core:after{
          margin-left: -11px;
        }
      }
    }
    /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
      color: $color-333;
    }
    .handlebox {
      width: 100%;
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      p {
        span {
          color: $blue;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
    >>> .el-checkbox-group {
      .el-checkbox-button {
        display: inline-block;
        position: relative;
        .el-checkbox-button__inner {
          min-width: 124px;
          padding: 9px 6px;
          height: 30px;
          margin: 0 4px 4px 0;
          border: 1px solid #dcdfe6;
          border-radius: 0 !important;
          color: $color-666;
          box-sizing: border-box;
          font-size: 12px;
          line-height: 12px;
        }
        &:last-child{
          .el-checkbox-button__inner{
            margin-right: 0;
          }
        }
      }
      .el-checkbox-button.is-checked .el-checkbox-button__inner {
        border: 1px solid $blue;
        background: url('../../../assets/images/icon-checked.png') no-repeat $color-fff;
        color: $blue;
        box-shadow: none;
        transition: none;
        background-position: right bottom;
      }
    }
    .noData{
      justify-content: center;
      height: 100%;
    }
    .name{
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 120px;
      white-space: nowrap;
      vertical-align: middle;
    }
    .operate{
      display: flex;
      justify-content: space-between;
      .box{
        display: inline-block;
        width: 25px;
        &:last-child{
          text-align: right;
        }
      }

    }
  }
}
</style>
<style>
.table-config-popover{
  font-size: 12px;
  padding: 10px;
  width:120px;
  min-width: auto;
}
</style>
