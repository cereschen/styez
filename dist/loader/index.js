"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResult = void 0;
var index_1 = require("../index");
var loader_utils_1 = require("loader-utils");
var magic_string_1 = __importDefault(require("magic-string"));
var utils_1 = require("../utils");
function Webpack(source) {
    var options = loader_utils_1.getOptions(this);
    if (typeof source === "string") {
        var result = getResult(source, options.name);
        //@ts-ignore  source-map type
        this.callback(null, result.code, this.sourceMap ? result.map : undefined);
    }
    return;
}
exports.default = Webpack;
function getResult(source, funcName) {
    var e_1, _a;
    var s = new magic_string_1.default(source);
    var str = funcName || '\\$styez';
    var matchs = source.matchAll(new RegExp(str + "`([^]*?)`", 'g'));
    try {
        for (var matchs_1 = __values(matchs), matchs_1_1 = matchs_1.next(); !matchs_1_1.done; matchs_1_1 = matchs_1.next()) {
            var match = matchs_1_1.value;
            if (match.index !== undefined) {
                var res = index_1.transform.apply(void 0, __spread(match[1].split(utils_1.reComma)));
                s.overwrite(match.index, match.index + match[0].length, '`' + (res ? res + ';' : '') + '`');
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (matchs_1_1 && !matchs_1_1.done && (_a = matchs_1.return)) _a.call(matchs_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return { code: s.toString(), map: s.generateMap() };
}
exports.getResult = getResult;
