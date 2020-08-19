let findLongestWord = function (s, words) {
  words.sort((a, b) => b.length - a.length);
  words = [...new Set(words)];
  let max = 0;
  let res = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (isValid(s, word)) {
      let len = word.length;
      if (len > max) {
        res = word;
        max = len;
      }
    }
  }

  return res;
};

function isValid(s, word) {
  let index1 = 0;
  let index2 = 0;
  let len1 = s.length;
  let len2 = word.length;
  while (index1 < len1 && index2 < len2) {
    if (index2 === len2 - 1) {
      return true;
    }

    if (s[index1] === word[index2]) {
      index2++;
    }

    index1++;
  }

  return false;
}

console.log(findLongestWord('abpcplea', ['a', 'b', 'c']));
