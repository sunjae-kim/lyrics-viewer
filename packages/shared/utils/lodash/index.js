export default {
  log: () => {
    console.log('call from shared');
    return 'return from shared'
  },
  throttle: (callback, delay) => {
    let timer = null;
    return param => {
      if (!timer) {
        callback(param);
        timer = setTimeout(() => {
          timer = null;
        }, delay);
      }
    };
  },
  debounce: (callback, delay) => {
    let timer = null;
    return param => {
      if (timer) timer = null;
      const curTimer = setTimeout(() => {
        if (timer === curTimer) callback(param);
      }, delay);
      timer = curTimer;
    };
  },
};
