const path = require("path");
const {app, BrowserWindow, ipcMain, shell} = require("electron");

function onReady() {

    const win = new BrowserWindow({
        title: "PAL Overlay",
        x: 0,
        y: 0,
        width: 600,
        height: 400,
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
    win.loadURL("https://www.youtube.com/");
    win.setIgnoreMouseEvents(false);
    win.setMovable(true);

//     win.on("page-title-updated", (evt) => {
//         evt.preventDefault();
//     });

    ipcMain.on("pgg-minimize-app", () => {
        win.minimize();
    });

    ipcMain.on("pgg-close-app", () => {
        win.close();
    });
}

app.on("ready", onReady);
