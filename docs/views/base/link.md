## Cap-base-link 文字链接

基于el-link进行二次封装

### 基本用法

基础的文字链接用法。
***
::: demo 
```html
<template>  
    <Cap-base-link href="https://www.captainbi.com/" target="_blank">默认链接</Cap-base-link>
    <Cap-base-link type="primary">蓝色链接</Cap-base-link>
    <Cap-base-link type="warning">黄色链接</Cap-base-link>
    <Cap-base-link type="danger">红色链接</Cap-base-link>
</template>   
```
:::

### 禁用链接

文字链接不可用状态。

::: demo 
```html
<template>  
    <Cap-base-link disabled href="https://www.captainbi.com/" target="_blank">默认链接</Cap-base-link>
    <Cap-base-link disabled type="primary">蓝色链接</Cap-base-link>
    <Cap-base-link disabled type="warning">黄色链接</Cap-base-link>
    <Cap-base-link disabled type="danger">红色链接</Cap-base-link>
</template>   
```
:::

### 下划线

文字链接下划线。

::: demo 
```html
<template>  
    <Cap-base-link :underline="false">无下划线</Cap-base-link>
    <Cap-base-link>有下划线</Cap-base-link>
</template>   
```
:::


### 带图标链接
带图标的文字链接可增强辨识度。

::: demo 
```html
<template> 
    <Cap-base-link icon="el-icon-edit">编辑链接</Cap-base-link>
    <Cap-base-link>查看<i class="el-icon-view el-icon--right"></i> </Cap-base-link>
</template>   
```
:::


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- | 
| type | 类型 | string | primary / warning / danger | default |
| underline| 是否下划线	| boolean	| — | true |
| icon | 图标类名| string	| —	| — | 
| disabled | 是否禁用状态 | boolean | — | false |
| href | 原生 href 属性 | string | — | — |


### Events
| 事件名称   | 说明    | 回调参数 |
|---------- |-------- |---------- |
| click | 当绑定值点击时触发 | 当前值 |