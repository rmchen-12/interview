(二分技巧)[https://labuladong.gitbook.io/algo/di-ling-zhang-bi-du-xi-lie/er-fen-cha-zhao-xiang-jie#san-xun-zhao-you-ce-bian-jie-de-er-fen-cha-zhao]

### 二分查找
根据逻辑将「搜索区间」全都统一成了两端都闭，便于记忆

- 技巧
1. 不要出现 else，而是把所有情况用 else if 写清楚，这样可以清楚地展现所有细节
2. 注意「搜索区间」和 while 的终止条件，如果存在漏掉的元素，记得在最后检查。
3. 代码中 left + (right - left) / 2 就和 (left + right) / 2 的结果相同，但是有效防止了 left 和 right 太大直接相加导致溢出
4. 如需定义左闭右开的「搜索区间」搜索左右边界，只要在 nums[mid] == target 时做修改即可，搜索右侧时需要减一。

##### 寻找一个数的二分搜索
```
function binarySearch(nums, target) {
    const left = 0, right = nums.length - 1;
    while( left <= right ){
         const mid = left + (right - left) / 2; // 防止溢出
         if (nums[mid] === target){
                return mid    
         } else if (nums[mid] < target) {
                left = mid + 1
         } else if (nums[mid] > target) {
                right = mid - 1
         }
    }
    return -1;
}
```

##### 寻找左侧边界的二分搜索
```
function left_bound(nums, target) {
    const left = 0, right = nums.length - 1;
    while( left <= right ){
         const mid = left + (right - left) / 2; // 防止溢出
         if (nums[mid] === target){
                return left = mid + 1 // 别返回，锁定左侧边界
         } else if (nums[mid] < target) {
                left = mid + 1
         } else if (nums[mid] > target) {
                right = mid - 1
         }
    }
     // 最后要检查 left 越界的情况
     if (left >= nums.length || nums[left] != target)
         return -1;
     return left;
}
```

##### 寻找右侧边界的二分搜索
```
function right_bound(nums, target) {
    const left = 0, right = nums.length - 1;
    while( left <= right ){
         const mid = left + (right - left) / 2; // 防止溢出
         if (nums[mid] === target){
                return right = mid - 1 // 别返回，锁定右侧边界
         } else if (nums[mid] < target) {
                left = mid + 1
         } else if (nums[mid] > target) {
                right = mid - 1
         }
    }
     // 最后要检查 right 越界的情况
     if (right < 0 || nums[right] != target)
         return -1;
     return right;
}
```
