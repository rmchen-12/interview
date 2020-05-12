/**
 给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。

 字符串只包含小写英文字母，并且字符串 s 和 p 的长度都不超过 20100。

 说明：

 字母异位词指字母相同，但排列不同的字符串。
 不考虑答案输出的顺序。
 示例 1:

 输入:
 s: "cbaebabacd" p: "abc"

 输出:
 [0, 6]

 解释:
 起始索引等于 0 的子串是 "cba", 它是 "abc" 的字母异位词。
 起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。
 */

function slidingWindow(s, t) {
    const need = {}, window = {};
    for (let i = 0; i < t.length; i++) {
        need[t[i]] = need[t[i]] ? need[t[i]] + 1 : 1
    }

    let left = 0, right = 0, valid = 0;
    let ans = [];
    while (right < s.length) {
        // c 是将移入窗口的字符, 右移指针
        let c = s[right];
        right++;
        // 进行窗口内数据的一系列更新
        if (c in need) {
            window[c] = window[c] ? window[c] + 1 : 1;
            if (window[c] === need[c]) {
                valid++
            }
        }

        // 判断左侧窗口是否要收缩
        while (right - left >= t.length) {
            // 满足条件的操作
            if (valid === Object.keys(need).length) {
                ans.push(left)
            }
            // d 是将移出窗口的字符
            let d = s[left];
            // 左移窗口
            left++;
            // 进行窗口内数据的一系列更新
            if (d in need) {
                if (window[d] === need[d]) {
                    valid--
                }
                window[d]--;
            }
        }
    }

    return ans
}

console.log(slidingWindow("cbaebabacd", "abc"));
