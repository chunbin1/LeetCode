// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

// 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

// 思路： 因为要O(n),所以采用哈希表的方法

function longestConsecutive(nums: number[]): number {
    let maxLong = 0
    const hashMap = new Set<number>()
    for(const num of nums){
      hashMap.add(num)
    }
    for(const num of hashMap){
      let currentLong = 0
      // 判断是不是第一个
      if(!hashMap.has(num - 1)){
        currentLong += 1
        let currentNum =  num
        while(hashMap.has(currentNum+1)){
          currentNum = currentNum + 1
          currentLong += 1
        }
      }
      maxLong =  Math.max(currentLong,maxLong)
    }
    return maxLong
};