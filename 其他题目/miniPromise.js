// 来自于https://juejin.cn/post/6973155726302642206#heading-22的文章
// https://juejin.cn/post/6945319439772434469 

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

    let resolve;
    let reject;
    // 弄个新的Promise
    const promise2 = new MyPromise((_resolve, _reject) => {
      resolve = _resolve;
    });

    const fulfilledMicrotask = () => {
      // 创建一个微任务等待 promise2 完成初始化
      queueMicrotask(() => {
        try {
          const x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    };

    const rejectedMicrotask = () => {
      // 创建一个微任务等待 promise2 完成初始化
      queueMicrotask(() => {
        try {
          // 调用失败回调，并且把原因返回
          const x = realOnRejected(this.reason);
          // 传入 resolvePromise 集中处理
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    };

    if (this.status === STATUS.PENDING) {
      this.onFulfilledCallback.push(fulfilledMicrotask);
      this.onRejectedCallback.push(rejectedMicrotask);
    } else if (this.status === STATUS.FULFILLED) {
      fulfilledMicrotask()
    } else if (this.status === STATUS.REJECTED) {
      rejectedMicrotask()
    }

    return promise2;
  };
}

function resolvePromise(promise2, x, resolve, reject) {
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

const promise = new MyPromise((resolve, reject) => {
  resolve('直接结束')
  // setTimeout(() => {
  //   resolve('success')
  // }, 2000); 
})

console.log(promise);
debugger
promise.then(value => {
  console.log('resolve', value)
}, reason => {
  console.log('reject', reason)
})

console.log('主程序')

