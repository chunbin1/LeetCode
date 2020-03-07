// https://leetcode-cn.com/problems/dui-lie-de-zui-da-zhi-lcof/submissions/ 
/**
 * 
 * 思路：维持一个最大队列
 */
var MaxQueue = function () {
  this.queue = []
  this.max_queue = [] // 维护一个最大数组，每次插入把前面比他小的元素都去掉
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function () {
  return this.max_queue[0] || -1
};

/** 
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function (value) {
  this.queue.push(value)
  for (let i = this.max_queue.length - 1; i >= 0; i--) { // 把队列中小的元素全部去除
    if (this.max_queue[i] < value) {
      this.max_queue.pop()
    }
  }
  this.max_queue.push(value)
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function () {
  if (this.queue.length === 0) return -1
  const shiftValue = this.queue.shift()
  if (shiftValue === this.max_value()) {
    this.max_queue.shift()
  }
  return shiftValue
};

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */