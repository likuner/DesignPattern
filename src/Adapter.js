class Plug {
    getName() {
        return 'iPhone 充电头'
    }
}

class Adapter {
    constructor() {
        this.plug = new Plug()
    }

    getName() {
        return `${this.plug.getName()} 适配 Type-c 充电头`
    }
}

// 测试
const adapter = new Adapter()
console.log(adapter.getName())