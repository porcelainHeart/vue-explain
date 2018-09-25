/* @flow */

import { cached } from 'shared/util'
import { parseFilters } from './filter-parser'
// 匹配默认的分隔符里内容 "{{}}"
const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g
// 匹配默认分隔符
const regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g
// 缓存自定义分隔符
const buildRegex = cached(delimiters => {
  const open = delimiters[0].replace(regexEscapeRE, '\\$&')
  const close = delimiters[1].replace(regexEscapeRE, '\\$&')
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
})

type TextParseResult = {
  expression: string,
  tokens: Array<string | { '@binding': string }>
}
/**
 * 对动态文本内容进行解析
 * 例子: {{ text }}
 * 返回表达式和处理数组并做了filter预处理
 */
export function parseText (
  text: string,
  delimiters?: [string, string]
): TextParseResult | void {
  /**
   * 查看有没有自定义分隔符
   * 有则缓存
   * 没有则用默认的： {{}}
   */
  const tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE
  // 没有匹配文本则直接返回
  if (!tagRE.test(text)) {
    return
  }
  const tokens = []
  const rawTokens = []
  let lastIndex = tagRE.lastIndex = 0
  let match, index, tokenValue
  // 循环匹配本文中的表达式
  while ((match = tagRE.exec(text))) {
    /**
     * 记录开始位置
     * exec：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
     */
    index = match.index
    // push text token
    if (index > lastIndex) {
      // 简化写法可读性一般
      rawTokens.push(tokenValue = text.slice(lastIndex, index))
      tokens.push(JSON.stringify(tokenValue))
    }
    // tag token
    /**
     * 对文本进行filter预处理
     */
    const exp = parseFilters(match[1].trim())
    tokens.push(`_s(${exp})`)
    rawTokens.push({ '@binding': exp })
    lastIndex = index + match[0].length
  }
  // 处理剩下的多余文本
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex))
    tokens.push(JSON.stringify(tokenValue))
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}
