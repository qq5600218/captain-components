<template>
    <div class="cap-bus-updateTime">
      <Popover
          :disabled="!tips && !$slots.tips"
          trigger="hover"
          popper-class="cap-bus-updateTime-pop"
          :placement="placement"
          :width="popWidth"
          >
          <div>
            <slot name="tips" v-if="$slots.tips"></slot>
            <template v-else>{{tips}}</template>
          </div>
          <div class="cont" slot="reference">
            <slot v-if="this.$slots.default"/>
            <template v-else>上次更新时间：{{time}} </template>
          </div>
        </Popover>
    </div>
</template>
<script>
import { Popover } from 'element-ui'
export default {
  inheritAttrs: false,
  name: 'CapBusUpdateTime',
  components: {
    Popover
  },
  props:{
    // 提示
    time:{
      type:String,
      default:undefined
    },
    // 提示
    tips:{
      type:String,
      default:undefined
    },
    placement:{
      type:String,
      default:'top-start'
    },
    popWidth:{
      type:[Number,String],
      default:'auto'
    },
  }
}
</script>
<style lang="scss" scoped>
  @import 'src/assets/css/color.scss';
  .cap-bus-updateTime{
    font-size: 12px;
    color: $color-999;
    .cont{
      display: inline-block
    }
  }
</style>
<style lang="scss">
  .el-popover.cap-bus-updateTime-pop{
    color: #666;
    font-size: 13px;
    font-weight: 400;
    line-height: 19px;
    padding: 8px 14px;
    min-width: auto;
  }
</style>