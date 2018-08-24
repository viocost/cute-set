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

#### *static* fromString(input, delimiter = " ", parseNumbers = false)
Parses passed string and creates CuteSet instance.
Delimiter is optional and by default it is one empty space.
parseNumbers - for each element in string parseFloat will be applied.
See tests for examples

---


#### union(x) +
Performs union operation on given set with set *x*

#### join(x) +
Same as union

#### difference(x) +
Returns difference of given set with set *x*
  ```
    const res = set1.difference(set2)
  ```
#### minus(x)  +
Same as difference

#### intersection(x)  +
Returns intersection of given set with set *x*

#### symmetricDifference(x) +
Returns symmetric difference of given set with set *x*

#### equal(x)  +
Returns true or false - whether given set is equal to x



#### has(x)   
Returns true or false - whether given set contains element x

#### length()   
returns set length

#### empty()   
returns true or false - whether given set is empty

#### add(x)   
adds given x element to setTimeout


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
let a = new CuteSet([1, 2, 3]).union([2, 3, 4, 5]);

//prints "1 2 3 4 5"
a.print();

let b = a.intersection([3, 4, 8, 9, 12]);

//prints "3 4"
b.print()
```
