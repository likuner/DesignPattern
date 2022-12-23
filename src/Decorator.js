class Cellphone {
    create() {
        console.log('生产一个手机')
    }
}

class Decorator {
    constructor(cellphone) {
        this.cellphone = cellphone
    }

    create() {
        this.cellphone.create()
        this.createShell()
    }

    createShell() {
        console.log('生产一个手机壳')
    }
}