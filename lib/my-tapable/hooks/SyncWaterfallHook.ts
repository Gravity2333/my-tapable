import { Call, Tap } from "../typings";

export interface SyncWaterfallHookType {
  tap: Tap;
  call: Call;
}

export class SyncWaterfallHook implements SyncWaterfallHookType {
  private events: any[] = [];
  private args: string[] = [];
  constructor(args: string[]) {
    this.args = args;
    this.events = [];
  }

  /** tap方法 */
  tap(eventName, callback) {
    this.events.push(callback);
  }

  /** call */
  call(...args) {
    const inputArgs = args.slice(0, this.args.length);
    this.events.forEach((event) => {
      const eventResult = event(...inputArgs)
      inputArgs[0] = eventResult
    });
    return inputArgs[0]
  }
}
