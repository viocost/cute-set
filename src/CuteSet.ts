import { ICuteSet, CuteSetInput } from "./types";

export default class CuteSet<T = any> implements ICuteSet {
  private _set: Set<T>;

  [Symbol.iterator]: () => Generator<T, void, any> = function* (
    this: CuteSet<T>
  ) {
    for (let i of this._set) {
      yield i;
    }
  };

  readonly [n: number]: T;

  constructor(input?: CuteSetInput) {
    this._set = new Set(asArray(input));
  }

  union(...args: CuteSetInput<T>[]): ICuteSet<T> {
    return args.reduce((acc: ICuteSet<T>, i) => acc._unionOne(i), this);
  }

  _unionOne(input: CuteSetInput<T>): ICuteSet<T> {
    return new CuteSet<T>([...this, ...asCuteSet<T>(input)]);
  }

  minus(...args: CuteSetInput<T>[]): ICuteSet<T> {
    return this._minusOne(new CuteSet().union(...args));
  }

  _minusOne(input: CuteSetInput): ICuteSet<T> {
    const inputSet = asCuteSet<T>(input);
    return new CuteSet<T>(this.toArray().filter((x) => !inputSet.has(x)));
  }

  intersection(...args: CuteSetInput<T>[]): ICuteSet<T> {
    if (args.length === 0) {
      return new CuteSet<T>();
    }

    return args.reduce((acc: ICuteSet<T>, i) => acc._intersectionOne(i), this);
  }

  _intersectionOne(input: CuteSetInput<T>): ICuteSet<T> {
    const inputSet = asCuteSet<T>(input);
    return new CuteSet<T>(this.toArray().filter((item) => inputSet.has(item)));
  }

  complement(universalSet: CuteSetInput<T>): ICuteSet<T> {
    return asCuteSet<T>(universalSet).minus(this);
  }

  symmetricDifference(input: CuteSetInput<T>) {
    const normalized = asCuteSet(input);
    return this.union(normalized).minus(this.intersection(normalized));
  }

  toArray(): Array<T> {
    return Array.from(this._set);
  }

  add(element: T) {
    this._set.add(element);
  }

  delete(element: T) {
    this._set.delete(element);
  }

  has(candidate: T) {
    return this._set.has(candidate);
  }

  isEqual(candidate?: CuteSetInput<T>) {
    const normalized = asCuteSet(candidate);

    if (this.length === 0 && normalized.length === 0) {
      return true;
    }

    return this.toArray().reduce(
      (acc, item) => acc && normalized.has(item),
      normalized.length === this.length
    ) as boolean;
  }

  isSubsetOf(candidate: CuteSetInput<T>) {
    const normalized = asCuteSet(candidate);
    return this.reduce(
      (res, item) => res && normalized.has(item),
      this.length <= normalized.length
    ) as boolean;
  }

  isDisjoint(candidate?: CuteSetInput<T>) {
    const normalized = asCuteSet(candidate);

    if (this.length === 0 || normalized.length === 0) {
      return true;
    }

    return this.reduce(
      (res, item) => (res as unknown as boolean) && !normalized.has(item),
      true as boolean
    ) as boolean;
  }

  map<U>(cb: (value: T, index: number, array: T[]) => U, thisArg?: any) {
    return asCuteSet<U>(this.toArray().map(cb, thisArg));
  }

  reduce<U = T>(
    cb: (previousValue: U, currentValue: T, index: number, array: T[]) => U,
    initialValue?: U
  ) {
    return initialValue
      ? this.toArray().reduce<U>(cb, initialValue as U)
      : this.toArray().reduce(
          cb as unknown as (
            previousValue: T,
            currentValue: T,
            index: number,
            array: T[]
          ) => T
        );
  }

  filter(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ) {
    return new CuteSet<T>(this.toArray().filter(predicate, thisArg));
  }

  *subsets() {
    const padWithZeroes = (str: string): string => {
      return `${"0".repeat(this.length - str.length)}${str}`;
    };
    let setArray = this.toArray();

    let ithCombination = 2 ** this.length;

    while (ithCombination > 0) {
      ithCombination--;
      let mask = padWithZeroes(ithCombination.toString(2));

      yield new CuteSet(
        setArray.filter((_, i) => {
          return mask[i] === "1";
        })
      );
    }
  }

  *permutations() {
    let setArray = this.toArray() as Array<any>;
    let n = setArray.length as number;

    let indexArray = new Array(n).fill(0);

    let i = 0;
    yield new CuteSet<T>(setArray);
    let swap = (i: any, j: any, arr: any) => {
      let t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    };
    while (i < n) {
      if (indexArray[i] < i) {
        i % 2 === 0 ? swap(0, i, setArray) : swap(indexArray[i], i, setArray);
        indexArray[i] += 1;
        i = 0;
        yield new CuteSet<T>(setArray);
      } else {
        indexArray[i] = 0;
        i += 1;
      }
    }
  }

  forEach(cb: Function, thisArg?: any): void {
    for (let i of this._set) {
      cb(i, i, thisArg);
    }
  }

  get length(): number {
    return this._set.size;
  }

  raw(): Set<T> {
    return this._set;
  }

  toString(delimiter = "") {
    return this.toArray().join(delimiter);
  }

  print() {
    console.log(this.toString(","));
  }
}

export function asArray<T = any>(thing?: T | ArrayLike<T>): Array<T> {
  if (typeof thing === "string") return [thing];
  if (thing === undefined) return [];

  if (typeof thing[Symbol.iterator] === "function") {
    return Array.from(thing as Array<T>);
  }

  return [thing] as Array<T>;
}

export function asCuteSet<T = any>(thing: CuteSetInput<T>): ICuteSet<T> {
  return thing instanceof CuteSet ? thing : new CuteSet<T>(asArray<T>(thing));
}
