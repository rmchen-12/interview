/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      for (n = 0; n < j - i; n++) {
        const temp = s.slice(i, j);
        console.log(temp);
        
        if (!temp.includes(temp[n])) {
          return j - i;
        }
      }
    }
  }
};

console.log(lengthOfLongestSubstring('abcbc'));
