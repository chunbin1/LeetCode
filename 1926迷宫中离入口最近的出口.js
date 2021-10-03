// 广度优先遍历
// 沿着上下左右遍历
// maze为迷宫，entrance为
var nearestExit = function(maze, entrance) {
  let queue = []
  let m = maze.length;
  let n = maze[0].length;
  let dx = [1,0,-1,0];
  let dy = [0,1,0,-1];
  queue.push([entrance,0])
  // 走过的为‘+’，不让再走
  maze[entrance[0]][entrance[1]] = '+';

  while(queue.length){
    let pos = queue.shift();
    for(let i = 0;i<4;i++){
      let nx = pos[0] + dx[i];
      let ny = pos[1] + dy[i];
      if(nx>=0 && nx < m && ny >= 0 && ny < n && maze[nx][ny] == '.'){
          if(nx == 0 || nx == m-1 || ny == 0 || ny == n-1){
              return pos[2] + 1;
          }
          maze[nx][ny] = '+';
          queue.push([nx,ny,pos[2] + 1]);
      }
    }
  }
  return -1
};