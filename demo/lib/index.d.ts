//@ts-ignore
type TapCallback = (...args: any[]) => any;
type PromiseCallback = (...args: any[]) => Promise<any>;
type Tap = (string, TapCallback) => void;
type TapAsync = (string, TapCallback) => void;
type TapPromise = (string, PromiseCallback) => void;
type Call = (...args: any[]) => any;
type CallAsync = (...args: any[]) => any;
type CallPromise = (...args: any[]) => Promise<any>;



declare module 'my-tapable' {
    class SyncHook{
        constructor(args?: string[]);
        tap: Tap;
        call: Call;
    }

    class SyncBailHook{
        constructor(args?: string[]);
        tap: Tap;
        call: Call;
    }

    class SyncLoopHook{
        constructor(args?: string[]);
        tap: Tap;
        call: Call;
    }

    class SyncWaterfallHook{
        constructor(args?: string[]);
        tap: Tap;
        call: Call;
    }

    class AsyncParallelHook{
        constructor(args?: string[]);
        tap: Tap;
        tapAsync: TapAsync;
        tapPromise: TapPromise;
        callAsync: CallAsync;
        promise: CallPromise;
    }

    class AsyncParallelBailHook{
        constructor(args?: string[]);
        tap: Tap;
        tapAsync: TapAsync;
        tapPromise: TapPromise;
        callAsync: CallAsync;
        promise: CallPromise;
    }

    class AsyncSeriesHook{
        constructor(args?: string[]);
        tap: Tap;
        tapAsync: TapAsync;
        tapPromise: TapPromise;
        callAsync: CallAsync;
        promise: CallPromise;
    }

    class AsyncSeriesBailHook{
        constructor(args?: string[]);
        tap: Tap;
        tapAsync: TapAsync;
        tapPromise: TapPromise;
        callAsync: CallAsync;
        promise: CallPromise;
    }

    class AsyncSeriesLoopHook{
        constructor(args?: string[]);
        tap: Tap;
        tapAsync: TapAsync;
        tapPromise: TapPromise;
        callAsync: CallAsync;
        promise: CallPromise;
    }

    class AsyncSeriesWaterfallHook{
        constructor(args?: string[]);
        tap: Tap;
        tapAsync: TapAsync;
        tapPromise: TapPromise;
        callAsync: CallAsync;
        promise: CallPromise;
    }
}


