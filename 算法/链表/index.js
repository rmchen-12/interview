// 找到两个单链表相交的起始节点。
var getIntersectionNode = function (headA, headB) {
  // 清除高度差
  let pA = headA,
    pB = headB;
  while (pA || pB) {
    if (pA === pB) return pA;
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return null;
};

/**
 * 给定一个链表: 1->2->3->4->5, 和 n = 2.
 * 当删除了倒数第二个节点后，链表变为 1->2->3->5.
 */

var removeNthFromEnd = function (head, n) {
  let preHead = new ListNode(0);
  preHead.next = head;
  let fast = preHead,
    slow = preHead;
  // 快先走 n+1 步
  while (n--) {
    fast = fast.next;
  }
  // fast、slow 一起前进
  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return preHead.next;
};

/**
 * 输入：[1,2,3,4,5]
 * 输出：此列表中的结点 3 (序列化形式：[3,4,5])
 * 返回的结点值为 3 。 (测评系统对该结点序列化表述是 [3,4,5])。

 * 注意，我们返回了一个 ListNode 类型的对象 ans，这样：
 * ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, 以及 ans.next.next.next = NULL.
 */

var middleNode = function (head) {
  let fast = head,
    slow = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};
