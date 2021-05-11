const bcrypt = require('bcrypt');
const http = require('http');
const hostURL = "127.0.0.1"

async function Register(username, email, password, callback){
    console.debug(`Function called: Register(${username}, ${email}, ${password})\n`)

    if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) || email.length < 8 || email.length > 64) {
        console.debug("Email is invalid.\n")
        return -100
    }

    if (!username.match(/^[a-zA-Z0-9]+$/) || username.length < 5 || username.length > 32) {
        console.debug("Username is invalid.\n")
        return -200
    }

    if (password.length < 8 || password.length > 32) {
        console.debug("Password is invalid.\n")
        return -300
    }

    const request = {
        userid: Date.now(),
        email: email,
        username: username,
        passhash: password
    }

    const body = JSON.stringify(request)

    const headers = {
        'Content-Type': 'application/json',
        'Content-Length': body.length
    }

    function onData(datas){
        let data =''
        datas.on('data', d => {
            if(d != undefined)
                data += d
        })

        datas.on("end", () => {
            callback(data)
        })
    }
    
    function onError(error){
        console.error(`Error: Failed to register (${error})\n`)
    }

    let result = Communicate(body, "/register", "POST", headers, onData, onError )

    if (result == -400){
        console.debug("Failed to register on the server.\n")
    }
    else{
        return 0
    }
}

async function Login(email, password){
    console.debug(`Function called: Login(${email}, ${password})\n`)

    if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) || email.length < 8 || email.length > 64) {
        console.debug("Email is invalid.\n")
        return -100
    }

    if (password.length < 8 || password.length > 32) {
        console.debug("Password is invalid.\n")
        return -200
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const request = {
        email: email,
        passhash: hashedPassword
    }

    let result = LoginRoute(request)

    if (result == -300){
        console.debug("Failed to login on the server.\n")
    }
    else{
        //TODO: Store returned data
        return 0
    }
}

async function DeleteUser(userid){
    console.debug(`Function called: DeleteUser(${userid})\n`)

    const request = {
        userid: userid
    }

    DeleteUserRoute(request)
    //TODO: Clear cache
}

async function UpdateSettings(userid, key, value){
    //pull settings from cache
    //update values
    //store changes in cache
    //build json (userid, settings)
    //call /update-settings (request)
    UpdateSettingsRoute(request)
}

async function CreateContact(userid, contactid, displayname){
    //pull contacts from cache
    //update values
    //store changes in cache
    //build json (userid, contacts)
    //call /update-contacts (request)
    UpdateContactsRoute(request)
}

async function ReadContacts(userid){
    //build json (userid)
    //call /read-user-data (request)
    //store returned contacts in cache
    ReadContactsRoute(request)
}

async function UpdateContacts(userid, contactid, displayname){
    //pull contacts from cache
    //update values
    //store changes in cache
    //build json (userid, contacts)
    //call /update-contacts (request)
    UpdateContactsRoute(request)
}

async function DeleteContact(userid, contactid){
    //pull contacts from cache
    //update values
    //store changes in cache
    //build json (userid, contacts)
    //call /update-contacts (request)
    UpdateContactsRoute(request)
}

async function Communicate(request, path, method, headers, onData, onError) {
    console.debug(`Function called: Communicate(${JSON.stringify(request)}, ${path},
    ${method}, ${JSON.stringify(headers)}, ${onData}, ${onError})\n`);

    let options = {
        host: hostURL,
        path: path,
        port: 3010,
        method: method,
        headers: headers
    };

    const req = http.request(options, onData)

    req.on('error', onError)
  
    console.log(request)

    req.write(request)

    req.end()
}


module.exports = {
    Register,
    Login,
    DeleteUser,
    UpdateSettings,
    CreateContact,
    ReadContacts,
    UpdateContacts,
    DeleteContact
}