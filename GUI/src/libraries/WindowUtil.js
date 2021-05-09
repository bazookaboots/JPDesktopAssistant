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
        console.log("mainWin start function called")
        let path = 'src\\processes\\main\\main.html'
        let options = { width: 330, height: 470 }

        let mergedOptions = { ...defualtOptions, ...options }
        this.win = new BrowserWindow(mergedOptions)
        this.win.setMenuBarVisibility(false)

        this.win.loadFile(path)
        this.win.webContents.openDevTools({ mode: 'detach' })
        this.win.once('ready-to-show', () => {
            this.win.show()
        })
        return this.win
    }

    close() {
        let win = MainWinController.instance.win
        if (win.isDevToolsOpened()) {
            win.closeDevTools();
        }
        console.log("mainWin close function called")
        win.close()
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

    close() {
        let win = ContactsWinController.instance.win
        if (win.isDevToolsOpened()) {
            win.closeDevTools();
        }
        console.log("mainWin close function called")
        win.close()
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
        this.win = new BrowserWindow(mergedOptions)
        this.win.setMenuBarVisibility(false)

        this.win.loadFile(path)
        this.win.webContents.openDevTools({ mode: 'detach' })
        this.win.once('ready-to-show', () => {
            this.win.show()
        })
        return this.win
    }

    close() {
        let win = SettingsWinController.instance.win
        if (win.isDevToolsOpened()) {
            win.closeDevTools();
        }
        console.log("settingsWin close function called")
        win.close()
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

    close() {
        let win = AccountWinController.instance.win
        if (win.isDevToolsOpened()) {
            win.closeDevTools();
        }
        console.log("mainWin close function called")
        win.close()
    }
}

class MessagesWinController {
    constructor() {
        if (!MessagesWinController.instance) {
            MessagesWinController.instance = this
        }
    }

    start() {
        let path = 'src\\processes\\messages\\messages.html'
        let options = { width: 1320, height: 705 }

        let mergedOptions = { ...defualtOptions, ...options }
        this.win = new BrowserWindow(mergedOptions)
        this.win.setMenuBarVisibility(false)

        this.win.loadFile(path)
        this.win.webContents.openDevTools({ mode: 'detach' })
        this.win.once('ready-to-show', () => {
            this.win.show()
        })
        return this.win
    }

    close() {
        let win = MessagesWinController.instance.win
        if (win.isDevToolsOpened()) {
            win.closeDevTools();
        }
        console.log("mainWin close function called")
        win.close()
    }
}

class OverlayController {
    constructor() {
        if (!OverlayController.instance) {
            OverlayController.instance = this
        }
    }

    // Add path parameter
    start(data) {
        console.log("Hey we here " + data)
        if (this.win == undefined) {
            let path = data
            let options = {
                title: "PAL Overlay",
                x: 0,
                y: 0,
                maxWidth: 600,
                maxHeight: 400,
                transparent: true,
                opacity: 1,
                frame: false,
                alwaysOnTop: true,
                movable: true,
                resizable: true,
                webPreferences: {
                    nodeIntegration: true
                }
            }

            this.win = new BrowserWindow(options)
            this.win.setMenuBarVisibility(false)

            // It's breaking right here.
            // Launching with standard URL.
            // Replace with youtube with path from speech engine.
            this.win.loadURL("https://www.youtube.com/watch?v=5Qxqz-0wJZ0");
            this.win.setIgnoreMouseEvents(true);

            //this.win.webContents.openDevTools({ mode: 'detach' })

            this.win.once('ready-to-show', () => {
                this.win.show()
            })
            return this.win
        }
        else {
            //this.win.loadURL(data);
        }
    }

    end() {
        if (this.win != undefined) {
            this.win.close();
        }
    }
}

const mainWin = new MainWinController()
//Object.freeze(mainWin)

const contactsWin = new ContactsWinController()
Object.freeze(contactsWin)

const settingsWin = new SettingsWinController()
//Object.freeze(settingsWin)

const accountWin = new AccountWinController()
Object.freeze(accountWin)

const overlayWin = new OverlayController()
//Object.freeze(overlayWin)

const messagesWin = new MessagesWinController()
//Object.freeze(messagesWin)

module.exports = {
    mainWin,
    contactsWin,
    settingsWin,
    accountWin,
    overlayWin,
    messagesWin
}
