<template>
  <DateWeekRange
    v-if="dateTypeStr=='weekrange'"
    ref="datePicker"
    v-bind="$attrs" 
    v-on="$listenser"
    :key="dateTypeStr"
    v-model="timeVal"
    :type="dateTypeStr"
    :select-type="selectType"
    format="yyyy-WWw"
    :value-format="valueFormat"
    :picker-options="pickerOptions"
    @change="dateChange"
    @focus="setClass"
    range-separator="~"
  />
  <DatePicker
    v-else
    ref="datePicker"
    v-bind="$attrs" 
    v-on="$listenser"
    :key="dateTypeStr"
    v-model="timeVal"
    :type="dateTypeStr"
    :format="dateTypeStr=='week'? 'yyyy-WWw':''"
    :value-format="valueFormat"
    :picker-options="pickerOptions"
    @change="dateChange"
    @focus="setClass"
    range-separator="~"
  />
</template>
<script>
// https://github.com/xiaofan9/date-week-range/
import _ from 'lodash'
import moment from 'moment'
import { DatePicker } from 'element-ui'
import { DateWeekRange } from 'date-week-range'
import { addClass,removeClass } from '../../../../utils/index'
import request from '../mixins/request'
import sliderShortcut from './sliderShortcut.js'
export default {
  name: 'date-picker',
  components: {
    DatePicker,
    DateWeekRange
  },
  mixins:[request,sliderShortcut],
  props: {
    id:{
      type: [String,Number],
      default: ''
    },
    // 默认初始日期范围
    time: {
      type: [String,Array,Date],
      default: ''
    },
    //下拉框的类型
    selectType:{
      type: Number,
      default: 0
    },
    // 日期类型
    dateType: {
      type: String,
      default: 'date'
    },
    // 是否需要特有的选项
    isPicker: {
      type: Boolean,
      default: false
    },
    // 默认日期特有的选项
    selectOptions: {
      type: Array,
      default: () => [99, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 20, 21, 22, 23, 100, 101]
    },
    limit:{
      type: Array,
      default: ()=>[]
    },
    isConditional:{
      type: Boolean,
      default: false
    },
    conditionalOptions:{
      type: Array,
      default: () => [1, 2, 3]
    },
  },
  data() {
    const _this = this
    return {
      timeVal: '',
      time_type: _this.selectType,
      time_type1: 99,
      time_select: false, // 判断是否点击日期选项
      pickerOptions: {
        firstDayOfWeek: 1,
        disabledDate(time) {
          if(_this.limit.length == 2){
            return _this.limit[0] && moment(_this.limit[0]).valueOf() > time.getTime() || _this.limit[1] && moment(_this.limit[1]).valueOf() < time.getTime() 
          }
        }
      },
      // 0:全部 1：近一年  2：今天  3：昨天  4：过去7天  5：过去15天  6：过去30天  7：过去60天  8：过去90天  9：本月
      // 10：上个月  11：今年  12：去年  14：过去14天  20:本季度  21：上季度  22：近3个月
      // 23：近6个月   100：本周  101:上周  99：自定义
      shortcutsArr: [
        {
          text: '自定义',
          type: 99,
          onClick(picker) {
            _this.changeTimeType(99)
          }
        },
        {
          text: '全部',
          type: 0,
          onClick(picker) {
            picker.$emit('pick', ['', ''])
            _this.changeTimeType(0)
          }
        },
        {
          text: '近一年',
          type: 1,
          onClick(picker) {
            let dateTime = new Date()
            dateTime = dateTime.setDate(dateTime.getDate() - 365)
            dateTime = new Date(dateTime)
            picker.$emit('pick', [dateTime, new Date()])
            _this.changeTimeType(1)
          }
        },
        {
          text: '今天',
          type: 2,
          onClick(picker) {
            if(_this.dateType.indexOf("range") != -1){
              picker.$emit('pick', [new Date(), new Date()])
            }else{
              picker.$emit('pick', new Date())
            }
            _this.changeTimeType(2)
          }
        },
        {
          text: '昨天',
          type: 3,
          onClick(picker) {
            let dateTime = new Date()
            if(_this.dateType.indexOf("range") != -1){
              dateTime = dateTime.setDate(dateTime.getDate() - 1)
              dateTime = new Date(dateTime)
              picker.$emit('pick', [dateTime, dateTime])
            }else{
              dateTime.setTime(dateTime.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', dateTime);
            }
            _this.changeTimeType(3)
          }
        },
        {
          text: '过去 7 天',
          type: 4,
          onClick(picker) {
            let dateTime = new Date()
            dateTime = dateTime.setDate(dateTime.getDate() - 7)
            dateTime = new Date(dateTime)
            picker.$emit('pick', [dateTime, new Date()])
            _this.changeTimeType(4)
          }
        },
        {
          text: '过去 14 天',
          type: 14,
          onClick(picker) {
            let dateTime = new Date()
            dateTime = dateTime.setDate(dateTime.getDate() - 14)
            dateTime = new Date(dateTime)
            picker.$emit('pick', [dateTime, new Date()])
            _this.changeTimeType(14)
          }
        },
        {
          text: '过去 15 天',
          type: 5,
          onClick(picker) {
            let dateTime = new Date()
            dateTime = dateTime.setDate(dateTime.getDate() - 15)
            dateTime = new Date(dateTime)
            picker.$emit('pick', [dateTime, new Date()])
            _this.changeTimeType(5)
          }
        },
        {
          text: '过去 30 天',
          type: 6,
          onClick(picker) {
            let dateTime = new Date()
            dateTime = dateTime.setDate(dateTime.getDate() - 30)
            dateTime = new Date(dateTime)
            picker.$emit('pick', [dateTime, new Date()])
            _this.changeTimeType(6)
          }
        },
        {
          text: '过去 60 天',
          type: 7,
          onClick(picker) {
            let dateTime = new Date()
            dateTime = dateTime.setDate(dateTime.getDate() - 60)
            dateTime = new Date(dateTime)
            picker.$emit('pick', [dateTime, new Date()])
            _this.changeTimeType(7)
          }
        },
        {
          text: '过去 90 天',
          type: 8,
          onClick(picker) {
            let dateTime = new Date()
            dateTime = dateTime.setDate(dateTime.getDate() - 90)
            dateTime = new Date(dateTime)
            picker.$emit('pick', [dateTime, new Date()])
            _this.changeTimeType(8)
          }
        },
        {
          text: '本周',
          type:100 ,
          onClick(picker) {
            const dateTime = new Date()
            const weekday = dateTime.getDay() || 7
            dateTime.setDate(dateTime.getDate() - weekday + 1)
            picker.$emit('pick', [dateTime, new Date()])
            _this.changeTimeType(100)
          }
        },
        {
          text: '上周',
          type: 101,
          onClick(picker) {
            const weekday = new Date().getDay() || 7
            const start = new Date(new Date().setDate(new Date().getDate() - weekday + 1 - 7))
            const end = new Date(new Date().setDate(new Date().getDate() - weekday))
            picker.$emit('pick', [start, end])
            _this.changeTimeType(101)
          }
        },
        {
          text: '本月',
          type: 9,
          onClick(picker) {
            const dateTime = new Date()
            dateTime.setDate(1)
            picker.$emit('pick', [dateTime, new Date()])
            _this.changeTimeType(9)
          }
        },
        {
          text: '上月',
          type: 10,
          onClick(picker) {
            const date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth()
            if (month === 0) {
              month = 12
            }
            date.setDate(1)
            const start = new Date(date.setMonth(month - 1))
            const end = new Date(year, month, 0)
            picker.$emit('pick', [start, end])
            _this.changeTimeType(10)
          }
        },
        {
          text: '近 3 个月',
          type: 22,
          onClick(picker) {
            let lastTime = moment(new Date()).subtract(3,'months').startOf('date').format('YYYY-MM-DD')
            picker.$emit('pick', [new Date(lastTime), new Date()])
            _this.changeTimeType(22)
          }
        },
        {
          text: '近 6 个月',
          type: 23,
          onClick(picker) {
            let lastTime = moment(new Date()).subtract(6,'months').startOf('date').format('YYYY-MM-DD')
            picker.$emit('pick', [new Date(lastTime), new Date()])
            _this.changeTimeType(23)
          }
        },
        {
          text: '本季度',
          type: 20,
          onClick(picker) {
            const date = new Date()
            var month = date.getMonth()
            if (month < 3) {
              date.setMonth(0)
            } else if (month > 2 && month < 6) {
              date.setMonth(3)
            } else if (month > 5 && month < 9) {
              date.setMonth(6)
            } else if (month > 8 && month < 11) {
              date.setMonth(9)
            }
            date.setDate(1)
            picker.$emit('pick', [date, new Date()])
            _this.changeTimeType(20)
          }
        },
        {
          text: '上季度',
          type: 21,
          onClick(picker) {
            var y = new Date().getFullYear();  //当前年份
            var m = new Date().getMonth();  //当前月份
            var q = parseInt(m / 3);  //当前季度
            var lastQuarterFirstDay = new Date(y, (q - 1) * 3, 1);  //上一季度的开始日期
            var lastQuarterLastDay = new Date(y, q * 3, 0);  //上一季度的结束日期
            picker.$emit('pick', [lastQuarterFirstDay, lastQuarterLastDay])
            _this.changeTimeType(21)
          }
        },
        {
          text: '本年',
          type: 11,
          onClick(picker) {
            const date = new Date()
            date.setDate(1)
            date.setMonth(0)
            picker.$emit('pick', [date, new Date()])
            _this.changeTimeType(11)
          }
        },
        {
          text: '上年',
          type: 12,
          onClick(picker) {
            const year = new Date().getFullYear() - 1
            const start = new Date(year + '-01-01')
            const end = new Date(year + '-12-31')
            picker.$emit('pick', [start, end])
            _this.changeTimeType(12)
          }
        }
      ],
      weekrangeArr:[0,100,101,99],
      monthrangeArr:[0,9,10,22,23,99],
      yearrangeArr:[0,1,11,12,99],
      quarterrangeArr:[0,20,21,99],
      dateTypeStr: this.dateType,
      shortcutIndext:1,
      shortcutList:[
        {id:1, text:'按天',type:'date'},
        {id:2, text:'按周',type:'week'},
        {id:3, text:'按月',type:'month'},
        // {id:4,text:'按季度',type:'quarter'},
        // {id:5,text:'按年',type:'year'},
      ] , 
    }
  },
  computed: {
    // 设置匹配的日期选项
    shortcuts() {
      const _this = this
      return this.shortcutsArr.filter(function(o) { return _this.selectOptions.includes(o.type) })
    },
    // 日期格式化形式
    valueFormat() {
      let format = 'yyyy-MM-dd'
      if (this.dateType === 'datetimerange') {
        format = 'yyyy-MM-dd hh:mm:ss'
      } else if (this.dateType === 'monthrange') {
        format = 'yyyy-MM'
      }
      return format
    },
    $listenser() {
      const _this = this
      return Object.assign({}, _this.$listeners, {
        change: () => {
          if(_this.time_type == 0) _this.timeVal = ''
          let obj =  {'type':_this.time_type,'time':_this.timeVal}
          if(_this.dateType == 'week') {
            obj = {'type':_this.time_type,'time':[moment(_this.timeVal).day(1).format('YYYY-MM-DD'),moment(_this.timeVal).day(7).format('YYYY-MM-DD')]}
          }
          _this.$emit('change',obj)
        },
      });
    },
  },
  watch: {
    time: {
      handler(val) {
        this.timeVal = val
      },
      immediate: true
    }
  },
  mounted() {
    if(this.timeVal.length > 0) this.time_type = 99
    const shortcuts = this.$attrs['shortcuts'] ? this.$attrs['shortcuts'] : []
    if(this.isPicker) this.pickerOptions.shortcuts = [...this.shortcuts,...shortcuts]
    
  },
  methods: {
    changeTimeType(timeType) {
      if(!this.timeVal){
        console.error('日期格式有误')
      }
      this.time_type = timeType
      this.time_select = true
      this.setClass()
    },
    // 日期操作
    dateChange(val) {
      if (!val) {
        this.time_type = 0
      } else {
        if (!this.time_select) this.time_type = 99
      }
      this.time_select = false
      this.$emit('update:time', val)
      // this.$emit('change',this.time_type)
      if (this.requestData) { 
        this.getTimeInfoData()
      }
    },
    // 设置选项高亮
    setClass() {
      const _this = this
      const index = _this.pickerOptions.shortcuts && _this.pickerOptions.shortcuts.findIndex(function(o) { return o.type === _this.time_type })
      _this.$nextTick(()=>{
        const parent = document.querySelector('.cap-base-datePicker-dropdown.dropdown-'+_this.id)
        const sidebar = parent.querySelector('.el-picker-panel__sidebar:not(.dateWrap)')
        if(!sidebar) return 
        const selectorAll = sidebar.querySelectorAll('.el-picker-panel__shortcut')
        selectorAll.forEach((item, i) => i === index ? addClass(selectorAll[index], 'active') : removeClass(item, 'active'))
        if(!this.isConditional || this.conditionalOptions.length == 0) return 
        const ElDateWrap = parent.querySelector('.dateWrap')
        if(!ElDateWrap) this.showDateModal('.cap-base-datePicker-dropdown.dropdown-'+_this.id,this.shortcutIndext,this.getShortcutIndext,this.dateTypeStr,this.conditionalOptions,this.shortcutList)
      })
    },
    // 设置左侧选项 
    getShortcutIndext(id,obj,bol) {
      if (id == this.shortcutIndext) return
      this.shortcutIndext  = id;
      this.dateTypeStr = this.dateTypeStr.indexOf('range') > -1 ? obj.type+'range' : obj.type
      if(this.isPicker) this.setShortcuts()
      this.$emit('update:dateType', this.dateTypeStr)
      if(bol == false) return
      this.$nextTick(() => {
        this.$refs.datePicker.focus()
      })
    },
    // 有左侧选项时匹配日期选项
    setShortcuts(){
      // console.log('this.dateTypeStr',this.dateTypeStr)
      const shortcuts = this.$attrs['shortcuts'] ? this.$attrs['shortcuts'] : []
      this.pickerOptions.shortcuts = [...this.shortcuts,...shortcuts]
      if(this.dateTypeStr == 'daterange') return
      this.pickerOptions.shortcuts = this.pickerOptions.shortcuts.filter(item => this[this.dateTypeStr+'Arr'].includes(item.type))
    },
  }
}
</script>
