// https://leetcode-cn.com/problems/distribute-candies-to-people/

/**
 * @param {number} candies
 * @param {number} num_people
 * @return {number[]}
 */

// 模拟分糖果的过程 暴力解法
var distributeCandies = function (candies, num_people) {
  const ans = new Array(num_people).fill(0)
  let sum = candies
  let idx = 0
  let candies_out = 1
  while (sum > 0) {
    if (sum - candies_out >= 0) {
      sum = sum - candies_out
      ans[idx] += candies_out

    } else {
      ans[idx] += sum
      sum = 0
    }
    idx = (idx + 1) % num_people
    candies_out += 1
  }
  return ans
};

// 数学解法 很明显是个等差数列 可以通过不等式求出要发多少次  但测试的效果并没有上面的好 这跟数据有关
// https://leetcode-cn.com/problems/distribute-candies-to-people/solution/xiang-xi-jie-shi-shu-xue-fang-fa-zen-yao-zuo-gao-z/ 详细看这里 

// 模拟分糖果的过程 暴力解法
var distributeCandies2 = function (candies, num_people) {
  let ans = new Array(num_people).fill(0)

  // 完整分发的次数
  const p = Math.floor((2 * candies + 0.25)**0.5 - 0.5)
  // 剩余糖果
  const r = Math.floor(candies - (p + 1) * p * 0.5)

  // 分发轮次
  const rows = Math.floor(p / num_people)
  // 最后一个分发的下标
  const last = p % num_people

  for (let i = 0; i < num_people; i++) {
    ans[i] = (i + 1) * rows + Math.floor(rows * (rows - 1) * 0.5) * num_people
    if (i < last) ans[i] += i + 1 + rows * num_people //最后一轮的分发
  }

  ans[last] += r
  return ans
};



console.log(distributeCandies(7, 4))
console.log(distributeCandies2(7, 4))
