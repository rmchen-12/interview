/**
 * [1,2,3,4]全排列
 */

const res = [];

function permute(nums) {
  const track = [];
  backTrack(nums, track);
  return res;
}

function backTrack(nums, track) {
  if (track.length === nums.length) {
    res.push(track);
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    if (track.includes(nums[i])) {
      continue;
    }
    track.push(nums[i]);
    backTrack(nums, track);
    track.pop();
  }
}

console.log(permute([1, 2, 3, 4]));
