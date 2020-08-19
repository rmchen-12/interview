/**
 * 输入两个数字 n, k，算法输出 [1..n] 中 k 个数字的所有组合。
 * 比如输入 n = 4, k = 2，输出如下结果，顺序无所谓，但是不能包含重复（按照组合的定义，[1,2] 和 [2,1] 也算重复）：
 * [ [1,2], [1,3], [1,4], [2,3], [2,4], [3,4] ]
 */

let res = [];

function combine(n, k) {
  const track = [];
  backTrack(k, n, 0, track);
  return res;
}

function backTrack(k, n, start, track) {
  if (track.length === k) {
    res.push(track.slice());
    return;
  }

  for (let i = start; i < n; i++) {
    track.push(i + 1);
    backTrack(k, n, start + 1, track);
    track.pop();
  }
}

console.log(combine(4, 2));
