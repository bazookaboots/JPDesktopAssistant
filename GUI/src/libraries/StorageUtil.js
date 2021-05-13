const fileStore = require('fs');


function _readData() {
    return JSON.parse(fileStore.readFileSync("./localCache.json"))
}

async function _writeData(input) {
    fileStore.writeFileSync("./localCache.json",JSON.stringify(input))
}

class ValueStore {
    constructor() {
        console.log("Value store constructor")
        this.values = new Map()
        if(fileStore.existsSync("./localCache.json")) {
            console.log("Value store ./localCache.json exists")
            this.values = new Map(Object.entries(_readData()))
        }
        else {
            console.log("Value store ./localCache.json does not exist")
            this.values = null
        }
    }

    isValid() {
        if(this.values !== null) return true
        return false
    }

    async store(key, value, saved = false) {
        this.values.set(key, value)
        if (saved) {
            await _writeData(Object.fromEntries(this.values))
        }
    }

    retrieveStoredData(){
        console.log("retrieveStoredData() called")
        let userData = {
            username: this.retrieve('username'),
            email: this.retrieve('email'),
            password: this.retrieve('password'),
            settings: this.retrieve('settings'),
            conversations: this.retrieve('conversations')
        }
        return userData
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

    retrieveUser(){
        let username = this.retrieve("username")
        let email = this.retrieve("email")
        let password = this.retrieve("password")

        var user
        if (password != null || username != null || email != null) 
        {
            return null
        }

        return { username: username, email: email, password: password}
    }
}

// let cache = new ValueStore()
// cache.store("email","lehis@gmail.com",true)
// cache.store("username","bazookaboots",true)
// cache.store("password","deefgreen",true)
module.exports = {ValueStore}