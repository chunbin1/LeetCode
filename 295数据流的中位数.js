// https://leetcode-cn.com/problems/find-median-from-data-stream/

class Heap {
  // 0最大堆 \ 1最小多
  constructor(arr = [], sortBy = 0) {
    this._Heap = [];
    this.sortBy = sortBy;
    this._Heap[0] = undefined;
    for (let i = 0; i < arr.length; i++) {
      this._Heap[i + 1] = arr[i];
    }
    for (let i = Math.floor(this._Heap.length / 2); i >= 1; i--) {
      // 从尾部一直往下移动数据到正确的位置
      this.shiftDown(i);
    }
  }

  // 向下给index节点找位置
  shiftDown(index) {
    while (2 * index < this._Heap.length) {
      // 与子节点交换
      let i = 2 * index;
      if (i + 1 < this._Heap.length && this.compare(i + 1, i)) {
        // 与两个子节点中更小的交换位置
        i += 1;
      }
      // 已经移到了正确位置
      if (this.compare(index, i)) {
        break;
      }
      this.swap(index, i);
      index = i; // 子节点继续向下交换
    }
  }

  // 向上找最合适的位置
  shiftUp(index) {
    while (index > 1 && this.compare(index, Math.floor(index / 2))) {
      this.swap(Math.floor(index / 2), index);
      index = Math.floor(index / 2);
    }
  }

  compare(i, j) {
    return this.sortBy === 0
      ? this._Heap[i] > this._Heap[j] // 最大堆
      : this._Heap[i] < this._Heap[j]; // 最小堆
  }

  insert(num) {
    if(num!==undefined){
      this._Heap.push(num);
      this.shiftUp(this.getLenth());
    }
  }

  pop() {
    let item;
    // 把最尾巴的提到最上 做shiftDown操作
    item = this._Heap[1];
    this.swap(1, this.getLenth());
    this._Heap.pop(); // 去掉尾节点
    this.shiftDown(1);
    return item;
  }

  getLenth() {
    return this._Heap.length - 1 || 0;
  }

  getTop() {
    return this._Heap[1];
  }

  swap(i, j) {
    if (i !== j) {
      const temp = this._Heap[i];
      this._Heap[i] = this._Heap[j];
      this._Heap[j] = temp;
    }
  }
}

/**
 * initialize your data structure here.
 */
var MedianFinder = function () {
  this.maxTree = new Heap([],0);
  this.minTree = new Heap([],1);
  this.length = 0;
};

// 保持最大堆和最小堆的数量差<=1
// 比最大堆的数插入到最小堆
/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  if (this.maxTree.getLenth()) {
    const midNum1 = this.maxTree.pop();
    const midNum2 = this.minTree.pop();
    const [smallNum, midNum, bigNum] = [midNum1, midNum2, num].sort((a, b) => {
      return a - b;
    });

    this.maxTree.insert(smallNum);
    this.minTree.insert(bigNum);
    if (this.maxTree.getLenth() - this.minTree.getLenth() >= 1) {
      this.minTree.insert(midNum);
    } else {
      this.maxTree.insert(midNum);
    }
  } else {
    this.maxTree.insert(num);
  }
  this.length = this.length + 1;
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  if (this.length === 0) {
    return undefined;
  }
  if (this.length % 2 === 0) {
    // 偶数
    return (this.minTree.getTop() + this.maxTree.getTop()) / 2;
  }
  return this.maxTree.getTop();
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

var obj = new MedianFinder();
obj.addNum(0);
obj.addNum(2);
obj.addNum(100);
obj.addNum(10002);
var param_2 = obj.findMedian();
console.log(param_2);
