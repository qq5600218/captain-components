# 安装教程  

## npm设置代理

```
# npm
npm set registry http://172.16.11.174:3000
```

## 安装
```
# npm
npm install --save-dev captainbi_components
```
## 更新
```
# npm
npm install  --save-dev captainbi_components@x.x.x  //添加最新的版本号
```

## 全局引入(非必要情况不使用)
main.js中引入
```
import captainbi_components from "captainbi_components";
Vue.use(captainbi_components)
```

## 按需引入(推荐使用)
单独页面中引入
```
import { CapBaseButton } from "captainbi_components";
```