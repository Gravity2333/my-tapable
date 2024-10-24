//@ts-ignore
type TapCallback = (...args: any[]) => any;
type PromiseCallback = (...args: any[]) => Promise<any>;
type Tap = (string, TapCallback) => void;
type TapAsync = (string, TapCallback) => void;
type TapPromise = (string, PromiseCallback) => void;
type Call = (...args: any[]) => any;
type CallAsync = (...args: any[]) => any;
type CallPromise = (...args: any[]) => Promise<any>;
interface AsyncParallelBailHookType {
  tap: Tap;
  tapAsync: TapAsync;
  tapPromise: TapPromise;
  callAsync: CallAsync;
  promise: CallPromise;
}

interface AsyncParallelHookType {
  tap: Tap;
  tapAsync: TapAsync;
  tapPromise: TapPromise;
  callAsync: CallAsync;
  promise: CallPromise;
}

interface AsyncSeriesBailHookType {
  tap: Tap;
  tapAsync: TapAsync;
  tapPromise: TapPromise;
  callAsync: CallAsync;
  promise: CallPromise;
}
interface AsyncSeriesHookType {
  tap: Tap;
  tapAsync: TapAsync;
  tapPromise: TapPromise;
  callAsync: CallAsync;
  promise: CallPromise;
}

interface AsyncSeriesLoopHookType {
  tap: Tap;
  tapAsync: TapAsync;
  tapPromise: TapPromise;
  callAsync: CallAsync;
  promise: CallPromise;
}

interface AsyncSeriesWaterfallHookType {
  tap: Tap;
  tapAsync: TapAsync;
  tapPromise: TapPromise;
  callAsync: CallAsync;
  promise: CallPromise;
}

interface SyncBailHookType {
  tap: Tap;
  call: Call;
}

interface SyncHookType {
  tap: Tap;
  call: Call;
}

interface SyncLoopHookType {
  tap: Tap;
  call: Call;
}

interface SyncWaterfallHookType {
  tap: Tap;
  call: Call;
}

declare module "my-tapable" {
  // 在这里添加my-tapable模块的类型声明
  export type SyncHook = SyncHookType;
  export type SyncBailHook = SyncBailHookType;
  export type SyncLoopHook = SyncLoopHookType;
  export type SyncWaterfallHook = SyncWaterfallHookType;
  export type AsyncParallelHook = AsyncParallelHookType;
  export type AsyncParallelBailHook = AsyncParallelBailHookType;
  export type AsyncSeriesHook = AsyncSeriesHookType;
  export type AsyncSeriesBailHook = AsyncSeriesBailHookType;
  export type AsyncSeriesLoopHook = AsyncSeriesLoopHookType;
  export type AsyncSeriesWaterfallHook = AsyncSeriesWaterfallHookType;
}
