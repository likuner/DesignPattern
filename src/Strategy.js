/**
 * 策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换
 * 以下是基于ES6表单校验的策略模式示例
 * 1. 定义策略类，封装一系列算法
 * 2. 定义环境类Context，把请求委托给策略类，Context需要维持对某个策略对象的引用
 */
class Strategies {
    isNonEmpty(value, errorMsg) {
        if (!value) {
            return errorMsg
        }
    }

    minLength(value, length, errorMsg) {
        if (value.length < length) {
            return errorMsg
        }
    }
}

class Validator extends Strategies {
    constructor() {
        super()
        this.cache = []
    }

    add(value, rules) {
        for (let i = 0, rule; rule = rules[i++];) {
            let strategyArr = rule.strategy.split(':')
            const errorMsg = rule.errorMsg
            const strategy = strategyArr.shift()
            strategyArr.unshift(value)
            strategyArr.push(errorMsg)
            this.cache.push(() => this[strategy](...strategyArr))
        }
    }

    exec() {
        for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
            const errorMsg = validatorFunc()
            if (errorMsg) {
                return errorMsg
            }
        }
    }
}

function validate(data) {
    const validator = new Validator()

    validator.add(data.username, [{
        strategy: 'isNonEmpty',
        errorMsg: '用户名不能为空'
    }])
    
    validator.add(data.password, [{
        strategy: 'isNonEmpty',
        errorMsg: '密码不能为空'
    }, {
        strategy: 'minLength:6',
        errorMsg: '密码不能小于6位'
    }])

    const errorMsg = validator.exec()
    return errorMsg
}

function submit(data) {
    const errorMsg = validate(data)
    if (errorMsg) {
        console.error(errorMsg)
    } else {
        console.log('passed')
    }
}

const data = {
    username: 'shirmy',
    password: '12345'
}

submit(data)