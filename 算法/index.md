(链接)[https://www.cnblogs.com/AlbertP/p/10847627.html]
(算法)[https://labuladong.gitbook.io/algo/di-ling-zhang-bi-du-xi-lie/er-fen-cha-zhao-xiang-jie]

### 二分查找
- 框架
```
function binarySearch(nums,target){
    const left = 0, right = ...;
    while(...){
         const mid = left + (right - left) / 2; // 防止溢出
         if (nums[mid] === target){
                ...    
         } else if (nums[mid] < target) {
                left = ...
         } else if (nums[mid] > target) {
                right =...
         }
    }
    return ...
}
```

- 技巧
1. 不要出现 else，而是把所有情况用 else if 写清楚，这样可以清楚地展现所有细节
2. ... 标记的部分，就是可能出现细节问题的地方
3. 代码中 left + (right - left) / 2 就和 (left + right) / 2 的结果相同，但是有效防止了 left 和 right 太大直接相加导致溢出

### 中心扩散


### 快慢指针


### 双指针


### 动态规划
