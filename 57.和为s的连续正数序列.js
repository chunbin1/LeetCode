/**
 * @param {number} target
 * @return {number[][]}
 */

// 数学问题 由等差数列和公式求得a1 , 然后就是n的取值,这里可以暴力解 因为n增大 a1很快就会小于0 可以跳出循环
var findContinuousSequence = function (target) {
  const ret = []
  let n = 2
  let a = (2 * target - n * n + n) / (2 * n)
  while (a > 0) {
    if (Number.isInteger(a)) {
      const numArr = Array.from({ length: n }, (item, index) => (index + a)) // length为n ， 用a 加上index获得连续数组
      ret.unshift(numArr)
    }
    n = n + 1
    a = (2 * target - n * n + n) / (2 * n)
  }
  return ret
};

console.log(findContinuousSequence(9))