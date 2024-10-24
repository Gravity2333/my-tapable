export type TapCallback = (...args: any[]) => any
export type PromiseCallback =  (...args: any[]) => Promise<any>
export type Tap = (string, TapCallback) => void;
export type TapAsync = (string, TapCallback) => void;
export type TapPromise = (string, PromiseCallback) => void;

export type Call = (...args: any[]) => any
export type CallAsync = (...args: any[]) => any
export type CallPromise = (...args: any[]) => Promise<any>