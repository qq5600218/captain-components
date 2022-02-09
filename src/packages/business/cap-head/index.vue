<template>
    <div class="cap-bus-head">
      <div class="box">
        <Popover
          :disabled="!tips && !$slots.tips"
          placement="top-start"
          width="200"
          trigger="hover"
          popper-class="cap-bus-head-pop"
          >
          <div>
            <slot name="tips" v-if="$slots.tips"></slot>
            <template v-else>{{tips}}</template>
          </div>
          <div class="title" slot="reference">
            <slot name="title" v-if="$slots.title"></slot>
            <span class="tit" v-else>{{title}}</span>
            <i v-if="tipsIcon" class="el-icon-warning-outline"></i>
          </div>
        </Popover>
        <div class="word-box" v-if="$slots.operArea || operName" @click="operClick">
          <slot v-if="$slots.operArea" name="operArea"></slot>
          <template v-else>
            <i v-if="operIcon" :class="operIcon"></i>
            <span class="word-text">{{operName}}</span>
          </template>
        </div>
        <div class="desc">
          <slot name="desc" v-if="$slots.desc"></slot>
          <template v-else>{{desc}}</template>
        </div>
      </div>
      <div class="right">
        <slot name="rightCont" v-if="$slots.rightCont"></slot>
        <template v-else>{{rightCont}}</template>
      </div>
    </div>
</template>
<script>
import { Popover } from 'element-ui'
export default {
  inheritAttrs: false,
  name: 'CapBusHead',
  components: {
    Popover
  },
  data(){
    return {

    }
  },
  props:{
    // 标题
    title:{
      type:String,
      default:undefined
    },
    // 提示
    tips:{
      type:String,
      default:undefined
    },
    // 是否需要提示图标
    tipsIcon:{
      type:Boolean,
      default:false
    },
    // 操作区图标
    operIcon:{
      type:String,
      default:undefined
    },
    // 操作区名称
    operName:{
      type:String,
      default:undefined
    },
    // 描述
    desc:{
      type:String,
      default:undefined
    },
    // 右侧信息
    rightCont:{
      type:String,
      default:undefined
    }
  },
  methods:{
    operClick(){
      this.$emit('oper')
    }
  }
}
</script>
<style lang="scss" scoped>
  @import 'src/assets/css/color.scss';
  .cap-bus-head{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
    .box{
      display:flex;
      justify-content:center; 
      align-items: center;
      .title{
        font-size: 16px;
        font-weight: 400;
        color: #666666;
        line-height: 20px;
        margin-right: 2px;
      }
      .word-box{
        color: $blue;
        margin-left: 4px;
        line-height: 20px;
        font-size: 12px;
        cursor: pointer;
        &:hover{
          color: $blue-hover;
        }
      }
      .desc{
        padding-left: 10px;
        margin-left: 10px;
        font-size: 12px;
        color: #999;
        border-left: 1px solid #D9D9D9;
      }
      .el-icon-warning-outline{
        font-size: 12px;
        margin-left: 0;
        position: relative;
        top:-1px;
        // vertical-align: middle;
      }
    }
    .right{
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
</style>
<style lang="scss">
  .el-popover.cap-bus-head-pop{
    color: #666;
    font-size: 13px;
    font-weight: 400;
    line-height: 19px;
    padding: 8px 14px;
  }
</style>