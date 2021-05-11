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

    Communicate(body, "/register", "POST", headers, onData, onError)
}

async function Login(email, password, authToken, callback){
    console.debug(`Function called: Login(${email}, ${password}, ${authToken}, ${callback})\n`)

    const request = {
        email: email,
        password: password
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
        console.error(`Error: Failed to log in (${error})\n`)
    }

    Communicate(body, "/login", "GET", headers, onData, onError)
}

async function UpdateSettings(userid, key, value, authToken, callback){
    console.debug(`Function called: UpdateSettings(${userid}, ${key}, ${value}, ${authToken}, ${callback})\n`)

    const request = {
        userid: userid,
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

    Communicate(body, "/update-settings", "PATCH", headers, onData, onError )
}

async function Delete(userid, authToken, callback){
    console.debug(`Function called: DeleteUser(${userid}, ${authToken}, ${callback})\n`)

    const request = {
        userid: userid
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

    Communicate(body, "/delete", "DELETE", headers, onData, onError )
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
    Delete,
    UpdateSettings
}