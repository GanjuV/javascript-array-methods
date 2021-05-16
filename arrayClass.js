Array.prototype.forEachV1 = function (callback, thisArg) {
  if (this === null || this === undefined) {
    throw new TypeError("forEach called on null or undefined");
  }
  const _ctx = this;
  let index = 0;
  let T;
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  if (arguments.length > 1) {
    T = thisArg;
  }
  while (index < _ctx.length) {
    callback.call(T, _ctx[index]);
    index++;
  }
};

Array.prototype.mapV1 = function (callback, thisArg) {
  if (this === null || this === undefined) {
    throw new TypeError("map called on null or undefined");
  }
  const _ctx = this;
  const result = [];
  let index = 0;
  let T;
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  if (arguments.length > 1) {
    T = thisArg;
  }
  while (index < _ctx.length) {
    result[index] = callback.call(T, _ctx[index]);
    index++;
  }
  return result;
};

// [1, 2, 3].mapV1((ele) => console.log(ele), 23, 424, "fasafsdf");

Array.prototype.filterV1 = function (callback, thisArg) {
  if (this === null || this === undefined) {
    throw new TypeError("filter called on null or undefined");
  }
  const _ctx = this;
  const result = [];
  let index = 0;
  let T;
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  if (arguments.length > 1) {
    T = thisArg;
  }
  while (index < _ctx.length) {
    const funResponce = callback.call(T, _ctx[index]);
    if (funResponce) result.push(_ctx[index]);
    index++;
  }
  return result;
};

// [1, 2, 3].filterV1((x) => x > 2).forEachV1((ele) => console.log(ele));
[].reduce;
Array.prototype.reduceV1 = function (callback, initialValue) {
  if (this === null || this === undefined) {
    throw new TypeError("reduce called on null or undefined");
  }
  const _ctx = this;
  let acc = initialValue;
  let index = 0;
  if (initialValue === undefined) {
    acc = _ctx[0];
    index = 1;
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  while (index < _ctx.length) {
    acc = callback.call(_ctx, acc, _ctx[index], index, _ctx);
    index++;
  }
  return acc;
};
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// console.log([1, 2, 3, 4].reduceV1(reducer));

Array.prototype.findIndexV1 = function (callback) {
  if (this === null || this === undefined) {
    throw new TypeError("findIndex called on null or undefined");
  }
  const _ctx = this;
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  let index = 0;
  while (index < _ctx.length) {
    if (callback.call(_ctx, _ctx[index])) {
      return index;
    }
    index++;
  }
  return -1;
};

Array.prototype.findV1 = function (callback) {
  if (this === null || this === undefined) {
    throw new TypeError("find called on null or undefined");
  }
  const _ctx = this;
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const index = _ctx.findIndexV1(callback);
  if (index === -1) {
    return undefined;
  }
  return _ctx[index];
};

Array.prototype.indexOfV1 = function (searchValue) {
  if (this === null || this === undefined) {
    throw new TypeError("indexOf called on null or undefined");
  }
  const _ctx = this;
  const index = _ctx.findIndexV1((ele) => ele === searchValue);
  return index;
};

Array.prototype.lastIndexOfV1 = function (searchValue) {
  if (this === null || this === undefined) {
    throw new TypeError("lastIndexOf called on null or undefined");
  }
  const _ctx = this;
  let index = _ctx.length - 1;
  while (index > -1) {
    if (_ctx[index] === searchValue) {
      return index;
    }
    index--;
  }
  return -1;
};

Array.prototype.everyV1 = function (callback) {
  if (this === null || this === undefined) {
    throw new TypeError("every called on null or undefined");
  }
  const _ctx = this;
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  let index = 0;
  while (index < _ctx.length) {
    if (!callback.call(_ctx, _ctx[index])) return false;
    index++;
  }
  return true;
};

Array.prototype.someV1 = function (callback) {
  if (this === null || this === undefined) {
    throw new TypeError("some called on null or undefined");
  }
  const _ctx = this;
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  let index = 0;
  while (index < _ctx.length) {
    if (callback.call(_ctx, _ctx[index])) return true;
    index++;
  }
  return false;
};

Array.prototype.includeV1 = function (searchValue) {
  if (this === null || this === undefined) {
    throw new TypeError("include called on null or undefined");
  }
  const _ctx = this;
  return _ctx.someV1((value) => value === searchValue);
};

const isBelowThreshold = (element) => element % 2 === 0;

const array1 = [1, 31, 39, 29, 11, 13];

// console.log(array1.includeV1(391));

Array.prototype.flatV1 = function (degree = 1) {
  if (this === null || this === undefined) {
    throw new TypeError("flat called on null or undefined");
  }
  const _ctx = this;
  if (degree < 1 || !Array.isArray(_ctx)) return _ctx;
  return _ctx.reduceV1((acc, current) => {
    return acc.concat(
      Array.isArray(current) ? current.flatV1(degree - 1) : current
    );
  }, []);
};

Array.prototype.flatMapV1 = function (callback) {
  if (this === null || this === undefined) {
    throw new TypeError("flatMap called on null or undefined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  const _ctx = this;
  return _ctx.mapV1(callback).flatV1();
};

// let arr1 = [1, 2, 3, 4];
// arr1.mapV1((x) => [x * 2]);
// [[2], [4], [6], [8]]
// console.log(arr1.flatMapV1((x) => [x * 2]));
// [2, 4, 6, 8]
// console.log([1, 2, 3, [4, 5, [6, 7, [8]]]].flat());
// const reducer = (accumulator, currentValue) => accumulator + currentValue;

Array.prototype.concatV1 = function (...args) {
  if (this === null || this === undefined) {
    throw new TypeError("concat called on null or undefined");
  }
  const _ctx = this;
  if (args === 0) return _ctx;
  let result = [..._ctx];
  let index = 0;
  while (index < args.length) {
    const element = args[index];
    if (Array.isArray(element)) {
      result.push(...element);
    } else {
      result.push(element);
    }
    index++;
  }
  return result;
};

// console.log([1, 2, 3].concatV1([4, 5], 6, [[7, 8]]));

Array.prototype.joinV1 = function (separator = ",") {
  if (this === null || this === undefined) {
    throw new TypeError("join called on null or undefined");
  }
  const _ctx = this;
  return _ctx.reduceV1((acc, current, index) => {
    if (index === 0) return current;
    return `${acc}${separator}${current}`;
  }, "");
};

Array.prototype.reverseV1 = function () {
  if (this === null || this === undefined) {
    throw new TypeError("reverse called on null or undefined");
  }
  const _ctx = this;
  let index = 0;
  // Running the loop to lenght/2 to optimize the performance.
  while (index < Math.ceil(_ctx.length / 2)) {
    // Swapping the values
    const temp = _ctx[index];
    const moveIndex = _ctx.length - 1 - index;
    _ctx[index] = _ctx[moveIndex];
    _ctx[moveIndex] = temp;
    index++;
  }
  return _ctx;
};

Array.prototype.shiftV1 = function () {
  if (this === null || this === undefined) {
    throw new TypeError("shift called on null or undefined");
  }
  const _ctx = this;
  const { length } = _ctx;
  if (length === 0) return undefined;
  let index = 1;
  const returnVal = _ctx[0];
  while (index < length) {
    _ctx[index - 1] = _ctx[index];
    index++;
  }
  _ctx.length = length - 1;
  return returnVal;
};
// const arr = [1, 2, 3, 4, 5, 6];
// console.log(arr.shiftV1());
// console.log(arr.shiftV1());
// console.log(arr.shiftV1());
// console.log(arr);

Array.prototype.unshiftV1 = function (...value) {
  if (this === null || this === undefined) {
    throw new TypeError("unshift called on null or undefined");
  }
  const _ctx = this;
  if (value.length === 0) return _ctx.length;
  let index = 0;
  const mergedArray = value.concatV1(_ctx);
  const { length: mergedArrLength } = mergedArray;
  _ctx.length = 0;
  while (index < mergedArrLength) {
    _ctx.push(mergedArray[index]);
    index++;
  }
  return mergedArrLength;
};
// let arr = [];
// console.log(arr.unshiftV1(4, 6));
// console.log(arr);

Array.prototype.sliceV1 = function (start = 0, end) {
  if (this === null || this === undefined) {
    throw new TypeError("slice called on null or undefined");
  }
  const _ctx = this;
  if (end === undefined || end === null) {
    end = _ctx.length;
  }
  let result = [];
  let index = start;
  while (index < end) {
    result.push(_ctx[index]);
    index++;
  }
  return result;
};
// let arr = [1, 2, "m", true];

// console.log(arr.sliceV1() === arr);
// console.log(arr.slice());

Array.prototype.spliceV1 = function (
  insertAtIndex = 0,
  removeElementsNum,
  ...values
) {
  if (this === null || this === undefined) {
    throw new TypeError("splice called on null or undefined");
  }
  // Checking for negative vlaues
  insertAtIndex = Math.abs(insertAtIndex);
  const _ctx = this;
  // initilizing the insert index to length if its greater then length
  if (insertAtIndex > _ctx.length) {
    insertAtIndex = _ctx.length;
  }
  // initilizing number of removed elements.
  if (removeElementsNum === undefined || removeElementsNum === null) {
    removeElementsNum = _ctx.length - insertAtIndex;
  }
  const firstPart = _ctx.sliceV1(0, insertAtIndex);
  const secondPart = _ctx.sliceV1(insertAtIndex + removeElementsNum);
  const removedEle = _ctx.sliceV1(
    insertAtIndex,
    insertAtIndex + removeElementsNum
  );
  const mergedArr = firstPart.concatV1(values, secondPart);
  const { length: mergedArrLen } = mergedArr;
  let index = 0;
  _ctx.length = 0;
  while (index < mergedArrLen) {
    _ctx.push(mergedArr[index]);
    index++;
  }
  return removedEle;
};

// let myFish = ["angel", "clown", "mandarin", "sturgeon"];
// let removed = myFish.spliceV1(3);
// console.log(removed);
// console.log(myFish);

Array.prototype.popV1 = function () {
  if (this === null || this === undefined) {
    throw new TypeError("pop called on null or undefined");
  }
  const _ctx = this;
  let removedEle;
  if (_ctx.length > 0) {
    removedEle = _ctx[_ctx.length - 1];
    _ctx.length = _ctx.length - 1;
  } else {
    removedEle = undefined;
  }
  return removedEle;
};

// console.log(myFish.popV1());
// console.log(myFish.popV1());
// console.log(myFish.popV1());

// console.log(myFish.popV1());

// console.log(myFish.popV1());
// console.log(myFish.popV1());
// console.log(myFish.popV1());
// console.log(myFish.popV1());

// console.log(myFish);

Array.prototype.pushV1 = function (...values) {
  if (this === null || this === undefined) {
    throw new TypeError("push called on null or undefined");
  }
  const _ctx = this;
  const { length: arrayLength } = _ctx;
  const { length: valuesLength } = values;
  let index = 0;
  while (index < valuesLength) {
    _ctx[arrayLength + index] = values[index];
    index++;
  }
  return _ctx.length;
};

// let myFish = ["angel", "clown", "mandarin", "sturgeon"];
// console.log(myFish.pushV1(1, 2, 3), myFish);

Array.prototype.fillV1 = function (fillVal, start = 0, end) {
  if (this === null || this === undefined) {
    throw new TypeError("fill called on null or undefined");
  }
  const _ctx = this;
  if (end === undefined || end === null) {
    end = _ctx.length;
  }
  const { length: arrayLength } = _ctx;
  let index = start;
  while (index < arrayLength) {
    _ctx[index] = fillVal;
    index++;
  }
  return _ctx;
};
//let myFish = ["angel", "clown", "mandarin", "sturgeon"];
//console.log(myFish.fillV1(1));
