// 动态规划
// 状态转移方程 f(i) = max(f(i-1),f(i-2)+ arr[i])

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 0) {
    return 0;
  }
  if (nums.length === 1) {
    return nums[0];
  }
  if (nums.length === 2) {
    return Math.max(nums[0], nums[1]);
  }
  let sum, preSum, prepreSum;
  // 初始化
  prepreSum = nums[0]
  preSum =  nums[1] 
  sum = Math.max(preSum, prepreSum + nums[2]);
  for (let i = 3; i < nums.length; i++) {
    prepreSum = Math.max(preSum,prepreSum);
    preSum = sum;
    sum = Math.max(preSum, prepreSum + nums[i]);
  }
  return sum;
};
