(滑动窗口)[https://labuladong.gitbook.io/algo/di-ling-zhang-bi-du-xi-lie/hua-dong-chuang-kou-ji-qiao-jin-jie]

### 滑动窗口

- 模板
```c
/* 滑动窗口算法框架 */
function slidingWindow(s, t) {
    const need = {}, window = {};
    for (let i = 0; i < t.length; i++) {
       need[t[i]] = need[t[i]] ? need[t[i]] + 1 : 1
    }
    
    let left = 0, right = 0, valid = 0;
    while (right < s.length) {
        // c 是将移入窗口的字符, 右移指针
        let c = s[right];
        right++;
        // 进行窗口内数据的一系列更新
        ...

        // 判断左侧窗口是否要收缩
        while (window needs shrink) {
            // 满足条件的操作
            ...
            // d 是将移出窗口的字符
            let d = s[left];
            // 左移窗口
            left++;
            // 进行窗口内数据的一系列更新
            ...
        }
    }
}
```
其中两处 ... 表示的更新窗口数据的地方，到时候你直接往里面填就行了
