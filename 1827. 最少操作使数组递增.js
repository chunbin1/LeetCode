// 思路：
//   1. 左往右便利，始终比左加1

var minOperations = function (nums) {
  if (nums.length <= 1) {
    return 0;
  }
  let line = nums[0];
  let times = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= line) {
      times += (line - nums[i] + 1);
      line = line + 1;
    }
    else{
      line = nums[i]
    }
  }
  return times;
};
