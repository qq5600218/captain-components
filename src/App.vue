<template>
  <div style="width:400px;">
    <Cap-base-DatePicker v-model="time" :isPicker="true" :select-options="selectOptions" dateType="daterange" :requestData="requestData" @responseData="responseData" @change="changeDate"/>
    <Cap-bus-store @change="change"  :multiple="true"/>
    <Cap-bus-store @change="change" v-if="haa"/>
    <CapBusBaseInfo />
  </div>
</template>
<script>
import {CapTable, CapTableHeader, CapTableColumn, CapTablePager,CapTableSelect,CapBaseSwitch,Menu} from './packages/all'
Vue.use(CapTable).use(CapTableHeader).use(CapTableColumn).use(CapTablePager).use(CapTableSelect)
// import { getTranslate } from "@/request/api";
import i18n from "@/utils/i18n.js";
import  CapBaseInput  from "@/packages/base/cap-input/index.js";
import  CapBaseRangeInput  from "@/packages/base/cap-rangeInput/index.js";
import  CapBaseDatePicker  from "@/packages/base/cap-datePicker/index.js";
import  CapBusStore  from "@/packages/business/cap-store/index.js";
import  CapBusBaseInfo  from "@/packages/business/cap-baseInfo/index.js";
export default {
  name: 'App',
  components:{
    CapBusBaseInfo,
    CapBusStore,
    CapBaseInput,
    CapBaseRangeInput,
    CapBaseSwitch,
    CapBaseDatePicker,
    Menu
  },
  data() {
    return {
      haa:false,
      requestData:{m: '/main/OnlineGood',timeWay:1,special_type:1},
      selectOptions:[1,2,3,99],
      time: '',
      value:true,
      value2:22,
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
      ],
      items:[{'content':'内容1','command':'1'},{'content':'内容2','command':'2'},{'content':'内容3','command':'3','disabled':true},{'content':'内容4','command':'4','divided':true}],
    }
  },
  methods:{
    change(store){
      console.log('store',store)
    },
    responseData(date) {
      console.log('responseData',date)
    },
    changeDate(){
      this.haa =true
    },
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.appContent{
  padding-top: 48px;
  padding-left: 40px;
}
#app{
  background-color: #f1f3f6;
}
</style>