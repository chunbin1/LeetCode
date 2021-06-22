// 来自于https://juejin.cn/post/6973155726302642206#heading-22的文章

// Promise 3 种状态
const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

class MyPromise {
  constructor(executor) {
    // 执行器
    executor(this.resolve, this.reject);
  }

  status = STATUS.PENDING;

  // 成功返回值
  value = null;

  // 失败返回值
  reason = null;

  // 成功回调
  onFulfilledCallback = [];

  // 失败回调
  onRejectedCallback = [];

  // 修改 Promise 状态，并定义成功返回值
  resolve = (value) => {
    if (this.status === STATUS.PENDING) {
      this.status = STATUS.FULFILLED;
      this.value = value;

      while (this.onFulfilledCallback.length) {
        this.onFulfilledCallback.shift()(value);
      }
    }
  };

  // 修改 Promise 状态，并定义失败返回值
  reject = (value) => {
    if (this.status === STATUS.PENDING) {
      this.status = STATUS.REJECTED;
      this.reason = value;

      while (this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(value);
      }
    }
  };

  then = (onFulfilled, onRejected) => {
    // onFulfilled、onRejected 是可选参数。如果 onFulfilled 不是函数，则必须忽略它；如果 onRejected 不是函数，则必须忽略它；
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (error) => {
            throw error;
          };

    switch (this.status) {
      case STATUS.PENDING: {
        this.onRejectedCallback.push(onRejected);
        this.onFulfilledCallback.push(onFulfilled);
        break;
      }
      case STATUS.FULFILLED: {
        onFulfilled(this.value);
        break;
      }
      case STATUS.REJECTED: {
        onRejected(this.reason);
        break;
      }
    }
  };
}

const mypromise = new MyPromise((resolve, reject) => {
  resolve('成功');
});

mypromise.then(data => {
  console.log(data, '1')
})

mypromise.then(data => {
  console.log(data, '2')
})
// const promise = new Promise(function(resolve, reject) {
//   // ... some code

//   if (/* 异步操作成功 */){
//     resolve(value);
//   } else {
//     reject(error);
//   }
// });

// promise.then(data => {
//     console.log('请求成功')
// }, err => {
//     console.log('请求失败'）
// })
