/**
 * 思路：子序列不连续
 * 两个字符串为dp的左边和上边
 * 多加一行包括为空字符串的情况
 * 状态转移
 * text1[i] === text2[j]  dp[i][j] = dp[i-1][j-1]+1
 * text1[i] !== text2[j]  dp[i][j] = max(dp[i-1][j],dp[i][j-1])
 */

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  // 新建dp
  const dp = new Array(text1.length + 1);
  for (let i = 0; i < dp.length; i++) {
    dp[i] = new Array(text2.length + 1);
    for (let j = 0; j < dp[i].length; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0;
      } else if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else if (text1[i - 1] !== text2[j - 1]) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[text1.length][text2.length];
};

console.log(longestCommonSubsequence("abcde", "ace"));
