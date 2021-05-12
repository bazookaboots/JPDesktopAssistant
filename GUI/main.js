const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')
const { ValueStore } = require("./src/libraries/StorageUtil")
const { userState } = require("./src/libraries/StateUtil")
const { mainWin, contactsWin, settingsWin, accountWin, overlayWin, messagesWin } = require("./src/libraries/WindowUtil")
const { palEngine } = require("./src/libraries/SpeechEngineUtil")
const { Login, Register, Delete, UpdateSettings } = require("./src/libraries/AccountAPI")
const { CreateContact, ReadContacts, UpdateContact, DeleteContact } = require('./src/libraries/ContactAPI')
const { StartMessager, SendMessage, ReadMessages, DeleteMessage } = require('./src/libraries/MessageAPI')

const cache = new ValueStore()
var user = cache.retrieveUser()


// FOR EREN this is how GUI-main will interact with PAL-main
// ipcMain.on('update-settings',(event, arg) => {
//     console.debug('Function Called: update-settings')
//     palEngine.updateSettings()
// })

if (user != null) {
    console.debug("User data found, attempting login.")

    userState.setState('loggedin')
    // LoginUser(user.email, user.password,
    //     (authToken) => {
    //         cache.store("token", authToken, true)
    //         userState.setState('loggedin')
    //     })
}
else {
    console.debug("User data not found, attempting login.")
    console.debug("Setting user state to logged out.")
    userState.setState('loggedin')
}
Register("test13", "test@test.com", "yeetingyeet"
    , (data) => {
        console.debug(`Got data: ${data}`)
    })

Login("test@test.com", "yeetingyeet"
    , (authToken) => {

    }, (data) => {
        console.debug(`Got data: ${data}`)
    })

Delete(2222
    , (authToken) => {

    }, (data) => {
        console.debug(`Got data: ${data}`)
    })

UpdateSettings(2222, "theme", "dark"
    , (authToken) => {

    }, (data) => {
        console.debug(`Got data: ${data}`)
    })




CreateContact(2222, 1111, "YEETER"
    , (authToken) => {

    }, (data) => {
        console.debug(`Got data: ${data}`)
    })

ReadContacts(2222
    , (authToken) => {

    }, (data) => {
        console.debug(`Got data: ${data}`)
    })

UpdateContact(2222, 1111, "YEETER2"
    , (authToken) => {

    }, (data) => {
        console.debug(`Got data: ${data}`)
    })

DeleteContact(2222, 1111
    , (authToken) => {

    }, (data) => {
        console.debug(`Got data: ${data}`)
    })



    

StartMessager(2222)
SendMessage("MESSAGE SENT!!!", 2222, 2222)

ReadMessages(2222
    , (authToken) => {

    }, (data) => {
        console.debug(`Got data: ${data}`)
    })

DeleteMessage(2222, 2222
    , (authToken) => {

    }, (data) => {
        console.debug(`Got data: ${data}`)
    })
    

// if (user != null) {
//     console.debug("User data found, attempting login.")
//     Login(user.email, user.password,
//         (authToken) => {
//             cache.store("token", authToken, true)
//             userState.setState('loggedin')
//         })
// }
// else {
//     console.debug("User data not found, attempting login.")
//     console.debug("Setting user state to logged out.")
//     userState.setState('loggedout')
// }

function closeWindow() {
    win.close()
}

app.on('ready', OnReady)

function OnReady() {
    mainWin.start()
}

ipcMain.on('close-mainWin', (event, arg) => {
    console.debug('Function Called: close-mainWin')
    mainWin.close()
})

ipcMain.on('close-contactsWin', (event, arg) => {
    console.debug('Function Called: close-contactsWin')
    mainWin.close()
})

ipcMain.on('close-settingsWin', (event, arg) => {
    console.debug('Function Called: close-settingsWin')
    settingsWin.close()
})

ipcMain.on('close-accountWin', (event, arg) => {
    console.debug('Function Called: close-accountWin')
    mainWin.close()
})

ipcMain.on('close-messagesWin', (event, arg) => {
    console.debug('Function Called: close-messagesWin')
    messagesWin.close()
})

app.on('window-all-closed', () => {
    console.debug('Function Called: all windows closed event')
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// OVERLAY STUFF FOR BAILEY. YES, I KNOW IT"S BROKEN.

// Toggle off
app.whenReady().then(() => {
    // Register a 'CommandOrControl+Y' shortcut listener.
    globalShortcut.register('CommandOrControl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
    overlayWin.start()
})
})


app.whenReady().then(() => {
    // Register a 'CommandOrControl+Y' shortcut listener.
    globalShortcut.register('CommandOrControl+U', () => {
    // Do stuff when Y and either Command/Control is pressed.
    overlayWin.end()
})
})

app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+O', () => {
        if (overlayWin.win != undefined) {
            overlayWin.win.minimize()
        }
    })
})

app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+P', () => {
        if (overlayWin.win != undefined) {
            overlayWin.win.restore()
        }
    })
})

app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+I', () => {
        if (overlayWin.win != undefined) {
            overlayWin.win.close()
        }
    })
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('get-state', (event, arg) => {
    event.reply('change-state', userState.getState())
})

ipcMain.on('logout-user', (event, arg) => {
    console.debug('Function Called: logout')
    userState.setState('loggedout')
    event.reply('change-state', userState.getState())
})

ipcMain.on('login-user', (event, arg) => {
    console.debug('Function Called: login')
    userState.setState('loggedin')
    event.reply('change-state', userState.getState())
})

ipcMain.on('toggle-engine', (event, arg) => {
    if (palEngine.isOn()) {
        palEngine.stop()
        event.reply('change-engine', 'off')
    }
    else {
        palEngine.start()
        //FOR EREN
        //palEngine.updateSettings()
        event.reply('change-engine', 'on')
    }
})

ipcMain.on('open-account-page', (event, arg) => {
    accountWin.start()
})
ipcMain.on('open-settings-page', (event, arg) => {
    settingsWin.start()
})
ipcMain.on('open-contacts-page', (event, arg) => {
    contactsWin.start()
})

ipcMain.on('open-messages-page', (event, arg) => {
    messagesWin.start()
})