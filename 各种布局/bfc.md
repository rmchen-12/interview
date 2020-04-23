### 三种定位方案
 1. 常规流
 2. float
 3. 绝对定位
 
### BFC(BFC其实就是对css多种定位方案，在使用过程中，相互影响的解决方案，相当于css补丁)
 1. 内部的盒会在垂直方向一个接一个排列（可以看作BFC中有一个的常规流）；
 2. 处于同一个BFC中的元素相互影响，可能会发生margin collapse；
 3. 每个元素的margin box的左边，与容器块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此；
 4. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然；
 5. 计算BFC的高度时，考虑BFC所包含的所有元素，连浮动元素也参与计算；
 6. 浮动盒区域不叠加到BFC上；

创建方法
 1. 根元素或其它包含它的元素；
 2. 浮动 (元素的float不为none)；
 3. 绝对定位元素 (元素的position为absolute或fixed)；
 4. 行内块inline-blocks(元素的 display: inline-block)；
 5. 表格单元格(元素的display: table-cell，HTML表格单元格默认属性)；
 6. overflow的值不为visible的元素；
 7. 弹性盒 flex boxes (元素的display: flex或inline-flex)；

