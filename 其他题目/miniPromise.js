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
    debugger
    // onFulfilled、onRejected 是可选参数。如果 onFulfilled 不是函数，则必须忽略它；如果 onRejected 不是函数，则必须忽略它；
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (error) => {
            throw error;
          };

    let resolve
    let reject 
    // 弄个新的Promise
    const promise2 = new MyPromise((_resolve, _reject) => {
      resolve = _resolve
    });

    if (this.status === STATUS.PENDING) {
      this.onFulfilledCallback.push(() => {
        const x = onFulfilled(this.value);
        resolvePromise(promise2, x, resolve, reject);
      });
      this.onRejectedCallback.push(() => {
        const x = onRejected(this.value);
        resolvePromise(promise2, x, resolve, reject);
      });
    } else if (this.status === STATUS.FULFILLED) {
      const x = onFulfilled(this.value);
      resolvePromise(promise2, x, resolve, reject);
    } else if (this.status === STATUS.REJECTED) {
      const x = onRejected(this.error);
      resolvePromise(promise2, x, resolve, reject);
    }

    return promise2;
  };
}

function resolvePromise(promise2, x, resolve, reject) {
  debugger
  // 如果 promise2 === x， 执行 reject，错误原因为 TypeError
  if (promise2 === x) {
    reject(new TypeError('The promise and the return value are the same'));
  }

  // 如果 x 是函数或对象
  if (typeof x === 'object' || typeof x === 'function') {
    let then;
    try {
      then = x.then;
    } catch (error) {
      reject(error);
    }

    // 如果 x.then 是函数
    if (typeof then === 'function') {
      then.call(
        x,
        (y) => {
          // resolve的结果依旧是promise 那就继续解析
          resolvePromise(promise2, y, resolve, reject);
        },
        (err) => {
          reject(err); // 失败了
        },
      );
    } else {
      // 如果 x.then 不是函数
      resolve(x);
    }
  } else {
    // 如果 x 不是 promise 实例
    resolve(x);
  }
}

const mypromise = new MyPromise((resolve, reject) => {
  resolve('成功');
});

const mypromise2 = new MyPromise((resolve, reject) => {
  resolve('成功2');
});

mypromise
  .then((data) => {
    console.log(data, '1');
    return mypromise2
  }).then(data=>{
    console.log(data,'2')

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
