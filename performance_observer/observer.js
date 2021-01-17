const { performance, PerformanceObserver } = require('perf_hooks');

function incrementArray(arr = []) {
  for (item in arr) {
    if (typeof arr[item] == 'number') {
      arr[item] = arr[item] + 2;
    } else {
      return arr;
    }
  }
  return arr;
}

const wrapped = performance.timerify(incrementArray);

// A PerformanceObserver must be subscribed to the 'function' event type in order for the timing details to be accessed

const obs = new PerformanceObserver((list) => {
  console.log(
    'list.getEntries[0].duration ::>>>',
    list.getEntries()[0].duration
  );
  console.log(
    'list.getEntries()[0].startTime ::>>>',
    list.getEntries()[0].startTime
  );
  obs.disconnect();
});

obs.observe({ entryTypes: ['function'] });
let res = incrementArray([0, 1, 2, 3]);

let timer = wrapped();
console.log('res ::>>>', res);
console.log('timer ::>>>', timer);
