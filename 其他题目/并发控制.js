/**  * JS实现一个带并发控制的异步调度器，保证同时运动的任务最多有两个，完善下面代码 */

class Scheduler {
  constructor(max = 2) {
    this.queqe = [];
    this.running = 0;
    this.max = max;
  }

  add(promiseCreator) {
    // debugger
    if (this.running < this.max) {
      this.running += 1;
      return promiseCreator().then(() => {
        this.next();
      });
    } else {
      let resolve;
      const p = new Promise((r) => {
        resolve = r;
      });
      const fn = () => {
        promiseCreator().then(() => {
          resolve();
          this.next();
        });
      };
      this.queqe.push(fn);
      return p;
    }
  }

  next() {
    if (this.queqe.length === 0) {
      this.running -= 1;
    } else {
      const fn = this.queqe.shift();
      fn();
    }
  }
}

const timeout = (time) => new Promise((resolve) => setTimeout(resolve, time));

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4);
// 输出 2,3,1,4