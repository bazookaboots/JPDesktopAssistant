const fileStore = require('fs');


function _readData() {
    return JSON.parse(fileStore.readFileSync("./localCache.json"))
}

async function _writeData(input) {
    fileStore.writeFileSync("./localCache.json",JSON.stringify(input))
}

class ValueStore {
    constructor() {
        this.values = new Map()
        if(fileStore.existsSync("./localCache.json")) {
            this.values = new Map(Object.entries(_readData()))
        }
    }

    async store(key, value, saved = false) {
        this.values.set(key, value)
        if (saved) {
            await _writeData(Object.fromEntries(this.values))
        }
    }

    retrieve(key) {
        if (!this.values.has(key)) return null
        return this.values.get(key)
    }

    delete(key) {
        this.values.delete(key)

    }

    printContents() {
        console.log(Object.fromEntries(this.values))
    }
}

// let cache = new ValueStore()
// cache.store("email","lehis@gmail.com",true)
// cache.store("username","bazookaboots",true)
// cache.store("password","deefgreen",true)
module.exports = {ValueStore}