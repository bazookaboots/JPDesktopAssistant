const { BrowserWindow } = require('electron').remote


function init() {    
    //
    document.getElementById("close-btn").addEventListener("click", (e) => {
        console.log("close-btn function called")   
        var window = BrowserWindow.getFocusedWindow();
        window.close();
    })
}