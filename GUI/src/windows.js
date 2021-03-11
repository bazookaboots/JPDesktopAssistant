// const { BrowserWindow } = require('electron').remote

const { isPropertyAccessChain } = require("typescript");

var isLoggedIn = false;

function createContactsWindow() {
    console.log
    let win = new BrowserWindow({
        width: 660,
        height: 470,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            //devTools: false
        }
    })
    win.setMenuBarVisibility(false)

    win.loadFile('src\\windows\\contacts\\contacts.html')
    win.webContents.openDevTools({ mode: 'detach' })
    win.once('ready-to-show', () => {
        win.show()
    })
}

function createSettingsWindow() {
    console.log
    let win = new BrowserWindow({
        width: 330,
        height: 470,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            //devTools: false
        }
    })
    win.setMenuBarVisibility(false)

    win.loadFile('src\\windows\\settings\\settings.html')
    win.webContents.openDevTools({ mode: 'detach' })
    win.once('ready-to-show', () => {
        win.show()
    })
}

function createAccountWindow() {
    console.log
    let win = new BrowserWindow({
        width: 330,
        height: 470,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            //devTools: false
        }
    })
    win.setMenuBarVisibility(false)

    win.loadFile('src\\windows\\account\\account.html')
    win.webContents.openDevTools({ mode: 'detach' })
    win.once('ready-to-show', () => {
        win.show()
    })
}