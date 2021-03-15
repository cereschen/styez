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
Object.defineProperty(exports, "__esModule", { value: true });
exports.styez = exports.transform = exports.oneWordMap = exports.fourMap = exports.OneNumMap = void 0;
var utils_1 = require("./utils");
var OneNumMap;
(function (OneNumMap) {
    OneNumMap["w"] = "width";
    OneNumMap["h"] = "height";
    OneNumMap["lh"] = "line-height";
    OneNumMap["maxh"] = "max-height";
    OneNumMap["minh"] = "min-height";
    OneNumMap["maxw"] = "max-width";
    OneNumMap["mt"] = "margin-top";
    OneNumMap["mb"] = "margin-bottom";
    OneNumMap["ml"] = "margin-left";
    OneNumMap["mr"] = "margin-right";
    OneNumMap["pt"] = "padding-top";
    OneNumMap["pb"] = "padding-bottom";
    OneNumMap["pl"] = "padding-left";
    OneNumMap["pr"] = "padding-right";
    OneNumMap["fz"] = "font-size";
    OneNumMap["t"] = "top";
    OneNumMap["b"] = "bottom";
    OneNumMap["l"] = "left";
    OneNumMap["r"] = "right";
    OneNumMap["zi"] = "z-index";
})(OneNumMap = exports.OneNumMap || (exports.OneNumMap = {}));
var fourMap;
(function (fourMap) {
    fourMap["br"] = "border-radius";
    fourMap["m"] = "margin";
    fourMap["p"] = "padding";
})(fourMap = exports.fourMap || (exports.fourMap = {}));
exports.oneWordMap = {
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
};
function transform() {
    var style = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        style[_i] = arguments[_i];
    }
    return style.map(function (item) {
        var e_1, _a, e_2, _b, e_3, _c;
        var OneNumKeys = Object.keys(OneNumMap).join('|');
        var matchOneNumDY = matchDynamic1(item, OneNumKeys, OneNumMap, ['zi']);
        if (matchOneNumDY)
            return matchOneNumDY;
        var matchOneNumRes = matchOneNum1(item, OneNumKeys, OneNumMap, ['zi']);
        if (matchOneNumRes)
            return matchOneNumRes;
        var matchFourKeys = Object.keys(fourMap).join('|');
        var matchFourDY = matchDynamic1(item, matchFourKeys, fourMap);
        if (matchFourDY)
            return matchFourDY;
        var matchFourRes = matchFour1(item, matchFourKeys, fourMap);
        if (matchFourRes)
            return matchFourRes;
        try {
            for (var _d = __values(Object.entries(exports.oneWordMap)), _e = _d.next(); !_e.done; _e = _d.next()) {
                var _f = __read(_e.value, 2), key = _f[0], value = _f[1];
                var matchOneWordRes = matchOneWord(item, key, value);
                if (matchOneWordRes)
                    return matchOneWordRes;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // const matchOneWordDY = matchDynamic1(item, oneWordKeys, OneNumMap)
        // if (matchOneWordDY) return matchOneWordDY
        var matchFlex = item.match(/^\s*flex:([^]*)\s*$/);
        if (matchFlex) {
            var arr = matchFlex[1].split('-');
            var res = arr.map(function (word, index) {
                var prop = 'flex-';
                if (index === 0) {
                    prop += 'grow';
                    if (word === 'd')
                        return null;
                    return prop + ":" + word;
                }
                if (index === 1) {
                    prop += 'shrink';
                    if (word === 'd')
                        return null;
                    return prop + ":" + word;
                }
                if (index === 2) {
                    prop += 'basis';
                    if (word === 'd')
                        return null;
                    return prop + ":" + word;
                }
            }).filter(Boolean).join('; ');
            return res;
        }
        var matchDisplayFlex = item.match(/^\s*df:?([^]*)\s*$/);
        if (matchDisplayFlex) {
            if (matchDisplayFlex[1]) {
                var arr = matchDisplayFlex[1].split('-');
                var res = arr.map(function (word, index) {
                    var prop = '';
                    if (index === 0) {
                        prop = 'justify-content';
                        switch (word) {
                            case 'c':
                                return prop + ":center";
                            case 's':
                                return prop + ":flex-start";
                            case 'e':
                                return prop + ":flex-end";
                            case 'sa':
                                return prop + ":space-around";
                            case 'sb':
                                return prop + ":space-between";
                            case 'd':
                                return null;
                        }
                    }
                    if (index === 1) {
                        prop = 'align-items';
                        switch (word) {
                            case 'c':
                                return prop + ":center";
                            case 's':
                                return prop + ":flex-start";
                            case 'e':
                                return prop + ":flex-end";
                            case 'd':
                                return null;
                        }
                    }
                    if (index === 2) {
                        prop = 'flex-direction';
                        switch (word) {
                            case 'c':
                                return prop + ":column";
                            case 'cr':
                                return prop + ":column-reverse";
                            case 'r':
                                return prop + ":row";
                            case 'rr':
                                return prop + ":row-reverse";
                            case 'd':
                                return null;
                        }
                    }
                    if (index === 3) {
                        prop = 'flex-wrap';
                        switch (word) {
                            case 'n':
                                return prop + ":nowrap";
                            case 'w':
                                return prop + ":wrap";
                            case 'wr':
                                return prop + ":wrap-reverse";
                            case 'd':
                                return null;
                        }
                    }
                });
                res = res.filter(Boolean);
                return 'display:flex;' + res.join('; ');
            }
            return 'display:flex';
        }
        var matchColor = item.match(/^\s*c:([^]*)\s*$/);
        if (matchColor) {
            var word = matchColor[1];
            if (word === 'w')
                word = '#fff';
            return "color:" + word;
        }
        var matchBackground = item.match(/^\s*bg:([^]*)\s*$/);
        if (matchBackground) {
            var arr = matchBackground[1].split('-');
            var res = '';
            for (var i = 0; i < arr.length; i++) {
                var arri = arr[i];
                if (i === 0) {
                    arri = arri.replace(/^\s*lg/, 'linear-gradient');
                    arri = arri.replace(/;/g, ',');
                    if (arri === 'w')
                        arri = '#fff';
                    res = "background: " + arri;
                    var matchImage = arri.match(/^\s*(url)/);
                    if (!matchImage) {
                        break;
                    }
                    else {
                        if (!arr[1]) {
                            res += 'no-repeat center/cover';
                        }
                    }
                }
                if (i === 1) {
                    if (arri === 'n')
                        res += ' no-repeat';
                    else if (arri === 'r')
                        res += 'r epeat';
                    else if (arri === 'rx')
                        res += ' repeat-x';
                    else if (arri === 'ry')
                        res += ' repeat-y';
                }
                if (i === 2) {
                    if (arri[0] === 't')
                        res += ' top';
                    else if (arri[0] === 'c')
                        res += ' center';
                    else if (arri[0] === 'b')
                        res += ' bottom';
                    else {
                        var matchs = arri.matchAll(/(-?\d+)(px|em|rem|vw|vh|%)?/g);
                        if (matchs) {
                            try {
                                for (var matchs_1 = (e_2 = void 0, __values(matchs)), matchs_1_1 = matchs_1.next(); !matchs_1_1.done; matchs_1_1 = matchs_1.next()) {
                                    var match = matchs_1_1.value;
                                    res += ' ' + match[1] + (match[2] || 'px');
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (matchs_1_1 && !matchs_1_1.done && (_b = matchs_1.return)) _b.call(matchs_1);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                    }
                    if (arri[1]) {
                        if (arri[1] === 'l')
                            res += ' left';
                        else if (arri[1] === 'c')
                            res += ' center';
                        else if (arri[1] === 'r')
                            res += ' right';
                    }
                }
                if (i === 3) {
                    res += '/';
                    if (arri === "cv")
                        res += ' cover';
                    else if (arri === "ct")
                        res += ' contain';
                    else {
                        var matchs = arri.matchAll(/(-?\d+)(px|em|rem|vw|vh|%)?/g);
                        if (matchs) {
                            try {
                                for (var matchs_2 = (e_3 = void 0, __values(matchs)), matchs_2_1 = matchs_2.next(); !matchs_2_1.done; matchs_2_1 = matchs_2.next()) {
                                    var match = matchs_2_1.value;
                                    res += ' ' + match[1] + (match[2] || 'px');
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (matchs_2_1 && !matchs_2_1.done && (_c = matchs_2.return)) _c.call(matchs_2);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                        }
                    }
                }
            }
            return res;
        }
    }).filter(Boolean).join('; ');
}
exports.transform = transform;
function matchFour(item, word, outWord) {
    var re = new RegExp("^\\s*" + word + ":?(?:(-?\\d+)(px|vw|vh|rem|em|%)?|:([^]*?))\\s*$");
    var match = item.match(re);
    if (match) {
        if (match[3]) {
            var arr = match[3].split(' ');
            var res = arr.map(function (item) {
                if (item.match(/\d$/))
                    return item + 'px';
                return item;
            }).join(' ');
            return outWord + ":" + res;
        }
        return outWord + ":" + match[1] + (match[2] || 'px');
    }
    else {
        return null;
    }
}
function matchFour1(item, word, map) {
    var re = new RegExp("^\\s*(" + word + "):?(?:(-?\\d+|a)(px|vw|vh|rem|em|%)?|:([^]*?))\\s*$");
    var match = item.match(re);
    if (match) {
        if (match[4]) {
            var arr = match[4].split(' ');
            var res = arr.map(function (item) {
                if (item.match(/\d$/))
                    return item + (item === '0' ? '' : 'px');
                if (item === 'a')
                    return 'auto';
                return item;
            }).join(' ');
            return map[match[1]] + ":" + res;
        }
        return map[match[1]] + ":" + (match[2] === 'a' ? 'auto' : match[2]) + (match[3] || (match[2] === '0' ? '' : 'px'));
    }
    else {
        return null;
    }
}
function matchDynamic(item, word, outWord, needPx) {
    if (needPx === void 0) { needPx = true; }
    var matchDynamic = item.match(new RegExp("^\\s*" + word + ":([^]*?\\$\\{[^]*?\\}[^]*?(px|vw|vh|rem|em|%)?)\\s*$"));
    if (matchDynamic) {
        return outWord + ":" + matchDynamic[1] + (matchDynamic[2] ? '' : needPx ? 'px' : '');
    }
    return null;
}
function matchDynamic1(item, word, map, pureNum) {
    if (pureNum === void 0) { pureNum = []; }
    var matchDynamic = item.match(new RegExp("^\\s*(" + word + "):([^]*?\\$\\{[^]*?\\}[^]*?(px|vw|vh|rem|em|%)?)\\s*$"));
    if (matchDynamic) {
        return map[matchDynamic[1]] + ":" + matchDynamic[2] + (matchDynamic[3] ? '' : pureNum.includes(matchDynamic[1]) ? '' : 'px');
    }
    return null;
}
function matchOneNum(item, word, outWord, needPx) {
    if (needPx === void 0) { needPx = true; }
    var re = new RegExp("^\\s*" + word + ":?(-?\\d+)(px|vw|vh|rem|em|%)?\\s*$");
    var match = item.match(re);
    if (match) {
        return outWord + ":" + match[1] + (match[2] || (needPx ? 'px' : ''));
    }
    else {
        return null;
    }
}
function matchOneNum1(item, word, map, pureNum) {
    if (pureNum === void 0) { pureNum = []; }
    var re = new RegExp("^\\s*(" + word + "):?(-?\\d+)(px|vw|vh|rem|em|%)?\\s*$");
    var match = item.match(re);
    if (match) {
        return map[match[1]] + ":" + match[2] + (pureNum.includes(match[1]) ? '' : match[3] || (match[2] === '0' ? '' : 'px'));
    }
    else {
        return null;
    }
}
function matchOneWord(item, word, obj) {
    var mapKeys = Object.keys(obj.map).join('|');
    var match = item.match(new RegExp("^\\s*" + word + ":(" + mapKeys + ")\\s*$"));
    if (match) {
        return obj.outWord + ":" + obj.map[match[1]];
    }
    return null;
}
function styez(arr) {
    var arr1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        arr1[_i - 1] = arguments[_i];
    }
    var str = arr.map(function (item, index) {
        return item + (arr1[index] || '');
    }).join('');
    var res = transform.apply(void 0, __spread(str.split(utils_1.reComma)));
    return res ? res + ';' : '';
}
exports.styez = styez;
