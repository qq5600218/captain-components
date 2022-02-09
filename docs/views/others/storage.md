## Cap-bus-baseInfo 用于接收缓存数据

### 说明

通过在项目CaptainBi_VUE 的 topUser 组件中 调用此组件，传递组件库需要的字段并进行存储。


### 目前接收的字段
| 字段      | 说明    | 类型      | 存储位置     | 存储key      |
|---------- |-------- |---------- |---------- | ---------- |
| baseInfo | 接口get_all_base_info返回的值 | Object | localStorage | captainbi_components-vuex |
| tagsView | 路由信息 | Object | sessionStorage | captainbi_components-vuex |



