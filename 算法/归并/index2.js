/**
 * 二位有序数组到一维有序数组
 * [[1,2,3],[2,3,4],[1,3,9]]
 * [1,1,2,2,3,3,4]
 */

function mergeSort(array) {
  if (array.length === 1) {
    return array[0];
  }
  const m = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, m));
  const right = mergeSort(array.slice(m));
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

console.log(
  mergeSort([
    [1, 2, 3],
    [1, 3, 4],
    [1, 3, 9],
  ])
);
