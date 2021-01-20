const { app, BrowserWindow } = require('electron')

function createWindow () {
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

  win.loadFile('src\\index.html')
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
