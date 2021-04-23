// 思路：状态转移方程依然是
// f(m,n) = f(m-1,n) + f(m,n-1)
// 多了一步障碍物判断

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;
  if (m === 0 || n === 0) {
    return 0;
  }
  const route = new Array(m);
  for (let i = 0; i < route.length; i += 1) {
    route[i] = new Array(n);
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        if(obstacleGrid[i][j]){
          route[i][j] = 0;
        }else{
          route[i][j] = 1;
        }
      } else {
        // 此路不通
        if (obstacleGrid[i][j]) {
          route[i][j] = 0;
        } else {
          const last1 = i - 1 >= 0 ? route[i - 1][j] : 0;
          const last2 = j - 1 >= 0 ? route[i][j - 1] : 0;
          // 算出表
          route[i][j] = last1 + last2;
        }
      }
    }
  }
  return route[m - 1][n - 1];
};
console.log(
  uniquePathsWithObstacles([
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ]),
);
