var lengthOfLongestSubstring = function (s) {
  let max = 0,
    l = 0,
    r = 0,
    window = [];

  while (r < s.length) {
    let c = s[r];
    r++;
    window.push(c);
    max = Math.max(max, window.length);

    while (window.includes(s[r])) {
      l++;
      window.shift();
    }
  }

  return max;
};

console.log(lengthOfLongestSubstring('pwwkew'));
