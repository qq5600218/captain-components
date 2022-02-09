<template>
    <MySwitch
      v-bind="$attrs" 
      v-on="$listeners"
      class="cap-base-switch"
      :width="width"
      :class="typeClass">
    </MySwitch>
</template>
<script>
import { Switch } from 'element-ui'
export default {
  inheritAttrs: false,
  name: 'CapBaseSwitch',
  props:{
    type:{
      type:[String,Number],
      default:1
    }
  },
  components: {
    MySwitch: Switch
  },
  computed:{
    width(){
      if(this.$attrs && Number(this.$attrs.width)){
        return Number(this.$attrs.width)
      }
      return 26
    },
    typeClass(){
      if(this.type == 1 || !this.type){
        return 'switch-square'
      }else if(this.type == 2){
        return 'switch-radius'
      }else {
        return ''
      }
    }
  },
}
</script>
<style lang="scss" scoped>
  @import 'src/assets/css/color.scss';
  .cap-base-switch{
    line-height: 14px;
    height: 14px;
    >>> .el-switch__core{
      border-color: $color-b7b7b7;
      background-color: $color-b7b7b7;
      height: 14px;
    }
    >>> .el-switch__core:after{
      width: 10px;
      height: 10px;
    }
    &.is-checked >>> .el-switch__core,
    &.is-checked.is-disabled >>> .el-switch__core{
      border-color: $blue;
      background-color: $blue;
    }
    >>> .el-switch__label.is-active{
       color:$blue;
    }
    &.is-disabled{
      opacity: 1;
    }
    &.is-disabled >>> .el-switch__core{
      border-color: $color-e9e9e9;
      background-color:$color-e9e9e9;
    }
    &.is-checked.is-disabled >>> .el-switch__core{
      opacity: .6
    }
    &.switch-square >>> .el-switch__core{
        border-radius: 0;
    }
    &.switch-radius >>> .el-switch__core{
        border-radius: 2px;
    }
    &.is-checked >>> .el-switch__core::after{
       margin-left: -11px;
    }
    &.switch-square >>> .el-switch__core:after,
    &.switch-radius >>> .el-switch__core:after{
      border-radius: 0;
    }
    >>> .el-switch__label{
      height: 16px;
    }
    >>> .el-switch__label *{
      font-size: 12px;
    }
  }
</style>