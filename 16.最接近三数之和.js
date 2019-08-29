/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
  if (nums.length < 3) {
    return null;
  }
  nums.sort((x, y) => x - y);
  const len = nums.length;
  let min = Infinity; // 最接近值合
  for (let i = 0; i < len; i++) {
    let L = i + 1;
    let R = len - 1;
    // 左指针往右遍历
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R];
      if (Math.abs(target - sum) < Math.abs(target - min)) {
        min = sum;
      } else if (sum > target) {
        R--;
        while (L < R && nums[R + 1] === nums[R]) {
          R--;
        }
      } else if (sum < target) {
        L++;
        while (L < R && nums[L - 1] === nums[L]) {
          L++;
        }
      } else {
        return min;
      }
    }
  }
  return min;
};
