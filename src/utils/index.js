
/* istanbul ignore next */
export function hasClass(el, cls) {
  if (!el || !cls) return false;
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
  if (el.classList)
    return el.classList.contains(cls);
  else
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
};

/* istanbul ignore next */
export function addClass(el, cls) {
  if (!el) return;
  var curClass = el.className;
  var classes = (cls || '').split(' ');

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList)
      el.classList.add(clsName);
    else if (!hasClass(el, clsName))
      curClass += ' ' + clsName;
  }
  if (!el.classList)
    el.className = curClass;
};

/* istanbul ignore next */
export function removeClass(el, cls) {
  if (!el || !cls) return;
  var classes = cls.split(' ');
  var curClass = ' ' + el.className + ' ';

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i];
    if (!clsName) continue;

    if (el.classList)
      el.classList.remove(clsName);
    else if (hasClass(el, clsName))
      curClass = curClass.replace(' ' + clsName + ' ', ' ');
  }
  if (!el.classList)
    el.className = trim(curClass);
}
/*
 * 获取vnode style
 * el        当前VUE实例
 * sty       需要获取的样式属性名 array ，默认获取完样式属性名后将其移除  
 * saveSty   不需要移除的样式属性名  array
 */
export function getStyle(el,sty,saveSty){
  let cur = el.$vnode.data.staticStyle
  if(!cur) return undefined
  const obj = {}
  sty.forEach(item => {
    if(cur[item]){
      obj[item] = cur[item]
      if(!item.includes(saveSty)) delete cur[item]
    }
  });
  return Object.keys(obj).length == 0 ? undefined : obj
}
/*
 * 获取vnode style
 * el   当前dom元素
 * sty  需要赋值的样式 Obejct
 */
export function setStyle(el,sty){
  if(!sty) return
  Object.keys(sty).forEach(item => {
    el.style[item] = sty[item]
  })
}