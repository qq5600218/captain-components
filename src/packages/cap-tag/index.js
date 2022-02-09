import capTag from './index.vue';

export const Tag = Object.assign(capTag, {
  install (Vue) {
    Vue.component(capTag.name, capTag)
  }
})

export default Tag
