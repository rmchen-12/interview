/**
 * 防抖，回城，只触发一次
 */
function debounce(fn, wait, immediate) {
  let timer;
  return function() {
    let args = arguments;
    let context = this;

    if (immediate && !timer) {
      fn.apply(context, args);
    }

    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
