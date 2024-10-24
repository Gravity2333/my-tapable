import { AsyncParallelHook } from "lib/my-tapable";
const asyncParallelHook = new AsyncParallelHook(["arg1", "arg2", "arg3"]);

asyncParallelHook.tap('asyncParallelHook tap 1',(arg1,arg2,arg3) => {
    setTimeout(() => {
        console.log('asyncParallelHook tap 1',arg1,arg2,arg3)
    }, 3000);
})

asyncParallelHook.tapAsync('asyncParallelHook tapAsync 1',(arg1,arg2,arg3,done) => {
    console.log('asyncParallelHook tapAsync 1',arg1,arg2,arg3)
    done()
})

asyncParallelHook.tapAsync(
  "asyncParallelHook tapAsync 2",
  (arg1, arg2, arg3, done) => {
    console.log("asyncParallelHook tapAsync 2", arg1, arg2, arg3);
    done();
  }
);

asyncParallelHook.tapPromise('asyncParallelHook tapPromise 1',(arg1,arg2,arg3) => {
    console.log('asyncParallelHook tapPromise 1 outer',arg1,arg2,arg3)
    return new Promise(resolve=>{
        console.log('asyncParallelHook tapPromise 1',arg1,arg2,arg3)
       setTimeout(() => {
        resolve('tap promise res')
       }, 1000);
    })
})

// asyncParallelHook.tapPromise('asyncParallelHook tapPromise 1',(arg1,arg2,arg3) => {
//     console.log('asyncParallelHook tapPromise 1 outer',arg1,arg2,arg3)
//     return new Promise(resolve=>{
//         console.log('asyncParallelHook tapPromise 1',arg1,arg2,arg3)
//        setTimeout(() => {
//         resolve('tap promise res')
//        }, 10000);
//     })
// })

asyncParallelHook.callAsync(1,2,3,(err)=>{
    console.log('end',err)
})

// asyncParallelHook
//   .promise(1, 2)
//   .then((val) => {
//     console.log("success", val);
//   })
//   .catch((err) => {
//     console.log("err", err);
//   });
