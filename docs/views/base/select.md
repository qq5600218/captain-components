## Cap-base-select 下拉框

基于el-select进行二次封装

### 基本用法

基础单选的样式。

::: demo 
```html
<template>
    <Cap-base-select 
        v-model="value" 
        :options="options"  
        @change="change"
    />
</template>
<script>
export default {
  data(){
    return {
      value:1,
      options:[{'label':'内容1','value':1},{'label':'内容2','value':2},{'label':'内容3','value':3},{'label':'内容4','value':4}],
    }
  },
  methods:{
    change(val){
      console.log(val)
    }
  }
}
</script>
```
:::

### 有禁用选项

::: demo 
```html
<template>
    <Cap-base-select 
      v-model="value" 
      :options="options"  
      />
</template>
<script>
export default {
  data(){
    return {
      value:'2',
      options:[{'label':'内容1','value':'1'},{'label':'内容2','value':'2'},{'label':'内容3','value':'3','disabled':true},{'label':'内容4','value':'4'}],
    }
  }
}
</script>
```
:::

### 有禁用状态
选择器不可用状态

::: demo 
```html
<template>
    <Cap-base-select 
      v-model="value" 
      :options="options" 
      disabled  
    />
</template>
<script>
export default {
  data(){
    return {
      value:'',
      options:[{'label':'内容1','value':'1'},{'label':'内容2','value':'2'},{'label':'内容3','value':'3'},{'label':'内容4','value':'4'}],
    }
  }
}
</script>
```
:::

### 带图标

options前带图标

::: demo 
```html
<template>
    <Cap-base-select 
        v-model="value" 
        :options="options"  
    />
</template>
<script>
export default {
  data(){
    return {
      value:1,
      options:[{'label':'内容1','value':1,'icon':'el-icon-eleme'},{'label':'内容2','value':2,'icon':'el-icon-setting'},{'label':'内容3','value':3,'icon':'el-icon-phone-outline'},{'label':'内容4','value':4,'icon':'el-icon-circle-check'}],
    }
  }
}
</script>
```
:::
### 可清空单选
包含清空按钮，可将选择器清空为初始状态

::: demo 
```html
<template>
    <Cap-base-select 
      v-model="value" 
      :options="options" 
      clearable  
    />
</template>
<script>
export default {
  data(){
    return {
      value:'2',
      options:[{'label':'内容1','value':'1'},{'label':'内容2','value':'2'},{'label':'内容3','value':'3'},{'label':'内容4','value':'4'}],
    }
  }
}
</script>
```
:::

### 尺寸
输入框主要分为 medium、small 两种尺寸。高度分别为30px、24px，默认尺寸为 medium。
::: demo 
```html
<template>
    <Cap-base-select 
      v-model="value1" 
      :options="options" 
      clearable  
    />
    <Cap-base-select 
      v-model="value2" 
      :options="options" 
      clearable  
      size="small"
    />
</template>
<script>
export default {
  data(){
    return {
      value1:'2',
      value2:'1',
      options:[{'label':'内容1','value':'1'},{'label':'内容2','value':'2'},{'label':'内容3','value':'3'},{'label':'内容4','value':'4'}],
    }
  }
}
</script>
```
:::

### 可搜索
添加filterable属性即可启用搜索功能。默认情况下，Select 会找出所有label属性包含输入值的选项。如果希望使用其他的搜索逻辑，可以通过传入一个filter-method来实现。filter-method为一个Function，它会在输入值发生变化时调用，参数为当前输入值。

::: demo 
```html
<template>
    <Cap-base-select 
      v-model="value" 
      :options="options" 
      filterable
    >
     <template slot="prefix"><i class="el-icon-search" /></template>
    </Cap-base-select>
</template>
<script>
export default {
  data(){
    return {
      value:'2',
      options:[{'label':'内容1','value':'1'},{'label':'内容2','value':'2'},{'label':'内容3','value':'3'},{'label':'内容4','value':'4'}],
    }
  }
}
</script>
```
::: 

### 基础多选
设置multiple属性即可启用多选，此时v-model的值为当前选中值所组成的数组。默认情况下选中值会以 Tag 的形式展现，你也可以设置collapse-tags属性将它们合并为一段文字。

::: demo 
```html
<template>
    <Cap-base-select 
      v-model="value" 
      style="width:250px;"
      :options="options" 
      multiple 
      @change="change"
    />
  <small style="margin-left:20px;"> 含全选：</small>
  <Cap-base-select 
    v-model="value2" 
    :options="options2" 
    style="width:300px;"
    multiple 
    collapse-tags
    @change="change2"
  />
</template>
<script>
export default {
  data(){
    return {
      value:['1','2'],
      options:[{'label':'内容1','value':'1'},{'label':'内容2','value':'2'},{'label':'内容3','value':'3'},{'label':'内容4','value':'4'}],
      value2:['1','2'],
      options2:[{'label':'全部','value':'all'},{'label':'内容1','value':'1'},{'label':'内容2','value':'2'},{'label':'内容3','value':'3'},{'label':'内容4','value':'4'}],
    }
  },
  methods:{
    change(val){
      console.log('change',val)
    },
    change2(val){
      console.log('change2',val)
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
    <Cap-base-select 
      style="border-radius:4px;width:200px;"
      v-model="value" 
      :options="options"  
    />
</template>
<script>
export default {
  data(){
    return {
      value:1,
      options:[{'label':'圆角8px','value':1},{'label':'内容2','value':2},{'label':'内容3','value':3},{'label':'内容4','value':4}],
    }
  }
}
</script>  
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model	| 绑定值	| boolean / string / number	| —	| — |
| options | select所需要的对象,具体字段参考下方 option Attributes | Array| —	| — |
| multiple	| 是否多选，若要全选则在options里需包含{'label':'名字','value':'all'}|	boolean	| —	| false |
| disabled	| 是否禁用 |	boolean	| —	| false |
| value-key	| 作为 value 唯一标识的键名，绑定值为对象类型时必填	| string	| —	| value | 
| size	| 输入框尺寸 | string	| medium/small/mini | 	— |
| clearable	| 是否可以清空选项 |	boolean	| —	| false |
| collapse-tags	| 多选时是否将选中值按文字的形式展示 |	boolean	| —	| false |
| multiple-limit	| 多选时用户最多可以选择的项目数，为 0 则不限制	| number	| —	| 0 |
| name	| select input 的 name 属性	| string | — | — |
| autocomplete	| select input 的 autocomplete 属性	string |	—	|off |
| placeholder	| 占位符	| string	| —	| 请选择 | 
| filterable	| 是否可搜索	| boolean	| —	| false |
| allow-create	| 是否允许用户创建新条目，需配合 filterable 使用	| boolean	| —	| false |
| filter-method	| 自定义搜索方法 | function	| —	| — |
| remote	| 是否为远程搜索 | boolean | — | false |
| remote-method	| 远程搜索方法	| function | — |	— |
| loading	| 是否正在从远程获取数据	| boolean	| —	| false |
| loading-text	| 远程加载时显示的文字	| string	| —	| 加载中 |
| no-match-text	| 搜索条件无匹配时显示的文字，也可以使用slot="empty"设置	| string	| —	| 无匹配数据 |
| no-data-text	| 选项为空时显示的文字，也可以使用slot="empty"设置	| string	| —	| 无数据 |
| popper-class	| Select 下拉框的类名	| string	| —	| — |
| reserve-keyword	| 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词	| boolean	| —	| false |
| default-first-option	| 在输入框按下回车，选择第一个匹配项。需配合 filterable 或 remote 使用	| boolean	| -	| false |
| popper-append-to-body	| 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false |	boolean	 | -	 |true |
| automatic-dropdown	| 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单	| boolean	| -	| false |


### Events
| 事件名称   | 说明    | 回调参数 |
|---------- |-------- |---------- |
| change | 选中值发生变化时触发	| 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发	| 出现则为 true，隐藏则为 false |
| remove-tag	| 多选模式下移除tag时触发	| 移除的tag值 |
| clear	| 可清空的单选模式下用户点击清空按钮时触发 | — |
| blur |	当 input 失去焦点时触发	| (event: Event) | 
| focus	| 当 input 获得焦点时触发	(event: Event) |

### Select Slots
| name	| 说明 | 
|---------- |---------- |
| prefix	| Select 组件头部内容 |
| empty	| 无选项时的列表 |

### options Attributes
| 参数   |   说明  | 类型 | 可选值 |	默认值 |
|------  |------ |------ | ------ |------- |
| label	| 选项的标签，若不设置则默认与 value 相同	| string	| —	| — |
| value	| 选项的值	| string/number/object	| —	| — |
| disabled	| 是否禁用该选项	| boolean	| —	| false |
| icon	| 选项的图标	| string	| —	| —	 |