## Cap-base-switch 开关

基于el-switch进行二次封装

### 基本用法

表示两种相互对立的状态间的切换，多用于触发「开/关」。

::: demo 
```html
<template>
  <Cap-base-switch v-model="value"/>
</template>
<script>
export default {
  data() {
    return {
      value: true
    }
  }
}
</script>
``` 
:::

### 文字描述

::: demo 
```html
<template>
    <Cap-base-switch 
    v-model="value" 
    active-text="按月付费"
    inactive-text="按年付费"
    />
</template>
<script>
export default {
  data() {
    return {
      value: true
    }
  }
}
</script>
```
:::

### 禁用状态
开关不可用状态。

::: demo 
```html
<template>
    <Cap-base-switch v-model="value" disabled/>
    <Cap-base-switch v-model="value1" disabled/>
</template>
<script>
export default {
  data() {
    return {
      value: true,
      value1: false
    }
  }
}
</script>
```
:::


### 形状

根据不同场景有三种不同的形状，通过type来区分。
***
::: demo 
```html
<template>
    <p> 方形：<Cap-base-switch v-model="value" type="1"/></p>
    <p> 圆角2px：<Cap-base-switch v-model="value1" type="2"/></p>
    <p> 圆角：<Cap-base-switch v-model="value2" type="3"/></p>
</template>
<script>
export default {
  data() {
    return {
      value: true,
      value1: true,
      value2: true
    }
  }
}
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model |	绑定值 | boolean / string / number | — | — |
| disabled	| 是否禁用 | boolean | — | false |
| width	| switch 的宽度（像素） | number | — | 26 |
| type	| 类型 | string / number | 方形: 1 / 圆角2px: 2 / 圆角: 3 | 1 |
| active-icon-class	| switch 打开时所显示图标的类名，设置此项会忽略 | active-text | string | — | — |
| inactive-icon-class | switch 关闭时所显示图标的类名，设置此项会忽略  | inactive-text | string | — | — |
| active-text | switch 打开时的文字描述	| string | — | — |
| inactive-text	| switch 关闭时的文字描述 | string | — | — |
| active-value	| switch 打开时的值	| boolean / string / number | — | true |
| inactive-value | switch 关闭时的值 | boolean / string / number |	— |	false |
| active-color | switch 打开时的背景色 | string	| —	| #27b8d0 |
| inactive-color | switch 关闭时的背景色 | string | — | #b7b7b7 |
| name	switch | 对应的 name 属性 | string | —	| — | 
| validate-event | switch 状态时是否触发表单的校验 | boolean | — | true | 


### Events
| 事件名称   | 说明    | 回调参数 |
|---------- |-------- |---------- |
change | switch 状态发生变化时的回调函数 | 新状态的值 |

### Methods
| 方法名   | 说明    | 参数 |
|---------- |-------- |---------- |
focus | 使 Switch 获取焦点 | — |