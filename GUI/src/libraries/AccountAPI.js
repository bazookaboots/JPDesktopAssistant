const http = require('http');
const hostURL = "127.0.0.1"

async function Register(username, email, password, callback){
    console.debug(`Function called: Register(${username}, ${email}, ${password}, ${callback})\n`)

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

    Communicate(body, "/account/register", "POST", headers, onData, onError)
}

async function Login(email, password, callback){
    //console.debug(`Function called: Login(${email}, ${password}, ${authToken}, ${callback})\n`)

    const request = {
        email: email,
        password: password
    }

    const body = JSON.stringify(request)

    const headers = {
        'Content-Type': 'application/json',
        'Content-Length': body.length,
    }

    Communicate(body, "/login", "GET", headers, callback)
}

async function UpdateAccount(email, key, value, authToken, callback){
    console.debug(`Function called: Update(${email}, ${key}, ${value}, ${authToken}, ${callback})\n`)

    const request = {
        email: email,
        key: key,
        value: value
    }

    const body = JSON.stringify(request)

    const headers = {
        'Content-Type': 'application/json',
        'Content-Length': body.length,
        'Authorization': 'Bearer ' + authToken['jwt_token']
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
        console.error(`Error: Failed to update settings (${error})\n`)
    }

    Communicate(body, "/account/update", "PATCH", headers, onData, onError )
}

async function DeleteAccount(email, authToken, callback){
    console.debug(`Function called: DeleteUser(${email}, ${authToken}, ${callback})\n`)

    const request = {
        email: email
    }

    const body = JSON.stringify(request)

    const headers = {
        'Content-Type': 'application/json',
        'Content-Length': body.length,
        'Authorization': 'Bearer ' + authToken['jwt_token']
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
        console.error(`Error: Failed to delete account (${error})\n`)
    }

    Communicate(body, "/account/delete", "DELETE", headers, onData, onError )
}

async function Communicate(request, path, method, headers, callback) {
    //console.debug(`Function called: Communicate(${JSON.stringify(request)}, ${path},
    //${method}, ${JSON.stringify(headers)}, ${onData}, ${onError})\n`);

    let options = {
        host: hostURL,
        path: path,
        port: 3010,
        method: method,
        headers: headers,
        timeout: 180000
    };

    
    const req = http.request(options)
    callback(req)
    console.log(request)
    req.write(request)
    req.end()
}

module.exports = {
    Register,
    Login,
    UpdateAccount,
    DeleteAccount
}