/* @flow */

import { makeMap } from 'shared/util'

export const isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
)

// Elements that you can, intentionally, leave open
// (and which close themselves)
/**
 * 可以不需要闭合标签如(<p>123123)  注：浏览器的html解析会自动带上闭合有待查找相关资料
 */
export const canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
)

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
/**
 * 不是短语文本的的html标签
 * 短语如 文字能在一个句子里所以文字是短语
 * 详细介绍 https://stackoverflow.com/questions/30233447/what-is-the-difference-between-phrasing-content-and-flow-content
 */
export const isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
)
