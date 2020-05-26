/* 思路：动态转移方程
   f(m,n) = f(m-1,n) + f(m,n-1)
   到达每个格子的路径和为到达左一个加上到达上面的和
*/

var uniquePaths = function (m, n) {
  const route = new Array(m)
  for (let i = 0; i < route.length; i += 1) {
    route[i] = new Array(n);
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if ((i === 0) || (j === 0)) { // 初始化表
        route[i][j] = 1
      } else { // 算出表
        route[i][j] = route[i - 1][j] + route[i][j - 1]
      }
    }
  }
  return route[m-1][n-1]
};