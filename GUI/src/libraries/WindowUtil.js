const { BrowserWindow } = require('electron')

const defualtOptions =
{
    width: 330,
    height: 470,
    frame: false,
    resizable: false,
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        //devTools: false
    }
}

class MainWinController {
    constructor() {
        if (!MainWinController.instance) {
            MainWinController.instance = this
        }
    }

    start() {
        let path = 'src\\processes\\main\\main.html'
        let options = { width: 330, height: 470 }

        let mergedOptions = { ...defualtOptions, ...options }
        let win = new BrowserWindow(mergedOptions)
        win.setMenuBarVisibility(false)

        win.loadFile(path)
        win.webContents.openDevTools({ mode: 'detach' })
        win.once('ready-to-show', () => {
            win.show()
        })
        return win
    }

}

class ContactsWinController {
    constructor() {
        if (!ContactsWinController.instance) {
            ContactsWinController.instance = this
        }
    }

    start() {
        let path = 'src\\processes\\contacts\\contacts.html'
        let options = { width: 660, height: 470 }

        let mergedOptions = { ...defualtOptions, ...options }
        let win = new BrowserWindow(mergedOptions)
        win.setMenuBarVisibility(false)

        win.loadFile(path)
        win.webContents.openDevTools({ mode: 'detach' })
        win.once('ready-to-show', () => {
            win.show()
        })
        return win
    }
}

class SettingsWinController {
    constructor() {
        if (!SettingsWinController.instance) {
            SettingsWinController.instance = this
        }
    }

    start() {
        let path = 'src\\processes\\settings\\settings.html'
        let options = { width: 330, height: 470 }

        let mergedOptions = { ...defualtOptions, ...options }
        let win = new BrowserWindow(mergedOptions)
        win.setMenuBarVisibility(false)

        win.loadFile(path)
        win.webContents.openDevTools({ mode: 'detach' })
        win.once('ready-to-show', () => {
            win.show()
        })
        return win
    }
}

class AccountWinController {
    constructor() {
        if (!AccountWinController.instance) {
            AccountWinController.instance = this
        }
    }

    start() {
        let path = 'src\\processes\\account\\account.html'
        let options = { width: 330, height: 470 }

        let mergedOptions = { ...defualtOptions, ...options }
        let win = new BrowserWindow(mergedOptions)
        win.setMenuBarVisibility(false)

        win.loadFile(path)
        win.webContents.openDevTools({ mode: 'detach' })
        win.once('ready-to-show', () => {
            win.show()
        })
        return win
    }
}

const mainWin = new MainWinController()
Object.freeze(mainWin)

const contactsWin = new ContactsWinController()
Object.freeze(contactsWin)

const settingsWin = new SettingsWinController()
Object.freeze(settingsWin)

const accountWin = new AccountWinController()
Object.freeze(accountWin)

module.exports = {
    mainWin,
    contactsWin,
    settingsWin,
    accountWin
}
