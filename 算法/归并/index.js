const utils = {
  randomNum() {
    return Math.floor(Math.random() * 100);
  },
  randomArray() {
    return Array.from(Array(this.randomNum()), () => this.randomNum());
  },
};

function mergeSort(array) {
  // 归
  if (array.length < 2) {
    return array;
  }
  // 分
  const m = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, m));
  const right = mergeSort(array.slice(m));
  // 并
  return merge(left, right);
}

function merge(left, right) {
  let l = 0,
    r = 0,
    result = [];

  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) {
      result.push(left[l++]);
    } else {
      result.push(right[r++]);
    }
  }

  if (l < left.length) {
    result.push(...left.slice(l));
  }
  if (r < right.length) {
    result.push(...right.slice(r));
  }

  return result;
}

console.log(mergeSort(utils.randomArray()));
