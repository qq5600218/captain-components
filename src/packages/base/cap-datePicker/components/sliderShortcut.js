import Vue from 'vue'
import sliderShortcut from './sliderShortcut.vue'
import { addClass } from '../../../../utils/index'
// let _el = null
let _elinstance = null
const SliderShortcut = Vue.extend(sliderShortcut)
const show = ((className,opt={},fn) => {  
  const instance = new SliderShortcut(opt).$mount()
  const el = instance.$el
  const parent = document.body.querySelector(className)
  const wrapper = parent.querySelector('.el-picker-panel__body-wrapper')
  const sidebar = wrapper.querySelector('.el-picker-panel__sidebar:not(.dateWrap)')
  addClass(wrapper, 'has-sidebar')
  if(sidebar) addClass(wrapper, 'single')
  if(wrapper){  
    wrapper.prepend(el);  
  }
  // _el = BtnInstance
  _elinstance = instance
  // fn&&fn(instance)
});
export default {
  methods:{
    showDateModal(className,shortcutIndext,handlerName,dateType,shortcutIds,shortcutList){  
      show(className,{
        data() {
            return {             
              shortcutIndext,
              dateType,
              shortcutIds,
              shortcutList
            }
        },
        methods:{
          callback(id,obj){           
            handlerName && handlerName(id,obj);           
          },
          // click(){  
          //   comfrimFn && comfrimFn();           
          // },          
        }  
      })  
    },
    delDatePickEl(){
      if(_elinstance){
        _elinstance.$el.remove()
      }
    }     
  }
}