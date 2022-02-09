## Cap-base-pagination 分页器

### 基本用法

基础按钮的样式。

::: demo 
```html
<template>
    <Cap-base-pagination
        class="bi-pagination"
        :page="pageData.page"
        :page-size="pageData.rows"
        :total="pageData.total"
        :page-sizes="pageData.pageSizes"
        @change="handleCurrentChange"
        @changeSize="handleSizeChange"
    />
</template>
<script>
export default {
  data(){
    return {
      pageData:{page:1,rows:10,total:100,pageSizes:[10,20,100]}
    }
  },
  methods:{
    handleCurrentChange(val){
        console.log('输入',val)
    },
    handleSizeChange(val){
        console.log('下拉',val)
    }
  }
}
</script>
```
:::

### 简约模式

隐藏最大最小选项及选择器

::: demo 
```html
<template>
    <Cap-base-pagination
        simple
        class="bi-pagination"
        :page="pageData.page"
        :page-size="pageData.rows"
        :total="pageData.total"
        :page-sizes="pageData.pageSizes"
    />
</template>
<script>
export default {
  data(){
    return {
      pageData:{page:1,rows:10,total:100,pageSizes:[10,20,100]}
    }
  }
}
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| page | 页码 | number | — | 1 |
| page-size | 每页显示条目个数	| number	| — | 10 |
| total | 总条目数 | number	| —	| — | 
| page-sizes | 每页显示个数选择器的选项设置 | number[] | — | [10, 20, 50] |
| simple | 是否简约模式 | boolean | — | false |
| hide-on-single-page  | 只有一页时是否隐藏 | boolean | — | false |
| disabled	| 是否禁用 | boolean | — | false |


### Events
| 事件名称   | 说明    | 回调参数 |
|---------- |-------- |---------- |
| change | 页面发生变化时触发 | 当前值 |
| changeSize | 选择器发生变化时触发 | 当前值 |