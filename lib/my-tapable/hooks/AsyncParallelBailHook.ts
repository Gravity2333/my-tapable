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
    let pending = true;
    let handleResuleFn = null;
    const finishedStatusList: boolean[] = new Array(
      this.asyncEvents.length
    ).fill(false);
    let endPos =
      finishedStatusList.length === 0 ? 0 : finishedStatusList.length - 1;
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.asyncEvents.length; i++) {
        this.asyncEvents[i](...inputArgs)
          .then((res) => {
            if (!pending) return;
            if (res !== undefined) {
              if (!handleResuleFn) {
                handleResuleFn = () => {
                  resolve(res);
                  pending = false;
                };
                endPos = i;
              }
            }
            finishedStatusList[i] = true;

            for (
              let prevFindIndex = 0;
              prevFindIndex < endPos;
              prevFindIndex++
            ) {
              if (false === finishedStatusList[prevFindIndex]) {
                return;
              }
            }

            handleResuleFn();
          })
          .catch((err) => {
            if (!pending) return;
            if (!handleResuleFn) {
              handleResuleFn = () => {
                reject(err);
                pending = false;
              };
              endPos = i;
            }
            finishedStatusList[i] = true;

            for (
              let prevFindIndex = 0;
              prevFindIndex < endPos;
              prevFindIndex++
            ) {
              if (false === finishedStatusList[prevFindIndex]) {
                return;
              }
            }

            handleResuleFn();
          });
      }
    });
  }
}
