function Promise(excutor) {
  let self = this;
  self.status = 'pending';
  self.value = null;
  self.reason = null;
  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value) {
    if (self.status === 'pending') {
      self.value = value;
      self.status = 'fulfilled';
      self.onFulfilledCallbacks.forEach(item => item());
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.reason = reason;
      self.status = 'rejected';
      self.onRejectedCallbacks.forEach(item => item());
    }
  }
  try {
    excutor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled =
    typeof onFulfilled === 'function'
      ? onFulfilled
      : function(data) {
          resolve(data);
        };
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : function(err) {
          throw err;
        };
  let self = this;
  if (self.status === 'fulfilled') {
    return new Promise((resolve, reject) => {
      try {
        let x = onFulfilled(self.value);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
  if (self.status === 'rejected') {
    return new Promise((resolve, reject) => {
      try {
        let x = onRejected(self.reason);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
  if (self.status === 'pending') {
    return new Promise((resolve, reject) => {
      self.onFulfilledCallbacks.push(() => {
        let x = onFulfilled(self.value);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      });
      self.onRejectedCallbacks.push(() => {
        let x = onRejected(self.reason);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      });
    });
  }
};

Promise.prototype.catch = function(fn) {
  return this.then(null, fn);
};
