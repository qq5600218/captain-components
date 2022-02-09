<template>
  <div class="dateWrap el-picker-panel__sidebar">  
      <button type="button" class="el-picker-panel__shortcut" v-for="item in shortcut" 
      :key="item.id" 
      :class="{active:shortcutIndext == item.id}"
      @click="changeType(item.id)"
      >
        {{item.text}}
      </button>     
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  computed:{
    shortcut(){
      return this.shortcutList.filter(item=>this.shortcutIds.includes(item.id))
    }
  },
  deactivated(){
    console.log(11)
    this.delDatePickEl()
  },
  methods:{
   changeType(id){   
     this.shortcutIndext = id;
     const obj = _.find(this.shortcutList, ['id', id])
     this.callback(id,obj) 
   }
  } 
}
</script>

<style lang="scss" scoped>
  .cap-base-datePicker-dropdown >>>.dateWrap{
    border-right: 1px solid #e4e4e4;
  }
  .active{
    color: #27B8D0 !important;
    background: transparent;
  }
</style>