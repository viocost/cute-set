"use strict";
// MIT License
//
// Copyright (c) 2018 KONSTANTIN Y. RYBAKOV
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CuteSet = /** @class */ (function () {
    function CuteSet(input) {
        this._set = new Set(asArray(input));
        this[Symbol.iterator] = function () {
            var _i, _a, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this._set;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        i = _a[_i];
                        return [4 /*yield*/, i];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        };
    }
    CuteSet.prototype.forEach = function (cb, thisArg) {
        for (var _i = 0, _a = this._set; _i < _a.length; _i++) {
            var i = _a[_i];
            cb(i, i, thisArg);
        }
    };
    CuteSet.prototype.filter = function (cb, thisArg) {
        return asCuteSet(this.toArray().filter(cb, thisArg));
    };
    CuteSet.prototype.map = function (cb, thisArg) {
        return asCuteSet(this.toArray().map(cb, thisArg));
    };
    CuteSet.prototype.reduce = function (cb, initialValue) {
        return this.toArray().reduce(cb, initialValue);
    };
    CuteSet.fromString = function (input, delimiter, parseNumbers) {
        if (delimiter === void 0) { delimiter = " "; }
        if (parseNumbers === void 0) { parseNumbers = false; }
        if (!input || input === " ") {
            return new CuteSet();
        }
        else if (typeof input !== "string") {
            throw "CuteSet error: input format is invalid, expecting string";
        }
        input = input.split(delimiter);
        if (parseNumbers) {
            input = input.map(function (val) {
                return parseFloat(val);
            });
        }
        return new CuteSet(input);
    };
    CuteSet.prototype.union = function (input) {
        var set = asCuteSet(input);
        return new CuteSet(__spreadArray(__spreadArray([], this.toArray()), set.toArray()));
    };
    CuteSet.prototype.join = function (set) {
        return this.union(set);
    };
    CuteSet.prototype.difference = function (set) {
        set = asCuteSet(set);
        return new CuteSet(this.toArray().filter(function (x) { return !set.has(x); }));
    };
    CuteSet.prototype.complement = function (set) {
        set = asCuteSet(set);
        return set.minus(this);
    };
    CuteSet.prototype.minus = function (set) {
        return this.difference(set);
    };
    CuteSet.prototype.symmetricDifference = function (set) {
        set = asCuteSet(set);
        return this.union(set).difference(this.intersection(set));
    };
    CuteSet.prototype.intersection = function (set) {
        set = asCuteSet(set);
        return new CuteSet(this.toArray().filter(function (x) { return set.has(x); }));
    };
    CuteSet.prototype.equal = function (set) {
        set = asCuteSet(set);
        return this.symmetricDifference(set).length === 0;
    };
    CuteSet.prototype.subsetOf = function (set) {
        set = asCuteSet(set);
        return this.intersection(set).equal(this);
    };
    CuteSet.prototype.sort = function (fn) {
        this._set = new Set(this.toArray().sort(fn));
    };
    CuteSet.prototype.powerSet = function () {
        var res = new CuteSet();
        var gen = this.subsetGenerator();
        while (true) {
            var subset = gen.next();
            if (subset.done)
                break;
            res.add(subset.value);
        }
        return new CuteSet(res);
    };
    CuteSet.prototype.subsetGenerator = function () {
        var set, numCombinations, res, _loop_1, this_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    set = this.toArray();
                    numCombinations = parseInt(this._getStringOfSymbols(set.length, "1").split("").reverse().join(""), 2) + 1;
                    res = [];
                    _loop_1 = function (i) {
                        var num;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    num = i.toString(2);
                                    num = this_1._padWithZeroes(num, set.length);
                                    return [4 /*yield*/, new CuteSet(set.filter(function (val, i) {
                                            return num[i] == 1;
                                        }))];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    this_1 = this;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < numCombinations)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    ++i;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    CuteSet.prototype.permutations = function () {
        if (this.length > 9) {
            throw "Maximum supported length for generating permutations is exceeded.";
        }
        var res = new CuteSet();
        var gen = this.permutationGenerator();
        while (true) {
            var perm = gen.next();
            if (perm.done)
                break;
            res.add(perm.value);
        }
        return res;
    };
    CuteSet.prototype.permutationGenerator = function () {
        var set, n, c, i, swap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    set = this.toArray();
                    n = set.length;
                    c = Array.apply(null, { length: n }).map(Function.call, function () {
                        return 0;
                    });
                    i = 0;
                    return [4 /*yield*/, new CuteSet(set)];
                case 1:
                    _a.sent();
                    swap = function (i, j, arr) {
                        var t = arr[i];
                        arr[i] = arr[j];
                        arr[j] = t;
                    };
                    _a.label = 2;
                case 2:
                    if (!(i < n)) return [3 /*break*/, 6];
                    if (!(c[i] < i)) return [3 /*break*/, 4];
                    i % 2 === 0 ? swap(0, i, set) : swap(c[i], i, set);
                    c[i] += 1;
                    i = 0;
                    return [4 /*yield*/, new CuteSet(set)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    c[i] = 0;
                    i += 1;
                    _a.label = 5;
                case 5: return [3 /*break*/, 2];
                case 6: return [2 /*return*/];
            }
        });
    };
    CuteSet.prototype.has = function (x) {
        return this._set.has(x);
    };
    Object.defineProperty(CuteSet.prototype, "length", {
        get: function () {
            return this._set.size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CuteSet.prototype, "size", {
        get: function () {
            return this._set.size;
        },
        enumerable: false,
        configurable: true
    });
    CuteSet.prototype.empty = function () {
        return this._set.size === 0;
    };
    CuteSet.prototype.add = function (x) {
        this._set.add(x);
    };
    CuteSet.prototype.remove = function (x) {
        return this._set.delete(x);
    };
    CuteSet.prototype.delete = function (x) {
        return this.remove(x);
    };
    CuteSet.prototype.toArray = function () {
        return Array.from(this._set);
    };
    CuteSet.prototype.toString = function (delimiter) {
        if (delimiter === void 0) { delimiter = " "; }
        return this.toArray().join(delimiter);
    };
    CuteSet.prototype.print = function (delimiter) {
        console.log(this.toString(delimiter) + "\n");
    };
    CuteSet.prototype._padWithZeroes = function (str, length) {
        if (str.length < length) {
            return this._getStringOfSymbols(length - str.length, "0") + str;
        }
        return str;
    };
    CuteSet.prototype._getStringOfSymbols = function (length, char) {
        return char.repeat(length);
    };
    return CuteSet;
}());
// Returns any passed object as array, except for string.
// If string is passed it is returned as a single entry in array
function asArray(thing) {
    if (typeof thing === "string")
        return [thing];
    return thing ? (thing[Symbol.iterator] ? Array.from(thing) : [thing]) : [];
}
function asCuteSet(thing) {
    return thing instanceof CuteSet ? thing : new CuteSet(asArray(thing));
}
if (typeof module === "object" && module.hasOwnProperty("exports")) {
    module.exports = CuteSet;
}
