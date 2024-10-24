import { Call, Tap } from "../typings";

export interface SyncBailHookType {
  tap: Tap;
  call: Call;
}

export class SyncBailHook implements SyncBailHookType {
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
    for (const event of this.events) {
      const eventResult = event(...inputArgs);
      if (eventResult !== undefined) {
        return;
      }
    }
  }
}
