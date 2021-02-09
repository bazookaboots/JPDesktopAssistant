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

  win.loadFile('src\\windows\\settings\\settings.html')
  win.webContents.openDevTools({ mode: 'detach' })
  win.once('ready-to-show', () => {
    win.show()
  })
  ReadContact("test1", "test2", "test3");
}

function ReadContact(name, platform, username) {
  console.log("Called readcontact");

  let options = {
    host: '127.0.0.1', //Update later
    path: '/',
    port: 3010,
    method: 'GET'
  };

  const request = http.request(options, response => {

    response.on('data', d => {
      console.log(d);
      console.log("FUUUUUUUUUUUUUUUUUUUUUCKKKKKKK");
    })
  })

  console.log("Outside response.on");


  request.on('error', error => {
    console.error(error)
  })

  request.end()
}