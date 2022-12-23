// 观察者
class Observer {
    
    constructor(name) {
        this.name = name;
    }
    
    update(...args) {
        console.log(this.name, ...args)
    }
}

// 目标对象
class Subject {
    
    constructor() {
        this.observerList = []
    }
    
    add(observer) {
        this.observerList.push(observer)
    }
    
    remove(observer) {
        const list = this.observerList.filter(ob => ob !== observer)
        this.observerList.splice(0, this.observerList.length, ...list)
    }
    
    clear() {
        this.observerList.splice(0)
    }
    
    notify(...args) {
        for(let i = 0, len = this.observerList.length; i < len; i++){
            this.observerList[i].update(...args)
        }
    }
}

// 测试
const subject = new Subject();
const observer1 = new Observer('章三');
const observer2 = new Observer('李四');
subject.add(observer1);
subject.add(observer2);
subject.notify();