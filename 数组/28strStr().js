
/**
 * 思路：双指针
 * 
 * https://leetcode-cn.com/problems/implement-strstr/solution/shi-xian-strstr-by-leetcode/
 * 
 * 拓展：hash表
 */

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  if(needle===''){
    return 0
  }
  if(haystack.length<needle.length){
    return -1
  }
  let nP = 0
  for(let i=0;i<haystack.length;i++){
    if(haystack[i]===needle[nP]){ // 开始比较
      let isSame = true
      let j = i + 1 
      nP = nP+1
      while(isSame&&nP<needle.length){
        if(haystack[j] === needle[nP]){
          j = j+1
          nP = nP+1
        }
        else{
          isSame = false
          nP = 0
        }
      }
      if(isSame){
        return i
      }
    }
  }
  return -1
};

console.log(
  strStr('hello','ll')
)

console.log(
  strStr('aaaaa','bba')
)