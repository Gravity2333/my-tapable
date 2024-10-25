/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./lib/my-tapable/hooks/AsyncParallelBailHook.ts":
/*!*******************************************************!*\
  !*** ./lib/my-tapable/hooks/AsyncParallelBailHook.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AsyncParallelBailHook: () => (/* binding */ AsyncParallelBailHook)\n/* harmony export */ });\n/* harmony import */ var _utils_fillArgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fillArgs */ \"./lib/my-tapable/utils/fillArgs.ts\");\n\nclass AsyncParallelBailHook {\n  constructor(args) {\n    this.args = args;\n    this.asyncEvents = [];\n  }\n  tap(eventName, callback) {\n    this.asyncEvents.push((...args) => {\n      return new Promise(resolve => {\n        resolve(callback(...args));\n      });\n    });\n  }\n  tapAsync(eventName, callback) {\n    this.asyncEvents.push((...args) => {\n      return new Promise((resolve, reject) => {\n        // AsyncParallelHook 不接受第二个成功result值\n        callback(...args, (err, result) => {\n          if (err) {\n            reject(err);\n          }\n          resolve(result);\n        });\n      });\n    });\n  }\n  tapPromise(eventName, callback) {\n    this.asyncEvents.push(callback);\n  }\n  callAsync(...args) {\n    const callback = args.pop();\n    const inputArgs = (0,_utils_fillArgs__WEBPACK_IMPORTED_MODULE_0__.fillArgs)(args.slice(0, this.args.length), this.args.length);\n    this.promise(...inputArgs).then(res => {\n      callback(undefined, res);\n    }).catch(err => {\n      callback(err, undefined);\n    });\n  }\n  promise(...args) {\n    const inputArgs = (0,_utils_fillArgs__WEBPACK_IMPORTED_MODULE_0__.fillArgs)(args.slice(0, this.args.length), this.args.length);\n    let settledAsyncEventCnt = 0;\n    return new Promise((resolve, reject) => {\n      for (const asyncEvent of this.asyncEvents) {\n        asyncEvent(...inputArgs).then(res => {\n          if (res !== undefined) {\n            // bail推出\n            resolve(res);\n          } else {\n            settledAsyncEventCnt++;\n            if (settledAsyncEventCnt >= this.asyncEvents.length) {\n              // 正常退出\n              resolve(undefined);\n            }\n          }\n        }).catch(err => {\n          reject(err);\n        });\n      }\n    });\n  }\n}\n\n//# sourceURL=webpack://my-tapable-dev/./lib/my-tapable/hooks/AsyncParallelBailHook.ts?");

/***/ }),

/***/ "./lib/my-tapable/hooks/AsyncParallelHook.ts":
/*!***************************************************!*\
  !*** ./lib/my-tapable/hooks/AsyncParallelHook.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AsyncParallelHook: () => (/* binding */ AsyncParallelHook)\n/* harmony export */ });\n/* harmony import */ var _utils_fillArgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fillArgs */ \"./lib/my-tapable/utils/fillArgs.ts\");\n\nclass AsyncParallelHook {\n  constructor(args) {\n    this.args = args;\n    this.asyncEvents = [];\n  }\n  tap(eventName, callback) {\n    this.asyncEvents.push((...args) => {\n      return new Promise(resolve => {\n        resolve(callback(...args));\n      });\n    });\n  }\n  tapAsync(eventName, callback) {\n    this.asyncEvents.push((...args) => {\n      return new Promise((resolve, reject) => {\n        // AsyncParallelHook 不接受第二个成功result值\n        callback(...args, (err, result) => {\n          if (err) {\n            reject(err);\n          }\n          resolve(result);\n        });\n      });\n    });\n  }\n  tapPromise(eventName, callback) {\n    this.asyncEvents.push(callback);\n  }\n  callAsync(...args) {\n    const callback = args.pop();\n    const inputArgs = (0,_utils_fillArgs__WEBPACK_IMPORTED_MODULE_0__.fillArgs)(args.slice(0, this.args.length), this.args.length);\n    this.promise(...inputArgs).then(() => {\n      callback(undefined, undefined);\n    }).catch(err => {\n      callback(err, undefined);\n    });\n  }\n  promise(...args) {\n    const inputArgs = (0,_utils_fillArgs__WEBPACK_IMPORTED_MODULE_0__.fillArgs)(args.slice(0, this.args.length), this.args.length);\n    return Promise.all(this.asyncEvents.map(asyncEvent => asyncEvent(...inputArgs))).then(() => {\n      return undefined;\n    });\n  }\n}\n\n//# sourceURL=webpack://my-tapable-dev/./lib/my-tapable/hooks/AsyncParallelHook.ts?");

/***/ }),

/***/ "./lib/my-tapable/hooks/AsyncSeriesBailHook.ts":
/*!*****************************************************!*\
  !*** ./lib/my-tapable/hooks/AsyncSeriesBailHook.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AsyncSeriesBailHook: () => (/* binding */ AsyncSeriesBailHook)\n/* harmony export */ });\n/* harmony import */ var _utils_fillArgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fillArgs */ \"./lib/my-tapable/utils/fillArgs.ts\");\n\nclass AsyncSeriesBailHook {\n  constructor(args) {\n    this.args = args;\n    this.asyncEvents = [];\n  }\n  tap(eventName, callback) {\n    this.asyncEvents.push((...args) => {\n      return new Promise(resolve => {\n        resolve(callback(...args));\n      });\n    });\n  }\n  tapAsync(eventName, callback) {\n    this.asyncEvents.push((...args) => {\n      return new Promise((resolve, reject) => {\n        // AsyncParallelHook 不接受第二个成功result值\n        callback(...args, (err, result) => {\n          if (err) {\n            reject(err);\n          }\n          resolve(result);\n        });\n      });\n    });\n  }\n  tapPromise(eventName, callback) {\n    this.asyncEvents.push(callback);\n  }\n  callAsync(...args) {\n    const callback = args.pop();\n    const inputArgs = (0,_utils_fillArgs__WEBPACK_IMPORTED_MODULE_0__.fillArgs)(args.slice(0, this.args.length), this.args.length);\n    this.promise(...inputArgs).then(res => {\n      callback(undefined, res);\n    }).catch(err => {\n      callback(err, undefined);\n    });\n  }\n  promise(...args) {\n    const inputArgs = (0,_utils_fillArgs__WEBPACK_IMPORTED_MODULE_0__.fillArgs)(args.slice(0, this.args.length), this.args.length);\n    return new Promise((resolve, reject) => {\n      (async () => {\n        let pending = true;\n        for (const asyncEvent of this.asyncEvents) {\n          await asyncEvent(...inputArgs).then(res => {\n            if (res !== undefined) {\n              resolve(res);\n              pending = false;\n            }\n          }).catch(err => {\n            reject(err);\n            pending = false;\n          });\n          if (!pending) return;\n        }\n        resolve(undefined);\n      })();\n    });\n  }\n}\n\n//# sourceURL=webpack://my-tapable-dev/./lib/my-tapable/hooks/AsyncSeriesBailHook.ts?");

/***/ }),

/***/ "./lib/my-tapable/hooks/AsyncSeriesHook.ts":
/*!*************************************************!*\
  !*** ./lib/my-tapable/hooks/AsyncSeriesHook.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AsyncSeriesHook: () => (/* binding */ AsyncSeriesHook)\n/* harmony export */ });\n/* harmony import */ var _utils_fillArgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fillArgs */ \"./lib/my-tapable/utils/fillArgs.ts\");\n\nclass AsyncSeriesHook {\n  constructor(args) {\n    this.args = args;\n    this.asyncEvents = [];\n  }\n  tap(eventName, callback) {\n    this.asyncEvents.push((...args) => {\n      return new Promise(resolve => {\n        resolve(callback(...args));\n      });\n    });\n  }\n  tapAsync(eventName, callback) {\n    this.asyncEvents.push((...args) => {\n      return new Promise((resolve, reject) => {\n        // AsyncParallelHook 不接受第二个成功result值\n        callback(...args, (err, result) => {\n          if (err) {\n            reject(err);\n          }\n          resolve(result);\n        });\n      });\n    });\n  }\n  tapPromise(eventName, callback) {\n    this.asyncEvents.push(callback);\n  }\n  callAsync(...args) {\n    const callback = args.pop();\n    const inputArgs = (0,_utils_fillArgs__WEBPACK_IMPORTED_MODULE_0__.fillArgs)(args.slice(0, this.args.length), this.args.length);\n    this.promise(...inputArgs).then(() => {\n      callback(undefined, undefined);\n    }).catch(err => {\n      callback(err, undefined);\n    });\n  }\n  promise(...args) {\n    const inputArgs = (0,_utils_fillArgs__WEBPACK_IMPORTED_MODULE_0__.fillArgs)(args.slice(0, this.args.length), this.args.length);\n    return new Promise((resolve, reject) => {\n      (async () => {\n        let pending = true;\n        for (const asyncEvent of this.asyncEvents) {\n          await asyncEvent(...inputArgs).catch(err => {\n            reject(err);\n            pending = false;\n          });\n          if (!pending) return;\n        }\n        resolve(undefined);\n      })();\n    });\n  }\n}\n\n//# sourceURL=webpack://my-tapable-dev/./lib/my-tapable/hooks/AsyncSeriesHook.ts?");

/***/ }),

/***/ "./lib/my-tapable/hooks/AsyncSeriesLoopHook.ts":
/*!*****************************************************!*\
  !*** ./lib/my-tapable/hooks/AsyncSeriesLoopHook.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AsyncSeriesLoopHook: () => (/* binding */ AsyncSeriesLoopHook)\n/* harmony export */ });\n/* harmony import */ var _utils_fillArgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fillArgs */ \"./lib/my-tapable/utils/fillArgs.ts\");\n\nclass AsyncSeriesLoopHook {\n  constructor(args) {\n    this.args = args;\n    this.asyncEvents = [];\n  }\n  tap(eventName, callback) {\n    this.asyncEvents.push((...args) => {\n      return new Promise(resolve => {\n        resolve(callback(...args));\n      });\n    });\n  }\n  tapAsync(eventName, callback) {\n    this.asyncEvents.push((...args) => {\n      return new Promise((resolve, reject) => {\n        // AsyncParallelHook 不接受第二个成功result值\n        callback(...args, (err, result) => {\n          if (err) {\n            reject(err);\n          }\n          resolve(result);\n        });\n      });\n    });\n  }\n  tapPromise(eventName, callback) {\n    this.asyncEvents.push(callback);\n  }\n  callAsync(...args) {\n    const callback = args.pop();\n    const inputArgs = (0,_utils_fillArgs__WEBPACK_IMPORTED_MODULE_0__.fillArgs)(args.slice(0, this.args.length), this.args.length);\n    this.promise(...inputArgs).then(() => {\n      callback(undefined, undefined);\n    }).catch(err => {\n      callback(err, undefined);\n    });\n  }\n  promise(...args) {\n    const inputArgs = (0,_utils_fillArgs__WEBPACK_IMPORTED_MODULE_0__.fillArgs)(args.slice(0, this.args.length), this.args.length);\n    return new Promise((resolve, reject) => {\n      (async () => {\n        let pending = true;\n        let asyncEventIndex = 0;\n        while (asyncEventIndex < this.asyncEvents.length) {\n          const asyncEvent = this.asyncEvents[asyncEventIndex++];\n          await asyncEvent(...inputArgs).then(res => {\n            if (res !== undefined) {\n              // LOOP\n              asyncEventIndex = 0;\n            }\n          }).catch(err => {\n            reject(err);\n            pending = false;\n          });\n          if (!pending) return;\n        }\n        resolve(undefined);\n      })();\n    });\n  }\n}\n\n//# sourceURL=webpack://my-tapable-dev/./lib/my-tapable/hooks/AsyncSeriesLoopHook.ts?");

/***/ }),

/***/ "./lib/my-tapable/hooks/AsyncSeriesWaterfallHook.ts":
/*!**********************************************************!*\
  !*** ./lib/my-tapable/hooks/AsyncSeriesWaterfallHook.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AsyncSeriesWaterfallHook: () => (/* binding */ AsyncSeriesWaterfallHook)\n/* harmony export */ });\n/* harmony import */ var _utils_fillArgs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fillArgs */ \"./lib/my-tapable/utils/fillArgs.ts\");\n\nclass AsyncSeriesWaterfallHook {\n  constructor(args) {\n    this.args = args;\n    this.asyncEvents = [];\n  }\n  tap(eventName, callback) {\n    this.asyncEvents.push((...args) => {\n      return new Promise(resolve => {\n        resolve(callback(...args));\n      });\n    });\n  }\n  tapAsync(eventName, callback) {\n    this.asyncEvents.push((...args) => {\n      return new Promise((resolve, reject) => {\n        // AsyncParallelHook 不接受第二个成功result值\n        callback(...args, (err, result) => {\n          if (err) {\n            reject(err);\n          }\n          resolve(result);\n        });\n      });\n    });\n  }\n  tapPromise(eventName, callback) {\n    this.asyncEvents.push(callback);\n  }\n  callAsync(...args) {\n    const callback = args.pop();\n    const inputArgs = (0,_utils_fillArgs__WEBPACK_IMPORTED_MODULE_0__.fillArgs)(args.slice(0, this.args.length), this.args.length);\n    this.promise(...inputArgs).then(res => {\n      callback(undefined, res);\n    }).catch(err => {\n      callback(err, undefined);\n    });\n  }\n  promise(...args) {\n    const inputArgs = (0,_utils_fillArgs__WEBPACK_IMPORTED_MODULE_0__.fillArgs)(args.slice(0, this.args.length), this.args.length);\n    return new Promise((resolve, reject) => {\n      (async () => {\n        let pending = true;\n        let finallyRes;\n        for (const asyncEvent of this.asyncEvents) {\n          finallyRes = await asyncEvent(...inputArgs).then(res => {\n            if (res !== undefined) {\n              inputArgs[0] = res;\n            }\n            return res;\n          }).catch(err => {\n            reject(err);\n            pending = false;\n          });\n          if (!pending) return;\n        }\n        resolve(finallyRes);\n      })();\n    });\n  }\n}\n\n//# sourceURL=webpack://my-tapable-dev/./lib/my-tapable/hooks/AsyncSeriesWaterfallHook.ts?");

/***/ }),

/***/ "./lib/my-tapable/hooks/SyncBailHook.ts":
/*!**********************************************!*\
  !*** ./lib/my-tapable/hooks/SyncBailHook.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SyncBailHook: () => (/* binding */ SyncBailHook)\n/* harmony export */ });\nclass SyncBailHook {\n  events = [];\n  args = [];\n  constructor(args) {\n    this.args = args;\n    this.events = [];\n  }\n\n  /** tap方法 */\n  tap(eventName, callback) {\n    this.events.push(callback);\n  }\n\n  /** call */\n  call(...args) {\n    const inputArgs = args.slice(0, this.args.length);\n    for (const event of this.events) {\n      const eventResult = event(...inputArgs);\n      if (eventResult !== undefined) {\n        return;\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack://my-tapable-dev/./lib/my-tapable/hooks/SyncBailHook.ts?");

/***/ }),

/***/ "./lib/my-tapable/hooks/SyncHook.ts":
/*!******************************************!*\
  !*** ./lib/my-tapable/hooks/SyncHook.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SyncHook: () => (/* binding */ SyncHook)\n/* harmony export */ });\nclass SyncHook {\n  events = [];\n  args = [];\n  constructor(args) {\n    this.args = args;\n    this.events = [];\n  }\n\n  /** tap方法 */\n  tap(eventName, callback) {\n    this.events.push(callback);\n  }\n\n  /** call */\n  call(...args) {\n    const inputArgs = args.slice(0, this.args.length);\n    this.events.forEach(event => event(...inputArgs));\n  }\n}\n\n//# sourceURL=webpack://my-tapable-dev/./lib/my-tapable/hooks/SyncHook.ts?");

/***/ }),

/***/ "./lib/my-tapable/hooks/SyncLoopHook.ts":
/*!**********************************************!*\
  !*** ./lib/my-tapable/hooks/SyncLoopHook.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SyncLoopHook: () => (/* binding */ SyncLoopHook)\n/* harmony export */ });\nclass SyncLoopHook {\n  events = [];\n  args = [];\n  constructor(args) {\n    this.args = args;\n    this.events = [];\n  }\n\n  /** tap方法 */\n  tap(eventName, callback) {\n    this.events.push(callback);\n  }\n\n  /** call */\n  call(...args) {\n    const inputArgs = args.slice(0, this.args.length);\n    let eventIndex = 0;\n    while (eventIndex < this.events.length) {\n      const event = this.events[eventIndex++];\n      const eventResult = event(...inputArgs);\n      if (eventResult !== undefined) {\n        eventIndex = 0;\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack://my-tapable-dev/./lib/my-tapable/hooks/SyncLoopHook.ts?");

/***/ }),

/***/ "./lib/my-tapable/hooks/SyncWaterfallHook.ts":
/*!***************************************************!*\
  !*** ./lib/my-tapable/hooks/SyncWaterfallHook.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SyncWaterfallHook: () => (/* binding */ SyncWaterfallHook)\n/* harmony export */ });\nclass SyncWaterfallHook {\n  events = [];\n  args = [];\n  constructor(args) {\n    this.args = args;\n    this.events = [];\n  }\n\n  /** tap方法 */\n  tap(eventName, callback) {\n    this.events.push(callback);\n  }\n\n  /** call */\n  call(...args) {\n    const inputArgs = args.slice(0, this.args.length);\n    this.events.forEach(event => {\n      const eventResult = event(...inputArgs);\n      inputArgs[0] = eventResult;\n    });\n    return inputArgs[0];\n  }\n}\n\n//# sourceURL=webpack://my-tapable-dev/./lib/my-tapable/hooks/SyncWaterfallHook.ts?");

/***/ }),

/***/ "./lib/my-tapable/index.ts":
/*!*********************************!*\
  !*** ./lib/my-tapable/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AsyncParallelBailHook: () => (/* reexport safe */ _hooks_AsyncParallelBailHook__WEBPACK_IMPORTED_MODULE_5__.AsyncParallelBailHook),\n/* harmony export */   AsyncParallelHook: () => (/* reexport safe */ _hooks_AsyncParallelHook__WEBPACK_IMPORTED_MODULE_4__.AsyncParallelHook),\n/* harmony export */   AsyncSeriesBailHook: () => (/* reexport safe */ _hooks_AsyncSeriesBailHook__WEBPACK_IMPORTED_MODULE_7__.AsyncSeriesBailHook),\n/* harmony export */   AsyncSeriesHook: () => (/* reexport safe */ _hooks_AsyncSeriesHook__WEBPACK_IMPORTED_MODULE_6__.AsyncSeriesHook),\n/* harmony export */   AsyncSeriesLoopHook: () => (/* reexport safe */ _hooks_AsyncSeriesLoopHook__WEBPACK_IMPORTED_MODULE_8__.AsyncSeriesLoopHook),\n/* harmony export */   AsyncSeriesWaterfallHook: () => (/* reexport safe */ _hooks_AsyncSeriesWaterfallHook__WEBPACK_IMPORTED_MODULE_9__.AsyncSeriesWaterfallHook),\n/* harmony export */   SyncBailHook: () => (/* reexport safe */ _hooks_SyncBailHook__WEBPACK_IMPORTED_MODULE_1__.SyncBailHook),\n/* harmony export */   SyncHook: () => (/* reexport safe */ _hooks_SyncHook__WEBPACK_IMPORTED_MODULE_0__.SyncHook),\n/* harmony export */   SyncLoopHook: () => (/* reexport safe */ _hooks_SyncLoopHook__WEBPACK_IMPORTED_MODULE_2__.SyncLoopHook),\n/* harmony export */   SyncWaterfallHook: () => (/* reexport safe */ _hooks_SyncWaterfallHook__WEBPACK_IMPORTED_MODULE_3__.SyncWaterfallHook)\n/* harmony export */ });\n/* harmony import */ var _hooks_SyncHook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hooks/SyncHook */ \"./lib/my-tapable/hooks/SyncHook.ts\");\n/* harmony import */ var _hooks_SyncBailHook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hooks/SyncBailHook */ \"./lib/my-tapable/hooks/SyncBailHook.ts\");\n/* harmony import */ var _hooks_SyncLoopHook__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hooks/SyncLoopHook */ \"./lib/my-tapable/hooks/SyncLoopHook.ts\");\n/* harmony import */ var _hooks_SyncWaterfallHook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hooks/SyncWaterfallHook */ \"./lib/my-tapable/hooks/SyncWaterfallHook.ts\");\n/* harmony import */ var _hooks_AsyncParallelHook__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hooks/AsyncParallelHook */ \"./lib/my-tapable/hooks/AsyncParallelHook.ts\");\n/* harmony import */ var _hooks_AsyncParallelBailHook__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hooks/AsyncParallelBailHook */ \"./lib/my-tapable/hooks/AsyncParallelBailHook.ts\");\n/* harmony import */ var _hooks_AsyncSeriesHook__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hooks/AsyncSeriesHook */ \"./lib/my-tapable/hooks/AsyncSeriesHook.ts\");\n/* harmony import */ var _hooks_AsyncSeriesBailHook__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./hooks/AsyncSeriesBailHook */ \"./lib/my-tapable/hooks/AsyncSeriesBailHook.ts\");\n/* harmony import */ var _hooks_AsyncSeriesLoopHook__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./hooks/AsyncSeriesLoopHook */ \"./lib/my-tapable/hooks/AsyncSeriesLoopHook.ts\");\n/* harmony import */ var _hooks_AsyncSeriesWaterfallHook__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./hooks/AsyncSeriesWaterfallHook */ \"./lib/my-tapable/hooks/AsyncSeriesWaterfallHook.ts\");\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://my-tapable-dev/./lib/my-tapable/index.ts?");

/***/ }),

/***/ "./lib/my-tapable/utils/fillArgs.ts":
/*!******************************************!*\
  !*** ./lib/my-tapable/utils/fillArgs.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fillArgs: () => (/* binding */ fillArgs)\n/* harmony export */ });\nfunction fillArgs(arr, maxLength) {\n  if (arr.length < maxLength) {\n    arr = arr.concat(new Array(maxLength - arr.length).fill(undefined));\n  }\n  return arr;\n}\n\n//# sourceURL=webpack://my-tapable-dev/./lib/my-tapable/utils/fillArgs.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lib_my_tapable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lib/my-tapable */ \"./lib/my-tapable/index.ts\");\n\nconst hook = new lib_my_tapable__WEBPACK_IMPORTED_MODULE_0__.SyncHook([\"arg1\", \"arg2\", \"arg3\"]);\nasync function searchGoogleMap(source, target, routesList) {\n  return await new Promise(resolve => {\n    setTimeout(() => {\n      resolve(\"CACULATED ROUTE\");\n    }, 1000);\n  });\n}\nclass Car {\n  hooks = {\n    accelerate: new lib_my_tapable__WEBPACK_IMPORTED_MODULE_0__.SyncHook([\"newSpeed\"]),\n    brake: new lib_my_tapable__WEBPACK_IMPORTED_MODULE_0__.SyncHook([]),\n    calculateRoutes: new lib_my_tapable__WEBPACK_IMPORTED_MODULE_0__.AsyncParallelHook([\"source\", \"target\", \"routesList\"])\n  };\n  constructor() {\n    this.hooks.brake.tap(\"BRAKE\", () => {\n      console.log(\"BREAK THE CAR\");\n    });\n    this.hooks.accelerate.tap(\"ACCELEATR\", newSpeed => {\n      console.log(\"ACCELERATE TO\" + newSpeed);\n    });\n    this.hooks.calculateRoutes.tapPromise(\"FIND ROUTE\", (source, target, routesList) => searchGoogleMap(source, target, routesList));\n  }\n  brake() {\n    this.hooks.brake.call();\n  }\n  accelerate(newSpeeed) {\n    this.hooks.accelerate.call(newSpeeed);\n  }\n  calculateRoutes(source, target, routesList) {\n    this.hooks.calculateRoutes.callAsync(source, target, routesList, result => {\n      console.log(result);\n    });\n  }\n}\nconst car = new Car();\ncar.calculateRoutes(\"pos1\", \"pos2\", []);\ncar.accelerate(120);\ncar.brake();\n\n//# sourceURL=webpack://my-tapable-dev/./src/index.ts?");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 
