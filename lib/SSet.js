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


class SSet{
    constructor(iterable){
        this._set = new Set(iterable);
    }

    static formatInput(input){
        if (!(input instanceof SSet)){
            return new SSet(input)
        } else{
            return input;
        }
    }

    static fromString(input, delimiter){
        if(!input || input === ""){
            return new SSet()
        }
        return new SSet(input.split(delimiter));

    }

    union(set){
        set = SSet.formatInput(set);
        return new SSet([...this.toArray(), ...set.toArray()]);
    }

    join(set){
        return this.union(set)
    }

    minus(set){
        return this.difference(set);
    }

    difference(set){
        set = SSet.formatInput(set);
        return new SSet(this.toArray().filter(x => !set.has(x)))
    }

    symmetricDifference(set){
        set = SSet.formatInput(set);
        return this.union(set).difference(this.intersection(set));
    }

    intersection(set){
        set = SSet.formatInput(set);
        return new SSet(this.toArray().filter(x => set.has(x)))
    }

    equal(set){
        set = SSet.formatInput(set);
        return this.symmetricDifference(set).length() === 0
    }

    has(x){
        return this._set.has(x)
    }

    length(){
        return this._set.size
    }

    empty(){
        return this._set.size === 0
    }

    add(x){
        this._set.add(x);
    }

    remove(x){
        this._set.delete(x);
    }

    toArray(){
        return Array.from(this._set)
    }

    toString(delimiter = " "){
        return this.toArray().join(delimiter);
    }

    print(delimiter){
        console.log(this.toString(delimiter));
    }

}

if(typeof module === "object" && module.hasOwnProperty('exports')){
    module.exports = SSet;
}


