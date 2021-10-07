var searchInsert = function(nums, target) {
  let p1 = 0,p2 = nums.length - 1
  while(p1<=p2){
    const mid = Math.floor((p1 + p2)/2)
    if(nums[mid]===target){
      return mid
    }else{
      if(nums[mid]>target){
        p2 = mid - 1
      }else{
        p1 = mid + 1
      }
    }
  }
  return p1
};

console.log(
  searchInsert([1,3,5,6],7)
)