# CuteSet
This is minimalistic es6 implementation of set and its basic operations, based on native javascript Set.

### Installation
```
npm i --save cute-set
```

### API

Require CuteSet library in your project:

```
//Node.js
const CuteSet = require("cute-set");

```
___

#### CuteSet is iterable
So this code will be perfectly valid:
```
  let mySet = new CuteSet([1, 2, 3, 4, 5]);
  for (let val of mySet){
    process(val);
  }
```
or

```
  let mySet = new CuteSet([1, 2, 3, 4, 5]);
  mySet.forEach((val, i, arr)=>{
    process(val);
  })
```

In the last example above **val** is the same as **i**, just like in native JS set, arr points to this CuteSet instance. Note, there is no acces by index, so mySet[0] will be undefined.

---


To create new instance of CuteSet you can use **constructor**  or static method **CuteSet.FromString()**
#### constructor(input)
```
  let mySet = new CuteSet(input)
```
Constructor accepts following inputs:
 - **No input** - empty CuteSet instance will be created.
 - **Single number** - CuteSet instance with single element - the passed number will be created.
 - **Single string** - unlike native JS Set library, CuteSet treats string as a single value, thus CuteSet instance with single element - the passed string will be created:
 ```
 let mySet = new CuteSet("abc"); //results in {"abc"}
 ```
 - **Array** - CuteSet instance with all array elements will be created (duplicates are obviously removed).

 - **CuteSet instance** - In such case a copy of passed CuteSet instance will be created

#### *static* fromString(input, delimiter = " ", parseNumbers = false)
Parses passed string and creates CuteSet instance.
Delimiter is optional and by default it is one empty space.
parseNumbers - for each element in string parseFloat will be applied.
See tests for examples

---
#### complement(x) +
Given "universe" *x* returns *self* complement *x*
or basically *x* difference *self*

#### subsetGenerator()
Returns a subset generator. 
Call generator.next() to get next subset.
Generator will deplete once all subsets are yielded.
No length limit.

#### permutationGenerator()
Returns permutation generator.
Call generator.next() to get next permutation.
Generator will deplete once all permutations are yielded.
No length limit.

#### powerSet()
Generates and returns a *set* of all subsets of itself.
Length of self is limited by 21 elements

#### permutations()
Generates and returns a *set* of all permutations of itself
Length of self is limited by 9 elements


#### sort(fn)
Sorts internal order of elements in javascript Array.prototype.sort() fashion. It can be used with function expressions (and closures). For reference see [official MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).


#### union(x) +
Performs union operation on given set with set *x*

#### join(x) +
Alias of union

#### difference(x) +
Returns difference of given set with set *x*
  ```
    const res = set1.difference(set2)
  ```
#### minus(x)  +
Alias of difference

#### intersection(x)  +
Returns intersection of given set with set *x*

#### symmetricDifference(x) +
Returns symmetric difference of given set with set *x*

#### equal(x)  +
Returns true or false - whether given set is equal to set *x*

#### subsetOf(x)  +
Returns true or false - whether given set is subset of set *x*

#### has(x)   
Returns true or false - whether given set contains element x

#### length()   
returns set length

#### empty()   
returns true or false - whether given set is empty

#### add(x)   
adds given x element to this set

#### remove(x)   
removes element x from this set
returns true if element was deleted, or false if element was not found

#### delete(x)   
alias of remove

#### toString(delimiter = " ")   
**returns** string representation of a given set;
Delimiter is optional. By default it is 1 space;


#### print(delimiter = " ")   
**prints** string representation of a given set;
Delimiter is optional. By default it is 1 space;

#### toArray()   
turns set into native Array and returns it

---

*Methods marked with **+** may take arrays, strings and native sets as input and turn it into CuteSet instance before processing. It is acceptable to do following:*

```
let a = new CuteSet([1, 2, 3]).union([2, 3, 4, 5]); // Results in {1, 2, 3, 4, 5}

let b = a.intersection([3, 4, 8, 9, 12]); // Results in {3, 4}

b.subsetOf([1, 3, 4, 5, 67]) // true

```
