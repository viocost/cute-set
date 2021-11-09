import CuteSet from "./CuteSet";
import { asArray, asCuteSet } from "./CuteSet";

describe(asArray.name, () => {
  it("Should create an array from various sources", () => {
    const arr = asArray(4);
    expect(arr).toEqual([4]);

    const arr1 = asArray(["hello"]);
    expect(arr1).toEqual(["hello"]);

    const arr2 = asArray({ a: 1 });
    expect(arr2).toEqual([{ a: 1 }]);

    const arr3 = asArray();
    expect(arr3).toEqual([]);

    const arr4 = asArray(new Set([1, 2, 3]));
    expect(arr4).toEqual([1, 2, 3]);

    const arr5 = asArray<string>(["hello"]);
    expect(arr5).toEqual(["hello"]);
  });
});

describe(asCuteSet.name, () => {
  it("Should create cute-set from various values", () => {
    const set = asCuteSet(1);
    expect(set).toEqual(new CuteSet(1));

    const set1 = asCuteSet([1, 2, 3]);
    expect(set1).toEqual(new CuteSet([1, 2, 3]));

    const s = new CuteSet(["hello"]);
    const set2 = asCuteSet(s);
    expect(set2).toBe(s);
  });
});

describe(CuteSet.name, () => {
  describe("Union", () => {
    const s1 = new CuteSet([1, 2, 3]);
    const s2 = new CuteSet([2, 3, 4, 5]);

    const s3 = new CuteSet("hello");
    const s4 = new CuteSet("world");
    it("Should union 2 sets of integers", () => {
      expect(s1.union(s2)).toEqual(new CuteSet([1, 2, 3, 4, 5]));
    });

    it("Should uniont sets of strings", () => {
      expect(s3.union(s4)).toEqual(new CuteSet(["hello", "world"]));
    });

    it("Should union sets of various types", () => {
      expect(s1.union(s2).union(s3)).toEqual(
        new CuteSet([1, 2, 3, 4, 5, "hello"])
      );
    });

    expect(s1.union(s2, s3)).toEqual(new CuteSet([1, 2, 3, 4, 5, "hello"]));

    expect(s1.union(s2, "foo")).toEqual(new CuteSet([1, 2, 3, 4, 5, "foo"]));
    expect(new CuteSet().union(1, "bar", {}, {}, [])).toEqual(
      new CuteSet([1, "bar", {}, {}])
    );
  });

  describe("Minus", () => {
    const s1 = new CuteSet([1, 2, 3]);
    const s2 = new CuteSet([2, 3, 4, 5]);

    it("Should return difference of 2 sets", () => {
      expect(s1.minus(s2)).toEqual(new CuteSet([1]));
    });

    it("Should return difference of multiple sets", () => {
      expect(s1.minus(3, 1)).toEqual(new CuteSet([2]));
    });
  });
});
