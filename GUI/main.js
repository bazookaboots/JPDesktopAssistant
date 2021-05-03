const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')
const { ValueStore } = require("./src/libraries/StorageUtil")
const { userState } = require("./src/libraries/StateUtil")
const { mainWin, contactsWin, settingsWin, accountWin, overlayWin } = require("./src/libraries/WindowUtil")
const { palEngine } = require("./src/libraries/SpeechEngineUtil")

const { LoginUser } = require("./src/libraries/AccountAPI")

//attempt to log in
const cache = new ValueStore()
var user = cache.retrieveUser()

if (user != null) {
    console.log("user data found attempting login")
    LoginUser(user.email, user.password,
        (authToken) => {
            console.log(JSON.parse(authToken))
            cache.store("token", authToken, true)
            userState.setState('loggedin')
        })
}
else {
    console.log("user data not found attempting login")
    console.log("setting user state to loggedout")
    userState.setState('loggedout')
}

// Toggle off
//app.whenReady().then(() => {
// Register a 'CommandOrControl+Y' shortcut listener.
//globalShortcut.register('CommandOrControl+Y', () => {
// Do stuff when Y and either Command/Control is pressed.
//overlayWin.start();
//})
//})


//app.whenReady().then(() => {
// Register a 'CommandOrControl+Y' shortcut listener.
//globalShortcut.register('CommandOrControl+U', () => {
// Do stuff when Y and either Command/Control is pressed.
//overlayWin.end();
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
    console.log('close-mainWin ipc called')
    mainWin.close()
})

ipcMain.on('close-contactsWin', (event, arg) => {
    console.log('close-contactsWin ipc called')
    mainWin.close()
})

ipcMain.on('close-settingsWin', (event, arg) => {
    console.log('close-settingsWin ipc called')
    mainWin.close()
})

ipcMain.on('close-accountWin', (event, arg) => {
    console.log('close-accountWin ipc called')
    mainWin.close()
})

app.on('window-all-closed', () => {
    console.log('all windows closed event called')
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.whenReady().then(() => {
    // Register a 'CommandOrControl+Y' shortcut listener.
    globalShortcut.register('CommandOrControl+O', () => {
        if (overlayWin.win != undefined) {
            overlayWin.win.minimize()
        }
    })
})

app.whenReady().then(() => {
    // Register a 'CommandOrControl+Y' shortcut listener.
    globalShortcut.register('CommandOrControl+P', () => {
        if (overlayWin.win != undefined) {
            overlayWin.win.restore()
        }
    })
})

app.whenReady().then(() => {
    // Register a 'CommandOrControl+Y' shortcut listener.
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
    console.log('logout ipc called')
    userState.setState('loggedout')
    event.reply('change-state', userState.getState())
})

ipcMain.on('login-user', (event, arg) => {
    console.log('login ipc called')
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