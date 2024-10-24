// import { AsyncSeriesHook } from "tapable";
import { AsyncSeriesHook } from "lib/my-tapable";
const asyncSeriesHook = new AsyncSeriesHook([
  "arg1",
  "arg2",
  "arg3",
]);

asyncSeriesHook.tap("asyncSeriesHook tap 1", (arg1, arg2, arg3) => {
  setTimeout(() => {
    console.log("asyncSeriesHook tap 1", arg1, arg2, arg3);
  }, 3000);
//   return 22
});

asyncSeriesHook.tapAsync(
  "asyncSeriesHook tapAsync 1",
  (arg1, arg2, arg3, done) => {
    console.log("asyncSeriesHook tapAsync 1", arg1, arg2, arg3);
    done();
  }
);

asyncSeriesHook.tapAsync(
  "asyncSeriesHook tapAsync 2",
  (arg1, arg2, arg3, done) => {
    console.log("asyncSeriesHook tapAsync 2", arg1, arg2, arg3);

    setTimeout(() => {
      done(undefined, 22);
    }, 1000);
  }
);

asyncSeriesHook.tapPromise(
  "asyncSeriesHook tapPromise 1",
  (arg1, arg2, arg3) => {
    console.log("asyncSeriesHook tapPromise 1 outer", arg1, arg2, arg3);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("asyncSeriesHook tapPromise 1", arg1, arg2, arg3);
        resolve("tap promise res");
      }, 4000);
    });
  }
);

// asyncSeriesHook.tapPromise('asyncSeriesHook tapPromise 1',(arg1,arg2,arg3) => {
//     console.log('asyncSeriesHook tapPromise 1 outer',arg1,arg2,arg3)
//     return new Promise(resolve=>{
//         console.log('asyncSeriesHook tapPromise 1',arg1,arg2,arg3)
//        setTimeout(() => {
//         resolve('tap promise res')
//        }, 10000);
//     })
// })
console.time('test')
asyncSeriesHook.callAsync(1,2,3,(err,val)=>{
    console.log('end',err,'val',val)
    console.timeEnd('test')
})

// asyncSeriesHook
//   .promise(1, 2)
//   .then((val) => {
//     console.log("success", val);
//   })
//   .catch((err) => {
//     console.log("err", err);
//   });
