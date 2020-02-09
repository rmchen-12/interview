/**
 * 节流，fps射速，就算一直，也只能一发一发来，在一个单位时间内，只能触发一次函数
 */
function throttle(fn, wait, immediate) {
  let timer;
  return function() {
    let context = this,
      args = arguments;

    if (immediate) {
      fn.apply(context, args);
      return;
    }

    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null;
      }, wait);
    }
  };
}
