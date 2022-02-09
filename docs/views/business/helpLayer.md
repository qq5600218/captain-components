## Cap-bus-helpLayer 帮助浮层

### 基本用法

基础用法

::: demo 
```html
<template>
    <div style="height:400px;"> 
        <Cap-bus-helpLayer 
        :img="img" 
        title="试试新的帮助中心！" 
        msg="遇到了问题？想学习运营思路？还是想了解近期我们更新了什么，这里都有！马上试试吧。"
        @close ="close"
        suffix-icon
        >
            <Cap-base-button>帮助中心</Cap-base-button>
        </Cap-bus-helpLayer>
    </div> 
</template>
<script>
export default {
  data() {
    const img = require("../../../src/assets/images/test.png")
    return {
      img:img,
    }
  },
  methods:{
    close(type){
      console.log('类型：',type)
    }
  }
}
</script>
```
:::

### 绑定某个元素位置
通过target绑定目标元素的ref 来跟随目标元素的位置，注：ref属性必须是父组件调用的，不可以跨组件使用。
::: demo 
```html
<template>
    <div style="position:relative;height:420px;"> 
        <Cap-bus-helpLayer 
        target="btn"
        :img="img" 
        title="试试新的帮助中心！" 
        msg="遇到了问题？想学习运营思路？还是想了解近期我们更新了什么，这里都有！马上试试吧。"
        :append-to-body="true"
        >
        </Cap-bus-helpLayer>
        <div style="position:absolute;right:0">
            <Cap-base-button ref="btn">帮助中心</Cap-base-button>
        </div>
    </div> 
</template>
<script>
export default {
  data() {
    const img = require("../../../src/assets/images/test.png")
    return {
      img:img,
    }
  }
}
</script>
```
:::

### 自定义位置
根据pos属性可自定义浮层的位置，并结合symPos设置三角形角标的位置
::: demo 
```html
<template>
    <div style="position:relative;height:420px;"> 
        <Cap-bus-helpLayer 
        :pos="pos"
        sym-pos="right"
        :img="img" 
        title="试试新的帮助中心！" 
        msg="遇到了问题？想学习运营思路？还是想了解近期我们更新了什么，这里都有！马上试试吧。"
        >
        </Cap-bus-helpLayer>
    </div> 
</template>
<script>
export default {
  data() {
    const img = require("../../../src/assets/images/test.png")
    return {
      img:img,
      pos:{
        position:'absolute',
        left:'20px',
        top:'20px'
      },
    }
  }
}
</script>
```
:::



### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| is-show | 是否展示 | boolean |  —  | true |
| img | 图片地址 | string | —  | — |
| title | 标题信息	| string | — | — |
| msg | 详情信息 | string | —	| — | 
| is-mask | 是否遮罩 | boolean |  —  | false |
| is-btn | 是否需要按钮 | boolean |  —  | true |
| target | 目标元素 | string | —	| — | 
| pos | 自定义位置 | Object | position,left,top,right,bottom | — | 
| sym-pos | 三角形符号的位置，需配合pos使用 | string | left/right	| left | 
| append-to-body | 是否插入到body元素下 | boolean |  —  | false |
| prefix-icon	| 标题左侧图标	| string |	—	| — |
| suffix-icon	| 标题右侧图标	| string | —	| icon-new |
### Slot
| 参数   | 说明    |
|---------- |-------- |
| default | 目标元素 |
| title | 标题内嵌 HTML 文本 |
| msg | 详情信息内嵌 HTML 文本 |


### Events
| 事件名称   | 说明    | 回调参数 |
|---------- |-------- |---------- |
| close | 绑定按钮点击事件 | 1-不在显示  2-下次再看 |