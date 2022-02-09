## Cap-bus-store 店铺选择器

船长系统店铺选择器，已在组件内封装好了店铺接口（get_channel_list），可直接使用。

### 基本用法

::: demo 
```html
<template>
  <Cap-bus-store :storeData="storeData" @change="change"></Cap-bus-store>
</template>
<script>
export default {
  data(){
    return {
      storeData:{
        account_list:[
                  {id: "128031389", realname: "43333333333333333333", is_master: "0", channel_count: 0},
                  {id: "128031482", realname: "ceshi2", is_master: "0", channel_count: 2},
                  ],
        channel_list:[
                  {currency_code: "CAD",id: "26232",set_status: "1",site_code: "CA",site_id: "2",site_name: "加拿大",status: "1",title: "0011_合并账号测试1_CA"},{currency_code: "USD",id: "544131",set_status: "1",site_code: "US",site_id: "1",site_name: "美国",status: "1",title: "0011_合并账号测试1_DE"},
                  {currency_code: "BRL",id: "428474",set_status: "0",site_code: "BR",site_id: "13",site_name: "巴西",status: "1",title: "YBintech_US_BR"}
                  ],
        department_list:[
                  {channel_count: 0,department_id: "1177",department_name: "1111111111"},
                  {channel_count: 107,department_id: "1168",department_name: "新增1111"}
                  ],
        site_group:[
                  {site_group_id: 1,site_group_name: "北美站",site_list: [{site_id: 1, site_name: "美国", code: "US", area_id: 1},{area_id: 2,code: "CA",site_id: 2,site_name: "加拿大"}]},
                  {site_group_id: 2,site_group_name: "欧洲站",site_list: [{site_id: 4, site_name: "德国", code: "DE", area_id: 4},{site_id: 5,site_name: "西班牙", code: "ES", area_id: 4}]}],
        site_list:[{site_id: 1, site_name: "美国", code: "US", area_id: 1}, {site_id: 2, site_name: "加拿大", code: "CA", area_id: 2}],
        is_master: 1,
      }
    }
  },
  methods:{
    // 店铺选择
    change(data) {
      console.log('data',data)
    },
  },
  
}
</script>
```
:::

### 隐藏tabs
 通过hideId对特定需求的tabs 进行隐藏
::: demo 
```html
<template>
  <Cap-bus-store :storeData="storeData" :hideId="hideId"></Cap-bus-store>
</template>
<script>
export default {
  data(){
    return {
      hideId:[4,5],  //隐藏 多选店铺和子账号
      storeData:{
        account_list:[
                  {id: "128031389", realname: "43333333333333333333", is_master: "0", channel_count: 0},
                  {id: "128031482", realname: "ceshi2", is_master: "0", channel_count: 2},
                  ],
        channel_list:[
                  {currency_code: "CAD",id: "26232",set_status: "1",site_code: "CA",site_id: "2",site_name: "加拿大",status: "1",title: "0011_合并账号测试1_CA"},{currency_code: "USD",id: "544131",set_status: "1",site_code: "US",site_id: "1",site_name: "美国",status: "1",title: "0011_合并账号测试1_DE"},
                  {currency_code: "BRL",id: "428474",set_status: "0",site_code: "BR",site_id: "13",site_name: "巴西",status: "1",title: "YBintech_US_BR"}
                  ],
        department_list:[
                  {channel_count: 0,department_id: "1177",department_name: "1111111111"},
                  {channel_count: 107,department_id: "1168",department_name: "新增1111"}
                  ],
        site_group:[
                  {site_group_id: 1,site_group_name: "北美站",site_list: [{site_id: 1, site_name: "美国", code: "US", area_id: 1},{area_id: 2,code: "CA",site_id: 2,site_name: "加拿大"}]},
                  {site_group_id: 2,site_group_name: "欧洲站",site_list: [{site_id: 4, site_name: "德国", code: "DE", area_id: 4},{site_id: 5,site_name: "西班牙", code: "ES", area_id: 4}]}],
        site_list:[{site_id: 1, site_name: "美国", code: "US", area_id: 1}, {site_id: 2, site_name: "加拿大", code: "CA", area_id: 2}],
        is_master: 1,
      }
    }
  }
}
</script>
```
:::

### 广告模块
通过isCpc来判断是否广告模块
::: demo 
```html
<template>
  <Cap-bus-store :isCpc="isCpc" :storeData="storeData" @change="change" ></Cap-bus-store>
</template>
<script>
export default {
  data(){
    return {
      isCpc:true,
      storeData:{channel_list:[{currency_code: "CAD",id: "26232",set_status: "1",site_code: "CA",site_id: "2",site_name: "加拿大",status: "1",title: "0011_合并账号测试1_CA"},{currency_code: "USD",id: "544131",set_status: "1",site_code: "US",site_id: "1",site_name: "美国",status: "1",title: "0011_合并账号测试1_DE"},
          {currency_code: "BRL",id: "428474",set_status: "0",site_code: "BR",site_id: "13",site_name: "巴西",status: "1",title: "YBintech_US_BR"}]}
    }
  },
  methods:{
    // 店铺选择
    change(data) {
      console.log('data',data)
    },
  },
}
</script>
```
:::

### Attributes
| 参数      | 说明    | 类型      | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 可选值 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;    | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| tabList | tabs信息 | Array | —  | [{id: 1,label: '按店铺', params: 'channel_id',searchPlaceholder: '查找店铺名',labelName: 'title', idKey: 'id',allSelectItem: {id: 'all',title: '全部店铺(默认)',isSelected: true},listName: 'channel_list' },<br>{id: 2,label: '按国家',params: 'site_id',searchPlaceholder: '查找国家',labelName: 'site_name',idKey: 'site_id',listName: 'site_list' // 要遍历的国家数组名},<br>{id: 3,label: '按站点',params: 'country_site',searchPlaceholder: '查找站点',labelName: 'site_group_name',idKey: 'site_group_id',listName: 'site_group' // //要遍历的站点数组名},<br>{id: 4,label: '多选店铺',params: 'channel_id',searchPlaceholder: '查找店铺名',labelName: 'title',idKey: 'id',allSelectItem: {id: 'all',title: '全部店铺(默认)',isSelected: false},multiple: true,listName: 'channel_list' // 要遍历的店铺数组名},<br>{id: 5,label: '子账号',params: 'admin_id',searchPlaceholder: '查找子账号',labelName: 'realname',idKey: 'id',listName: 'account_list' // 要遍历的子账号数组名},<br>{id: 6,label: '部门',params: 'common_department_id',searchPlaceholder: '查找部门',labelName: 'department_name',idKey: 'department_id',listName: 'department_list' // 要遍历的子账号数组名}] |
| storeData | 外部传递店铺数据，不走组件店铺接口	| Object	| — | — |
| hideId | 需要隐藏的tab id	| Array	| 1,2,3,4,5 | — |
| isReload | 是否需要重新加载店铺接口 | Boolean | — | true |
| disabled | 是否禁用	| Boolean	| — | false |
| isCpc | 是否是广告模块 | Boolean | — | false |
| multiple | 是否需要多选（针对广告模块使用） | Boolean | — | false |
| select_store_arr_post | 接收从iframe传递过来的多店铺数据 | Object | — | — |
| single_store_arr_post | 接收从iframe传递过来的单店铺数据 | Object | — | — |
### Events
| 事件名称   | 说明    | 回调参数 |
|---------- |-------- |---------- |
| change | 返回的当前选中店铺信息 | 当前店铺信息 / 当前tabs名称 |