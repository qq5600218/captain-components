### 组件开发指南
1. 注册
* <small>把npm源指向自己搭建的npm私有仓库</small>
```
npm set registry http://172.16.11.174:3000
```
* <small>注册用户</small>
```
npm adduser –registry http://172.16.11.174:3000
```     
2. 代码规范
* <small>http://wiki.captainbi.com/pages/viewpage.action?pageId=755862</small><br>
* <small>命名规则</small><br>
  <small>基础组件：Cap-base-button /CapBaseButton</small><br>
  <small>业务组件：Cap-bus-store /CapBusStore</small>
3. 目录说明<br>

```
-docs        组件文档
--.vuepress  配置信息
--views      内容展示
-src
--assets     静态资源
---css       样式
---images    图片
--packages   组件
---base      公用组件
---business  业务组件
``` 
5. 文档撰写
* <small>使用[vuepress](https://vuepress.vuejs.org/zh/)插件</small>
* <small>运行</small>
```
npm run docs:dev
```
* <small>部署</small>
```
npm run docs:build
```
4. 发布
* <small>拉取代码 git pull</small>
* <small>在package.json修改版本号version</small>
* <small>提交代码 git push</small>
* <small>打包 npm run lib</small>
* <small>npm publish发布包</small>
```
npm publish           #已经切换到我们私服地址的情况下
npm publish --registry http://172.16.11.174:3000   #未切换到我们的私服时，直接加后缀可以发布到私服上。
```
5. 注意事项
 * <small>开发组件需严谨思考，包含应用场景限定，组件最小粒度，通用功能抽离，交互体验，边界值等。</small>
 * <small>需详细自测，在本地验证通过后才可发布。</small>
 * <small>开发完组件务必详细撰写组件文档。</small>
