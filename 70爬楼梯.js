/**
 * @param {number} n
 * @return {number}
 */

// 递归 可能会爆栈
var climbStairs = function (n) {
  if (n === 2) {
    return 2
  }
  if (n === 1) {
    return 1
  }
  return climbStairs(n - 1) + climbStairs(n - 2)
};

// 动态规划
var climbStairs2 = function (n) {
  let rl = 1 // 较小的数
  let rr = 2 // 较大的数
  if (n === 2) return rr
  if (n === 1) return rl
  let result
  for (let i = 2; i < n; i++) {
    result = rl + rr
    rl = rr  // 向右移位
    rr = result // 向右移位
  }
  return result
}

console.time('1')
console.log(climbStairs(5))
console.log(climbStairs(45))
console.timeEnd('1')


console.time('2')
console.log(climbStairs2(5))
console.log(climbStairs2(45))
console.timeEnd('2')