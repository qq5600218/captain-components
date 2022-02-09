const path = require('path')
module.exports = { 
    title: 'Captain组件库',
    description: '欢迎来到Captain',
    palette: path.resolve(__dirname, 'palette.styl'),
    plugins: ['demo-container'],
    configureWebpack: {
        resolve: {
            alias: {
            '@': '../../src'
            }
        }
    },
    locales: {
        '/': {
            lang: 'zh-CN',
        }
    },
    themeConfig:{   
        logo: '/images/logo.png',
        sidebar:[
            { title: "安装",path: '/views/guide'},
            { title: "基础组件", collapsable: true,sidebarDepth: 2,
                children: [
                {
                    title: '按钮',
                    path: '/views/base/button'
                },
                {
                    title: '文字链接',
                    path: '/views/base/link'
                },
                {
                    title: '下拉菜单',
                    path: '/views/base/dropdown'
                },
                {
                    title: '输入框',
                    path: '/views/base/input'
                },
                {
                    title: '下拉框',
                    path: '/views/base/select'
                },
                {
                    title: '开关',
                    path: '/views/base/switch'
                },
                {
                    title: '日期选择器',
                    path: '/views/base/datePicker'
                },
                {
                    title: '分页器',
                    path: '/views/base/pagination'
                },
                {
                    title: '表格',
                    path: '/views/base/table'
                },
            ]},
            { title: "业务组件", collapsable: true,
            children: [
                {
                    title: '标题区域',
                    path: '/views/business/head'
                },
                {
                    title: '更新时间',
                    path: '/views/business/updateTime'
                },
                {
                    title: '店铺选择器',
                    path: '/views/business/store'
                },
                {
                    title: '搜索框',
                    path: '/views/business/search'
                },
                {
                    title: '基本配置',
                    path: '/views/business/basicConfig'
                },
                {
                    title: '帮助浮层',
                    path: '/views/business/helpLayer'
                }
            ]},
            { title: "其他",collapsable: true,children: [
                {
                    title: '数据缓存',
                    path: '/views/others/storage'
                }]
            },
            { title: "版本更新",path: '/views/version'},
        ]     
    }
}
