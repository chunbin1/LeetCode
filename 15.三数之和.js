/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function compare(a, b) {
  if (a < b) {
    // 按某种排序标准进行比较, a 小于 b
    return -1;
  }
  if (a > b) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

var threeSum = function(nums) {
  nums.sort(compare);
  const ret = [];

  const len = nums.length;
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue; //去重
    let L = i + 1;
    let R = len - 1;
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R];
      if (sum === 0) {
        ret.push([nums[i], nums[L], nums[R]]);
        while (L < R && nums[L] === nums[L + 1]) {
          L++;
        }
        while (L < R && nums[R] === nums[L - 1]) {
          R--;
        }
        L++;
        R--;
      } else if (sum < 0) {
        L++;
      } else if (sum > 0) {
        R--;
      }
    }
  }
  return ret;
};

// List<List<Integer>> ans = new ArrayList();
// int len = nums.length;
// if(nums == null || len < 3) return ans;
// Arrays.sort(nums); // 排序
// for (int i = 0; i < len ; i++) {
//     if(nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
//     if(i > 0 && nums[i] == nums[i-1]) continue; // 去重
//     int L = i+1;
//     int R = len-1;
//     while(L < R){
//         int sum = nums[i] + nums[L] + nums[R];
//         if(sum == 0){
//             ans.add(Arrays.asList(nums[i],nums[L],nums[R]));
//             while (L<R && nums[L] == nums[L+1]) L++; // 去重
//             while (L<R && nums[R] == nums[R-1]) R--; // 去重
//             L++;
//             R--;
//         }
//         else if (sum < 0) L++;
//         else if (sum > 0) R--;
//     }
// }
// return ans;

// };
console.log(threeSum([-1, 0, 1, 2, -1, -4]));
threeSum([-1, 0, 1, 2, -1, -4]);
// -4 -1 -1 0 1 2
