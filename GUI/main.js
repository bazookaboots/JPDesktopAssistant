const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')
const { ValueStore } = require("./src/libraries/StorageUtil")
const { userState } = require("./src/libraries/StateUtil")
const { mainWin, contactsWin, settingsWin, accountWin, overlayWin, messagesWin } = require("./src/libraries/WindowUtil")
const { palEngine } = require("./src/libraries/SpeechEngineUtil")
const { LoginUser } = require("./src/libraries/AccountAPI")

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

function closeWindow() {
    win.close()
}

app.on('ready', OnReady)

function OnReady() {
    mainWin.start()
    overlayWin.start("https://www.google.com/")
}

ipcMain.on('close-mainWin', (event, arg) => {
    console.debug('Function Called: close-mainWin')
    mainWin.close()
    //overlayWin.close()
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

app.on('window-all-closed', () => {
    console.debug('Function Called: all windows closed event')
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Toggle off
app.whenReady().then(() => {
    // Register a 'CommandOrControl+Y' shortcut listener.
    globalShortcut.register('CommandOrControl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
    if (overlayWin.win != undefined) {
        overlayWin.start()
    }
})
})

app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+5', () => {
        if (overlayWin.win != undefined) {
            overlayWin.close()
            mainWin.close()
            //settingsWin.close()
        }
    })
})

app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+4', () => {
        if (overlayWin.win != undefined) {
            //overlayWin.setInteractable()
            overlayWin.win.setIgnoreMouseEvents(true)
        }
    })
})

app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+3', () => {
        if (overlayWin.win != undefined) {
            //overlayWin.setInteractable()
            overlayWin.win.moveTop();
        }
    })
})

app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+2', () => {
        if (overlayWin.win != undefined) {
            overlayWin.minimizeOverlay()
        }
    })
})

app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+1', () => {
        if (overlayWin.win != undefined) {
            overlayWin.toggle()
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