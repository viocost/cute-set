export interface ICuteSet<T = any> {
  [Symbol.iterator]: () => Generator<T, void, any>;
  union(input: CuteSetInput<T>): ICuteSet<T>; //
  toArray(): Array<T>;
  has(candidate: T): boolean; //
  intersection(input: CuteSetInput<T>): ICuteSet<T>; //
  minus(input: CuteSetInput<T>): ICuteSet<T>; //

  readonly length: number;
  readonly [n: number]: T;
  private _unionOne(input: CuteSetInput<T>): ICuteSet<T>;
  private _minusOne(input: CuteSetInput<T>): ICuteSet<T>;
  private _intersectionOne(input: CuteSetInput<T>): ICuteSet<T>; //
  /////////////////////////////////////////////////////////////////////////////
  // forEach(cb: Function, thisArg?: any): void;                             //
  // filter(cb: Function, thisArg?: any): ICuteSet<T>;                       //
  // map(cb: Function): ICuteSet<T>;                                         //
  // reduce(cb: Function, initialValue?: any): any;                          //
  // union<CuteSetInput = any>(input: CuteSetInput): ICuteSet<T | CuteSetInput>;               //
  // complement<CuteSetInput = any>(input: CuteSetInput): ICuteSet<T | CuteSetInput>;          //
  // symmetricDifference<CuteSetInput = any>(input: CuteSetInput): ICuteSet<T | CuteSetInput>; //
  // isEqual<CuteSetInput = any>(input: CuteSetInput): boolean;                          //
  // isSubsetOf<CuteSetInput = any>(input: CuteSetInput): boolean;                       //
  // sort(fn: Function): ICuteSet<T>;                                        //
  // powerSet(): ICuteSet<T>;                                                //
  // subsets(): Generator<CuteSet<T[]>, void, unknown>;                      //
  // permutations(): Generator<CuteSet<T[]>, void, unknown>;                 //
  // add(candidate: T): void;                                                //
  // remove(candidate: T): void;                                             //
  // toArray(): Array<T>;                                                    //
  // toString(delimiter: string): string;                                    //
  //                                                                         //
  // print(delimiter: string): void;                                         //
  /////////////////////////////////////////////////////////////////////////////
}

export type CuteSetInput<T = any> = T | ICuteSet<T> | ArrayLike<T>;

export interface ICallback<T = any> {
  (value, index, array): T;
}
