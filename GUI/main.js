const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')
const { ValueStore } = require("./src/libraries/StorageUtil")
const { userState } = require("./src/libraries/StateUtil")
const { mainWin, contactsWin, settingsWin, accountWin, overlayWin } = require("./src/libraries/WindowUtil")
const { palEngine } = require("./src/libraries/SpeechEngineUtil")

const { LoginUser } = require("./src/libraries/AccountAPI")

//attempt to log in
const cache = new ValueStore()
let user = {
    username: cache.retrieve("username"),
    email: cache.retrieve("email"),
    password: cache.retrieve("password")
}
if (user.password != null
    && user.username != null
    && user.email != null) 
{
    console.log("attempting to log user in")
    LoginUser(user.email,user.password,
        (authToken)=> {
            console.log(JSON.parse(authToken))
            cache.store("token",authToken,true)
            userState.setState('loggedin')
        })
    
}
else {
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

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.whenReady().then(() => {
    // Register a 'CommandOrControl+Y' shortcut listener.
    globalShortcut.register('CommandOrControl+O', () => {
        if (overlayWin.win != undefined)
        {
            overlayWin.win.minimize()
        }
    })
  })

  app.whenReady().then(() => {
    // Register a 'CommandOrControl+Y' shortcut listener.
    globalShortcut.register('CommandOrControl+P', () => {
        if (overlayWin.win != undefined) 
        {
            overlayWin.win.restore()
        }  
    })
  })

  app.whenReady().then(() => {
    // Register a 'CommandOrControl+Y' shortcut listener.
    globalShortcut.register('CommandOrControl+I', () => {
        if (overlayWin.win != undefined) 
        {
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

ipcMain.on('close-app', (event, arg) => {
    var window = BrowserWindow.getFocusedWindow();
    window.close();
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