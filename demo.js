const CuteSet = require("./lib/CuteSet.js");
const { PerformanceObserver, performance } = require('perf_hooks');

let a = new CuteSet([1, 2, 3]);

//Prints "1 2 3"
a.print();

a.print(", ");
//Prints "1, 2, 3"

let b = a.minus([2, 3]);

//Prints "1"
b.print();


b = b.union([7, 8, 15, 4, 5, 6]);
//Prints "1 7 8 15 4 5 6"
b.print();

let c = b.intersection([15, 8, 22, 44, 6]);
//Prints "8 15 6"
c.print();

//true
console.log(c.has(8));

//false
console.log(c.has("8"));

c.remove(8);

//false
console.log(c.has(8));



let y = CuteSet.fromString("a b c", " ");
y.print();

new CuteSet("abc").intersection("a1234").print()




let xxx = new CuteSet([1, 2, 3, 4, 5]);
for(let i of xxx){
    console.log(i)
}

let mySet = new CuteSet([1, 2, 3, 4, 5]);
for (let val of mySet){
    console.log(val);
}


let factorial = (n)=>{
    if (n<0){throw "number must be positive!"}
    else if(n<2){return 1}
    else{
        let res = n;
        do{
            n--;
            res *= n;
        }while(n>1);
        return res
    }
};

a = new CuteSet([1, 2, 3]);
b = a.permutations();
console.log("Printing all permutations");
b.print("\n");
console.log("Size " + b.size()+ " ref: " + factorial(a.size()));

