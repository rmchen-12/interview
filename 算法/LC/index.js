/**
 * 输入: ["flower","flow","flight"]
 * 输出:  "fl"
 */

const a = (strs) => {
  if (strs === null || strs.length === 0) return '';
  return lCPrefixRec(strs);
};

function lCPrefixRec(strs) {
  let length = strs.length;
  if (length === 1) {
    return strs[0];
  }
  let mid = Math.floor(length / 2);
  let left = strs.slice(0, mid);
  let right = strs.slice(mid, length);

  return lCPrefixTow(lCPrefixRec(left), lCPrefixRec(right));
}

function lCPrefixTow(left, right) {
  let index = 0;
  while (index < left.length && index < right.length) {
    if (left.charAt(index) !== right.charAt(index)) {
      break;
    }
    index++;
  }

  return left.slice(0, index);
}

console.log(a(['flower', 'flow', 'flight']));
