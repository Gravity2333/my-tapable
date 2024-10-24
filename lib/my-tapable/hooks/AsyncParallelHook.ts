import { CallAsync, CallPromise, Tap, TapAsync, TapPromise } from "../typings";
import { fillArgs } from "../utils/fillArgs";

export interface AsyncParallelHookType {
  tap: Tap;
  tapAsync: TapAsync;
  tapPromise: TapPromise;
  callAsync: CallAsync;
  promise: CallPromise;
}

export class AsyncParallelHook implements AsyncParallelHookType {
  private args: string[];
  private asyncEvents: ((...args: any[]) => Promise<any>)[];

  constructor(args: string[]) {
    this.args = args;
    this.asyncEvents = [];
  }

  tap(eventName, callback) {
    this.asyncEvents.push((...args: any[]) => {
      return new Promise((resolve) => {
        resolve(callback(...args));
      });
    });
  }

  tapAsync(eventName, callback) {
    this.asyncEvents.push((...args: any[]) => {
      return new Promise((resolve, reject) => {
        // AsyncParallelHook 不接受第二个成功result值
        callback(...args, (err: any, result?: any) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      });
    });
  }

  tapPromise(eventName, callback) {
    this.asyncEvents.push(callback);
  }

  callAsync(...args: any[]) {
    const callback = args.pop();
    const inputArgs = fillArgs(
      args.slice(0, this.args.length),
      this.args.length
    );
    this.promise(...inputArgs)
      .then(() => {
        callback(undefined, undefined);
      })
      .catch((err) => {
        callback(err, undefined);
      });
  }

  promise(...args: any[]) {
    const inputArgs = fillArgs(
      args.slice(0, this.args.length),
      this.args.length
    );
    return Promise.all(
      this.asyncEvents.map((asyncEvent) => asyncEvent(...inputArgs))
    ).then(() => {
      return undefined;
    });
  }
}
