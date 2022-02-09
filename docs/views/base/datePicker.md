## Cap-base-DatePicker 日期选择器

基于el-DatePicker进行二次封装

### 基本用法

::: demo 
```html
<template>
    <p class="centerAlign">
      <small>默认：</small>
      <Cap-base-DatePicker 
        v-model="value" 
        date-type="date"  
        @change="getParams"
      />
    </p>
    <p class="centerAlign">
      <small>特定选项：</small>
      <Cap-base-DatePicker 
        v-model="value1" 
        :is-picker="true" 
        :select-type="selectType" 
        :select-options="selectOptions" 
        date-type="date" 
        @change="getParams"
      />
    </p>
</template>
<script>
  export default {
    data() {
      return {  
        selectType:2,
        selectOptions:[2,3,99],
        value: '',
        value1: new Date(),
      }
    },
    methods:{
      getParams(val){
        console.log('value',val)
      }
    }
  };
</script>
```
:::

### 其他日期单位
通过扩展基础的日期选择，可以选择周、月、年或多个日期

::: demo 
```html
<template>
    <p class="centerAlign"><small>周：</small><Cap-base-DatePicker v-model="value" date-type="week"  @change="getParams"/></p>
    <p class="centerAlign"><small>年：</small><Cap-base-DatePicker v-model="value1" date-type="year"  @change="getParams"/></p>
    <p class="centerAlign"><small>月：</small><Cap-base-DatePicker v-model="value2" date-type="month"  @change="getParams"/></p>
    <p class="centerAlign"><small>多个日期：</small><Cap-base-DatePicker v-model="value3" date-type="dates"  @change="getParams"/></p>
</template>
<script>
  export default {
    data() {
      return {  
        value: '',
        value1: '',
        value2: '',
        value3:[]
      };
    },
    methods:{
        getParams(val){
           console.log('value',val)
        }
    }
  };
</script>
```
:::

### 选择日期范围

可在一个选择器中便捷地选择一个时间范围

::: demo 
```html
<template>
    <p class="centerAlign"><small>日期范围：</small><Cap-base-DatePicker v-model="value" date-type="daterange" @change="getParams"/></p>
    <p class="centerAlign"><small>月范围：</small><Cap-base-DatePicker :value="value1" date-type="monthrange" @change="getParams"/></p>
    <p class="centerAlign"><small>周范围：</small><Cap-base-DatePicker :value="value1" date-type="weekrange"  @change="getParams"/></p>
    <p class="centerAlign"><small>日期时间范围：</small><Cap-base-DatePicker :value="value1" date-type="datetimerange" @change="getParams"/></p>
</template>
<script>
  export default {
    data() {
      return {  
        value: ['2022-12-22','2022-12-28'],
        value1: [],
      };
    },
    methods:{
        getParams(val){
           console.log('value',val)
        }
    }
  };
</script>
```
:::
通过is-picker来判断是否需要特定选项

::: demo 
```html
<template>
    <p class="centerAlign"><small>日期范围：</small><Cap-base-DatePicker v-model="value" date-type="daterange" :is-picker="true" @change="getParams"/></p>
    <p class="centerAlign"><small>月范围：</small><Cap-base-DatePicker :value="value1" date-type="monthrange" :is-picker="true"  :select-options="selectOptions" @change="getParams"/></p>
    <p class="centerAlign"><small>周范围：</small><Cap-base-DatePicker :value="value1" date-type="weekrange" :is-picker="true"  :select-options="selectOptions2" @change="getParams"/></p>
    <p class="centerAlign"><small>日期时间范围：</small><Cap-base-DatePicker :value="value1" :is-picker="true" date-type="datetimerange" @change="getParams"/></p>
</template>
<script>
  export default {
    data() {
      return {  
        value: ['2022-12-22','2022-12-28'],
        value1: [],
        selectOptions:[0,10,11,99],
        selectOptions2:[0,100,101,99],
      };
    },
    methods:{
        getParams(val){
           console.log('value',val)
        }
    }
  };
</script>
```
:::

### 日期限制
对可选择的日期范围进行限制

::: demo 
```html
<template>
  <Cap-base-DatePicker v-model="value" date-type="date"  @change="getParams" :limit="limit" :max-limit="limit"/>
</template>
<script>
  export default {
    data() {
      return {  
        value: '',
        limit:['2021-12-30','2022-6-20'],
      };
    },
    methods:{
        getParams(val){
           console.log('value',val)
        }
    }
  };
</script>
```
:::

### 增加新的selectOptions配置项
is-picker=true的条件下，通过新增shortcuts对象来增加额外的配置项

::: demo 
```html
<template>
    <Cap-base-DatePicker ref="datePicker" v-model="value1" :is-picker="true" :select-options="selectOptions" :shortcuts="shortcuts" date-type="date" @change="getParams"/>
</template>
<script>
  export default {
    data() {
      const _this = this
      return {  
        selectOptions:[1,2,99],
        value: '',
        value1: '',
        shortcuts: [
          {
            text: '前3天',
            type: 16,
            onClick(picker) {
              const nowDate = new Date();
              picker.$emit('pick', new Date(nowDate.setDate(nowDate.getDate()-3)))
              _this.$refs.datePicker.$children[0].changeTimeType(this.type)
            }
          }
        ]
      }
    },
    methods:{
      getParams(val){
        console.log('value',val)
      }
    }
  };
</script>
```
:::

### 下拉框查询
通过 slot Cap-base-select组件 并指定class 为 disabled-dropdown来执行
::: demo 
```html
<template>
  <div>
    <Cap-base-DatePicker v-model="value" date-type="date"  @change="getParams">
      <template slot="prepend">
        <Cap-base-select 
            disabled
            class="disabled-dropdown"
            style="width:100px"
            v-model="selectVal" 
            :options="options"  
        />
      </template>  
    </Cap-base-DatePicker>
  </div>
  <div style="margin-top:20px;">
    <Cap-base-DatePicker v-model="value2" date-type="daterange" :is-picker="true" @change="getParams">
      <template slot="prepend">
        <Cap-base-select 
            class="disabled-dropdown"
            style="width:100px"
            v-model="selectVal2" 
            :options="options2"  
            @change="selectChange"
        />
      </template>  
    </Cap-base-DatePicker>
  </div>
</template>
<script>
  export default {
    data() {
      return {  
        value: '',
        value2:'',
        selectVal:1,
        selectVal2:1,
        options:[{'label':'内容1','value':1}],
        options2:[{'label':'内容1','value':1},{'label':'内容2','value':2,'disabled':true},{'label':'内容3','value':3},{'label':'内容4','value':4}],
      }
    },
    methods:{
      getParams(val){
        console.log('value',val)
      },
      selectChange(val){
        console.log('select',val)
      },
    }
  };
</script>
```
:::


### 左侧含有筛选项
特殊业务场景需要对日期控件做筛选，故在左侧新增一列筛选项。<br>
通过isConditional判断是否需要配置，通过conditionalOptions设置配置项
::: demo 
```html
<template>
  <Cap-base-DatePicker v-model="time" :is-conditional="true" :conditional-options="conditionalOptions" :isPicker="true" date-type="daterange" @change="getParams"/>
</template>
<script>
  export default {
    data() {
      return {  
        conditionalOptions:[1,2,3],
        time: [],
      };
    },
    methods:{
      getParams(val){
          console.log('value',val)
      }
    }
  };
</script>
```
:::


### 含日期接口
包裹getTimeListNew 和getTimeInfoNew接口。
通过 requestData 传递 所需要的字段，需要传递的字段：m（页面路由），timeWay（1-按日、2-按周、3-按月、4-按季度、5-按年），special_type（1-订单列表 2-在线商品列表）
通过 responseData 接收getTimeListNew接口返回的日期参数
::: demo 
```html
<template>
  <Cap-base-DatePicker v-model="time" :isPicker="true" :select-options="selectOptions"  date-type="daterange" :requestData="requestData" @responseData="responseData"/>
</template>
<script>
  export default {
    data() {
      return {  
        requestData:{m: '/main/OnlineGood',timeWay:1,special_type:1},
        selectOptions:[1,2,99],
        time: [],
      };
    },
    methods:{
      responseData(response) {
        console.log('responseData',response)
      }
    }
  };
</script>
```
:::
### Attributes
|  参数     | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model |	绑定值	| date(DatePicker) / array(DateRangePicker)	| — |	— |
| readonly | 完全只读	| boolean	| —	| false |
| disabled	| 禁用	| boolean |	—	| false |
| editable	| 文本框可输入 |	boolean	| —	| false |
| clearable	| 是否显示清除按钮 |	boolean	| —	| true |
| disabled | 是否禁用状态 | boolean | — | false |
| placeholder	| 非范围选择时的占位内容	| string	| —	| — |
| start-placeholder	| 范围选择时开始日期的占位内容	| string	| —	| — |
| end-placeholder	| 范围选择时结束日期的占位内容	| string	| —	| — |
| date-type	| 显示类型	| string	| year/month/date/dates/week/datetime/ datetimerange/daterange/weekrange/monthrange	| date |
| is-picker	| 是否需要特有的选项	| boolean	| —	| false |
| select-options	| 日期特有的选项（is-picker=true）	| number[]	| —	| [99, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 22, 23, 60, 61, 100, 101] //具体含义请参考下方selectOptions配置项 |
| select-type	| 特有选项的默认值（is-picker=true）	| —	| —	| 0 |
| is-conditional	| 是否需要左侧筛选项 |	boolean	| —	| false |
| conditional-options	| 左侧筛选项（is-conditional=true）	| number[]	| —	| [1, 2, 3]  //1-按天 2-按周 3-按月 |
| align	| 对齐方式	| string	| left, center, right	| left |
| popper-class |	DatePicker | 下拉框的类名	| string | — | — |
| range-separator	| 选择范围时的分隔符	| string	| —	| '-' |
| default-value	| 可选，选择器打开时默认显示的时间 |	Date |	可被new Date()解析 |	— |
| default-time	| 范围选择时选中日期所使用的当日内具体时刻	| string[]	| 数组，长度为 2，每项值为字符串，形如12:00:00，第一项指定开始日期的时刻，第二项指定结束日期的时刻，不指定会使用时刻 00:00:00	| — |
| name | 原生属性	| string	| — |	— | 
| unlink-panels	| 在范围选择器里取消两个日期面板之间的联动 |	boolean	| —	| true |
| validate-event	| 输入时是否触发表单的校验	| boolean	| —	| true |
| requestData | 传递getTimeListNew日期接口的参数	| Object	| —	| — |
| responseData | 接收getTimeListNew接口返回的日期参数	| Object	| —	| — |
### Events
| 事件名称   | 说明    | 回调参数 |
|---------- |-------- |---------- |
| change	| 用户确认选定的值时触发	| 返回日期信息 |
| blur	| 当 input 失去焦点时触发	| 组件实例 |
| focus	| 当 input 获得焦点时触发	| 组件实例 |


### selectOptions配置项
| 参数   | 说明    | 参数   | 说明    |  参数   | 说明    |
|---------- |-------- | -------- | -------- | -------- | -------- |
| 99 | 自定义 | 6 | 过去30天 |14 | 过去14天 |
| 0 | 全部  | 7 | 过去60天 | 22 | 近3个月 |
| 1 | 近一年 | 8 | 过去90天 | 23 | 近6个月 |
| 2 | 今天 | 9 | 本月 | 20 | 本季度 |
| 3 | 昨天 | 10 | 上月 | 21 | 上季度 |
| 4 | 过去7天 | 11 | 本年 | 100 | 本周 |
| 5 | 过去15天 | 12 | 上年 | 101 | 上周 |
### Slots
| name	| 说明 | 
|---------- |---------- |
| prepend	| 日期输入框前需要插入的内容 |






