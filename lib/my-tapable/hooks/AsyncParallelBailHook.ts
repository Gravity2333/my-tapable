import { CallAsync, CallPromise, Tap, TapAsync, TapPromise } from "../typings";
import { fillArgs } from "../utils/fillArgs";

export interface AsyncParallelBailHookType {
  tap: Tap;
  tapAsync: TapAsync;
  tapPromise: TapPromise;
  callAsync: CallAsync;
  promise: CallPromise;
}

export class AsyncParallelBailHook implements AsyncParallelBailHookType {
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
      return new Promise((resolve,reject) => {
        // AsyncParallelHook 不接受第二个成功result值
        callback(...args, (err: any, result?: any) => {
          if (err) {
            reject(err)
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
      .then((res) => {
        callback(undefined, res);
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
    let settledAsyncEventCnt = 0;
    return new Promise((resolve, reject) => {
      for (const asyncEvent of this.asyncEvents) {
        asyncEvent(...inputArgs)
          .then((res) => {
            if (res !== undefined) {
              // bail推出
              resolve(res);
            } else {
              settledAsyncEventCnt++;
              if (settledAsyncEventCnt >= this.asyncEvents.length) {
                // 正常退出
                resolve(undefined);
              }
            }
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }
}
