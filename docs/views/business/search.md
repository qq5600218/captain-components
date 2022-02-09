## Cap-bus-Search 搜索框

船长系统搜索框

### 基本用法

基础搜索框

::: demo 
```html
<template>
    <Cap-bus-Search></Cap-bus-Search>
</template>
```
:::

下拉搜索框

::: demo 
```html
<template>
    <Cap-bus-Search 
      :options="options" 
      :select-value="selectValue" 
      @click="click" 
      @change="change" 
      @input="input" 
      @selectChange="selectChange"
    ></Cap-bus-Search><br>
    <Cap-bus-Search 
      :options="options2" 
      :select-value="selectValue2" 
    ></Cap-bus-Search>
</template>
<script>
export default {
  data(){
    return {
      selectValue:1,
      options:[{'label':'内容1','value':1},{'label':'内容2','value':2},{'label':'内容3','value':3},{'label':'内容4','value':4}],
      selectValue2:1,
      options2:[{'label':'内容1','value':1}],
    }
  },
  methods:{
    selectChange(val){
      console.log('selectChange',val)
    },
    change(val){
      console.log('change',val)
    },
    input(val){
      console.log('input',val)
    },
    click(val){
      console.log('click',val)
    },
  }
}
</script>
```
:::


禁用搜索框
::: demo 
```html
<template>
    <Cap-bus-Search disabled></Cap-bus-Search> <br>
    <Cap-bus-Search :options="options" :select-value="selectValue" disabled></Cap-bus-Search>
</template>
<script>
export default {
  data(){
    return {
      selectValue:1,
      options:[{'label':'内容1','value':1},{'label':'内容2','value':2},{'label':'内容3','value':3},{'label':'内容4','value':4}],
    }
  },
  
}
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value | 输入框的值 | string/number|  —  | — |
| placeholder | 输入框占位文本 | string | —  | — |
| select-value | 下拉框的值	| string/number/Array	| — | — |
| options | 下拉框的option | Array	| —	| — | 
| disabled | 禁用 | boolean	| —	| false | 


### Events
| 事件名称   | 说明    | 回调参数 |  参数说明  |
|---------- |-------- |---------- | ---------- |
| change | 仅在输入框失去焦点或值改变并按下回车时触发 | (value:  string / number / Object)<br>下拉搜索时 返回 Object： {value: "1", select: 1} | 搜索框的值：value <br> 下拉框的值：select |
| input | 在 输入框 值改变时触发 | (value:  string / number / Object)<br>下拉搜索时 返回 Object： {value: "1", select: 1} | 搜索框的值：value <br> 下拉框的值：select |
| click | 点击搜索 或 按下回车时触发 | (value:  string / number / Object)<br>下拉搜索时 返回 Object： {value: "1", select: 1} | 搜索框的值：value <br> 下拉框的值：select |
| selectChange | 在 下拉框 值改变时触发 | (value: string / number) | — |