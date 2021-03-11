const { app, BrowserWindow, session } = require('electron')

function createWindow() {
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

    let mainSession = win.webContents.session
    win.setMenuBarVisibility(false)

    win.loadFile('src\\windows\\main\\main.html')
    win.webContents.openDevTools({ mode: 'detach' })
}

function closeWindow() {
    win.close()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})