// import { SyncHook, AsyncParallelHook } from "lib/my-tapable";
// import { SyncHookType } from "lib/my-tapable/hooks/SyncHook";

import { AsyncParallelBailHook } from "lib/my-tapable";

// const hook = new SyncHook(["arg1", "arg2", "arg3"]);

// async function searchGoogleMap(source: string, target: string, routesList: []) {
//   return await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("CACULATED ROUTE");
//     }, 1000);
//   });
// }

// interface CarType {
//   hooks: {
//     accelerate: SyncHookType;
//     brake: SyncHookType;
//     calculateRoutes: AsyncParallelHook;
//   };
// }

// class Car implements CarType {
//   public hooks = {
//     accelerate: new SyncHook(["newSpeed"]),
//     brake: new SyncHook([]),
//     calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"]),
//   };
//   constructor() {
//     this.hooks.brake.tap("BRAKE", () => {
//       console.log("BREAK THE CAR");
//     });

//     this.hooks.accelerate.tap("ACCELEATR", (newSpeed) => {
//       console.log("ACCELERATE TO" + newSpeed);
//     });

//     this.hooks.calculateRoutes.tapPromise(
//       "FIND ROUTE",
//       (source, target, routesList) =>
//         searchGoogleMap(source, target, routesList)
//     );
//   }

//   brake() {
//     this.hooks.brake.call();
//   }

//   accelerate(newSpeeed) {
//     this.hooks.accelerate.call(newSpeeed);
//   }

//   calculateRoutes(source, target, routesList) {
//     this.hooks.calculateRoutes.callAsync(
//       source,
//       target,
//       routesList,
//       (result) => {
//         console.log(result);
//       }
//     );
//   }
// }

// const car = new Car();

// car.calculateRoutes("pos1", "pos2", []);
// car.accelerate(120);
// car.brake();
const hook = new AsyncParallelBailHook(["arg1"]); // 需要声明参数名称

console.log(performance.now())
hook.tapAsync("TEST", (a,next) => {
  console.log(a, "tap1");
  setTimeout(() => {
    next(void 0)
  }, 4500);

});

hook.tapAsync("TEST", (a,next) => {
  console.log(a, "tap2");
  setTimeout(() => {
    next(1)
  }, 1000);
});

hook.tapAsync("TEST", (a,next) => {
  console.log(a, "tap3");
  next(void 0)
});

hook.callAsync(1, (err, res) => {
  console.log(performance.now())
  console.log(err, res);
});
