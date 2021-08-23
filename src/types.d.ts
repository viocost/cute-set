export interface ICuteSet<T> {
  forEach(cb: Function): void;
  filter(cb: Function): ICuteSet<T>;
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
  subsets(): IterableIterator<ICuteSet<T>>;
  permutations(): IterableIterator<ICuteSet<T>>;
  has(candidate: T): boolean;
  add(candidate: T): void;
  remove(candidate: T): void;
  toArray(): Array<T>;
  toString(delimiter: string): string;

  print(delimiter: string): void;
}
