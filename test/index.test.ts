import { OneNumMap } from "../src/index"
import { getResult } from "../src/loader"

const keys = Object.keys(OneNumMap) as (keyof typeof OneNumMap)[];
// (keys).map((item) => {
//   const suffixs = ['', 'px', 'rem', 'em', 'vw', 'vh', '%']
//   const exclude = ['zi']
//   test(`tramsfrom ${OneNumMap[item]}`,
//     () => {
//       suffixs.map(suffix => {
//         const num = (Math.random() * 1000).toFixed(0)
//         const code = `$se\`${item}${num}${suffix}\``
//         expect(getResult(code, '\\$se').code).toBe(`\`${OneNumMap[item]}:${num}${exclude.includes(item) ? '' : (suffix || (num === '0' ? '' : 'px'))};\``)
//       })
//     })
// })

test('随缘测试', () => {
  const code = "$se`h-100vw, w20`"
  expect(getResult(code, '\\$se').code).toBe("`height:-100vw; width:20px;`")
})


