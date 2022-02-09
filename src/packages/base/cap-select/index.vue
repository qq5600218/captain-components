<template>
    <Select class="cap-base-select"  v-model="selected" v-bind="$attrs" v-on="$listenser" @change="onChange"  :popper-class="popperClass" >
      <slot slot="empty" name="empty"></slot>
      <slot slot="prefix" name="prefix"></slot>
      <Option :label="item.label" :value="item.value" :key="item.value" :disabled="item.disabled" v-for="item in options">
        <i :class="item.icon" v-if="item.icon"></i>
        {{item.label}}
      </Option>
    </Select>
</template>
<script>
import { Select,Option } from 'element-ui'
import { getStyle , setStyle } from '../../../utils/index'
// https://github.com/fred-hu/el-select-all
export default {
  inheritAttrs: false,
  name: 'CapBaseSelect',
  components: {
    Select,
    Option
  },
  props:{
    value: {
      type: [Number,String,Array],
      default: () => {
        return ''
      }
    },
    options: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    const selected = this.value || []
    return {
      selected,
      mdoptionsValue: [],
      oldMdoptionsValue: [],
      style:undefined,
    }
  },
  computed:{
    popperClass(){
      let clas = 'cap-base-select-dropdown '
      if(this.$attrs['popper-class']) clas += this.$attrs['popper-class']
      return clas
    },
    isAll(){
      return this.options.some(item => item.value == 'all')
    },
    $listenser() {
      const _this = this
      return Object.assign({}, this.$listeners, {
        change: () => {
          if(Array.isArray(_this.selected)){
            this.$emit('change', (_this.selected || []).filter(v => {
              return v !== 'all'
            }))
          }else{
            this.$emit('change',_this.selected)
          }
        },
        input: () => {
          if(Array.isArray(_this.selected)){
            this.$emit('input', (_this.selected || []).filter(v => {
              return v !== 'all'
            }))
          }else{
            this.$emit('input',_this.selected)
          }
        }
      });
    }
  },
  watch: {
    selected: {
      immediate: true,
      deep: true,
      handler(val) {
        if(Array.isArray(val)){
          this.$emit('input', (val || []).filter(v => {
            return v !== 'all'
          }))
        }else{
            this.$emit('input',val)
          }
      }
    }
  },
  created(){
    this.style = getStyle(this,['border-radius','borderRadius','padding','padding-left','paddingLeft'])
  },
  mounted(){
    setStyle(this.$el.querySelector('.el-input__inner'),this.style)
  },
  methods:{
    onChange(val) {
      // 必须是全选才可继续
      if(!this.isAll) return
      const allValues = []
      // 保留所有值
      for (const item of this.options) {
        allValues.push(item.value)
      }
      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldMdoptionsValue.length === 1 ? [] : this.oldMdoptionsValue[1] || []
      // 若是全部选择
      if (val.includes('all')) this.selected = allValues
      // 取消全部选中  上次有 当前没有 表示取消全选
      if (oldVal.includes('all') && !val.includes('all')) this.selected = []
      // 点击非全部选中  需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('all') && val.includes('all')) {
        const index = val.indexOf('all')
        val.splice(index, 1) // 排除全选选项
        this.selected = val
      }
      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes('all') && !val.includes('all')) {
        if (val.length === allValues.length - 1) this.selected = ['all'].concat(val)
      }
      // 储存当前最后的结果 作为下次的老数据
      this.oldMdoptionsValue[1] = this.selected
    }
  },
}
</script>
<style lang="scss" scoped>
  @import 'src/assets/css/color.scss';
  .cap-base-select{
    >>> .el-input{
      font-size: 12px;
      &.el-input--prefix{
        .el-input__prefix{
          left: 0;
        }
        .el-input__inner{
          padding-left: 26px;
        }
      }
      .el-input__inner{
        height: 30px;
        line-height: 30px;
        color: $color-666;
        padding: 0 8px 0 10px;
        border: 1px solid $color-e9e9e9;
        border-radius: 0;
        &:hover{
          border-color: $blue;
        }
        &[disabled],
        &[disabled]:hover{
          color:$color-bfbfbf;
          border-color: $color-e9e9e9;
          background: $color-f0f0f0;
        }
      }
      .el-icon-circle-close:before{
        content: "\e6db";
      }
      .el-input__icon{
        line-height: 30px;
      }
      .el-icon-search{
        position: absolute;
        left: 8px;
        top: 7px;
        font-size: 16px;
        color: #B7B7B7;
      }
    }
    >>> .el-select__tags{
      .el-select__input{
        margin: 0;
      }
    }
    &.el-select--small{
      >>> .el-input{
        .el-input__inner{
          height: 24px;
          line-height: 24px;
        }
        .el-input__icon{
          line-height: 24px;
        }
      }
    }
    &.disabled-dropdown{
      >>> .el-input{
        border-right: 1px solid #DCDFE6;
        .el-input__inner{
          height: 28px;
          line-height: 28px;
        }
        &.is-disabled{
          .el-input__inner{
            color: $color-666;
            background: inherit;
            cursor: inherit;
          }
          .el-input__suffix{
            display: none;
          }
        }
        .el-input__icon{
          line-height: 28px;
        }
      }
      >>> .el-input__inner{
        border: none;
      }

    }
    >>> .el-tag{
      padding: 0 6px;
      .el-icon-close{
        background-color: inherit;
        transform: scale(1);
        right:-2px;
      }
      .el-icon-close:hover{
        background-color: inherit;
        color:$blue;
      }
    }
    
  }
  .cap-base-select-dropdown{
    .el-select-dropdown__item{
      font-size: 12px;
      &.selected{
        color: $blue;
        font-weight: normal;
      }
      &:not(.is-disabled):hover{
        color: $color-333;
      }
    }
    &.is-multiple .el-select-dropdown__item{
      padding-left: 35px;
    }
    &.is-multiple .el-select-dropdown__item::before{
      content: '';
      width: 12px;
      height: 12px;
      border: 1px solid $color-999;
      border-radius: 2px;
      position: absolute;
      left:12px;
      top:11px;
    }
    &.is-multiple .el-select-dropdown__item.selected::before{
      background: $blue;
      border-color: $blue;
    }
    &.is-multiple .el-select-dropdown__item.selected::after{
      right: inherit;
      left: 13px;
      top: 1px;
      color: #fff;
    }
  }
</style>