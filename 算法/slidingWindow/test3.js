/**
 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

 示例 1:

 输入: "abcabcbb"
 输出: 3
 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 * */

function slidingWindow(s) {
    let window = {};

    let left = 0, right = 0, res = 0;
    while (right < s.length) {
        // c 是将移入窗口的字符, 右移指针
        let c = s[right];
        right++;
        // 进行窗口内数据的一系列更新
        window[c] = window[c] ? window[c] + 1 : 1;

        // 判断左侧窗口是否要收缩
        while (window[c] > 1) {
            // d 是将移出窗口的字符
            let d = s[left];
            // 左移窗口
            left++;
            // 进行窗口内数据的一系列更新
            window[d]--
        }

        res = Math.max(res, right - left)
    }
    return res
}

console.log(slidingWindow('abcabcbb'));
