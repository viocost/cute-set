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
        if(typeof input === "string" || typeof input === "number"){
            input = [input];
        }

        this._set = new Set(input);
    }

    static _formatInput(input){
        if (!(input instanceof CuteSet)){
            return new CuteSet(input)
        } else{
            return input;
        }
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

    union(set){
        set = CuteSet._formatInput(set);
        return new CuteSet([...this.toArray(), ...set.toArray()]);
    }

    join(set){
        return this.union(set)
    }

    difference(set){
        set = CuteSet._formatInput(set);
        return new CuteSet(this.toArray().filter(x => !set.has(x)))
    }

    minus(set){
        return this.difference(set);
    }

    symmetricDifference(set){
        set = CuteSet._formatInput(set);
        return this.union(set).difference(this.intersection(set));
    }

    intersection(set){
        set = CuteSet._formatInput(set);
        return new CuteSet(this.toArray().filter(x => set.has(x)))
    }

    equal(set){
        set = CuteSet._formatInput(set);
        return this.symmetricDifference(set).length() === 0
    }

    has(x){
        return this._set.has(x)
    }

    length(){
        return this._set.size
    }

    size(){
        return this.length();
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
        console.log(this.toString(delimiter) +"\n");
    }

}

if(typeof module === "object" && module.hasOwnProperty('exports')){
    module.exports = CuteSet;
}


