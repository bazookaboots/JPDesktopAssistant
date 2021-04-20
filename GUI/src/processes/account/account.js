//const { ipcRenderer } = require('electron')


function init() {
    //
    document.getElementById("close-btn").addEventListener("click", (e) => {
        console.log("close-btn function called")
        var window = BrowserWindow.getFocusedWindow();
        window.close();
    })

    document.getElementById("btn-update").addEventListener("click", (e) => {
        console.log("btn-update function called")
        UpdateUser()
    })
}