class MaxHeap {
  constructor(arr = []) {
    this.maxHeap = [];
    for (let i = 0; i < arr.length; i++) {
      this.maxHeap[i + 1] = arr[i];
    }
    for (let i = Math.floor(this.maxHeap.length / 2); i >= 1; i--) {
      // 从尾部一直往下移动数据到正确的位置
      this.shiftDown(i);
    }
  }

  shiftDown(index) {
    while (2 * index < this.maxHeap.length) {
      // 与子节点交换
      let i = 2 * index;
      if (
        i + 1 < this.maxHeap.length &&
        this.maxHeap[i + 1] > this.maxHeap[i]
      ) {
        // 与两个子节点中更小的交换位置
        i += 1;
      }
      // 已经移到了正确位置
      if (this.maxHeap[index] >= this.maxHeap[i]) {
        break;
      }
      this.swap(index, i);
      index = i; // 子节点继续向下交换
    }
  }

  shiftUp(index) {
    while (
      index > 1 &&
      this.maxHeap[Math.floor(index / 2)] < this.maxHeap[index]
    ) {
      this.swap(Math.floor(index / 2), index);
      index = Math.floor(index / 2);
    }
  }

  insert(num) {
    this.maxHeap.push(num);
    this.shiftUp(this.maxHeap.length - 1);
  }

  pop() {
    let item;
    if (this.maxHeap.length - 1 >= 2) { // 把最尾巴的提到最上 做shiftDown操作
      item = this.maxHeap[1];
      this.swap(1, this.maxHeap.length - 1);
      this.maxHeap.pop(); // 去掉尾节点
      this.shiftDown(1);
    }
    return item;
  }

  swap(i, j) {
    const temp = this.maxHeap[i];
    this.maxHeap[i] = this.maxHeap[j];
    this.maxHeap[j] = temp;
  }
}

const a = new MaxHeap([1, 2, 34, 52, 123, 4551]);
a.insert(2222);
const b = a.pop()
const c = a.pop()

