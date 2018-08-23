# CuteSet
This is minimalistic es6 implementation of set and its basic operations, based on native javascript Set.

### Installation
```
npm i --save cute-set
```

### API

```
//Node.js
const CuteSet = require("cute-set");

```

#### union(x)
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


#### toString(delimiter)   
**returns** string representation of a given set;
Delimiter is optional. By default it is 1 space;


#### print(delimiter)   
**prints** string representation of a given set;
Delimiter is optional. By default it is 1 space;

#### toArray()   
turns set into native Array and returns it

#### toArray()   
turns set into native Array and returns it

#### *static* fromString(input, delimiter)
Creates new instance of CuteSet from passed strings.
Delimiter is optional and by default it is one space.



*Methods marked with + may take arrays, strings and native sets as input and turn it into CuteSet instance before processing. It is acceptable to do following:*
```
let a = new CuteSet(["1", "2", "3"]);
let b = a.union(["2", "3", "4", "5"]);
let c = b.intersection("3489");

//prints "3 4"
//Notice that values are all strings. If they were numbers - it wouldn't work
c.print();


```
