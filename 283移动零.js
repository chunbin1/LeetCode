var moveZeroes = function(nums) {
  let length = nums.length - 1
  let zeroCount = 0
  for(let i = 0;i<=length;i++){
    if(nums[i]===0){
      zeroCount += 1
    }else{
      nums[i-zeroCount] = nums[i]
    }
  }
  for(let j = 0;j<zeroCount;j++){
    nums[length - j] = 0
  }
};