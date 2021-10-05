// 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let p1 = 0,
    p2 = nums.length - 1;
  while (p1<=p2) {
    let mid = Math.floor((p1 + p2) / 2);
    if (target === nums[mid]) {
      return mid
    } else {
      if (target < nums[mid]) {
        p2 = mid - 1;
      } else {
        p1 = mid + 1;
      }
    }
  }

  return -1
};

console.log(search([-1, 0, 3, 5, 9, 12], 2));
