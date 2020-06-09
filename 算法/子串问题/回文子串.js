function isPlalindrome(input) {
  if (typeof input !== 'string') return false;
  let i = 0,
    j = input.length - 1;
  while (i < j) {
    if (input.charAt(i) !== input.charAt(j)) return false;
    i++;
    j--;
  }
  return true;
}
