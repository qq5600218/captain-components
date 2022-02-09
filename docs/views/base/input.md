## Cap-base-input 输入框

基于el-input进行二次封装

### 基本用法

基础输入框的样式。

::: demo 
```html
<div style="display:flex">
  <div style="width:200px;">
    <Cap-base-input placeholder="常规输入框"></Cap-base-input>
  </div>
  <div style="width:200px;margin-left:20px">
    <Cap-base-input linear placeholder="线性输入框"></Cap-base-input>
  </div>
</div>
```
:::
### 禁用输入框

输入框不可用状态。
::: demo 
```html
<div style="display:flex">
  <div style="width:200px;">
    <Cap-base-input placeholder="常规输入框" disabled></Cap-base-input>
  </div>
  <div style="width:200px;margin-left:20px">
    <Cap-base-input linear placeholder="线性输入框" disabled></Cap-base-input>
  </div>
</div>
```
:::

### 限制小数输入

input type=number情况下限制小数
::: demo 
```html
<div style="display:flex">
  <div style="width:200px;">
    <Cap-base-input placeholder="保留整数" type="number" :limit="limit1"></Cap-base-input>
  </div>
  <div style="width:200px;margin-left:20px">
    <Cap-base-input placeholder="保留两位小数" type="number" :limit="limit2" step="0.01"></Cap-base-input>
  </div>
</div>
<script>
export default {
  data(){
    return {
      limit1:0,
      limit2:2,
    }
  }
}
</script>
```
:::
### 清空操作

::: demo 
```html
<div style="display:flex">
  <div style="width:200px;">
    <Cap-base-input placeholder="常规输入框" clearable></Cap-base-input>
  </div>
  <div style="width:200px;margin-left:20px">
    <Cap-base-input linear placeholder="线性输入框" clearable></Cap-base-input>
  </div>
</div>
```
:::

### 配置样式
默认圆角为0，根据业务场景进行圆角配置
::: demo 
```html
<template>
    <Cap-base-input placeholder="圆角8px" style="width:200px;border-radius:8px;"></Cap-base-input>
</template>   
```
:::

### 带 icon 的输入框

带有图标标记输入类型

::: demo 
```html
<div style="display:flex">
  <div style="font-size:14px;margin-top:4px;"> 属性方式： </div>
  <div style="width:200px;">
    <Cap-base-input placeholder="常规输入框" suffix-icon="el-icon-date"></Cap-base-input>
  </div>
  <div style="width:200px;margin-left:20px">
    <Cap-base-input linear placeholder="线性输入框" prefix-icon="el-icon-search"></Cap-base-input>
  </div>
</div>
<div style="display:flex;margin-top:10px;">
  <div style="font-size:14px;margin:4px 6px 0 0;"> slot方式： </div>
  <div style="width:200px;">
    <Cap-base-input placeholder="常规输入框"><i slot="suffix" class="el-input__icon el-icon-date"></i></Cap-base-input>
  </div>
  <br>
  <div style="width:200px;margin-left:20px">
    <Cap-base-input linear placeholder="线性输入框"><i slot="prefix" class="el-input__icon el-icon-search"></i></Cap-base-input>
  </div>
</div>
```
:::
### 文本域
用于输入多行文本信息，通过将 type 属性的值指定为 textarea。

::: demo 
```html
<div style="width:600px;">
  <Cap-base-input type="textarea" :rows="4" placeholder="请输入内容"></Cap-base-input>
</div>
```
:::


### 复合型输入框
可前置或后置元素，一般为标签或按钮
::: demo 
```html
<div style="display:flex">
  <div style="width:200px;">
    <Cap-base-input placeholder="常规输入框">
      <template slot="prepend">Http://</template>
    </Cap-base-input>
  </div>
  <div style="width:200px;margin-left:20px">
    <Cap-base-input linear placeholder="线性输入框">
      <template slot="prepend">Http://</template>
    </Cap-base-input>
  </div>
</div>

<div style="display:flex;margin-top:10px;">
  <div style="width:200px;">
    <Cap-base-input placeholder="常规输入框">
      <template slot="append">.com</template>
    </Cap-base-input>
  </div>
  <div style="width:200px;margin-left:20px">
    <Cap-base-input linear placeholder="线性输入框">
      <template slot="append">.com</template>
    </Cap-base-input>
  </div>
</div>
```
:::
### 尺寸
输入框主要分为 medium、small 两种尺寸。高度分别为30px、24px，默认尺寸为 medium。
::: demo 
```html
<div style="display:flex">
  <div style="width:200px;">
    <Cap-base-input size="medium" placeholder="常规输入框"></Cap-base-input>
  </div>
  <br>
  <div style="width:200px;margin-left:20px">
    <Cap-base-input size="small" placeholder="小型输入框"></Cap-base-input>
  </div>
</div>
```
:::

### 范围输入
只有两个输入框，Cap-base-rangeInput组件目前只针对两者大小进行判断
::: demo 
```html
<div style="display:flex">
  <div style="width:200px;">
   <Cap-base-rangeInput @input="input">
      <Cap-base-input type="number" placeholder="最小值" v-model="value1"></Cap-base-input>
      <span class="split">-</span>
      <Cap-base-input type="number" placeholder="最大值" v-model="value2"></Cap-base-input>
    </Cap-base-rangeInput>
  </div>
</div>
<script>
export default {
  data(){
    return {
      value1:1,
      value2:2,
    }
  },
  methods:{
    input(val){
      console.log(val)
    }
  }
}
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type | 类型 | string | text，textarea 和其他 [原生 input 的 type 值](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | text |
| value / v-model | 绑定值(value需配合sync使用)	| string / number	| — | — |
| maxlength | 原生属性，最大输入长度 | number	| —	| — | 
| minlength | 原生属性，最小输入长度 | number | — | - |
| show-word-limit | 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效 | boolean | — | false |
| placeholder | 输入框占位文本 | string | — | — |
| clearable | 是否可清空 | boolean | — | false |
| show-password | 是否显示切换密码图标 | boolean | — | false |
| disabled	|禁用	| boolean	| —	|false |
| size | 输入框尺寸，只在 type="text" 时有效	| string	| medium / small | medium |
| limit | 限制小数位数，只在 type="number" 时有效	| number	| 0-整数 1-1位小数  2-2位小数...| — |
| prefix-icon | 输入框头部图标 | string | — | — |
| suffix-icon | 输入框尾部图标 | string | — | — |
| rows | 输入框行数，只对 type="textarea" 有效 | number | — | 2 |
| autosize | 自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 } | boolean / object | — | false |
| autocomplete | 原生属性，自动补全 | string | on, off | off |
| name | 原生属性 | string | — | — |
| readonly | 原生属性，是否只读 | boolean | — | false |
| max | 原生属性，设置最大值 | string / number | — | — |
| min | 原生属性，设置最小值 | string / number | — | — |
| step | 原生属性，设置输入字段的合法数字间隔 | string / number  | — | — |
| resize | 控制是否能被用户缩放 | string | none, both, horizontal, vertical | — |
| autofocus | 原生属性，自动获取焦点 | boolean | true, false | false |
| form | 原生属性	| string | —	| — |
| label	| 输入框关联的label文字	| string | — | — |
| tabindex	| 输入框的tabindex	| string | — | — |
| validate-event |	输入时是否触发表单的校验 | 	boolean	| — | true |

### Input Slot
| 参数   | 说明   |
|---------- |-------- |
| prefix |	输入框头部内容，只对 type="text" 有效 |
| suffix |	输入框尾部内容，只对 type="text" 有效 |
| prepend |	输入框前置内容，只对 type="text" 有效 | 
| append |	输入框后置内容，只对 type="text" 有效 |

### Input Events
| 事件名称   | 说明    | 回调参数 |
|---------- |-------- |---------- |
| blur	| 在 Input 失去焦点时触发	| (event: Event) |
| focus	| 在 Input 获得焦点时触发	| (event: Event) |
| change |	仅在输入框失去焦点或用户按下回车时触发	| (value: string / number) |
| input	| 在 Input 值改变时触发	| (value: string / number) |
| clear	| 在点击由 clearable 属性生成的清空按钮时触发	| — |

### Input Methods
| 事件名称   | 说明    | 参数 |
|---------- |-------- |---------- |
| focus	| 使 input 获取焦点	| — |
| blur	| 使 input 失去焦点	| — |
| select |	选中 input 中的文字	| — |

### RangeInput Events
| 事件名称   | 说明    | 回调参数 |  参数说明 |
|---------- |-------- |---------- | ---------- |
| input	| 在 RangeInput 值改变时触发	| value: {value: [0, 2],isError: false} | value：范围值<br>isError: 范围值大小判断是否有误|