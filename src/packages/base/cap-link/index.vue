<template>
    <Link v-bind="$attrs" v-on="$listeners" class="cap-base-link">
      <slot/>
    </Link>
</template>
<script>
import { Link } from 'element-ui'
export default {
  inheritAttrs: false,
  name: 'CapBaseLink',
  components: {
    Link
  }
}
</script>
<style lang="scss" scoped>
  @import 'src/assets/css/color.scss';
  .cap-base-link{
    font-size:12px;
    text-decoration: none !important;
    &.el-link--default:not(.is-disabled):hover,
    &.el-link--primary{
      color: $blue !important;
    }
    &.is-underline:not(.is-disabled):hover:after{
      border-color: $blue 
    }
    &.el-link--primary:not(.is-disabled):hover{
      color: $blue-hover !important;
    }
    &.el-link--primary:not(.is-disabled):hover:after{
      border-color: $blue-hover;
    }
    &.el-link--warning{
      color: $yellow !important;
    }
    &.el-link--warning:not(.is-disabled):hover{
      color: $yellow-hover !important;
    }
    &.el-link--warning:not(.is-disabled):hover:after{
      border-color: $yellow-hover;
    }
    &.el-link--danger{
      color: $red !important;
    }
    &.el-link--danger:not(.is-disabled):hover{
      color: $red-hover !important;
    }
    &.el-link--danger:not(.is-disabled):hover:after{
      border-color: $red-hover;
    }
    &.el-link--default.is-disabled{
      color: $color-666 !important;
    }
    &.is-disabled{
      opacity: .6;
    }
  }
</style>