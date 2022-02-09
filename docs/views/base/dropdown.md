## Cap-base-dropdown 按钮

基于el-dropdown进行二次封装

### 基本用法

基础按钮的样式。

::: demo 
```html
<template>
    <Cap-base-dropdown :name="name" :items="items"></Cap-base-dropdown>
</template>
<script>
export default {
  data(){
    return {
      name:'下拉菜单',
      items:[{'content':'内容1','command':'1'},{'content':'内容2','command':'2'},{'content':'内容3','command':'3','disabled':true},{'content':'内容4','command':'4','divided':true}]
    }
  },
  
}
</script>
```
:::

### 触发对象

可使用按钮触发下拉菜单

::: demo 
```html
<template>
    <Cap-base-dropdown 
      main
      :name="name1" 
      :items="items"
    ></Cap-base-dropdown> &nbsp; 
    <Cap-base-dropdown 
      split-button
      :items="items2"
    ></Cap-base-dropdown> &nbsp; 
    <Cap-base-dropdown 
      main
      entity
      name="实体菜单" 
      :items="items2"
    ></Cap-base-dropdown> &nbsp; 
    <Cap-base-dropdown 
      split-button
      entity
      :items="items2"
    ></Cap-base-dropdown>
</template>
<script>
export default {
  data(){
    return {
      name1:'常规菜单',
      items:[{'content':'内容1','command':'1'},{'content':'内容2','command':'2'},{'content':'内容3','command':'3','disabled':true},{'content':'内容4','command':'4','divided':true}],
      items2:[{'content':'事件1','command':'1'},{'content':'事件2','command':'2'},{'content':'事件3','command':'3'},{'content':'事件4','command':'4'}],
    }
  }
}
</script>
```
:::

### 禁用按钮

按钮不可用状态。

::: demo 
```html
<template>
    <Cap-base-dropdown 
      style="vertical-align: super;"
      disabled
      type="primary" 
      :name="name1" 
      :items="items"
    >
    </Cap-base-dropdown> &nbsp; 
    <Cap-base-dropdown
      main
      disabled
      type="primary" 
      :name="name2" 
      :items="items"
    >
    </Cap-base-dropdown> &nbsp; 
    <Cap-base-dropdown
      split-button
      disabled
      type="primary" 
      :items="items"
    >
    </Cap-base-dropdown> &nbsp; 
    <Cap-base-dropdown 
      main
      entity
      disabled
      name="实体菜单" 
      :items="items"
    ></Cap-base-dropdown> &nbsp; 
    <Cap-base-dropdown
      split-button
      entity
      disabled
      type="primary" 
      :items="items"
    >
    </Cap-base-dropdown>
</template>
<script>
export default {
  data(){
    return {
      name1:'常规菜单',
      name2:'主要菜单',
      items:[{'content':'内容1','command':'1'},{'content':'内容2','command':'2'},{'content':'内容3','command':'3','disabled':true},{'content':'内容4','command':'4','divided':true}],
    }
  },
  
}
</script>
```
:::

### 触发方式

可以配置 click 激活或者 hover 激活。

::: demo 
```html
<template>
    <Cap-base-dropdown 
      split-button
      trigger="click"  
      type="primary" 
      :items="items"
    >
    </Cap-base-dropdown>
</template>
<script>
export default {
  data(){
    return {
      items:[{'content':'click菜单','command':'1'},{'content':'内容2','command':'2'},{'content':'内容3','command':'3','disabled':true},{'content':'内容4','command':'4','divided':true}],
    }
  },
  
}
</script>
```
:::

### 菜单隐藏方式

可以hide-on-click属性来配置。<br>
<small>下拉菜单默认在点击菜单项后会被隐藏，将hide-on-click属性默认为false可以关闭此功能。</small>

::: demo 
```html
<template>
  <Cap-base-dropdown 
    split-button
    :hide-on-click="false"  
    type="primary" 
    :items="items"
  >
  </Cap-base-dropdown>
</template>
<script>
export default {
  data(){
    return {
      items:[{'content':'内容1','command':'1'},{'content':'内容2','command':'2'},{'content':'内容3','command':'3','disabled':true},{'content':'内容4','command':'4','divided':true}],
    }
  },
  
}
</script>
```
:::

### 指令事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作

::: demo 
```html
<template>
    <Cap-base-dropdown 
      main
      type="primary" 
      :name="name1" 
      :items="items"
      @command="handleCommand"  
    >
  </Cap-base-dropdown> &nbsp; 
  <Cap-base-dropdown 
      split-button
      :items="items2"
      @command="handleCommand"  
    ></Cap-base-dropdown>
</template>
<script>
export default {
  data(){
    return {
      name1:'下拉菜单',
      items:[{'content':'内容1','command':'1'},{'content':'内容2','command':'2'},{'content':'内容3','command':'3','disabled':true},{'content':'内容4','command':'4','divided':true}],
      items2:[{'content':'事件1','command':'1'},{'content':'事件2','command':'2'},{'content':'事件3','command':'3'},{'content':'事件4','command':'4'}],
    }
  },
  methods:{
    handleCommand(command){
      console.log('command',command)
    }
  }
}
</script>
```
:::

### 配置样式
默认圆角为0，根据业务场景进行圆角配置

::: demo 
```html
<template>
    <Cap-base-dropdown 
      style="border-radius:4px;"
      main
      type="primary" 
      :name="name1" 
      :items="items"
    >
  </Cap-base-dropdown> &nbsp; 
  <Cap-base-dropdown 
    style="border-radius:10px;"
    split-button
    :items="items2"
  ></Cap-base-dropdown>
</template>
<script>
export default {
  data(){
    return {
      name1:'圆角4px',
      items:[{'content':'内容1','command':'1'},{'content':'内容2','command':'2'},{'content':'内容3','command':'3','disabled':true},{'content':'内容4','command':'4','divided':true}],
      items2:[{'content':'圆角10px','command':'1'},{'content':'事件2','command':'2'},{'content':'事件3','command':'3'},{'content':'事件4','command':'4'}],
    }
  }
}
</script>
```
:::
### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| name | 默认展示的内容	| string	| — | — |
| main | 是否常规按钮	| boolean	| — | false |
| split-button | 下拉触发元素呈现为按钮组（true的时候可不需要name）	| boolean	| — | false |
| entity | 是否实体按钮	| boolean	| — | false |
| items | DropdownItem所需要的对象,具体字段参考下方 item Attributes | Array | — | — |
| placement | 菜单弹出位置| string	| top/top-start/top-end/bottom/bottom-start/bottom-end	| bottom-end | 
| trigger | 触发下拉的行为 | string | hover/click | hover |
| hide-on-click | 是否在点击菜单项后隐藏菜单 | boolean | — | true |
| show-timeout | 展开下拉菜单的延时（仅在 trigger 为 hover 时有效） | number | — | 250 |
| hide-timeout | 收起下拉菜单的延时（仅在 trigger 为 hover 时有效） | number | — | 150 |
| tabindex	| Dropdown 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)	|number	| —	|0 |
| disabled	|是否禁用	| boolean	|—|	false|


### Events
| 事件名称   | 说明    | 回调参数 |
|---------- |-------- |---------- |
| command | 点击菜单项触发的事件回调 | dropdown-item 的指令 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |

### Item Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| content | 内容 | string |  — | — |
| command | 指令 | string/number/object |  — | — |
| disabled | 禁用 | boolean |  — | false |
| divided | 显示分割线 | boolean |  — | false |
| icon | 图标类名 | string |  — | — |