const { ipcRenderer } = require('electron')



    // FOR EREN heres where settings are sent to GUI-main

    ipcRenderer.send("update-settings")
    //
    document.getElementById("close-btn").addEventListener("click", (e) => {
        console.log("close-btn function called")
        ipcRenderer.send('close-settingsWin')
    })