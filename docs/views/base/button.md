## Cap-base-button 按钮

基于el-button进行二次封装

### 基本用法

基础按钮的样式。

::: demo 
```html
<template>
    <Cap-base-button>常规按钮</Cap-base-button>
    <Cap-base-button type="primary">主要按钮</Cap-base-button>
    <Cap-base-button :ghost="true">幽灵按钮</Cap-base-button>
    <br><br>
    <Cap-base-button plain type="warning">警告按钮</Cap-base-button>
    <Cap-base-button type="warning">警告按钮</Cap-base-button>
</template>
```
:::

### 带链接按钮

::: demo 
```html
<template>
    <Cap-base-button href='https://www.captainbi.com/'>常规按钮</Cap-base-button>
    <Cap-base-button type="primary" href='https://www.captainbi.com/' target="_blank">主要按钮</Cap-base-button>
    <Cap-base-button type="warning" href='https://www.captainbi.com/' target="_blank">警告按钮</Cap-base-button>
</template>   
```
:::

### 禁用按钮

按钮不可用状态。

::: demo 
```html
<template>
    <Cap-base-button disabled>常规按钮</Cap-base-button>
    <Cap-base-button disabled type="primary">主要按钮</Cap-base-button>
    <Cap-base-button disabled type="warning">警告按钮</Cap-base-button>
    <Cap-base-button :ghost="true" disabled>幽灵按钮</Cap-base-button>
</template>   
```
:::


### 按钮尺寸

按钮主要分为 medium、small 两种尺寸。高度分别为30px、24px，默认尺寸为 medium。

::: demo 
```html
<template>
    <Cap-base-button>中等按钮</Cap-base-button>
    <Cap-base-button size="medium">中等按钮</Cap-base-button>
    <Cap-base-button size="small">小型按钮</Cap-base-button>
</template>   
```
:::


### 配置样式
默认圆角为0，根据业务场景进行圆角配置,<br>
默认左右边距14px，根据业务场景进行边距配置
::: demo 
```html
<template>
    <Cap-base-button style="border-radius:4px;padding:10px 18px;">圆角4px按钮</Cap-base-button>
    <Cap-base-button href='https://www.captainbi.com/' style="border-radius:10px;padding:10px 18px;">圆角10px按钮</Cap-base-button>
</template>   
```
:::

### 带图标按钮

设置icon属性即可，icon 的列表可以参考 Element 的 icon 组件，也可以设置在文字右边的 icon ，只要使用i标签即可，可以使用自定义图标。

::: demo 
```html
<template>
    <Cap-base-button icon="el-icon-edit">带图标按钮</Cap-base-button>
    <Cap-base-button type="primary"><i class="el-icon-upload el-icon--right"></i> 上传</Cap-base-button>
    <Cap-base-button icon="el-icon-edit" disabled>带图标按钮</Cap-base-button>
</template>   
```
:::


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size | 尺寸 | string |  medium / small  | medium |
| type | 类型 | string | primary / warning / text | default |
| plain| 是否朴素按钮	| boolean	| — | false |
| icon | 图标类名| string	| —	| — | 
| ghost | 是否幽灵按钮	| boolean	| — | false |
| loading | 是否加载中状态 | boolean | — | false |
| disabled | 是否禁用状态 | boolean | — | false |
| href | 原生 href 属性 | string | — | — |
| target | 链接打开方式 | string | — | — |
| autofocus	|是否默认聚焦	|boolean	| —	|false |
| native-type	|原生 type 属性	|string	|button / submit / reset|	button|


### Events
| 事件名称   | 说明    | 回调参数 |
|---------- |-------- |---------- |
| click | 当绑定值点击时触发 | 当前值 |