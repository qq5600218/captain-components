## Cap-bus-head 标题区域

船长系统标题区域内容

### 基本用法

基础标题信息

::: demo 
```html
<template>
    <Cap-bus-head title="我是标题"></Cap-bus-head>
</template>
```
:::
### 标题带提示信息
通过tips-icon判断是否需要提示图标

::: demo 
```html
<template>
  <Cap-bus-head 
    tips-icon
    title="我是标题" 
    tips="我是提示信息提示信息提示信息" 
    ></Cap-bus-head>
</template>
```
:::
### 标题带操作区域
::: demo 
```html
<template>
    <Cap-bus-head 
      title="我是标题"  
      oper-icon="icon el-icon-video-play" 
      oper-name="教程" 
      @oper="clickOper"></Cap-bus-head>
</template>
<script>
export default {
  methods:{
    clickOper(){
      console.log('我是操作区域点击事件')
    }
  }
}
</script>
```
:::

### 标题带描述

::: demo 
```html
<template>
    <Cap-bus-head 
      title="我是标题" 
      desc="我是描述描述描述描述描述描述描述"></Cap-bus-head>
</template>
```
:::

### 标题带右侧信息

::: demo 
```html
<template>
    <Cap-bus-head 
      title="我是标题" 
      oper-icon="icon el-icon-video-play" 
      oper-name="教程" 
      desc="我是描述描述描述描述描述描述描述" 
      right-cont="我是右侧信息"
      ></Cap-bus-head>
</template>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title | 标题 | string |  —  | — |
| tips | 提示信息 | string | —  | — |
| tips-icon | 是否提示图标	| boolean	| — | false |
| oper-name | 操作区名称 | string	| —	| — | 
| oper-icon | 操作区图标 | string	| —	| — | 
| desc | 描述 | string | — | — |
| right-cont | 右侧信息 | string | — | — |

### Slot
| 参数   | 说明    |
|---------- |-------- |
| title | 标题内嵌 HTML 文本 |
| tips | 提示信息内嵌 HTML 文本 |
| operArea | 操作区内嵌 HTML 文本 |
| desc | 描述内嵌 HTML 文本 |
| rightCont | 右侧信息内嵌 HTML 文本 |

### Events
| 事件名称   | 说明    | 回调参数 |
|---------- |-------- |---------- |
| oper | 绑定操作区域点击事件 | 当前值 |