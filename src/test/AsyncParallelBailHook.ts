// import { AsyncParallelBailHook } from "tapable";
import { AsyncParallelBailHook } from "lib/my-tapable";
const asyncParallelBailHook = new AsyncParallelBailHook([
  "arg1",
  "arg2",
  "arg3",
]);

asyncParallelBailHook.tap("asyncParallelBailHook tap 1", (arg1, arg2, arg3) => {
  setTimeout(() => {
    console.log("asyncParallelBailHook tap 1", arg1, arg2, arg3);
  }, 3000);
//   return 22
});

asyncParallelBailHook.tapAsync(
  "asyncParallelBailHook tapAsync 1",
  (arg1, arg2, arg3, done) => {
    console.log("asyncParallelBailHook tapAsync 1", arg1, arg2, arg3);
    done();
  }
);

asyncParallelBailHook.tapAsync(
  "asyncParallelBailHook tapAsync 2",
  (arg1, arg2, arg3, done) => {
    console.log("asyncParallelBailHook tapAsync 2", arg1, arg2, arg3);

    setTimeout(() => {
      done(undefined, 22);
    }, 1000);
  }
);

asyncParallelBailHook.tapPromise(
  "asyncParallelBailHook tapPromise 1",
  (arg1, arg2, arg3) => {
    console.log("asyncParallelBailHook tapPromise 1 outer", arg1, arg2, arg3);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("asyncParallelBailHook tapPromise 1", arg1, arg2, arg3);
        resolve("tap promise res");
      }, 4000);
    });
  }
);

// asyncParallelBailHook.tapPromise('asyncParallelBailHook tapPromise 1',(arg1,arg2,arg3) => {
//     console.log('asyncParallelBailHook tapPromise 1 outer',arg1,arg2,arg3)
//     return new Promise(resolve=>{
//         console.log('asyncParallelBailHook tapPromise 1',arg1,arg2,arg3)
//        setTimeout(() => {
//         resolve('tap promise res')
//        }, 10000);
//     })
// })

asyncParallelBailHook.callAsync(1,2,3,(err,val)=>{
    console.log('end',err,'val',val)
})

// asyncParallelBailHook
//   .promise(1, 2)
//   .then((val) => {
//     console.log("success", val);
//   })
//   .catch((err) => {
//     console.log("err", err);
//   });
