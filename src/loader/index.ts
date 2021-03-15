import * as webpack from "webpack"
import { transform } from "../index";
import { getOptions, OptionObject } from 'loader-utils';
import { default as ms } from "magic-string"
import { reComma } from "../utils";




export interface styezConfig extends OptionObject {
  name: string,
}


export default function Webpack(
  this: webpack.loader.LoaderContext,
  source: string | Buffer
) {
  let options: styezConfig = getOptions(this) as styezConfig;
  if (typeof source === "string") {
    let result = getResult(source, options.name)
    //@ts-ignore  source-map type
    this.callback(null, result.code, this.sourceMap ? result.map : undefined)
  }
  return
}

export function getResult(source: string, funcName: string | null) {
  let s = new ms(source)
  let str = funcName || '\\$styez'

  let matchs = source.matchAll(new RegExp(`${str}\`([^]*?)\``, 'g'))
  for (let match of matchs) {
    if (match.index !== undefined) {
      let res = transform(...match[1].split(reComma))
      s.overwrite(match.index, match.index + match[0].length, '`' + (res ? res + ';' : '') + '`')
    }
  }


  return { code: s.toString(), map: s.generateMap() }
}
