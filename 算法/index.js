/**
 * 输入: "  hello world!  "
 * 输出: "world! hello"
 * 解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
 */

const reverseWords = (str) => {
  let arr = [];
  let strTrim = str.trim();
  let left = 0;
  let word = '';
  while (left < strTrim.length) {
    let c = strTrim.charAt(left);
    if (c === ' ' && word) {
      arr.unshift(word);
      word = '';
    } else {
      word += c;
    }
    left++;
  }
  arr.unshift(word);
  return arr.join(' ');
};

console.log(reverseWords('  hello world!  '));
