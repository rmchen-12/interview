const resolveAll = (arr) => {
  const iterator = arr[Symbol.iterator]();
  const result = [];

  return new Promise((resolve, reject) => {
    const next = async () => {
      let element = iterator.next();
      if (element.done) {
        resolve(result);
      } else {
        try {
          const res = await element.value;
          result.push(res);
          next();
        } catch (error) {
          reject(error);
        }
      }
    };
    next();
  });
};

function a(a) {
  return new Promise((resolve, reject) => {
    resolve(1);
  });
}

function b(a) {
  return new Promise((resolve, reject) => {
    resolve(2);
  });
}

resolveAll([a(), b()]).then((res) => console.log(res));
