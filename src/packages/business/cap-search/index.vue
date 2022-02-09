<template>
    <div class="cap-bus-search" :class="[options.length > 0 ? 'cap-bus-search-select':'', disabled ? 'cap-bus-search-disabled':'']">
      <Cap-base-select v-model="seltValue" :options="options" v-if="options.length > 0" :disabled="selectDisabled" @change="selectChange" :class="options.length == 1 ? 'disabled-dropdown': ''"/>  
      <CapBaseInput 
        v-model="inputValue"
        :placeholder="placeholder" 
        clearable 
        :disabled="disabled" 
        @keyup.enter.native="handleEvent('click')"
        @change="handleEvent('change')"
        @clear="handleEvent('click')"
        @input="handleEvent('input')"
        >
         <i slot="suffix" class="el-icon-search" @click="handleEvent('click')" />    
        </CapBaseInput>
    </div>
</template> 
<script>
import CapBaseSelect  from '../../base/cap-select'
import CapBaseInput  from '../../base/cap-input'
import { getStyle , setStyle } from '../../../utils/index'
export default {
  inheritAttrs: false,
  name: 'CapBusSearch',
  components: {
    CapBaseSelect,
    CapBaseInput
  },
  data(){
    return {
      seltValue:this.selectValue,
      inputValue:this.value,
    }
  },
  computed:{
    selectDisabled(){
      return this.disabled || this.options.length == 1
    }
  },
  props:{
    value:{
      type:[String,Number],
      default:''
    },
    // 提示语
    placeholder:{
      type:String,
      default:'请输入搜索内容'
    },
    // 下拉框的值
    selectValue:{
      type: [Number,String,Array],
      default: ''
    },
    // 下拉框options
    options:{
      type:Array,
      default:()=>[]
    },
    // 禁用
    disabled:{
      type:Boolean,
      default:false
    },
  },
  created(){
    if(this.options.length == 0){
      this.style = getStyle(this,['border-radius','borderRadius'])
    }
  },
  mounted(){
    if(this.options.length == 0){
      setStyle(this.$el.querySelector('.el-input__inner'),this.style)
    }
  },
  methods:{
    selectChange(val){
      this.$emit('selectChange',val)
    },
    handleEvent(type){
      let data = this.inputValue
      if(this.options){
        data = {value:this.inputValue,select:this.seltValue}
      }
      if(type == 'change'){
        this.$emit('change',data)
      }else if(type == 'input'){
        this.$emit('input',data)
      }else if(type == 'click'){
        this.$emit('click',data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import 'src/assets/css/color.scss';
  .cap-bus-search{
    width: 290px;
    display: flex;
    transition:all .2s ease-in 0s;
    overflow: hidden;
    >>> .el-input__inner:hover{
      border-color: $blue;
    }
    >>> .el-input__inner[disabled]:hover{
      border-color: $color-e4e7ed;
    }
    >>> .el-icon-search{
      font-size: 18px;
      color: $color-666;
    }
    .cap-base-input{
      >>> .el-input__inner{
        padding-right: 60px;
      }
    }
    .cap-base-select{
      width: 140px;
    }
    >>> .el-icon-circle-close{
       position: absolute; 
       right: 28px;
       &:after{
         content: "";
         width: 1px;
         height: 50%;
         background:$color-d4d4d4;
         position: absolute;
         right: 0;
         top: 25%;
       }
    }
    >>> .el-icon-search{
      margin: 5px 2px 0 0; 
      cursor: pointer;
    }
  }
  .cap-bus-search-select{
    border: 1px solid $color-e4e7ed;
    // border-radius: 4px;
    &:hover{
      border-color:$blue;
    }
    >>> .cap-base-select{
      border-right: 1px solid $color-e4e7ed;
      .el-input__inner{
        height: 28px;
        line-height: 28px;
      }
    }
    >>> .el-input__inner{
      height: 28px;
    }
    >>> .el-input__icon{
      line-height: 28px !important;
    }
    >>> .el-input__inner,
    >>> .el-input__inner:hover{
      border:1px solid transparent !important;
    }

  }
  .cap-bus-search-disabled{
    >>> .el-input__suffix{
      opacity: .6;
    }
  }
  .cap-bus-search-disabled:hover{
    border-color: $color-e4e7ed;
  }
</style>