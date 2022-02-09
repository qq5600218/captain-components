<template>
    <Button v-bind="$attrs" v-on="$listeners" class="cap-base-button" :class="[ isHref? 'link':'' , myColor,ghost ? 'ghost':'']">
      <a v-if="isHref"  :href="href != '' ? href:'javascript:;'" :target="target" :style="style">
        <slot/>
      </a>
      <template v-else>
        <slot/>
      </template>
    </Button>
</template>
<script>
import { Button } from 'element-ui'
import { getStyle } from '../../../utils/index'
export default {
  inheritAttrs: false,
  name: 'CapBaseButton',
  data(){
    return {
      style:undefined
    }
  },
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
    },
    ghost:{
      type:Boolean,
      default:false
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
  created(){
    if(this.href){
      this.style = getStyle(this,['border-radius','borderRadius','padding','padding-left','padding-right','paddingLeft','paddingRight','padding-top','padding-bottom','paddingTop','paddingBottom'],['border-radius'])
    }
  }
}
</script>
<style lang="scss" scoped>
  @import 'src/assets/css/color.scss';
  .cap-base-button{
    font-size:12px;
    padding: 8px 14px;
    border-radius: 0;
    font-weight: 400;
    &.link{
      padding: 0;
    }
    a{
      color: $color-fff;
      display: inline-block;
      padding: 8px 14px;
      height: 100%;
      border-radius: 0;
      font-weight: 400;
    }
    a:hover{
      text-decoration: none !important;
    }
    &.el-button--default{
      border-color: $color-d4d4d4;
      &.el-button--small{
        padding: 5px 14px;
        &.link{
          a{
            padding: 5px 14px;
          }
        }
      }
      a{
        color: $color-333;
      }
      &:hover,
      &:active,
      &:focus,
      &:hover a{
        color: $blue;
        border-color: $blue;
        background-color: $color-fff;
      }
      &.ghost,
      &.ghost:hover,
      &.ghost:active,
      &.ghost:focus,
      &.ghost:hover a{
        background-color: inherit !important;
      }
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
    &.is-plain.ghost,
    &.is-plain.ghost:hover,
    &.is-plain.ghost:active,
    &.is-plain.ghost:focus,
    &.is-plain.ghost:hover a{
      background-color: inherit !important;
    }
    &.is-plain.ghost.is-disabled, 
    &.is-plain.ghost.is-disabled:active, 
    &.is-plain.ghost.is-disabled:focus, 
    &.is-plain.ghost.is-disabled:hover{
      background-color: $color-fff;
      border-color: $color-e9e9e9;
      color: $color-bfbfbf !important;
    }
    &.is-disabled, 
    &.is-disabled:active, 
    &.is-disabled:focus, 
    &.is-disabled:hover{
      background-color: $color-f0f0f0;
      border-color: $color-eee;
      color: $color-bfbfbf !important;
    }
    
  }
</style>