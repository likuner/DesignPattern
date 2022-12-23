type EventType = any

// 发布订阅
class PubSub {
    // 订阅记录
    private events: Map<EventType, Function[]> = new Map()

    // 只订阅一次的记录
    private onceEvents: Map<EventType, Function[]> = new Map()

    static instance: PubSub | null = null

    static getInstance(): PubSub {
        if (!PubSub.instance) {
            PubSub.instance = new PubSub()
        }
        return PubSub.instance
    }

    // 订阅
    on(event: EventType, callback: Function) {
        if (!this.events.has(event)) {
            this.events.set(event, [])
        }
        this.events.get(event)!.push(callback)
    }

    // 取消订阅
    off(event: EventType, callback: Function) {
        const listeners = this.events.get(event)
        if (listeners?.length) {
            listeners.splice(0, listeners.length, ...listeners.filter((fn: Function) => fn !== callback));
        }
        const onceListeners = this.onceEvents.get(event)
        if (onceListeners?.length) {
            onceListeners.splice(0, onceListeners.length, ...onceListeners.filter((fn: Function) => fn !== callback));
        }
    }

    // 只订阅一次
    once(event: EventType, callback: Function) {
        if (!this.onceEvents.has(event)) {
            this.onceEvents.set(event, [])
        }
        this.onceEvents.get(event)!.push(callback)
    }

    // 发布
    emit(event: EventType, ...args: any[]) {
        Promise.resolve().then(() => {
            const listeners = this.events.get(event) || []
            const onceListeners = this.onceEvents.get(event) || []
            const allListeners = [...listeners, ...onceListeners]
            if (allListeners.length) {
                for (let i = 0, len = allListeners.length; i < len; i++) {
                    allListeners[i].apply(this, args)
                }
            }
            if (onceListeners.length) {
                onceListeners.splice(0)
            }
        })
    }

    // 清空订阅
    clear() {
        this.events.clear()
        this.onceEvents.clear()
    }
}

// 测试
const pubSub = PubSub.getInstance()
const ev = new Date();
pubSub.on(ev, () => {
    console.log('hello 1')
})
pubSub.emit(ev)
// 后续订阅，也会被触发
pubSub.on(ev, () => {
    console.log('hello 2')
})