// 从两边向内

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  let p1 = 0,
    p2 = nums.length - 1;
  const ret = [];
  while (p1 <= p2) {
    const val1 = Math.pow(nums[p1], 2);
    const val2 = Math.pow(nums[p2], 2);
    // 把大的先塞进数组并移动指针

    if (val1 >= val2) {
      ret.unshift(val1);
      p1 += 1;
    } else {
      ret.unshift(val2);
      p2 -= 1;
    }
  }
  return ret;
};
