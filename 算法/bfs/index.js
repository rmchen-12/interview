/**
 * 求二叉树最小深度
 * @param {*} root
 */

let minDepth = function (root) {
  let queue = [root];
  let depth = 0;

  while (queue.length) {
    depth++;
    let len = queue.length;
    while (len--) {
      let node = queue.shift();
      let left = node.left;
      let right = node.right;

      if (!left && !right) {
        return depth;
      }
      if (left) {
        queue.push(left);
      }
      if (right) {
        queue.push(right);
      }
    }
  }
};
