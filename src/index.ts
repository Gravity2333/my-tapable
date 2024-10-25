import { SyncHook, AsyncParallelHook } from "lib/my-tapable";
import { SyncHookType } from "lib/my-tapable/hooks/SyncHook";

const hook = new SyncHook(["arg1", "arg2", "arg3"]);

async function searchGoogleMap(source: string, target: string, routesList: []) {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve("CACULATED ROUTE");
    }, 1000);
  });
}

interface CarType {
  hooks: {
    accelerate: SyncHookType;
    brake: SyncHookType;
    calculateRoutes: AsyncParallelHook;
  };
}

class Car implements CarType {
  public hooks = {
    accelerate: new SyncHook(["newSpeed"]),
    brake: new SyncHook([]),
    calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"]),
  };
  constructor() {
    this.hooks.brake.tap("BRAKE", () => {
      console.log("BREAK THE CAR");
    });

    this.hooks.accelerate.tap("ACCELEATR", (newSpeed) => {
      console.log("ACCELERATE TO" + newSpeed);
    });

    this.hooks.calculateRoutes.tapPromise(
      "FIND ROUTE",
      (source, target, routesList) =>
        searchGoogleMap(source, target, routesList)
    );
  }

  brake() {
    this.hooks.brake.call();
  }

  accelerate(newSpeeed) {
    this.hooks.accelerate.call(newSpeeed);
  }

  calculateRoutes(source, target, routesList) {
    this.hooks.calculateRoutes.callAsync(
      source,
      target,
      routesList,
      (result) => {
        console.log(result);
      }
    );
  }
}

const car = new Car();

car.calculateRoutes("pos1", "pos2", []);
car.accelerate(120);
car.brake();
