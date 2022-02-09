<template>
<div class="cap-base-datePicker" :class="isDisabled ? 'is-disabled':''">
  <slot name="prepend"></slot>
  <components 
    :title="title"
    @mouseover.native="hoverEvent(true)"
    @mouseout.native="hoverEvent(false)"
    v-bind="$attrs" 
    v-on="$listenser" 
    is="rangePicker" 
    :time.sync="val" 
    :popper-class="popperClass" 
    :id="id" 
    :date-type.sync="dateTypeStr"
    :editable="editable"
    :clearable="clearable"
    :placeholder="placeholder"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :unlink-panels="unlinkPanels"
    :limit="limit"
    :isConditional="isConditional"
  /> 
</div>
</template>
<script>
let id = 0
import _ from 'lodash'
import rangePicker from './components/datePicker.vue'
export default {
  inheritAttrs: false,
  name: 'CapBaseDatePicker',
  components: {
    rangePicker
  },
  data() {
    return {
      title:'',
      hover:false,
      dateTypeStr: this.dateType,
      val: this.value,
      id:id++,
    }
  },
  props: {
    // 输入框值
    value: {
      type: [String,Array,Date],
      default: ''
    },
    dateType:{
      type: String,
      default: 'date'
    },
    limit:{
      type: Array,
      default: ()=>[]
    },
    isConditional:{
      type: Boolean,
      default: false
    }
  },
  computed:{
    isDisabled(){
      if(this.$attrs.hasOwnProperty('disabled')){
        if(this.$attrs['disabled'].toString() == 'false'){
          return false
        }else{
          return true
        }
      }
      return false
    },
    // 是否可编辑
    editable(){
      if(this.$attrs['editable'] == true || this.$attrs['editable'] == '') return true
      return false
    },
    // 是否可清除
    clearable(){
      if(this.$attrs.hasOwnProperty('clearable') && this.$attrs['clearable'].toString() == 'false') return false
      return true
    },
    placeholder(){
      if(this.$attrs['placeholder'] && this.$attrs['placeholder'] != '') return this.$attrs['placeholder']
      return '请输入日期'
    },
    startPlaceholder(){
      if(this.$attrs['start-placeholder'] && this.$attrs['start-placeholder'] != '') return this.$attrs['start-placeholder']
      return '开始时间'
    },
    endPlaceholder(){
      if(this.$attrs['end-placeholder'] && this.$attrs['end-placeholder'] != '') return this.$attrs['end-placeholder']
      return '结束时间'
    },
    unlinkPanels(){
      if(this.$attrs['unlink-panels'] == undefined || this.$attrs['unlink-panels'] == true) return true
      return false
    },
    popperClass(){
      let clas = `cap-base-datePicker-dropdown dropdown-${this.id} `
      if(this.$attrs['popper-class']) clas += this.$attrs['popper-class']
      return clas
    },
    $listenser() {
      const _this = this
      return Object.assign({}, this.$listeners, {
        change: (value) => {
          this.$emit('change',value)
        },
      });
    }
  },
  watch: {
    value: {
      handler: function(data) {
        this.val = data
      }
    },
    hover: {
      handler: function(bol) {
        const date = this.$el.querySelector('.el-icon-date') || this.$el.querySelector('.el-icon-time')
        if(date.style.display == 'none'){
          date.style.display = 'block'
        }
        const el = this.$children.find(item => item.hasOwnProperty('timeVal'))
        if(el.timeVal && el.timeVal != '' && bol){
          date.style.display = 'none'
        }
      }
    }
  },
  methods:{
    hoverEvent(bol){
      if(this.isDisabled || !this.clearable) return
      this.hover = bol
      if(this.dateTypeStr == 'dates' && this.value && this.value != ''){
        if(this.value.length > 2){
          if(bol){
            this.title = this.val.join('，')
            // if(!document.querySelector('.cap-base-datePicker-dates-pop')){
            //   var node=document.createElement("div");
            //   node.className = 'cap-base-datePicker-dates-pop'
            //   console.log(this.val.join('<br>'))
            //   node.innerHTML = this.val.join('<br>') +'<div class="popper__arrow"></div>'
            //   this.$el.appendChild(node);
            // }
          }else{
            this.title = ''
            // document.querySelector('.cap-base-datePicker-dates-pop').remove()
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
  @import 'src/assets/css/color.scss';
  .cap-base-datePicker{
    display: inline-block;
    border: 1px solid $color-dcdfe6;
    color: #606266;
    overflow: hidden;
    transition:all .2s ease-in 0s;
    .el-date-editor--daterange.el-input, 
    .el-date-editor--daterange.el-input__inner, 
    .el-date-editor--timerange.el-input, 
    .el-date-editor--timerange.el-input__inner,
    .el-date-editor--monthrange.el-input, 
    .el-date-editor--monthrange.el-input__inner{
      width: 220px;
    }
    .el-date-editor--datetimerange.el-input,
    .el-date-editor--datetimerange.el-input__inner{
      width: 290px;
      .el-range-input{
        width: 45%;
      }
    }
    .el-date-editor{
      .el-range-separator{
        line-height: 20px;
      }
    }
    .el-range-input{
      font-size: 12px;
    }
    .el-input__prefix,
    .el-input__suffix{
      left: inherit;
      right: 3px;
    }
    .el-input__icon,
    .el-input__inner{
      font-size: 12px;
      height: 28px;
      line-height: 28px;
      border: none;
      display: block;
    }
    .el-input__inner{
      padding-left: 10px;
      padding-right: 25px;
    }
    .el-date-editor .el-range-separator{
      line-height: 20px;
      font-size: 12px;
    }
    .el-icon-circle-close:before {
        content: "\e6db";
    }
    .el-input__icon{
      &.el-range__icon,
      &.el-range__close-icon{
        position: absolute;
        right: 3px;
      }
    }
    &.is-disabled{
      border-color: $color-e9e9e9;
      background:$color-f0f0f0;
      .el-input.is-disabled .el-input__inner{
        background:inherit;
        color:$color-bfbfbf;
      }
    }
    &:hover{
      border-color: $blue;
      &.is-disabled{
        border-color: $color-e9e9e9;
      }
    }
  }
  .cap-base-datePicker-dropdown{
    .el-input__inner:focus{
      border-color: $blue;
    }
    .el-date-picker__header-label.active, 
    .el-date-picker__header-label:hover,
    .el-picker-panel__icon-btn:hover,
    .el-button--text,
    .el-time-panel__btn.confirm{
      color:  $blue;
    }
    .el-button--default:hover,
    .el-button.is-active,
    .el-button.is-plain:active{
      border-color: $blue;
      color: $blue;
    }
    .el-date-table {
      th{
        border: none;
      }
      td{
        padding: 2px 0;
        // span{
        //   border-radius: 0
        // }
        &.today span{
          font-weight: 700;
          color: $blue;
        }
        &.today.end-date span,
        &.today.start-date span,
        &.today.selected span,
        &.today.current span{
          color: $color-fff;
        }
        &.available:hover {
          color:  $blue;
        }
        &.selected span,
        &.end-date span, 
        &.start-date span,
        &.current:not(.disabled) span{
          background-color: $blue;
        }
      }
      tr{
        &:nth-child(2n){
          background: inherit;
        }
      }
    }
    .el-month-table{
      tr{
        &:nth-child(2n){
          background-color: inherit;
        }
      }
      td{
        padding: 6px 0;
        div{
          height: 42px;
          padding: 3px 0;
        }
        .cell{
          width: 36px;
        }
        &.current .cell{
          color: $color-fff;
          background-color: $blue;
          width:50px;
        }
        &.end-date .cell,
        &.start-date .cell{
          color: $color-fff;
          background-color: $blue;
        }
        &:not(.current):not(.end-date):not(.start-date) .cell:hover,
        &:not(.current):not(.end-date):not(.start-date).today .cell{
          color: $blue;
          background-color: inherit;
        }
      }
    }
    .el-year-table{  
      tr{
        &:nth-child(2n){
          background-color: inherit;
        }
      }
      td{
        &.current .cell{
          color: $color-fff;
          background-color: $blue;
        }
        &:not(.current) .cell:hover,
        &:not(.current).today .cell{
          color: $blue;
        }
      }
    }
    .el-date-picker__header{
      margin: 0;
      padding: 12px;
      border-bottom: 1px solid  #EBEEF5;
    }
    .el-picker-panel__shortcut:hover{
      color: $color-666;
      background-color: $color-f5f5f5;
    }
    .el-picker-panel__shortcut.active{
      background-color: $color-fff;
      color: $blue;
    }
    &.has-time{
      .el-picker-panel__sidebar{
        height: calc(100% - 40px);
      }
    }
    .el-picker-panel__sidebar{
      .el-picker-panel__shortcut{
        font-size: 12px;
        line-height: 24px;
      }
      &::-webkit-scrollbar{
        width: 6px;
        height: 4px;
      }
      &::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
        border-radius: 4px;
        background: $color-b7b7b7;
      }
      &::-webkit-scrollbar-track{/*滚动条里面轨道*/
        border-radius: 4px;
        background: $color-e4e7ed;
      }
    }
    &.el-date-picker{
      width: auto;
    }
    .has-sidebar{
      &.el-date-range-picker{
        width: 756px;
      }
      &:not(.el-date-range-picker){
        width:auto;
      }
      .el-picker-panel__sidebar:not(.dateWrap){
        left: 111px;
      }
      &.el-picker-panel__body-wrapper.single{
        .el-picker-panel__body{
          margin-left: 220px;
        }
      }
    }
  }
  .cap-base-datePicker-dates-pop{
      position: absolute;
      left: 0;
      top: -60px;
      background: #FFF;
      border: 1px solid #EBEEF5;
      padding: 12px;
      z-index: 2000;
      color: #606266;
      line-height: 1.4;
      text-align: justify;
      font-size: 14px;
      -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      word-break: break-all;
      .popper__arrow,
      .popper__arrow::after{
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
      }
      .popper__arrow {
        bottom: -12px;
        left: 32.6953px;
        margin-right: 3px;
        border-top-color: #EBEEF5;
        border-bottom-width: 0;
        border-width: 6px;
        -webkit-filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03));
        filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03));
      }
      .popper__arrow::after {
          content: " ";
          border-width: 6px;
          bottom: 1px;
          margin-left: -6px;
          border-top-color: #FFF;
          border-bottom-width: 0;
      }
   }
</style>