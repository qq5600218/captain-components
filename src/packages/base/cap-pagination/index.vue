<template>
  <div v-if="!showPage" class="cap-base-pagination">
    <div class="total-class">
      <span v-if="simple">{{curPageSize}}</span>
      共{{ total }}条
    </div>
    <div class="page-container">
      <div
        v-if="!simple"
        class="button first-page"
        :class="{ disable: pageNum == 1 || disabled }"
        @click="handleFirstPage"
      >
        <span class="el-icon-arrow-left" />
      </div>
      <div
        class="button pre-page"
        :class="{ disable: pageNum == 1 || disabled }"
        @click="handlePrePage"
      >
        <span class="el-icon-arrow-left" />
      </div>
      <div class="page-num" :class="{ disable: total == 0 || disabled }">
        <input
          ref="input"
          v-model="pageNum"
          :disabled="total == 0 || disabled"
          class="page-num-input"
          :size="String(pageNum).length || 1"
          @input="checkLength()"
          @change="inputChange()"
        >
        <span style="margin-bottom: 2px;">/</span>
        <span class="max-page">{{ maxPage }}</span>
      </div>
      <div
        class="button next-page"
        :class="{ disable: pageNum == maxPage || disabled }"
        @click="handleNextPage"
      >
        <span class="el-icon-arrow-right" />
      </div>
      <div
        v-if="!simple"
        class="button last-page"
        :class="{ disable: pageNum == maxPage || disabled }"
        @click="handleLastPage"
      >
        <span class="el-icon-arrow-right" />
      </div>
    </div>
    <div v-if="pageSizes.length && total !== 0 && !simple" class="page-sizes-container">
      <CapBaseSelect
        v-model="selectVal"
        placeholder="请选择"
        :disabled="total == 0 || disabled"
        @change="handlePageSizeChange"
        :options="pageSizesRow"  
      />
    </div>
  </div>
</template>
<script>
import  CapBaseSelect  from "../../../packages/base/cap-select/index.js";
export default {
  inheritAttrs: false,
  name: 'CapBasePagination',
  components:{
    CapBaseSelect
  },
  props: {
    page: {
      type: Number,
      default: () => 1
    },

    pageSize: {
      type: Number,
      default: () => 10
    },

    total: {
      type: Number,
      default: () => 0
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50]
    },
    simple: {
      type: Boolean,
      default: () => false
    },
    hideOnSinglePage: {
      type: Boolean,
      default: () => false
    },
    disabled:{
      type: Boolean,
      default: () => false
    },
  },
  data() {
    return {
      pageNum: this.page,
      selectVal: 10,
      validatorPage: (rule, value, callback) => {
        if (this.pageNum > this.maxPage) {
          callback(new Error('当前页码不能大于最大页数'))
        } else {
          callback()
          this.$refs['form'].clearValidate()
        }
      }
    }
  },
  computed: {
    pageSizesRow(){
      let rows = []
      this.pageSizes.forEach(item => {
        rows.push({'label':item+'条/页','value':item})
      })
      return rows
    },
    maxPage() {
      let val = Math.ceil(this.total / this.pageSize) || 1
      if(this.pageNum>val){
         this.pageNum = val
        this.$emit('change',val)
      }
      return val
    },
    currentPage() {
      return this.pageNum
    },
    curPageSize(){
      return  ((this.pageNum-1) * this.pageSize+1) +'-'+ this.pageNum * this.pageSize +'，'
    },
    showPage(){
      // console.log(this.hideOnSinglePage && this.total <= this.pageSize)
      return this.hideOnSinglePage && this.total <= this.pageSize
    }
  },
  watch: {
    pageSize(val) {
      if (val) {
        this.selectVal = val
      }
    }
  },
  created() {
    this.selectVal = this.pageSize || 10
  },
  methods: {
    // 第一页
    handleFirstPage() {
      if (this.pageNum == 1) return
      this.pageNum = 1
      this.$emit('change', 1)
    },
    // 最后一页
    handleLastPage() {
     if (this.pageNum == this.maxPage) return
      this.pageNum = this.maxPage
      this.$emit('change', this.maxPage)
      setTimeout(() => {
        const which = this.$refs.input
        const iCount = which.value.replace(/[^\u0000-\u00ff]/g, 'aa').length
        which.size = iCount
      }, 0)
    },
    // 上一页
    handlePrePage() {
      if (this.pageNum <= 1) return
      this.pageNum --
      this.$emit('change', Number(this.pageNum))
    },
    checkLength() {
      const which = this.$refs.input
      this.pageNum = this.pageNum.replace(/\D|^0$/g, '')
      var maxchar = 10
      const iCount = which.value.replace(/[^\u0000-\u00ff]/g, 'aa').length
      if (iCount <= maxchar) {
        which.size = iCount
      } else alert('请不要超过' + maxchar + '个字符')
    },
    // 跳转页
    inputChange() {
      if (this.pageNum > this.maxPage) {
        this.pageNum = JSON.parse(JSON.stringify(this.maxPage))
        this.$refs.input.size = String(this.maxPage).length
      }
      this.pageNum = !Number(this.pageNum) ? 1 : this.pageNum
      this.$emit('change', Number(this.pageNum))
    },
    // 下一页
    handleNextPage() {
      if (this.pageNum >= this.maxPage) return
      this.pageNum ++
      this.$emit('change', Number(this.pageNum))
    },
    // 改变每页的条数
    handlePageSizeChange(val) {
      this.$emit('changeSize', val)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/assets/css/color.scss';
.cap-base-pagination{
  display: flex;
  font-size: 12px;
  align-items: center;
  >>> .el-form-item__error {
    white-space: nowrap;
    z-index: 99;
  }
  .page-container,
  .iconfont,
  .button,
  .page-num,
  .page-sizes-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    border-radius: 0;
    font-size: 12px;
  }
  .total-class {
    margin-right: 12px;
    white-space: nowrap;
    color: #666;
  }
  .page-container {
    height: 30px;
  }
  .page-sizes-container {
    height: 30px;
    margin-left: 10px;
  }
  .button {
    width: 30px;
    height: 30px;
    border: none;
    padding: 0;
    margin: 0;
    border-radius: 0;
    font-size: 14px;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    position: relative;
    box-sizing: border-box;
  }
  .button:not(.disable):hover {
    background-color: #f0f0f0;
  }
  .button.disable {
    cursor: no-drop;
    opacity: .6;
  }
  .iconfont {
    color: #999;
    font-size: 30px;
    width: 15px;
    height: 15px;
    overflow: hidden;
    margin: 0;
  }
  .icon-icon-dafanye,.icon-icon-xiaofanye{
      font-size: 12px;
  }
  .next-page,.last-page,.first-page,.pre-page{
    line-height: 30px;
    color: #999;

  }
  .next-page,.last-page{
    .iconfont-bi{
      transform: rotate(180deg);
    }

  }
  .next-page,.page-num,.last-page {
    border-left: 1px solid transparent !important;
  }
  .button.first-page{
    span{
      margin-left: 6px;
    }
    // border-radius: 2px 0 0 2px;
    border-right: none;
    &:after{
      content: "";
      width: 1px;
      height: 34%;
      background: $color-999;
      position: absolute;
      left:10px;
      top: 32%;
    }
  }
  .button.last-page {
    span{
      margin-right: 6px;
    }
    // border-radius: 0 2px 2px 0;
    &:after{
      content: "";
      width: 1px;
      height: 34%;
      background: $color-999;
      position: absolute;
      right:10px;
      top: 32%;
    }
  }
  .page-num {
    padding: 0 10px 0 5px;
    height: 28px;
    font-size: 12px;
    border: 1px solid #d9d9d9;
    background: #fff;
    border-radius: 0;
    &:not(.disable):hover {
      border: 1px solid $blue !important;
    }
    .page-num-input {
        width: 15px;
        height: 28px;
        text-align: center;
        background: none;
        outline: none;
        border: none !important;
        color: #27B8D0;
        font-size: 12px;
    }
  }
  .cur-page,
  .max-page {
    height: 28px;
    line-height: 28px;
    margin-bottom: 2px;
  }
  .cur-page {
    color: #27b8d0;
    padding-right: 3px;
  }
  .max-page {
    color: #666;
    padding-left: 3px;
    word-break: keep-all;
  }
  .el-select {
    width: 80px;
    &:hover >>> .is-disabled .el-input__inner{
      border: 1px solid #D9D9D9;
    }
    >>> .el-input__inner{
      padding: 0 6px;
      border-color: #D9D9D9;
      border-radius: 0;
    }
  }

  .page-sizes-container .el-select >>> .el-input__suffix {
    right: 0;
    width: 15px;
    justify-content: center;
    overflow: hidden;
  }
  .page-sizes-container .el-select >>> .el-input__suffix,
  .page-sizes-container
    .el-select
    >>> .el-input.el-input--medium.el-input--suffix {
    width: 134px;
    height: 28px !important;
    display: flex;
    align-items: center;
  }
  .page-sizes-container
    .el-select
    >>> .el-input.el-input--medium.el-input--suffix
    input {
    width: 79px;
    height: 28px;
    padding: 0 15px 0 7px;
    border: none;
    font-size: 12px;
    color: #666;
  }
  >>> .el-form-item__content {
    line-height: 28px !important;
  }
  .page-sizes-container
    >>> .el-select
    .el-input.el-input--medium.el-input--suffix {
    width: 100%;
  }
  .page-sizes-container >>> .el-select .el-input__suffix {
    justify-content: flex-end;
    width: 100%;
  }
  .page-sizes-container >>> .el-select .el-input__suffix .el-input__suffix-inner {
    width: 25px;
  }
}
</style>
