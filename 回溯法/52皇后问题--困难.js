/** 
 * 思路：回溯法
 * 每一行都需要放一个棋子，所以从第一行第一列开始，先放一个，然后下一行会被约束不能放
 * 如何判断是否能放下这个棋子：
 *  左对角线：col -  row  = 常数a 唯一
 *  右对角线：col + row = 常数b 唯一
 *  
*/

/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
  let result = 0
  const notValidColumns = []
  const letfLine = [] // [col - row]:true 表示在对角线上
  const rightLine = [] // [col+row]:true 表示在对角线上

  function canSet(row, col) {
    return letfLine[col - row] !== true && rightLine[col + row] !== true && notValidColumns[col] !== true
  }

  function addQueens(row, col) {
    notValidColumns[col] = true
    letfLine[col - row] = true
    rightLine[col + row] = true
  }

  function removeQueens(row, col) {
    notValidColumns[col] = false
    letfLine[col - row] = false
    rightLine[col + row] = false
  }

  // row从第0行开始放, queens表示放了的queens数量
  function setQueens(row, queens) {
    // 找出一个解
    if (queens === n) {
      result += 1
      return
    }

    for (let col = 0; col < n; col++) {
      if (canSet(row, col)) {
        addQueens(row, col)
        setQueens(row + 1, queens + 1)
        removeQueens(row, col)
      }
    }
  }

  setQueens(0, 0)
  return result
};