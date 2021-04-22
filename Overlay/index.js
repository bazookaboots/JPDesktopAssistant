const path = require("path");
const {app, BrowserWindow, ipcMain, shell, globalShortcut} = require("electron");

function onReady() {

    const win = new BrowserWindow({
        title: "PAL Overlay",
        x: 0,
        y: 0,
        maxWidth: 600,
        maxHeight: 400,
        transparent: true,
        opacity: 0.9,
        frame: false,
        alwaysOnTop: true,
        movable: true,
        resizable: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Open the developer tools
//     win.webContents.openDevTools();

    // and load the index.html of the app.
//     win.loadFile("docs/index.html");
    win.loadURL("https://www.youtube.com/watch?v=YrlJum5u4uE");
    win.setIgnoreMouseEvents(false);
    //win.setMovable(true);

    app.whenReady().then(() => {
        // Register a 'CommandOrControl+Y' shortcut listener.
        globalShortcut.register('CommandOrControl+Y', () => {
          // Do stuff when Y and either Command/Control is pressed.
          win.minimize();
        })
      })

      app.whenReady().then(() => {
        // Register a 'CommandOrControl+Y' shortcut listener.
        globalShortcut.register('CommandOrControl+U', () => {
          // Do stuff when Y and either Command/Control is pressed.
          win.restore();
        })
      })
}

app.on("ready", onReady);
