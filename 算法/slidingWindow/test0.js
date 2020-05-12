/**
 LeetCode 76 题，Minimum Window Substring，难度 Hard：
 给你一个字符串 S、一个字符串 T，请在字符串 S 里面找出：包含 T 所有字符的最小子串。

 示例：

 输入: S = "ADOBECODEBANC", T = "ABC"
 输出: "BANC"
 说明：

 如果 S 中不存这样的子串，则返回空字符串 ""。
 如果 S 中存在这样的子串，我们保证它是唯一的答案。
 * */

function slidingWindow(s, t) {
    const need = {}, window = {};
    for (let i = 0; i < t.length; i++) {
        need[t[i]] = need[t[i]] ? need[t[i]] + 1 : 1
    }

    let left = 0, right = 0, valid = 0;
    let start = 0, len = Infinity;
    while (right < s.length) {
        let c = s[right];
        right++;
        if (c in need) {
            window[c] = window[c] ? window[c] + 1 : 1;
            if (window[c] === need[c]) {
                valid++
            }
        }

        while (valid === Object.keys(need).length) {
            if (right - left < len) {
                start = left;
                len = right - left
            }
            let c = s[left];
            left++;
            if (c in need) {
                if (window[c] === need[c]) {
                    valid--
                }
                window[c]--
            }
        }
    }

    return len === Infinity ? '' : s.slice(start, start + len)
}

console.log(slidingWindow("ADOBECODEBANC", "ABC"));
