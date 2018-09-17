/* @flow */

import { inBrowser } from 'core/util/index'

// check whether current browser encodes a char inside attribute values
/**
 * 检查在浏览器环境时是否需要编码
 */
let div
function getShouldDecode (href: boolean): boolean {
  div = div || document.createElement('div')
  div.innerHTML = href ? `<a href="\n"/>` : `<div a="\n"/>`
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
/**
 * 兼容IE对于换行符的处理
 * 所以问题似乎是IE / Edge将Line Feeds转换为HTML实体，而其他浏览器则没有。
 */
export const shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false
// #6828: chrome encodes content in a[href]
/**
 * 同上对于Chrome 制表符或换行符处理
 * 案例见：https://codepen.io/MimyyMs/pen/Jrmgde
 */
export const shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false
