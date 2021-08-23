// MIT License
//
// Copyright (c) 2018 KONSTANTIN Y. RYBAKOV
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


class CuteSet{
    constructor(input){
        this._set = new Set(asArray(input));

        this[Symbol.iterator] = function * (){
            for(let i of this._set){
                yield i;
            }
        }
    }

    forEach(cb){
        for (let i of this._set){
            cb(i, i, this)
        }
    }

    filter(cb, thisArg){
        return asCuteSet(this.toArray().filter(cb, thisArg))
    }

    map(cb, thisArg){
        return asCuteSet(this.toArray().map(cb, thisArg))
    }

    reduce(cb, initialValue){
        return this.toArray().reduce(cb, initialValue)
    }

    static fromString(input, delimiter = " ", parseNumbers = false){
        if(!input || input === " "){
            return new CuteSet()
        } else if(typeof(input) !== "string"){
            throw "CuteSet error: input format is invalid, expecting string"
        }

        input = input.split(delimiter);

        if(parseNumbers){
            input = input.map(val =>{
                return parseFloat(val);
            })
        }
        return new CuteSet(input);
    }


    union(input){
        const set = asCuteSet(input)
        return new CuteSet([...this.toArray(), ...set.toArray()]);
    }

    join(set){
        return this.union(set)
    }

    difference(set){
        set = asCuteSet(set);
        return new CuteSet(this.toArray().filter(x => !set.has(x)))
    }

    complement(set){
        set = asCuteSet(set);
        return set.minus(this);
    }

    minus(set){
        return this.difference(set);
    }

    symmetricDifference(set){
        set = asCuteSet(set);
        return this.union(set).difference(this.intersection(set));
    }

    intersection(set){
        set = asCuteSet(set);
        return new CuteSet(this.toArray().filter(x => set.has(x)))
    }

    equal(set){
        set = asCuteSet(set);
        return this.symmetricDifference(set).length === 0
    }

    subsetOf(set){
        set = asCuteSet(set);
        return this.intersection(set).equal(this)
    }

    sort(fn){
        this._set = new Set(this.toArray().sort(fn))
    }

    powerSet(){
        let res = new CuteSet();
        let gen = this.subsetGenerator();
        while (true){
            let subset = gen.next();
            if (subset.done) break;
            res.add(subset.value);
        }
        return new CuteSet(res);
    }

    *subsetGenerator(){
        let set = this.toArray();

        let numCombinations = parseInt(this._getStringOfSymbols(set.length, "1").split('').reverse().join(''), 2 )+1;
        let res = [];
        for (let i=0; i<numCombinations; ++i){
            let num = i.toString(2);
            num = this._padWithZeroes(num, set.length);
            yield new CuteSet(set.filter((val, i) =>{
                return num[i] == 1;
            }));
        }
    }

    permutations(){
        if(this.length > 9){
            throw "Maximum supported length for generating permutations is exceeded."
        }

        let res = new CuteSet();
        let gen = this.permutationGenerator();
        while (true){
            let perm = gen.next();
            if(perm.done) break;
            res.add(perm.value)
        }

        return res;
    }

    *permutationGenerator(){
        let set = this.toArray();
        let n = set.length;
        let c = Array.apply(null, {length: n}).map(Function.call, ()=>{return 0});
        let i=0;
        yield new CuteSet(set);
        let swap = (i, j, arr)=>{
            let t = arr[i];
            arr[i] = arr[j];
            arr[j] = t;
        };
        while (i<n){
            if(c[i] < i){
                (i%2===0) ? swap(0, i, set) : swap(c[i], i, set);
                c[i]+=1;
                i=0
                yield new CuteSet(set);
            }else{
                c[i] = 0;
                i += 1;
            }
        }
    }

    has(x){
        return this._set.has(x)
    }

    get length(){
        return this._set.size
    }

    get size(){
        return this._set.size;
    }

    empty(){
        return this._set.size === 0
    }

    add(x){
        this._set.add(x);
    }

    remove(x){
        return this._set.delete(x);
    }

    delete(x){
        return this.remove(x)
    }

    toArray(){
        return Array.from(this._set)
    }

    toString(delimiter = " "){
        return this.toArray().join(delimiter);
    }

    print(delimiter){
        console.log(this.toString(delimiter) +"\n");
    }

    _padWithZeroes(str, length){
        if(str.length < length){
            return this._getStringOfSymbols(length - str.length, "0") + str
        }
        return str;
    }

    _getStringOfSymbols(length, char){
        return char.repeat(length);
    }

}


// Returns any passed object as array, except for string.
// If string is passed it is returned as a single entry in array
function asArray(thing){
    if(typeof thing === "string") return [thing]
    return thing ? thing[Symbol.iterator] ? Array.from(thing) : [thing]  : []
}

function asCuteSet(thing){
    return thing instanceof CuteSet ? thing : new CuteSet(asArray(thing))
}

if(typeof module === "object" && module.hasOwnProperty('exports')){
    module.exports = CuteSet;
}


