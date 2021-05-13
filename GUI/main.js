const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')
const { ValueStore } = require("./src/libraries/StorageUtil")
const { userState } = require("./src/libraries/StateUtil")
const { mainWin, contactsWin, settingsWin, accountWin, overlayWin, messagesWin } = require("./src/libraries/WindowUtil")
const { palEngine } = require("./src/libraries/SpeechEngineUtil")
const { Login, Register, UpdateAccount, DeleteAccount } = require("./src/libraries/AccountAPI")
const { CreateContact, ReadContacts, UpdateContact, DeleteContact } = require('./src/libraries/ContactAPI')
const { StartMessager, SendMessage, ReadMessages, DeleteMessage, StopMessanger } = require('./src/libraries/MessageAPI')

const cache = new ValueStore()
if(cache.isValid())
{
    let storedData = cache.retrieveStoredData()
    Login(storedData.email,storedData.password, (request) =>{
        let data
        request.on('reponse',(response)=>{
            response.on('data',(dataRead) => {
                if(dataRead != undefined)
                    data += dataRead
            })
            response.on('end', () => {
                console.log(" stream data ended")
                //Do Loggin stuff
                cache.updateUserData(data)
                state.setState('loggedin')
            })

            response.on('close', () => {console.error("ERROR: server response prematurely closed")})
            response.on('aborted', () => {console.error("ERROR: server response prematurely aborted")})
            response.on('error', (error) => {console.error("ERROR: server response threw an error: "+ error)})
        })
        request.on('abort',()=> {console.error("ERROR: server request prematurely closed")})
        request.on('timeout', () => {console.error("ERROR: client request timed out waiting for response")})
    })
}
else
{
    //Do not loggedin stuff
    state.setState('loggedout')
}


// // FOR EREN this is how GUI-main will interact with PAL-main
// // ipcMain.on('update-settings',(event, arg) => {
// //     console.debug('Function Called: update-settings')
// //     palEngine.updateSettings()
// // })

// if (user != null) {
//     console.debug("User data found, attempting login.")

//     userState.setState('loggedin')
//     // LoginUser(user.email, user.password,
//     //     (authToken) => {
//     //         cache.store("token", authToken, true)
//     //         userState.setState('loggedin')
//     //     })
// }
// else {
//     console.debug("User data not found, attempting login.")
//     console.debug("Setting user state to logged out.")
//     userState.setState('loggedin')
// }
// Register("test13", "test@test.com", "yeetingyeet"
//     , (data) => {
//         console.debug(`Got data: ${data}`)
//     })

// Login("test@test.com", "yeetingyeet"
//     , (authToken) => {

//     }, (data) => {
//         console.debug(`Got data: ${data}`)
//     })

// Delete(2222
//     , (authToken) => {

//     }, (data) => {
//         console.debug(`Got data: ${data}`)
//     })

// UpdateSettings(2222, "theme", "dark"
// CreateContact("test@test.com", "test2@test.com", "YEETER"
//     , (authToken) => {

//     }, (data) => {
//         console.debug(`Got data: ${data}`)
//     })




// CreateContact(2222, 1111, "YEETER"
//     , (authToken) => {

//     }, (data) => {
//         console.debug(`Got data: ${data}`)
//     })

// ReadContacts(2222
//     , (authToken) => {

//     }, (data) => {
//         console.debug(`Got data: ${data}`)
//     })

// UpdateContact(2222, 1111, "YEETER2"
//     , (authToken) => {

//     }, (data) => {
//         console.debug(`Got data: ${data}`)
//     })

// DeleteContact(2222, 1111
//     , (authToken) => {

// ReadContacts("test@test.com"
//     , (authToken) => {

//     }, (data) => {
//         console.debug(`Got data: ${data}`)
//     })

// UpdateContact("test@test.com", "test2@test.com", "YEETER2"
//     , (authToken) => {

//     }, (data) => {
//         console.debug(`Got data: ${data}`)
//     })

// DeleteContact("test@test.com", "test2@test.com"
//     , (authToken) => {

//     }, (data) => {
//         console.debug(`Got data: ${data}`)
//     })



    

// StartMessager(2222)
// SendMessage("MESSAGE SENT!!!", 2222, 2222)

// ReadMessages(2222
//     , (authToken) => {

//     }, (data) => {
//         console.debug(`Got data: ${data}`)
//     })

// DeleteMessage(2222, 2222
//     , (authToken) => {

//     }, (data) => {
//         console.debug(`Got data: ${data}`)
//     })
    

// StopMessanger()

//StartMessager("test@test.com")

//SendMessage("MESSAGE SENT!!!", "test@test.com", "test@test.com")

// ReadMessages("test@test.com"
//     , (authToken) => {

//     }, (data) => {
//         console.debug(`Got data: ${data}`)
//     })

// DeleteMessage("test@test.com", 1620886395414
//     , (authToken) => {

//     }, (data) => {
//         console.debug(`Got data: ${data}`)
//     })

// if (user != null) {
//     console.debug("User data found, attempting login.")
//     Login(user.email, user.password,
//         (authToken) => {
//             cache.store("token", authToken, true)
//             userState.setState('loggedin')
//         })
// }
// else {
//     console.debug("User data not found, attempting login.")
//     console.debug("Setting user state to logged out.")
//     userState.setState('loggedout')
// }

function closeWindow() {
    win.close()
}

app.on('ready', OnReady)

function OnReady() {
    mainWin.start()
}

ipcMain.on('close-mainWin', (event, arg) => {
    console.debug('Function Called: close-mainWin')
    mainWin.close()
})

ipcMain.on('close-contactsWin', (event, arg) => {
    console.debug('Function Called: close-contactsWin')
    mainWin.close()
})

ipcMain.on('close-settingsWin', (event, arg) => {
    console.debug('Function Called: close-settingsWin')
    settingsWin.close()
})

ipcMain.on('close-accountWin', (event, arg) => {
    console.debug('Function Called: close-accountWin')
    mainWin.close()
})

ipcMain.on('close-messagesWin', (event, arg) => {
    console.debug('Function Called: close-messagesWin')
    messagesWin.close()
})

app.on('window-all-closed', () => {
    console.debug('Function Called: all windows closed event')
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// OVERLAY STUFF FOR BAILEY. YES, I KNOW IT"S BROKEN.

// Toggle off
app.whenReady().then(() => {
    // Register a 'CommandOrControl+Y' shortcut listener.
    globalShortcut.register('CommandOrControl+Y', () => {
    // Do stuff when Y and either Command/Control is pressed.
    overlayWin.start()
})
})


app.whenReady().then(() => {
    // Register a 'CommandOrControl+Y' shortcut listener.
    globalShortcut.register('CommandOrControl+U', () => {
    // Do stuff when Y and either Command/Control is pressed.
    overlayWin.end()
})
})

app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+O', () => {
        if (overlayWin.win != undefined) {
            overlayWin.win.minimize()
        }
    })
})

app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+P', () => {
        if (overlayWin.win != undefined) {
            overlayWin.win.restore()
        }
    })
})

app.whenReady().then(() => {
    globalShortcut.register('CommandOrControl+I', () => {
        if (overlayWin.win != undefined) {
            overlayWin.win.close()
        }
    })
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('get-state', (event, arg) => {
    event.reply('change-state', userState.getState())
})

ipcMain.on('logout-user', (event, arg) => {
    console.debug('Function Called: logout')
    userState.setState('loggedout')
    event.reply('change-state', userState.getState())
})

ipcMain.on('login-user', (event, arg) => {
    console.debug('Function Called: login')
    userState.setState('loggedin')
    event.reply('change-state', userState.getState())
})

ipcMain.on('toggle-engine', (event, arg) => {
    if (palEngine.isOn()) {
        palEngine.stop()
        event.reply('change-engine', 'off')
    }
    else {
        palEngine.start()
        //FOR EREN
        //palEngine.updateSettings()
        event.reply('change-engine', 'on')
    }
})

ipcMain.on('open-account-page', (event, arg) => {
    accountWin.start()
})
ipcMain.on('open-settings-page', (event, arg) => {
    settingsWin.start()
})
ipcMain.on('open-contacts-page', (event, arg) => {
    contactsWin.start()
})

ipcMain.on('open-messages-page', (event, arg) => {
    messagesWin.start()
})


var testData = [
    {
        username: "Morgan Anderson#1473",
        lastTimeStamp:"",
        messages: [
            {
                timeStamp:"",
                user: "Morgan Anderson#1473",
                time: "6:08 PM",
                date: "04/18/2021",
                text: "ok",
            },
            {
                timeStamp:"",
                user: "Bazookaboots#9013",
                time: "6:07 PM",
                date: "04/18/2021",
                text: "Morgan im gonna have to rain check on meeting tonight im completely out of it today",
            },
            {
                timeStamp:"",
                user: "Morgan Anderson#1473",
                time: "6:05 PM",
                date: "04/18/2021",
                text: "When do you want to meet tonight?",
            },
            {
                timeStamp:"",
                user: "Morgan Anderson#1473",
                time: "8:27 PM",
                date: "04/07/2021",
                text: "ok",
            },
            {
                timeStamp:"",
                user: "Bazookaboots#9013",
                time: "8:26 PM",
                date: "04/07/2021",
                text: "Hey give me one sec im finishing up marking dinner",
            }
        ]
    },
    {
        username: "Friendly Sven#4527",
        lastTimeStamp:"",
        messages: [
            {
                timeStamp:"",

                user: "Bazookaboots#9013",
                time: "2:54 PM",
                date: "05/08/2021",
                text: "yeah I would not do that the print just gets too massive. put prints in the OS code to see what it hits and what it doesn't",
            },
            {
                timeStamp:"",
                user: "Friendly Sven#4527",
                time: "2:52 PM",
                date: "05/08/2021",
                text: "still stuck. what's odd is that the loop has a print to run  but it doesn't print it i.e.",
            },
            {
                timeStamp:"",
                user: "Bazookaboots#9013",
                time: "2:49 PM",
                date: "05/08/2021",
                text: "yeah try without",
            },
            {
                timeStamp:"",
                user: "Friendly Sven#4527",
                time: "2:49 PM",
                date: "05/08/2021",
                text: "lmao I assumed i should and my loop has been stuck",
            },
            {
                timeStamp:"",
                user: "Bazookaboots#9013",
                time: "2:49 PM",
                date: "05/08/2021",
                text: "thats the weird thing, I feel like I would need to but I didn't and it still works",
            }
        ]
    },
    {
        username: "baygoo#0151",
        lastTimeStamp:"",
        messages: [
            {
                timeStamp:"",
                user: "Bazookaboots#9013",
                time: "3:43 PM",
                date: "02/08/2021",
                text: "im pretty sure its nicklmore but I can't remember awesome thanks!",
            },
            {
                timeStamp:"",
                user: "baygoo#0151",
                time: "3:43 PM",
                date: "02/08/2021",
                text: "Nicklmore#1390",
            },
            {
                timeStamp:"",
                user: "Bazookaboots#9013",
                time: "3:42 PM",
                date: "02/08/2021",
                text: "Hey do you know what nick springer's discord @ is?",
            },
            {
                timeStamp:"",
                user: "baygoo#0151",
                time: "1:42 PM",
                date: "12/27/2020",
                text: "Hey, I'm having some trouble getting the new GUI demo to listen to me when I click the mic button. Do I need to do anything differently to get it to work? I ran the speech engine on its own and it's working fine.",
            },
            {
                timeStamp:"",
                user: "baygoo#0151",
                time: "1:22 PM",
                date: "12/27/2020",
                text: "Right.",
            }
        ]
    }
]

ipcMain.on('init-messages', (event, arg) => {
    let pageData = {
        username:"Bazookaboots#9013",
        logged: true,
        conversations: testData
    }
    event.reply('messages-init-response',pageData)
})



