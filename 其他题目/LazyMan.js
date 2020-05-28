// 观察者模式实现LazyMan

class LazyMan {
  constructor() {
    this.taskQueue = [];
    new Promise((resole) => {
      resole();
    }).then(() => {
      this.trigger();
    });
    this.next = this.next.bind(this);
  }
  // order 1 表示在后面插入 order -1 表示插入在前面
  use(key, fnc, order = 1) {
    const _this = this;
    if (!this[key]) {
      this[key] = function (...args) {
        const fn = function () {
          fnc(_this.next, ...args);
        };
        if (order === 1) {
          this.taskQueue.push(fn);
        } else if (order === -1) {
          this.taskQueue.unshift(fn);
        }
        return this;
      };
    }
  }

  next() {
    if (this.taskQueue.length !== 0) {
      const fn = this.taskQueue.shift();
      fn();
    }
  }
  trigger() {
    this.next();
  }
}

const lazyMan = new LazyMan();

lazyMan.use("eat", (next, something) => {
  console.log(`eat ${something}`);
  next();
});

lazyMan.use("sleep", (next, time) => {
  const s = time * 1000;
  setTimeout(() => {
    console.log(`sleep ${time}s`);
    next();
  }, s);
});

lazyMan.use(
  "sleepFirst",
  (next, time) => {
    const s = time * 1000;
    setTimeout(() => {
      console.log(`sleepFirst ${time}s`);
      next();
    }, s);
  },
  -1
);

lazyMan.sleep(5).eat("chicken").sleepFirst(2);
