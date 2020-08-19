const resolveAll = (arr) => {
  return new Promise((resolve, reject) => {
    let result = [];
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      const promise = arr[i];
      promise.then((data) => {
        result[i] = data;
        if (result.length === ++count) {
          resolve(result);
        }
      }, reject);
    }
  });
};

function a(a) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1);
    }, 2000);
  });
}

function b(a) {
  return new Promise((resolve, reject) => {
    resolve(2);
  });
}

resolveAll([a(), b()]).then((res) => console.log(res));
