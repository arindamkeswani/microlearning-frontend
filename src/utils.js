// Debounce
let timer;
export const debounce = (func, delay) => {
  return function (...args) {
    const context = this;

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, delay);
  };
};
