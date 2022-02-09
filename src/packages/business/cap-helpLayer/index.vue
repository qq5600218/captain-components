<template>
  <div class="cap-bus-helpLayer" :class="[ $slots.default && Object.keys(this.pos).length == 0 ? 'cap-bus-helpLayer-relative':'']">
    <span class="helpLayer-content" v-if="$slots.default">
      <slot/>
    </span>
    <i class="layer" v-if="isMask"></i> 
    <div class="cap-bus-helpLayer-pop" :style="myPos" v-if="show">
       <i class="sym" :style="{left:symLeft+'px'}"></i>
       <img :src="img"/> 
       <div class="main">    
        <slot name="title" v-if="$slots.title"></slot>
        <p v-else class="tit-box" :title="title"><i class="prefix" :class="prefixIcon" v-if="prefixIcon"></i><span class="tit">{{title}}</span><i class="suffix" :class="[suffixIcon == '' ? 'icon-new':'',suffixIcon&& suffixIcon != '' ?  suffixIcon:'']"></i></p>
        <slot name="msg" v-if="$slots.msg"></slot>
        <div v-else class="msg">{{msg}}</div>
        <div class="btn-box" v-if="isBtn">
          <CapBaseLink :underline="false" style="color:#767676;" @click="close(1)">不再显示</CapBaseLink> &nbsp; 
          <CapBaseLink :underline="false" type="primary" @click="close(2)">下次再看</CapBaseLink>
        </div>
       </div>    
    </div>
  </div>
</template>
<script>
import { CapBaseLink } from '../../../packages/base/cap-link'
export default {
  inheritAttrs: false,
  name: 'CapBusHelpLayer',
  components: {
    CapBaseLink
  },
  data(){
    return {
      show:this.isShow,
      symLeft:20,
      myPos:{
        "position": "absolute",
        "right":'',
        "left":'',
        "top":'',
        "bottom":''
      }
    }
  },
  props:{
    isShow:{
      type:Boolean,
      default:true
    },
    img:{
      type:String,
      default:undefined
    },
    title:{
      type:String,
      default:undefined
    },
    msg:{
      type:String,
      default:undefined
    },
    pos:{
      type:Object,
      default() {
        return {}
      }
    },
    isMask:{
      type:Boolean,
      default:false
    },
    isBtn:{
      type:Boolean,
      default:true
    },
    target:{
      type:String,
      default:undefined
    },
    appendToBody:{
      type:Boolean,
      default:false
    },
    symPos:{
      type:String,
      default:'left'
    },
    prefixIcon:{
      type:String,
      default:undefined
    },
    suffixIcon:{
      type:String,
      default:undefined
    }
  },
  watch:{
    isShow: {
      handler(val) {
        this.show = val
      }
    },
  },
  mounted(){
    this.setPos()
  },
  methods:{
    // 设置浮窗位置
    setPos(){
      this.$nextTick(()=>{
        this.appendToBody && this.toBody()
        if(!this.isShow) return
        const cur = this.$el.querySelector('.cap-bus-helpLayer-pop').getBoundingClientRect()  // 当前弹窗的位置
        if(this.target && !this.$parent.$refs[this.target]){
          console.error('父组件中找不到refs.'+this.target+'，请确认目标元素添加ref是否正确。');
          return
        }
        const tar = this.$parent.$refs[this.target] && !this.$slots.default ? this.$parent.$refs[this.target].$el.getBoundingClientRect() : this.$el.querySelector('.helpLayer-content') && this.$el.querySelector('.helpLayer-content').getBoundingClientRect() // 当前目标的位置
        // 不含target 和 slot
        if(!tar) {
          if(Object.keys(this.pos).length > 0){
            this.setDot(this.symPos)
            this.myPos = this.pos
          }
          return
        }
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const documentWidth = document.documentElement.clientWidth
        // 设置三角箭头的位置
        if(Object.keys(this.pos).length == 0){
          if(tar.left + cur.width > documentWidth){
            this.setDot('right',tar,cur)
          }else{
            this.setDot('left',tar,cur)
          }
        }else{
          this.setDot(this.symPos,tar,cur)
        }
        // 含有slot元素
        if(this.$slots.default) {
          if(Object.keys(this.pos).length > 0){
            this.myPos = this.pos
          }else{
            if(tar.left + cur.width > documentWidth) this.myPos['right'] = 0
          }
          return
        }
        // 没有设置pos时，根据目标元素的位置设置浮层位置
        if(Object.keys(this.pos).length == 0){
          if(tar.left + cur.width > documentWidth){
            this.myPos['left'] = (tar.left + tar.width - cur.width) + "px"
          }else{
            this.myPos['left'] = tar.left+"px"
          }
          this.myPos['top'] = (tar.top+scrollTop+tar.height) + "px"
        }else{
          this.myPos = this.pos
        }
      })
    },
    //设置三角形位置
    setDot(type,tar,cur){
      let symleft = ''
      if(!tar){
        this.symLeft = type == 'left' ? 30 : 250
        return 
      }
      if(tar.width < cur.width){
        symleft = type == 'left' ? tar.width / 2 - 8 : cur.width - (tar.width / 2 ) - 8
      }else{
        symleft = cur.width / 2 - 8
      }
      this.symLeft = type == 'left' ? symleft < 10 ? 10: symleft : symleft > 270 ? 270 : symleft
    },
    toBody(){
      const body = document.querySelector("body");
      if (body.append) {
        body.append(this.$el);
      } else {
        body.appendChild(this.$el);
      }
    },
    close(type){
      this.show = false;
      this.$emit('close',type)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import 'src/assets/css/color.scss';
  .cap-bus-helpLayer{
    &.cap-bus-helpLayer-relative{
      position: relative;
    }
    display: inline-block;
    .layer{
      position:fixed;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: .4;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 99990;
    }
    .helpLayer-content{
      display: inline-block;
      position: relative;
      z-index: 99991;
      .cap-base-button{
        &.el-button--default{
          border-color: $color-e9e9e9;
          &:hover,
          &:active,
          &:focus{
            border-color: $blue;
          }
        }
      }
    }
    .cap-bus-helpLayer-pop{
      position: absolute;
      z-index: 99991;
      // left:-15px;
      width:300px;
      padding: 6px;
      margin-top: 10px;
      background: #FFFFFF;
      border: 1px solid #D9D9D9;
      box-sizing: border-box;
      box-shadow: 0px 6px 18px rgba(38, 38, 38, 0.14);
      border-radius: 16px;
      animation: fade-in;/*动画名称*/  
      animation-duration: 1s;/*动画持续时间*/  
      -webkit-animation:fade-in 1s;/*针对webkit内核*/ 
      .sym,
      .sym:after{
        content: "";
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid #D9D9D9;
        position: absolute;
        top:-8px;
      }
      .sym:after{
        left: -8px;
        top: 2px;
        border-bottom: 8px solid #fff;
      }
      img{
        width:100%;
        border-radius: 16px;
      }
      .main{
        margin: 0 8px;
        .tit-box{
          font-weight: 600;
          font-size: 18px;
          line-height: 25px;
          color: #5C5C5C;
          margin:6px 0;
          white-space:nowrap; 
          display: flex;
          align-items: center;
          .tit{
            overflow: hidden;
            text-overflow:ellipsis;
          }
          .prefix{
            margin-right: 5px;
          }
          .suffix{
            margin-left: 5px;
            &.icon-new{
              display: inline-block;
              width: 29px;
              height: 17px;
              background:url('../../../assets/images/new.png') 0 0 no-repeat;
              background-size: 100%;
            }
          }
        }
        .msg{
          font-size: 12px;
          color: #767676;
          margin:0 0 15px;
        }
        .btn-box{
          margin:0 7px 15px;
          text-align: right;
        }
      }
    }
  }
  @keyframes fade-in {  
    0% {opacity: 0;}/*初始状态 透明度为0*/  
    20% {opacity: 0;}
    100% {opacity: 1;}/*结束状态 透明度为1*/  
  }  
  @-webkit-keyframes fade-in {/*针对webkit内核*/  
    0% {opacity: 0;}  
    20% {opacity: 0;}  
    100% {opacity: 1;}  
  }
</style>
