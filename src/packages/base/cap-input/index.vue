<template>
  <Input v-model="val" v-bind="$attrs" v-on="$listeners" @input="input" class="cap-base-input" :class="linear ? 'cap-base-input-linear':'' " >
    <slot name="suffix" slot="suffix"></slot>
    <slot name="prefix" slot="prefix"></slot>
    <slot name="prepend" slot="prepend"></slot>
    <slot name="append" slot="append"></slot>
  </Input>
</template>
<script>
import { Input } from 'element-ui'
import { getStyle , setStyle } from '../../../utils/index'
export default {
  inheritAttrs: false,
  name: 'CapBaseInput',
  inject: ['rangeCompare'] ,
  data(){
    return{
      val: this.value,
      style: undefined
    }
  },
  watch: {
    value: {
      handler: function(data) {
        this.val = data
      }
    }
  },
  props: {
    // 输入框值
    value: {
      type: [String,Number],
      default: ''
    },
    // 线性类型
    linear: {
      type: Boolean,
      default: false
    },
    // 是否范围输入
    range:{
      type: Boolean,
      default: false
    },
    // 限制小数位数
    limit:{
      type: Number,
      default: -1
    },
  },
  components: {
    Input
  },
  created(){
    this.style = getStyle(this,['border-radius','borderRadius'])
  },
  mounted(){
    setStyle(this.$el.querySelector('.el-input__inner'),this.style)
  },
  methods:{
    input() {
      typeof this.rangeCompare == 'function' && this.rangeCompare(this._uid,this.val)
      if(this.$attrs.type == 'number'){
        if(this.limit > 0){
          var reg = new RegExp("^\\d*(\\.?\\d{0," + this.limit + "})", "g");
          this.val = (this.val.match(reg)[0]) || null
        }else{
          this.val = this.val.replace('.','')
        }
      }
      this.$emit('update:value', this.val)
    }
  },
}
</script>
<style lang="scss" scoped>
  @import 'src/assets/css/color.scss';
  .cap-base-input{
    >>> .el-input__inner{
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      font-size: 12px;
      border-radius:0;
      border-color: $color-d9d9d9;
      &[type=number] {
        padding-right: 0;
      }
    }
    &.el-input--small{
      >>> .el-input__inner{
        height: 24px;
        line-height: 24px;
        padding: 0 10px;
        font-size: 12px;
        border-radius: 2px;
        
      }
      >>> .el-input__icon{
        line-height: 24px;
      }
    }
    &.is-active >>> .el-input__inner, 
    >>> .el-textarea__inner:focus,
    >>> .el-input__inner:focus {
      border-color: $blue;
    }
    &.is-disabled >>> .el-input__inner{
      background-color: $color-f0f0f0;
      border-color: $color-e9e9e9;
      color: $color-b7b7b7;
    }
    >>> .el-input__icon{
      line-height: 30px;
    }
    >>> .el-icon-circle-close:before{
        content: "\e6db";
    }
    &.el-input--suffix >>> .el-input__inner {
        padding-right: 30px;
    }
    &.el-input--prefix >>> .el-input__inner {
        padding-left: 30px;
    }
    >>> .el-input-group__append, 
    >>> .el-input-group__prepend{
      background-color: $color-eee;
      padding: 0 15px;
      font-size: 12px;
    }
  }
  .cap-base-input-linear{
    >>> .el-input__inner{
      border-radius: 0;
      border-top:none;
      border-left:none;
      border-right:none;
      background: inherit;
      padding: 0;
    }
    &.is-disabled >>> .el-input__inner{
      background-color: inherit;
    }
    >>> .el-input-group__append, 
    >>> .el-input-group__prepend{
      background-color: inherit;
      padding: 0 15px;
      border-top:none;
      border-left:none;
      border-right:none;
      border-radius: 0;
    }
    >>> .el-input-group__append{
      padding-right: 0;
    }
    >>> .el-input-group__prepend{
      padding-left: 0;
    }
  }
</style>