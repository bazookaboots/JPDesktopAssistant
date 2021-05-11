const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')
const { ValueStore } = require("./src/libraries/StorageUtil")
const { userState } = require("./src/libraries/StateUtil")
const { mainWin, contactsWin, settingsWin, accountWin, overlayWin } = require("./src/libraries/WindowUtil")
const { palEngine } = require("./src/libraries/SpeechEngineUtil")
const { Login, Register, DeleteUser } = require("./src/libraries/AccountAPI")

const cache = new ValueStore()
var user = cache.retrieveUser()

//Login("test@test.com", "yeetingyeet")
Register("test13", "test@test.com", "yeetingyeet")
//DeleteUser(1234)

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

// Toggle off
//app.whenReady().then(() => {
// Register a 'CommandOrControl+Y' shortcut listener.
//globalShortcut.register('CommandOrControl+Y', () => {
// Do stuff when Y and either Command/Control is pressed.
//overlayWin.start()
//})
//})


//app.whenReady().then(() => {
// Register a 'CommandOrControl+Y' shortcut listener.
//globalShortcut.register('CommandOrControl+U', () => {
// Do stuff when Y and either Command/Control is pressed.
//overlayWin.end()
//})
//})

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
    mainWin.close()
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

ipcMain.on('spawn-engine', (event, arg) => {
    palEngine.start()
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