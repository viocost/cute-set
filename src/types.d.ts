export interface ICuteSet<T = any> {
  [Symbol.iterator]: () => Generator<T, void, any>;
  union(input: CuteSetInput<T>): ICuteSet<T>; //
  toArray(): Array<T>;
  has(candidate: T): boolean; //
  intersection(input: CuteSetInput<T>): ICuteSet<T>; //
  minus(input: CuteSetInput<T>): ICuteSet<T>; //
  raw(): Set<T>;

  complement(universalSet: CuteSetInput<T>): ICuteSet<T>; //
  symmetricDifference(input: CuteSetInput<T>): ICuteSet<T>; //

  isEqual(input: CuteSetInput<T>): boolean;
  isSubsetOf(input: CuteSetInput<T>): boolean;
  isDisjoint(input: CuteSetInput<T>): boolean;

  map(cb: (value: T, index: number, array: T[]) => T[]): ICuteSet<T>;
  filter(cb: (value: T, index: number, array: T[]) => T[]): ICuteSet<T>;
  reduce(
    cb: (
      previousValue: unknown,
      currentValue: T,
      index: number,
      array: T[]
    ) => unknown,
    initial?: unknown
  ): unknown;

  add(itme: T): void;
  delete(itme: T): void;

  subsets(): Generator<CuteSet<T>, void, unknown>;
  permutations(): Generator<CuteSet<T>, void, unknown>;

  readonly length: number;
  readonly [n: number]: T;
  private _unionOne(input: CuteSetInput<T>): ICuteSet<T>;
  private _minusOne(input: CuteSetInput<T>): ICuteSet<T>;
  private _intersectionOne(input: CuteSetInput<T>): ICuteSet<T>; //
  /////////////////////////////////////////////////////////////////////////////
  // reduce(cb: Function, initialValue?: any): any;                          //
  // sort(fn: Function): ICuteSet<T>;                                        //
  // powerSet(): ICuteSet<T>;                                                //
  // toString(delimiter: string): string;                                    //
  //                                                                         //
  // print(delimiter: string): void;                                         //
  /////////////////////////////////////////////////////////////////////////////
}

export type CuteSetInput<T = any> = T | ICuteSet<T> | ArrayLike<T>;

export interface ICallback<T = any> {
  (value, index, array): T;
}
