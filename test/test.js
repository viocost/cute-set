const CuteSet = require("../lib/CuteSet.js");
const assert = require("assert");

describe("CuteSet",()=>{

    it("Should create set from array", ()=>{
        let a = new CuteSet([1, 2, 3]);
        assert(a.toString() === "1 2 3")
    });

    it("Should create an empty set", ()=>{
        let a = new CuteSet();
        assert(a.toString() === "")
    });

    it("Should create an empty set, and add elements to it", ()=>{
        let a = new CuteSet();
        for (let i=0; i< 5; ++i){
            a.add(i);
            a.add(i);
        }
        assert(a.toString() === "0 1 2 3 4");
        assert(a.toString(", ") === "0, 1, 2, 3, 4");
    });

    it("unions 2 sets", ()=>{
        let a = new CuteSet();
        let b = new CuteSet(["hello", "world"]);

        assert(a.union(b).toString() === "hello world")
        assert(a.union([1, 2, 3]).toString() === "1 2 3")
        assert(a.union([1, 2, 3]).union("boo1ooo1").toString() === "1 2 3 b o 1")
        assert(a.union([1, 2, 3]).union(["boo1ooo1"]).toString() === "1 2 3 boo1ooo1")
    });

    it("returns 2 sets difference", ()=>{
        let a = new CuteSet([1, 2, 3, 4, 5]);
        let b = new CuteSet([3, 4]);
        let c = new CuteSet();
        assert(a.minus(b).toString() === "1 2 5");
        assert(c.minus(b).toString() === "");
    });

    it("returns 2 sets intersection", ()=>{
        let a = new CuteSet([1, 2, 3, 4, 5]);
        let b = new CuteSet([3, 4, 8, 7, 10]);
        let c = new CuteSet();
        assert(a.intersection(b).toString() === "3 4");
        assert(c.intersection(b).toString() === "");
    });

    it("returns 2 sets symmetrical difference", ()=>{
        let a = new CuteSet([1, 2, 3, 4, 5]);
        let b = new CuteSet([3, 4, 8, 7, 10]);
        let c = new CuteSet();
        assert(a.symmetricDifference(b).toString() === "1 2 5 8 7 10");
        assert(c.symmetricDifference(b).toString() === "3 4 8 7 10");
    });

    it("tests has operator", ()=>{
        let a = new CuteSet([1, 2, 3, 4, 5]);
        assert(a.has(1));
        assert(!a.has("1"));
        assert(!a.has(15));
    });

    it("tests delete operator", ()=>{
        let a = new CuteSet([1, 2, 3, 4, 5]);
        a.remove(3);
        assert(!a.has(3));
        assert(a.toString() === "1 2 4 5");

    });

    it("testing various inputs", ()=>{
        let a = new CuteSet(["1", "2", "3"]);
        let b = a.union(["2", "3", "4", "5"]);
        let c = b.intersection("3489");
        assert(c.toString() === "3 4")
    })

});