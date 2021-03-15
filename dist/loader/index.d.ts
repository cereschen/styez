/// <reference types="node" />
import * as webpack from "webpack";
import { OptionObject } from 'loader-utils';
export interface styezConfig extends OptionObject {
    name: string;
}
export default function Webpack(this: webpack.loader.LoaderContext, source: string | Buffer): void;
export declare function getResult(source: string, funcName: string | null): {
    code: string;
    map: import("magic-string").SourceMap;
};
