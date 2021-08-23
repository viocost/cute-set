export interface ICuteSet<T> {
  forEach(cb: Function, thisArg?: any): void;
  filter(cb: Function, thisArg?: any): ICuteSet<T>;
  map(cb: Function): ICuteSet<T>;
  reduce(cb: Function, initialValue?: any): any;
  union<TInput = any>(input: TInput): ICuteSet<T | TInput>;
  minus<TInput = any>(input: TInput): ICuteSet<T | TInput>;
  complement<TInput = any>(input: TInput): ICuteSet<T | TInput>;
  symmetricDifference<TInput = any>(input: TInput): ICuteSet<T | TInput>;
  intersection<TInput = any>(input: TInput): ICuteSet<T | TInput>;
  isEqual<TInput = any>(input: TInput): boolean;
  isSubsetOf<TInput = any>(input: TInput): boolean;
  sort(fn: Function): ICuteSet<T>;
  powerSet(): ICuteSet<T>;
  subsets(): Generator<CuteSet<T[]>, void, unknown>;
  permutations(): Generator<CuteSet<T[]>, void, unknown>;
  has(candidate: T): boolean;
  add(candidate: T): void;
  remove(candidate: T): void;
  toArray(): Array<T>;
  toString(delimiter: string): string;

  print(delimiter: string): void;
}

export interface ICallback {
  (value, index, array): ICuteSet;
}
