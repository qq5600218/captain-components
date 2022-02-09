## Cap-bus-updateTime 更新时间

针对时间展示做封装

### 基本用法

基础按钮的样式。

::: demo 
```html
<template>
    <Cap-bus-updateTime :time="time" />
</template>
<script>
export default {
  data(){
    return {
      time:new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate(),
    }
  },
  
}
</script>
```
:::

### 带浮层

::: demo 
```html
<template>
    <Cap-bus-updateTime :tips="tips" :time="time"/>
</template>
<script>
export default {
  data(){
    return {
      time:new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate(),
      tips:'北京时间：'+new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate(),
    }
  },
  
}
</script>
```
:::

### slot 方式

::: demo 
```html
<template>
    <Cap-bus-updateTime>
        最新更新时间 {{time}}
        <template slot="tips">
          <div>{{tips}}</div>
        </template>
    </Cap-bus-updateTime>
</template>
<script>
export default {
  data(){
    return {
      time:new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate(),
      tips:'北京时间：'+new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate(),
    }
  }
}
</script>
```
:::
### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| time | 时间 | string |  —  | 上次更新时间： time |
| tips | 浮层内容 | string | —  | — |
| placement	| 浮层出现位置 | String | top/top-start/top-end/bottom/bottom-start/bottom-end/<br>left/left-start/left-end/right/right-start/right-end	| top-start |
| pop-width	| 浮层宽度 | String, Number	| —	| auto |
### slots
| name	| 说明 | 
|---------- |---------- |
| default	| 展示的内容 |
| tips	| 浮层展示的内容 |