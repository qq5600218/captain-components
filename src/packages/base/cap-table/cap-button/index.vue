<template>
    <Button v-bind="$attrs" v-on="$listeners" class="cap-base-button" :class="[ isHref? 'link':'' , myColor]">
      <a v-if="isHref"  :href="href != '' ? href:'javascript:;'" :target="target">
        <slot/>
      </a>
      <template v-else>
        <slot/>
      </template>
    </Button>
</template>
<script>
import { Button } from 'element-ui'
export default {
  inheritAttrs: false,
  name: 'CapBaseButton',
  props:{
    color:{
      type:String,
      default:''
    },
    href:{
      type:String,
      default:undefined
    },
    target:{
      type:String,
      default:''
    }
  },
  components: {
    Button
  },
  computed:{
    isHref(){
      return this.href || this.href == ''
    },
    myColor(){
      if(this.color){
        return `button-${this.color}`
      }else{
        return ''
      }
    },
  },
}
</script>
<style lang="scss" scoped>
  @import 'src/assets/css/color.scss';
  .cap-base-button{
    font-size:12px;
    height: 30px;
    padding: 0 18px;
    &.link{
      padding: 0;
    }
    a{
      color: $color-fff;
      display: inline-block;
      padding: 8px 18px;
      border-radius: 4px;
    }
    a:hover{
      text-decoration: none !important;
    }
    &.el-button--default.el-button--small{
      height: 24px;
    }
    &.el-button--default.el-button--small.link a{
      padding: 5px 18px;
    }
    &.el-button--default a{
      color: $color-333;
    }
    &.el-button--default:hover,
    &.el-button--default:active,
    &.el-button--default:focus,
    &.el-button--default:hover a{
      color: $blue;
      border-color: $blue;
      background-color: $color-fff;
    }
    &.el-button--primary{
      background-color: $blue;
      border-color: $blue;
    }
    &.el-button--primary:hover{
      color: $color-fff;
      background-color: $blue-hover;
      border-color: $blue-hover;
    }
    &.el-button--warning{
      color: $color-fff;
      background-color: $red;
      border-color: $red;
    }
    &.el-button--warning:hover{
      color: $color-fff;
      background-color: $red-hover;
      border-color: $red-hover;
    }
    &.el-button--warning.is-plain{
      color: $red;
      background-color: $color-fff;
      border-color: $red;
    }
    &.el-button--warning.is-plain:hover{
      color: $red-hover;
      background-color: $color-fff;
      border-color: $red-hover;
    }
    &.el-button--default.is-disabled, 
    &.el-button--default.is-disabled:active, 
    &.el-button--default.is-disabled:focus, 
    &.el-button--default.is-disabled:hover{
      background-color: $color-fff;
      border-color: $color-eee;
      color: $color-b7b7b7 !important;
    }
    &.is-disabled, 
    &.is-disabled:active, 
    &.is-disabled:focus, 
    &.is-disabled:hover{
      background-color: $color-eee;
      border-color: $color-eee;
      color: $color-b7b7b7 !important;
    }
  }
</style>