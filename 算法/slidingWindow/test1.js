/**
 给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的排列。

 换句话说，第一个字符串的排列之一是第二个字符串的子串。

 示例1:

 输入: s1 = "ab" s2 = "eidbaooo"
 输出: True
 解释: s2 包含 s1 的排列之一 ("ba").
  

 示例2:

 输入: s1= "ab" s2 = "eidboaoo"
 输出: False
  

 注意：

 输入的字符串只包含小写字母
 两个字符串的长度都在 [1, 10,000] 之间
 */

function slidingWindow(s, t) {
    const need = {}, window = {};
    for (let i = 0; i < t.length; i++) {
        need[t[i]] = need[t[i]] ? need[t[i]] + 1 : 1
    }

    let left = 0, right = 0, valid = 0;
    while (right < s.length) {
        let c = s[right];
        right++;
        if (c in need) {
            window[c] = window[c] ? window[c] + 1 : 1;
            if (window[c] === need[c]) {
                valid++
            }
        }

        while (right - left >= t.length) {
            if (valid === Object.keys(need).length) {
                return true
            }
            let d = s[left];
            left++;
            if (d in need) {
                if (window[d] === need[d]) {
                    valid--
                }
                window[d]--
            }
        }
    }

    return false
}


console.log(slidingWindow("eidbaooo", "ab"));

