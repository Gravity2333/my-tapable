import { Call, Tap } from "../typings";

export interface SyncLoopHookType {
  tap: Tap;
  call: Call;
}

export class SyncLoopHook implements SyncLoopHookType {
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

    let eventIndex = 0
    while(eventIndex < this.events.length){
      const event = this.events[eventIndex++];
      const eventResult = event(...inputArgs);
      if (eventResult !== undefined) {
        eventIndex = 0;
      }
    }
  }
}
