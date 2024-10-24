// import { AsyncSeriesLoopHook } from "tapable";
import { AsyncSeriesLoopHook } from "lib/my-tapable";
const asyncSeriesLoopHook = new AsyncSeriesLoopHook([
  "arg1",
  "arg2",
  "arg3",
]);

asyncSeriesLoopHook.tap("asyncSeriesLoopHook tap 1", (arg1, arg2, arg3) => {
  setTimeout(() => {
    console.log("asyncSeriesLoopHook tap 1", arg1, arg2, arg3);
  }, 3000);
//   return 22
});

asyncSeriesLoopHook.tapAsync(
  "asyncSeriesLoopHook tapAsync 1",
  (arg1, arg2, arg3, done) => {
    console.log("asyncSeriesLoopHook tapAsync 1", arg1, arg2, arg3);
    done();
  }
);

asyncSeriesLoopHook.tapAsync(
  "asyncSeriesLoopHook tapAsync 2",
  (arg1, arg2, arg3, done) => {
    console.log("asyncSeriesLoopHook tapAsync 2", arg1, arg2, arg3);

    setTimeout(() => {
      done(undefined);
    }, 1000);
  }
);

asyncSeriesLoopHook.tapPromise(
  "loop!",
  (arg1, arg2, arg3) => {
    console.log("asyncSeriesLoopHook tapPromise 1 outer", arg1, arg2, arg3);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("loop here", arg1, arg2, arg3);
        resolve("tap promise res");
      }, 4000);
    });
  }
);

// asyncSeriesLoopHook.tapPromise('asyncSeriesLoopHook tapPromise 1',(arg1,arg2,arg3) => {
//     console.log('asyncSeriesLoopHook tapPromise 1 outer',arg1,arg2,arg3)
//     return new Promise(resolve=>{
//         console.log('asyncSeriesLoopHook tapPromise 1',arg1,arg2,arg3)
//        setTimeout(() => {
//         resolve('tap promise res')
//        }, 10000);
//     })
// })
// console.time('test')
// asyncSeriesLoopHook.callAsync(1,2,3,(err,val)=>{
//     console.log('end',err,'val',val)
//     console.timeEnd('test')
// })

console.time('test2')
asyncSeriesLoopHook
  .promise(1, 2)
  .then((val) => {
    console.log("success", val);
    console.timeEnd('test2')
  })
  .catch((err) => {
    console.log("err", err);
    console.timeEnd('test2')
  });
