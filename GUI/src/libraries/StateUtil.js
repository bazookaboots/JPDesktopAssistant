const { ipcMain } = require('electron')

const states = {
    "error": {
        "state":()=>{
            
        },
        "error": ()=>{},
        "loggedin": ()=>{},
        "loggedout": ()=>{}
    },
    "loggedin": {
        "state":()=>{
            
        },
        "error": ()=>{},
        "loggedin": ()=>{},
        "loggedout": ()=>{}
    },
    "loggedout": {
        "state":()=>{},
        "error": ()=>{},
        "loggedin": ()=>{ console.log("user is logged in") },
        "loggedout":  ()=>{}
    }
}

class UserState {
    constructor() {
        if (!UserState.instance) {
            UserState.instance = this
            this.currentState = "loggedout"
            this.states = states
        }
    }

    isState(state) {
        return this.currentState === state;
    }

    getState(){
        return this.currentState
    }

    setState(state) {
        if (this.states.hasOwnProperty(state)) {
            this.states[this.currentState][state]()
            this.states[this.currentState]['state']()
            this.currentState = state;
        }
    }
}

const userState = new UserState()

module.exports = {
    userState: userState,
}