/**
 * 比如输入 nums = [1,2,3]，你的算法应输出 8 个子集，包含空集和本身，顺序可以不同：
[ [],[1],[2],[3],[1,3],[2,3],[1,2],[1,2,3] ]
 */

let res = [];

function subsets(nums) {
  const track = [];
  backTrack(nums, 0, track);
  return res;
}

function backTrack(nums, start, track) {
  res.push(track);
  for (let i = start; i < nums.length; i++) {
    track.push(nums[i]);
    backTrack(nums, i + 1, track);
    track.pop();
  }
}

console.log(subsets([1, 2, 3]));
