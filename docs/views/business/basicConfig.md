## Cap-bus-basicConfig 基本配置

基本配置项

### 基本用法

基础标题信息

::: demo 
```html
<template>
    <Cap-bus-basicConfig
      btn="表格配置"
      :tab-item="settingFields.fields"
      :custom-fields="settingFields.custom_fields"
      @confirm="confirm"
      switch-text="我是开关"
      :is-switch="switchModel"
    >
    </Cap-bus-basicConfig>
</template>
<script>
export default {
  data() {
    return {
      switchModel:false,
      settingFields: {
        custom_fields:[
          {check_can_cancel: 0,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 1,key: "order_id",name: "订单编号"},
          {check_can_cancel: 0,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 1,key: "sku",name: "SKU"},
          {check_can_cancel: 0,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 1,key: "asin",name: "ASIN"},
          {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 0,key: "channel_name",name: "店铺名称"},
          {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 0,key: "reserved_field2",name: "FnSKU"},
          {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 0,key: "is_evaluation",name: "是否测评"},
          {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 0,key: "operator",name: "运营人员"},
          {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 0,key: "title",name: "商品名称"},
          {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 0,key: "return_nums",name: "退货数量"},
          {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 0,key: "fulfillment_center_id",name: "发货仓库编号"},
          {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 0,key: "reserved_field1", name: "商品状态"},
          {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 0,key: "return_reason",name: "退货原因"},
          {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 0,key: "status",name: "退货状态"},
          {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 0,key: "license_plate_number",name: "LPN编号"},
          {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 0,key: "order_time" ,name: "下单时间"},
          {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 0,key: "return_data",name: "退货时间"},
        ],
        fields:{
          goods_attribute:
            {is_can_setting: 1,
            key: "goods_attribute",
            name: "商品属性",
            child:[
              {check_can_cancel: 0,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 1,key: "order_id",name: "订单编号"},
              {check_can_cancel: 0,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 1,key: "sku",name: "SKU"},
              {check_can_cancel: 0,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 1,is_frozen: 1,key: "asin",name: "ASIN"},
              {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 0,is_frozen: 0,key: "channel_name",name: "店铺名称"},
              {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 0,is_frozen: 0,key: "reserved_field2",name: "FnSKU"},
              {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 0,is_frozen: 0,key: "is_evaluation",name: "是否测评"},
              {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 0,is_frozen: 0,key: "operator",name: "运营人员"},
              {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 0,is_frozen: 0,key: "title",name: "商品名称"}
              ]
            },
          order_returns:{
            is_can_setting: 1,
            key: "order_returns",
            name: "退货属性",
            child:[
              {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 0,is_frozen: 0,key: "return_nums",name: "退货数量"},
              {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 0,is_frozen: 0,key: "fulfillment_center_id",name: "发货仓库编号"},
              {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 0,is_frozen: 0,key: "reserved_field1", name: "商品状态"},
              {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 0,is_frozen: 0,key: "return_reason",name: "退货原因"},
              {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 0,is_frozen: 0,key: "status",name: "退货状态"},
              {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 0,is_frozen: 0,key: "license_plate_number",name: "LPN编号"},
              {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 0,is_frozen: 0,key: "order_time" ,name: "下单时间"},
              {check_can_cancel: 1,frozen_can_cancel: 1,is_checked: 1,is_default: 1,is_default_frozen: 0,is_frozen: 0,key: "return_data",name: "退货时间"}
              ]
          },
        }
      },
    }
  },
  methods:{
    confirm(val){
      console.log('val',val)
    }
  },
}
</script>
```
:::


### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| btn | 按钮名称 | string |  —  | — |
| tab-item | 左侧全部的字段 | Object（各字段对应的名称参考itemParams） | —  | — |
| custom-fields | 右侧选择的字段	| Object	| — | — |
| switch-text | 开关文字描述 |  —  | — |
| is-switch | 左下开关绑定值 | boolean	| —	| false | 

### Slot
| 参数   | 说明    |
|---------- |-------- |
| btn | 按钮 HTML 文本 |

### Events
| 事件名称   | 说明    | 回调参数 |
|---------- |-------- |---------- |
| confirm | 绑定操作区域点击事件 | { ItemKeys, //选中的keys <br>FreezeKeys, //冻结的keys <br>isSwitch, //有左下开关时的绑定值} |


### itemParams
| 参数   | 说明    |
|---------- |-------- |
| is_can_setting | 字段是否展示设置  |
| check_can_cancel | 选中是否可取消  |
| frozen_can_cancel | 冻结是否可删除  |
| is_checked | 是否选中  |
| is_default | 是否默认字段  |
| is_default_frozen | 是否默认冻结  |
| is_frozen | 是否冻结  |
| key | 键名 |
| name | 名称  |