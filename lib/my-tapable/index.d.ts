//@ts-ignore
import { SyncBailHookType } from "./hooks/SyncBailHook";
import { SyncHookType } from "./hooks/SyncHook";
import { SyncLoopHookType } from "./hooks/SyncLoopHook";
import { SyncWaterfallHookType } from "./hooks/SyncWaterfallHook";
import { AsyncParallelHookType } from "./hooks/AsyncParallelHook";
import { AsyncParallelBailHookType } from "./hooks/AsyncParallelBailHook";
import { AsyncSeriesHookType } from "./hooks/AsyncSeriesHook";
import { AsyncSeriesBailHookType } from "./hooks/AsyncSeriesBailHook";
import { AsyncSeriesLoopHookType } from "./hooks/AsyncSeriesLoopHook";
import { AsyncSeriesWaterfallHookType } from "./hooks/AsyncSeriesWaterfallHook";

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
