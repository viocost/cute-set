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

  union(input: CuteSetInput<T>): ICuteSet<T> {
    const set = asCuteSet<T>(input);
    return new CuteSet<T>([...this.toArray(), ...set.toArray()]);
  }

  minus(input: CuteSetInput): ICuteSet<T> {
    return new CuteSet(this.toArray().filter((x) => !asCuteSet(input).has(x)));
  }

  toArray(): Array<T> {
    return Array.from(this._set);
  }

  has(candidate: T) {
    return this._set.has(candidate);
  }

  forEach(cb: Function, thisArg?: any): void {
    for (let i of this._set) {
      cb(i, i, thisArg);
    }
  }

  get length(): number {
    return this._set.size;
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
