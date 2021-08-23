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

import { ICuteSet, ICallback } from "./types";

class CuteSet<T = unknown> implements ICuteSet<T> {
  private _set: Set<T>;
  [Symbol.iterator]: Function;
  constructor(input?: T) {
    this._set = new Set(asArray(input));

    this[Symbol.iterator] = function* () {
      for (let i of this._set) {
        yield i;
      }
    };
  }

  forEach(cb: Function, thisArg?: any) {
    for (let i of this._set) {
      cb(i, i, thisArg);
    }
  }

  filter(cb: ICallback, thisArg?: any): ICuteSet<T> {
    return asCuteSet(this.toArray().filter(cb, thisArg));
  }

  map(cb: ICallback, thisArg?: any): ICuteSet<T> {
    return asCuteSet(this.toArray().map(cb, thisArg));
  }

  reduce(cb: ICallback, initialValue?: any): unknown {
    return this.toArray().reduce(cb, initialValue);
  }

  static fromString(input: string, delimiter = " ", parseNumbers = false) {
    if (!input || input === " ") {
      return new CuteSet();
    } else if (typeof input !== "string") {
      throw "CuteSet error: input format is invalid, expecting string";
    }

    const inputSplit = input
      .split(delimiter)
      .map((x) => (parseNumbers ? parseFloat(x) : x));

    return new CuteSet(inputSplit);
  }

  union(input: unknown): ICuteSet<unknown> {
    const set = asCuteSet(input);
    return new CuteSet([...this.toArray(), ...set.toArray()]);
  }

  complement(set) {
    set = asCuteSet(set);
    return set.minus(this);
  }

  minus(set) {
    set = asCuteSet(set);
    return new CuteSet(this.toArray().filter((x) => !set.has(x)));
  }

  symmetricDifference(set) {
    set = asCuteSet(set);
    return this.union(set).difference(this.intersection(set));
  }

  intersection(set) {
    set = asCuteSet(set);
    return new CuteSet(this.toArray().filter((x) => set.has(x)));
  }

  isEqual(set) {
    set = asCuteSet(set);
    return this.symmetricDifference(set).length === 0;
  }

  isSubsetOf(set) {
    set = asCuteSet(set);
    return this.intersection(set).equal(this);
  }

  sort(fn) {
    this._set = new Set(this.toArray().sort(fn));
  }

  powerSet() {
    let res = new CuteSet();
    let gen = this.subsetGenerator();
    while (true) {
      let subset = gen.next();
      if (subset.done) break;
      res.add(subset.value);
    }
    return new CuteSet(res);
  }

  *subsets() {
    let set = this.toArray();

    let numCombinations =
      parseInt(
        this._getStringOfSymbols(set.length, "1").split("").reverse().join(""),
        2
      ) + 1;
    let res = [];
    for (let i = 0; i < numCombinations; ++i) {
      let num = i.toString(2);
      num = this._padWithZeroes(num, set.length);
      yield new CuteSet(
        set.filter((val, i) => {
          return num[i] == 1;
        })
      );
    }
  }

  *permutations() {
    let set = this.toArray() as Array<any>;
    let n = set.length as number;
    let c = Array.apply(null, { length: n }).map(Function.call, () => {
      return 0;
    });
    let i = 0;
    yield new CuteSet(set);
    let swap = (i: any, j: any, arr: any) => {
      let t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    };
    while (i < n) {
      if (c[i] < i) {
        i % 2 === 0 ? swap(0, i, set) : swap(c[i], i, set);
        c[i] += 1;
        i = 0;
        yield new CuteSet(set);
      } else {
        c[i] = 0;
        i += 1;
      }
    }
  }

  has(x) {
    return this._set.has(x);
  }

  get length() {
    return this._set.size;
  }

  get size() {
    return this._set.size;
  }

  empty() {
    return this._set.size === 0;
  }

  add(x) {
    this._set.add(x);
  }

  remove(x) {
    return this._set.delete(x);
  }

  delete(x) {
    return this.remove(x);
  }

  toArray() {
    return Array.from(this._set);
  }

  toString(delimiter = " ") {
    return this.toArray().join(delimiter);
  }

  print(delimiter) {
    console.log(this.toString(delimiter) + "\n");
  }

  _padWithZeroes(str, length) {
    if (str.length < length) {
      return this._getStringOfSymbols(length - str.length, "0") + str;
    }
    return str;
  }

  _getStringOfSymbols(length, char) {
    return char.repeat(length);
  }
}

// Returns any passed object as array, except for string.
// If string is passed it is returned as a single entry in array
function asArray(thing?: any): Array<any> {
  if (typeof thing === "string") return [thing];
  if (thing === undefined) return [];

  if (thing?.length !== undefined) {
    return Array.from(thing as ArrayLike<any>);
  }

  return [thing];
}

function asCuteSet<T>(thing: T) {
  return thing instanceof CuteSet ? thing : new CuteSet(asArray(thing));
}

if (typeof module === "object" && module.hasOwnProperty("exports")) {
  module.exports = CuteSet;
}
