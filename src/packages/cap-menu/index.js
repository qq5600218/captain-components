import capMenu from './index.vue';

export const Menu = Object.assign(capMenu, {
  install (Vue) {
    Vue.component(capMenu.name, capMenu)
  }
})

export default Menu
