# CuteSet 
![Build badge](https://travis-ci.com/viocost/cute-set.svg?branch=master)

This is minimalistic es6 implementation of set and its basic operations, based on native javascript Set.

### Version 1.0.11 changes
- Added filter map reduce functionality, works the same way as array.
- length and size are no longer functions, so instead of doing `mySet.length()`
  do `mySet.length`

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
V.2 Changes
Input can be anything:
**Single object, number or string** new CuteSet instance with that object returned
**Array** new CuteSet instance with all elements of the array returned (duplicates obviously removed)
**CuteSet instance** copy of CuteSet instance with be returned.


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

*Methods marked with **+** may take any input as CuteSet constructor. 
Passed input will be implicitly turned into a CuteSet instance before processing.

```
let a = new CuteSet([1, 2, 3]).union([2, 3, 4, 5]); // Results in {1, 2, 3, 4, 5}

let b = a.intersection([3, 4, 8, 9, 12]); // Results in {3, 4}
let b = a.intersection(3); // Results in {3}
let b = a.minus(3); // Results in {1, 2, 4, 5}

b.subsetOf([1, 3, 4, 5, 67]) // true

```
