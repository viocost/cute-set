"use strict";
var CuteSet = require("../src/CuteSet");
var assert = require("assert");
describe("CuteSet", function () {
    it("Should create set from various types", function () {
        var a = new CuteSet([1, 2, 3]);
        assert(a.toString() === "1 2 3");
    });
    it("Should create set from various types", function () {
        var a = CuteSet.fromString("hello world", "");
        assert(a.toString() === "h e l o   w r d");
    });
    it("Should create a set with empty string", function () {
        var a = new CuteSet("");
        assert(a.has(""));
    });
    it("Should create a set with an object", function () {
        var a = {};
        var set = new CuteSet(a);
        assert(set.has(a));
        assert(!set.has({}));
    });
    it("Should create set from string", function () {
        var a = CuteSet.fromString("Hello world", " ");
        assert(a.toString() === "Hello world");
    });
    it("Should create set from various types", function () {
        var a = new CuteSet("Boo");
        assert(a.toString() === "Boo");
    });
    it("Should create set from various types", function () {
        var a = new CuteSet(["one", "two", "two"]);
        assert(a.toString() === "one two");
    });
    it("Should create an empty set", function () {
        var a = new CuteSet();
        assert(a.toString() === "");
    });
    it("Should create an empty set, and add elements to it", function () {
        var a = new CuteSet();
        for (var i = 0; i < 5; ++i) {
            a.add(i);
            a.add(i);
        }
        assert(a.toString() === "0 1 2 3 4");
        assert(a.toString(", ") === "0, 1, 2, 3, 4");
    });
    it("unions 2 sets", function () {
        var a = new CuteSet();
        var b = new CuteSet(["hello", "world"]);
        assert(a.union(b).toString() === "hello world");
        assert(a.union([1, 2, 3]).toString() === "1 2 3");
        assert(a.union([1, 2, 3]).union("boo1ooo1").toString() === "1 2 3 boo1ooo1");
        assert(a.union([1, 2, 3]).union(["boo1ooo1"]).toString() === "1 2 3 boo1ooo1");
        assert(a
            .union([1, 2, 3])
            .union(CuteSet.fromString("boo1ooo1", ""))
            .toString() === "1 2 3 b o 1");
    });
    it("returns 2 sets difference", function () {
        var a = new CuteSet([1, 2, 3, 4, 5]);
        var b = new CuteSet([3, 4]);
        var c = new CuteSet();
        assert(a.minus(b).toString() === "1 2 5");
        assert(c.minus(b).toString() === "");
    });
    it("returns 2 sets intersection", function () {
        var a = new CuteSet([1, 2, 3, 4, 5]);
        var b = new CuteSet([3, 4, 8, 7, 10]);
        var c = new CuteSet();
        assert(a.intersection(b).toString() === "3 4");
        assert(c.intersection(b).toString() === "");
    });
    it("returns 2 sets symmetrical difference", function () {
        var a = new CuteSet([1, 2, 3, 4, 5]);
        var b = new CuteSet([3, 4, 8, 7, 10]);
        var c = new CuteSet();
        assert(a.symmetricDifference(b).toString() === "1 2 5 8 7 10");
        assert(c.symmetricDifference(b).toString() === "3 4 8 7 10");
    });
    it("tests has operator", function () {
        var a = new CuteSet([1, 2, 3, 4, 5]);
        assert(a.has(1));
        assert(!a.has("1"));
        assert(!a.has(15));
    });
    it("tests delete operator", function () {
        var a = new CuteSet([1, 2, 3, 4, 5]);
        a.remove(3);
        assert(!a.has(3));
        assert(a.toString() === "1 2 4 5");
    });
    it("testing various inputs", function () {
        var a = new CuteSet(["1", "2", "3"]);
        var b = a.union(["2", "3", "4", "5"]);
        assert(b.intersection("3489").toString() === "");
        assert(b.intersection(CuteSet.fromString("3489", "")).toString() === "3 4");
    });
    it("testing various inputs", function () {
        var a = CuteSet.fromString("1 4 5 4.6", " ", true);
        assert(a.toString() === "1 4 5 4.6");
        assert(a.has(4.6));
        assert(a.has(4));
    });
    it("Parsing inputs", function () {
        var a = new CuteSet([1, 2, 3]).union([2, 3, 4, 5]);
        //prints "1 2 3 4 5"
        a = a.union(new Set([6, 7]));
        assert(a.toString() === "1 2 3 4 5 6 7");
        var b = a.intersection([3, 4]);
        assert(b.toString() === "3 4");
    });
    it("Should difference with an object", function () {
        var a = {};
        var s1 = new CuteSet([1, 2, 3, a]);
        var s2 = s1.minus(a);
        var s3 = s1.minus(2);
        var ref = new CuteSet([1, 2, 3]);
        var ref2 = new CuteSet([1, a, 3]);
        assert(ref.equal(s2));
        assert(ref2.equal(s3));
    });
    it("Should intersect with an object", function () {
        var a = {};
        var s1 = new CuteSet([1, 2, 3, a]);
        var s2 = s1.intersection(a);
        var ref = new CuteSet(a);
        assert(ref.equal(s2));
    });
    it("Should join with an object", function () {
        var a = {};
        var s1 = new CuteSet([1, 2, 3]);
        var s2 = s1.union(a);
        var ref = new CuteSet([1, 2, 3, a]);
        assert(ref.equal(s2));
    });
    it("tests equal function", function () {
        var a = new CuteSet([1, 2, 3, 4]);
        assert(a.equal([1, 2, 3, 4]));
        assert(!a.equal([1, 2, 3]));
        assert(!a.equal(["1", "2", "3", "4"]));
        assert(new CuteSet().equal(new CuteSet()));
    });
    it("tests subset operation", function () {
        var a = new CuteSet([1, 2, 3, 4]);
        assert(a.subsetOf([1, 2, 3, 4, 5]));
        assert(!a.subsetOf([1, 2, 4, 5]));
        assert(new CuteSet().subsetOf(new CuteSet()));
        assert(new CuteSet("").subsetOf(new CuteSet("")));
    });
    it("tests subset operation", function () {
        var a = new CuteSet([1, 2, 3, 4]);
        var b = new CuteSet(a);
        assert(a.equal(b));
    });
    it("tests deletion", function () {
        var a = new CuteSet([1, 2, 3, 4]);
        assert(a.delete(1));
        assert(!a.delete(1));
        assert(a.remove(2));
        assert(!a.remove(1));
    });
    it("tests complement", function () {
        var a = new CuteSet([1, 2, 3]);
        assert(a.complement([2, 3, 4]).toString() === "4");
        assert(a.complement([]).toString() === "");
        assert(a.complement([5, 6, 7]).toString() === "5 6 7");
    });
    it("tests forEach iteration", function () {
        var res = new CuteSet();
        new CuteSet([1, 2, 3]).forEach(function (item) { return res.add(item); });
        new CuteSet([1, 2, 3]).forEach(function (item) { return undefined; });
        assert(res.has(1));
        assert(res.has(2));
        assert(res.has(3));
    });
    it("Tests map", function () {
        var res = new CuteSet([1, 2, 3]).map(function (item) { return item * item; });
        assert(res.equal([1, 4, 9]));
        assert(res instanceof CuteSet);
    });
    it("Tests filter", function () {
        var res = new CuteSet([1, 2, 3]).filter(function (item) { return item % 2 === 0; });
        assert(res.equal(2));
    });
    it("Tests reduce", function () {
        var res = new CuteSet([1, 2, 3]).reduce(function (acc, item) { return acc + item; }, 10);
        assert(res === 16);
    });
    it("Tests power set", function () {
        var set = new CuteSet([1, 2]).powerSet();
        assert(set.length === 4);
    });
    it("Tests permutations", function () {
        var set = new CuteSet([1, 2, 3]).permutations();
        assert(set.length === 6);
    });
    it("Should test empty function", function () {
        var s = new CuteSet();
        assert(s.empty());
        s.add(1);
        assert(!s.empty());
    });
});
