import { reComma } from "./utils"
export enum OneNumMap {
  'w' = 'width',
  'h' = 'height',
  'lh' = 'line-height',
  'maxh' = 'max-height',
  'minh' = 'min-height',
  'maxw' = 'max-width',
  'mt' = 'margin-top',
  'mb' = 'margin-bottom',
  'ml' = 'margin-left',
  'mr' = 'margin-right',
  'pt' = 'padding-top',
  'pb' = 'padding-bottom',
  'pl' = 'padding-left',
  'pr' = 'padding-right',
  'fz' = 'font-size',
  't' = 'top',
  'b' = 'bottom',
  'l' = 'left',
  'r' = 'right',
  'zi' = 'z-index'
}

export enum fourMap {
  'br' = 'border-radius',
  'm' = 'margin',
  'p' = 'padding'
}
export const oneWordMap = {
  'pos': {
    outWord: 'position', map: { 'a': 'absolute', 'r': 'relative', 'f': 'fixed' }
  },
  'us': {
    outWord: 'user-select', map: { 'a': 'auto', 'n': 'none', 'all': 'all', 't': 'text', 'c': 'contain' }
  },
  'pe': {
    outWord: 'pointer-events', map: { 'a': 'auto', 'n': 'none' }
  },
  'cur': {
    outWord: 'cursor', map: { 'p': 'pointer', 'pg': 'progress', 'n': 'none', 'd': 'default', 'm': 'move' }
  },
  'ta': {
    outWord: 'text-align', map: { 'l': 'left', 'r': 'right', 'c': 'center', 'j': 'justify', 'i': 'inhert' }
  }
}

export function transform(...style: string[]) {
  return style.map(item => {
    const OneNumKeys = Object.keys(OneNumMap).join('|')
    const matchOneNumDY = matchDynamic1(item, OneNumKeys, OneNumMap, ['zi'])
    if (matchOneNumDY) return matchOneNumDY

    const matchOneNumRes = matchOneNum1(item, OneNumKeys, OneNumMap, ['zi'])
    if (matchOneNumRes) return matchOneNumRes

    const matchFourKeys = Object.keys(fourMap).join('|')
    const matchFourDY = matchDynamic1(item, matchFourKeys, fourMap)
    if (matchFourDY) return matchFourDY

    const matchFourRes = matchFour1(item, matchFourKeys, fourMap)
    if (matchFourRes) return matchFourRes

    for (let [key, value] of Object.entries(oneWordMap)) {
      const matchOneWordRes = matchOneWord(item, key, value)
      if (matchOneWordRes) return matchOneWordRes
    }
    // const matchOneWordDY = matchDynamic1(item, oneWordKeys, OneNumMap)
    // if (matchOneWordDY) return matchOneWordDY


    const matchFlex = item.match(/^\s*flex:([^]*)\s*$/)
    if (matchFlex) {
      const arr = matchFlex[1].split('-')
      const res = arr.map((word: string, index: number) => {
        let prop = 'flex-'
        if (index === 0) {
          prop += 'grow'
          if (word === 'd') return null
          return `${prop}:${word}`
        }
        if (index === 1) {
          prop += 'shrink'
          if (word === 'd') return null
          return `${prop}:${word}`
        }
        if (index === 2) {
          prop += 'basis'
          if (word === 'd') return null
          return `${prop}:${word}`
        }
      }).filter(Boolean).join('; ')

      return res
    }

    const matchDisplayFlex = item.match(/^\s*df:?([^]*)\s*$/)
    if (matchDisplayFlex) {
      if (matchDisplayFlex[1]) {
        const arr = matchDisplayFlex[1].split('-')
        let res = arr.map((word: string, index: number) => {
          let prop = ''
          if (index === 0) {
            prop = 'justify-content'
            switch (word) {
              case 'c':
                return `${prop}:center`
              case 's':
                return `${prop}:flex-start`
              case 'e':
                return `${prop}:flex-end`
              case 'sa':
                return `${prop}:space-around`
              case 'sb':
                return `${prop}:space-between`
              case 'd':
                return null
            }
          }
          if (index === 1) {
            prop = 'align-items'
            switch (word) {
              case 'c':
                return `${prop}:center`
              case 's':
                return `${prop}:flex-start`
              case 'e':
                return `${prop}:flex-end`
              case 'd':
                return null
            }
          }

          if (index === 2) {
            prop = 'flex-direction'
            switch (word) {
              case 'c':
                return `${prop}:column`
              case 'cr':
                return `${prop}:column-reverse`
              case 'r':
                return `${prop}:row`
              case 'rr':
                return `${prop}:row-reverse`
              case 'd':
                return null
            }
          }
          if (index === 3) {
            prop = 'flex-wrap'
            switch (word) {
              case 'n':
                return `${prop}:nowrap`
              case 'w':
                return `${prop}:wrap`
              case 'wr':
                return `${prop}:wrap-reverse`
              case 'd':
                return null
            }
          }
        })
        res = res.filter(Boolean)
        return 'display:flex;' + res.join('; ')
      }

      return 'display:flex'
    }

    const matchColor = item.match(/^\s*c:([^]*)\s*$/)
    if (matchColor) {
      let word = matchColor[1]
      if (word === 'w') word = '#fff'
      return `color:${word}`
    }


    const matchBackground = item.match(/^\s*bg:([^]*)\s*$/)

    if (matchBackground) {

      const arr = matchBackground[1].split('-')
      let res = ''
      for (let i = 0; i < arr.length; i++) {
        let arri = arr[i]
        if (i === 0) {
          arri = arri.replace(/^\s*lg/, 'linear-gradient')
          arri = arri.replace(/;/g, ',')
          if (arri === 'w') arri = '#fff'
          res = `background: ${arri}`
          let matchImage = arri.match(/^\s*(url)/)
          if (!matchImage) {
            break
          } else {
            if (!arr[1]) {
              res += 'no-repeat center/cover'
            }
          }
        }
        if (i === 1) {
          if (arri === 'n') res += ' no-repeat'
          else if (arri === 'r') res += 'r epeat'
          else if (arri === 'rx') res += ' repeat-x'
          else if (arri === 'ry') res += ' repeat-y'
        }
        if (i === 2) {
          if (arri[0] === 't') res += ' top'
          else if (arri[0] === 'c') res += ' center'
          else if (arri[0] === 'b') res += ' bottom'
          else {
            let matchs = arri.matchAll(/(-?\d+)(px|em|rem|vw|vh|%)?/g)
            if (matchs) {
              for (let match of matchs)
                res += ' ' + match[1] + (match[2] || 'px')
            }
          }
          if (arri[1]) {
            if (arri[1] === 'l') res += ' left'
            else if (arri[1] === 'c') res += ' center'
            else if (arri[1] === 'r') res += ' right'
          }
        }
        if (i === 3) {
          res += '/'
          if (arri === "cv") res += ' cover'
          else if (arri === "ct") res += ' contain'
          else {
            let matchs = arri.matchAll(/(-?\d+)(px|em|rem|vw|vh|%)?/g)
            if (matchs) {
              for (let match of matchs) {
                res += ' ' + match[1] + (match[2] || 'px')
              }
            }
          }
        }
      }
      return res
    }


  }).filter(Boolean).join('; ')
}

function matchFour(item: string, word: string, outWord: string) {
  let re = new RegExp(`^\\s*${word}:?(?:(-?\\d+)(px|vw|vh|rem|em|%)?|:([^]*?))\\s*$`)
  let match = item.match(re)
  if (match) {
    if (match[3]) {
      let arr = match[3].split(' ')
      let res = arr.map(item => {
        if (item.match(/\d$/)) return item + 'px'
        return item
      }).join(' ')
      return `${outWord}:${res}`
    }
    return `${outWord}:${match[1]}${match[2] || 'px'}`
  } else {
    return null
  }
}
function matchFour1(item: string, word: string, map: Record<string, string>) {
  const re = new RegExp(`^\\s*(${word}):?(?:(-?\\d+|a)(px|vw|vh|rem|em|%)?|:([^]*?))\\s*$`)
  const match = item.match(re)
  if (match) {
    if (match[4]) {
      let arr = match[4].split(' ')
      let res = arr.map(item => {
        if (item.match(/\d$/)) return item + (item === '0' ? '' : 'px')
        if (item === 'a') return 'auto'
        return item
      }).join(' ')
      return `${map[match[1]]}:${res}`
    }
    return `${map[match[1]]}:${match[2] === 'a' ? 'auto' : match[2]}${match[3] || (match[2] === '0' ? '' : 'px')}`
  } else {
    return null
  }
}

function matchDynamic(item: string, word: string, outWord: string, needPx = true) {
  const matchDynamic = item.match(new RegExp(`^\\s*${word}:([^]*?\\$\\{[^]*?\\}[^]*?(px|vw|vh|rem|em|%)?)\\s*$`))
  if (matchDynamic) {
    return `${outWord}:${matchDynamic[1]}${matchDynamic[2] ? '' : needPx ? 'px' : ''}`
  }
  return null
}
function matchDynamic1(item: string, word: string, map: Record<string, string>, pureNum: string[] = []) {
  const matchDynamic = item.match(new RegExp(`^\\s*(${word}):([^]*?\\$\\{[^]*?\\}[^]*?(px|vw|vh|rem|em|%)?)\\s*$`))
  if (matchDynamic) {
    return `${map[matchDynamic[1]]}:${matchDynamic[2]}${matchDynamic[3] ? '' : pureNum.includes(matchDynamic[1]) ? '' : 'px'}`
  }
  return null
}

function matchOneNum(item: string, word: string, outWord: string, needPx = true) {
  const re = new RegExp(`^\\s*${word}:?(-?\\d+)(px|vw|vh|rem|em|%)?\\s*$`)
  const match = item.match(re)
  if (match) {
    return `${outWord}:${match[1]}${match[2] || (needPx ? 'px' : '')}`
  } else {
    return null
  }
}
function matchOneNum1(item: string, word: string, map: Record<string, string>, pureNum: string[] = []) {
  const re = new RegExp(`^\\s*(${word}):?(-?\\d+)(px|vw|vh|rem|em|%)?\\s*$`)
  const match = item.match(re)
  if (match) {
    return `${map[match[1]]}:${match[2]}${pureNum.includes(match[1]) ? '' : match[3] || (match[2] === '0' ? '' : 'px')}`
  } else {
    return null
  }
}

function matchOneWord(item: string, word: string, obj: Record<string, any>) {
  const mapKeys = Object.keys(obj.map).join('|')

  const match = item.match(new RegExp(`^\\s*${word}:(${mapKeys})\\s*$`))

  if (match) {
    return `${obj.outWord}:${obj.map[match[1]]}`
  }
  return null
}

export function styez(arr: TemplateStringsArray, ...arr1: unknown[]) {
  const str = arr.map((item, index) => {
    return item + (arr1[index] || '')
  }).join('')
  const res = transform(...str.split(reComma))
  return res ? res + ';' : ''
}
