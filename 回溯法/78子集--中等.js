/**
 * @param {number[]} nums
 * @return {number[][]}
 */
/**
 * nums中没有重复的,思路1：
 * 子集复制 以[1,2,3]为例
 * step 1 : [[]]
 * step 2 : [[],[1]]
 * step 3 : [[],[1],[2],[1,2]]
 * step 4 : [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 */
var subsets = function (nums) {
  let start = [[]];
  for (let i = 0; i < nums.length; i++) {
    const length = start.length;
    start = [...start,...JSON.parse(JSON.stringify(start))];
    const newArrLength = start.length;
    const insertVal = nums[i];
    for (let j = length; j < newArrLength; j++) {
      start[j].push(insertVal);
    }
  }
  return start;
};

