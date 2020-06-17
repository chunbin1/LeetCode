/**
 * @param {string} S
 * @return {string[]}
 */

 // 值得注意的是 返回的顺序是从 后边开始变 所以是深度遍历
var letterCasePermutation = function (S) {
  let ans = []
  function backtrack(str, i) {
    debugger
    if (i >= S.length) {
      ans.push(str);
      return;
    }
    let curr = S[i];
    if (curr >= 'a' && curr <= 'z') {
      backtrack(str + curr, i + 1)
      const high = str + curr.toUpperCase()
      backtrack(high, i + 1)
    } else if (curr >= 'A' && curr <= 'Z') {
      backtrack(str + curr, i + 1)
      const low = str + curr.toLowerCase()
      backtrack(low, i + 1);
    } else{
      backtrack(str + curr, i + 1)
    }
  }
  backtrack('', 0);

  return ans;
};

console.log(letterCasePermutation('aa1b'))