class Product {
    constructor(name) {
        this.name = name
    }

    printName() {
        console.log('product name:', this.name)
    }
}

function Factory(name) {
    return new Product(name)
}

// 测试
const car = Factory('Car')
car.printName()
const phone = Factory('Phone')
phone.printName()
