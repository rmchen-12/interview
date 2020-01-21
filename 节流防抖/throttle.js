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
