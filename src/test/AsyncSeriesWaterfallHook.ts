import { AsyncSeriesWaterfallHook } from "lib/my-tapable";
const asyncSeriesWaterfallHook = new AsyncSeriesWaterfallHook([
  "arg1",
  "arg2",
  "arg3",
]);

asyncSeriesWaterfallHook.tap(
  "asyncSeriesWaterfallHook tap 1",
  (arg1, arg2, arg3) => {
    console.log("asyncSeriesWaterfallHook tap 1", arg1, arg2, arg3);
    return 22;
  }
);

asyncSeriesWaterfallHook.tapAsync(
  "asyncSeriesWaterfallHook tapAsync 1",
  (arg1, arg2, arg3, done) => {
    console.log("asyncSeriesWaterfallHook tapAsync 1", arg1, arg2, arg3);
    done();
  }
);

asyncSeriesWaterfallHook.tapAsync(
  "asyncSeriesWaterfallHook tapAsync 2",
  (arg1, arg2, arg3, done) => {
    console.log("asyncSeriesWaterfallHook tapAsync 2", arg1, arg2, arg3);

    setTimeout(() => {
      done(undefined, 44);
    }, 1000);
  }
);

asyncSeriesWaterfallHook.tapPromise(
  "asyncSeriesWaterfallHook tapPromise 1",
  (arg1, arg2, arg3) => {
    console.log(
      "asyncSeriesWaterfallHook tapPromise 1 outer",
      arg1,
      arg2,
      arg3
    );
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(
          "asyncSeriesWaterfallHook tapPromise 1 inner",
          arg1,
          arg2,
          arg3
        );
        resolve("tap promise res");
      }, 4000);
    });
  }
);

// asyncSeriesWaterfallHook.tapPromise('asyncSeriesWaterfallHook tapPromise 1',(arg1,arg2,arg3) => {
//     console.log('asyncSeriesWaterfallHook tapPromise 1 outer',arg1,arg2,arg3)
//     return new Promise(resolve=>{
//         console.log('asyncSeriesWaterfallHook tapPromise 1',arg1,arg2,arg3)
//        setTimeout(() => {
//         resolve('tap promise res')
//        }, 10000);
//     })
// })
// console.time('test')
// asyncSeriesWaterfallHook.callAsync(1,2,3,(err,val)=>{
//     console.log('end',err,'val',val)
//     console.timeEnd('test')
// })

console.time("test2");
asyncSeriesWaterfallHook
  .promise(1, 2)
  .then((val) => {
    console.log("success", val);
    console.timeEnd("test2");
  })
  .catch((err) => {
    console.log("err", err);
    console.timeEnd("test2");
  });
