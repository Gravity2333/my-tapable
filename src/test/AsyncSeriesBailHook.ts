// import { AsyncSeriesBailHook } from "tapable";
import { AsyncSeriesBailHook } from "lib/my-tapable";
const asyncSeriesBailHook = new AsyncSeriesBailHook([
  "arg1",
  "arg2",
  "arg3",
]);

asyncSeriesBailHook.tap("asyncSeriesBailHook tap 1", (arg1, arg2, arg3) => {
  setTimeout(() => {
    console.log("asyncSeriesBailHook tap 1", arg1, arg2, arg3);
  }, 3000);
//   return 22
});

asyncSeriesBailHook.tapAsync(
  "asyncSeriesBailHook tapAsync 1",
  (arg1, arg2, arg3, done) => {
    console.log("asyncSeriesBailHook tapAsync 1", arg1, arg2, arg3);
    done();
  }
);

asyncSeriesBailHook.tapAsync(
  "asyncSeriesBailHook tapAsync 2",
  (arg1, arg2, arg3, done) => {
    console.log("asyncSeriesBailHook tapAsync 2", arg1, arg2, arg3);

    setTimeout(() => {
      done(undefined, 22);
    }, 1000);
  }
);

asyncSeriesBailHook.tapPromise(
  "asyncSeriesBailHook tapPromise 1",
  (arg1, arg2, arg3) => {
    console.log("asyncSeriesBailHook tapPromise 1 outer", arg1, arg2, arg3);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("asyncSeriesBailHook tapPromise 1", arg1, arg2, arg3);
        resolve("tap promise res");
      }, 4000);
    });
  }
);

// asyncSeriesBailHook.tapPromise('asyncSeriesBailHook tapPromise 1',(arg1,arg2,arg3) => {
//     console.log('asyncSeriesBailHook tapPromise 1 outer',arg1,arg2,arg3)
//     return new Promise(resolve=>{
//         console.log('asyncSeriesBailHook tapPromise 1',arg1,arg2,arg3)
//        setTimeout(() => {
//         resolve('tap promise res')
//        }, 10000);
//     })
// })
// console.time('test')
// asyncSeriesBailHook.callAsync(1,2,3,(err,val)=>{
//     console.log('end',err,'val',val)
//     console.timeEnd('test')
// })

console.time('test2')
asyncSeriesBailHook
  .promise(1, 2)
  .then((val) => {
    console.log("success", val);
    console.timeEnd('test2')
  })
  .catch((err) => {
    console.log("err", err);
    console.timeEnd('test2')
  });
