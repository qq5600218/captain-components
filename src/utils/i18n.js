const messages = {
    'zh-cn':{
      common:{
        new_cpc_captain_bifull_name:'CaptainBI船长BI后台系统',
        new_cpc_all_store:'全部店铺',
        new_cpc_loading:'加载中',
        new_cpc_login_again:'重新登录',
        new_cpc_loginout:'退出',
        new_cpc_data_overview:'数据概览',
        new_cpc_adanalysis:'广告分析',
        new_cpc_ad_manger:'广告管理',
        new_cpc_intelligent_tool:'智能工具',
        new_cpc_offline_notice:'下线通知'
      },
      tips:{
        new_cpc_tips_0030:'因长时间未进行任何操作，您已退出登录，请重新登录'
      },
      sbv:{
      }
      ,
      intelligent:{
        new_cpc_operation_log:'操作日志'
      }
    },
    'vi-vn':{
      common:{
        new_cpc_captain_bifull_name:'Hệ thống nền Captain BI',
        new_cpc_all_store:'Toàn bộ cửa hàng',
        new_cpc_loading:'Đang tải',
        new_cpc_login_again:'Đăng nhập lại',
        new_cpc_loginout:'Thoát ra',
        new_cpc_data_overview:'Tổng quan dữ liệu',
        new_cpc_adanalysis:'Phân tích quảng cáo',
        new_cpc_ad_manger:'Quản lý quảng cáo',
        new_cpc_intelligent_tool:'Công cụ thông minh',
        new_cpc_offline_notice:'Thông báo ngoại tuyến'
      },
      tips:{
        new_cpc_tips_0030:'Bạn đã đăng xuất  không thực hiện thao tác nào trong thời gian dài, vui lòng đăng nhập lại'
      },
      sbv:{
      },
      intelligent:{
        new_cpc_operation_log:'Nhật ký thao tác'
      }
    }
  }
  
const i18n = new VueI18n({
  locale: process.env.VUE_APP_LANG || 'zh-cn',
  messages,
  // 隐藏警告
  silentTranslationWarn: true
})

export default i18n