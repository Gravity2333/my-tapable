import {
    SyncHook,
    SyncBailHook,
    SyncLoopHook,
    SyncWaterfallHook
} from 'lib/my-tapable'

const syncHook = new SyncHook(['args1','args2'])

syncHook.tap('syncHook event',(...args)=>{
    console.log("syncHook event tap1",args,)
})

syncHook.tap('syncHook event',(...args)=>{
    console.log("syncHook event tap2",args)
})


syncHook.tap('syncHook event',(...args)=>{
    console.log("syncHook event tap3",args,)
})

syncHook.tap('syncHook event',(...args)=>{
    console.log("syncHook event tap4",args)
})

console.log(syncHook.call(1,2,3,4))


const syncBailHook = new SyncBailHook(['arg1','arg2','arg3','arg4'])
syncBailHook.tap('syncBailHook 1 ',(...args)=>{
    console.log('syncBailHook 1 ',args)
    
})

syncBailHook.tap('syncBailHook 2',(...args)=>{
    console.log('syncBailHook 2',args)
    
})

syncBailHook.tap('syncBailHook 3',(...args)=>{
    console.log('syncBailHook 3',args)
    return true
})

console.log(syncBailHook.call(1,2,3,4))

const syncLoopHook = new SyncLoopHook(['args1','args2','args3','args4'])
syncLoopHook.tap('syncLoopHook 1',(...args)=>{
    console.log('syncLoopHook 1',args)
    return undefined
})
let cnt = 3
syncLoopHook.tap('syncLoopHook 2',(...args)=>{
    if(cnt--<=0){
        return
    }
    console.log('syncLoopHook 2',args)
    return true
})
syncLoopHook.tap('syncLoopHook 3',(...args)=>{
    console.log('syncLoopHook 3',args)
    return undefined
})
console.log(syncLoopHook.call(1,2,3,4,6,8))


const syncWaterfallHook =new SyncWaterfallHook(['arg1','arg2','arg3','arg4'])

syncWaterfallHook.tap('syncWaterfallHook 1',(...args)=>{
    console.log('syncWaterfallHook 1',args)
    return 100
})
syncWaterfallHook.tap('syncWaterfallHook 2',(...args)=>{
    console.log('syncWaterfallHook 2',args)
    return 200
})
syncWaterfallHook.tap('syncWaterfallHook 3',(...args)=>{
    console.log('syncWaterfallHook 3',args)
    return 300
})


console.log(syncWaterfallHook.call(1,2,3,4,5,6,7,8,9,10))