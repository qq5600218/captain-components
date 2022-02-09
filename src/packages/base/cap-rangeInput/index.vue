<template>
  <div class="cap-base-rangeInput" :class="[ prevError? 'prevError':'' ,lastError? 'lastError':'' ]">
    <slot/>
  </div>
</template>
<script>
import { throwMessage } from '../../../utils/throttleMessage.js'
import  CapBaseInput  from "../../../packages/base/cap-input/index.js";
export default {
  inheritAttrs: false,
  name: 'CapBaseRangeInput',
  data(){
    return {
      prevError: false,
      lastError: false,
      ComponentInstance:[],
    }
  },
  provide() {
    return {
      rangeCompare:this.rangeCompare
    }
  },
  components:{
    CapBaseInput
  },
  props: {
    // 输入框值
    value: {
      type: String,
      default: ''
    },
  },
  mounted(){
    this.ComponentInstance = this.getComponentInstance()
    if(this.ComponentInstance.length != 2){
      console.error('只能包含2个CapBaseInput组件')
    }
  },
  methods:{
    rangeCompare(id,val){
     const arr = this.getComponentInstance()
     const index = arr.findIndex(arr => arr.componentInstance._uid == id)
     const prevInput = Number(arr[0].componentOptions.propsData.value)
     const nextInput = Number(arr[1].componentOptions.propsData.value)
     val = Number(val)
     if(index == 0){
      //  当前第一个输入框
      if(val > nextInput){
        this.prevError = true
        // throwMessage.error('不能大于最大值')
      }else{
        this.lastError = false
        this.prevError = false
      }
      this.$emit('input',{value:[val,nextInput],isError:this.prevError})
     }else{
       // 当前第二个输入框
      if(prevInput > val){
        this.lastError = true
        // throwMessage.error('不能小于最小值')
      }else{
        this.lastError = false
        this.prevError = false
      }
      this.$emit('input',{value:[prevInput,val],isError:this.lastError})
     }
    },

    // 获取input组件节点
    getComponentInstance(){ 
      const arr = []
      this.$slots.default.forEach(item => {
        if(item.componentOptions && item.componentOptions.Ctor.options.name == "CapBaseInput"){
          arr.push(item)
        }
      })
      return arr
    }
  },
}
</script>
<style lang="scss" scoped>
  @import 'src/assets/css/color.scss';
  .cap-base-rangeInput{
    display: flex;
    align-items:center;
    .split{
      margin: 0 6px;
    }
    &.prevError .cap-base-input:first-child{
      >>>.el-input__inner{
        border-color: $red;
      }
    }
    &.lastError .cap-base-input:last-child{
      >>>.el-input__inner{
        border-color: $red;
      }
    }
  }
</style>