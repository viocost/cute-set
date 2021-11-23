import CuteSet from "./src/CuteSet";

const s = new CuteSet(new Array(10).keys());
const s2 = new CuteSet(new Array(10000).keys());
const s3 = new CuteSet(new Array(10000000).keys());

const rs = new Set(new Array(10000000).keys());

function time(operation, description = "") {
  const t1 = new Date() as unknown as any;
  operation();
  const t2 = new Date() as unknown as any;
  console.log(description, t2 - t1);
}

time(() => s.minus(3, 5), "10 keys");
time(() => s2.minus(3, 5, 7, 8), "10 thousand keys");
time(() => s3.minus(3, 5, 7, 8), "10 million keys");

time(() => s2._minusOne(3), "10 thousand keys minus one");
time(() => s3._minusOne(3), "10 million keys minus one");

time(() => rs.delete(5), "raw set");

time(() => {
  new CuteSet(s3.toArray().map((el) => el + 3));
}, "map with array");
