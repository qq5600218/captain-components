## Cap-table 表格

基于vxe-table进行二次封装，文档请直接参考 [vxe-table](https://xuliangzhan_admin.gitee.io/vxe-table/#/table/base/basic))

### 基本用法

基础表格的样式。

::: demo 
```html
<template>
    <div style="display: flex;flex-flow:  row nowrap;justify-content: space-between;"> 
        <div>
            左侧信息
        </div>
        <Cap-base-pagination
            style="margin-bottom:10px"
            class="bi-pagination"
            :page="pageData.page"
            :page-size="pageData.rows"
            :total="pageData.total"
            :page-sizes="pageData.pageSizes"
        />
    </div>
    <vxe-table
       :data="tableData"
       :sort-config="{trigger: 'cell'}"
       height="400"
      >
      <vxe-column type="seq" width="60" title="序号"></vxe-column>
      <vxe-column type="radio" width="60"></vxe-column>
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age" sortable></vxe-column>
    </vxe-table>
</template>
<script>
export default {
   data () {
    return {
        pageData:{page:1,rows:10,total:100,pageSizes:[10,20,100]},
        tableData: [
            { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
            { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
            { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
            { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
            { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
            { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
            { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
            { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' },
            { id: 10009, name: 'Test9', role: 'Test', sex: 'Man', age: 26, address: 'test abc' },
            { id: 10010, name: 'Test10', role: 'Develop', sex: 'Man', age: 38, address: 'test abc' },
            { id: 10011, name: 'Test11', role: 'Test', sex: 'Women', age: 29, address: 'test abc' },
            { id: 10012, name: 'Test12', role: 'Develop', sex: 'Man', age: 27, address: 'test abc' },
            { id: 10013, name: 'Test13', role: 'Test', sex: 'Women', age: 24, address: 'test abc' },
            { id: 10014, name: 'Test14', role: 'Develop', sex: 'Man', age: 34, address: 'test abc' },
            { id: 10015, name: 'Test15', role: 'Test', sex: 'Man', age: 21, address: 'test abc' },
            { id: 10016, name: 'Test16', role: 'Develop', sex: 'Women', age: 20, address: 'test abc' },
            { id: 10017, name: 'Test17', role: 'Test', sex: 'Man', age: 31, address: 'test abc' },
            { id: 10018, name: 'Test18', role: 'Develop', sex: 'Women', age: 32, address: 'test abc' },
            { id: 10019, name: 'Test19', role: 'Test', sex: 'Man', age: 37, address: 'test abc' },
            { id: 10020, name: 'Test20', role: 'Develop', sex: 'Man', age: 41, address: 'test abc' }
        ]
    }
    }

}
</script>
```
:::