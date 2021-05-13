const http = require('http');
const hostURL = "127.0.0.1"
const io = require("socket.io-client")
let ioClient = null

async function StartMessager(useremail) {
    console.debug(`Function called: StartMessanger(${useremail})\n`)

    ioClient = io.connect("http://localhost:8000",
        {
            query: {
                useremail: useremail
            }
        })
    
        ioClient.on("client-get-message", (msg) => {
            console.debug(`Client got message: ${msg.message}\n`)
        })
        
}

async function StopMessanger() {
    ioClient.disconnect()
    ioClient = null
}

async function SendMessage(message, toemail, fromemail) {
    console.debug(`Function called: SendMessage(${message}, ${toemail}, ${fromemail})\n`)

    const request = {
        messageid: Date.now(),
        message: message,
        toemail: toemail,
        fromemail: fromemail
    }

    ioClient.emit("client-send-message", request)
}

async function ReadMessages(useremail, authToken, callback) {
    console.debug(`Function called: ReadMessages(${useremail}, ${authToken}, ${callback})\n`)

    const request = {
        useremail: useremail
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
        console.error(`Error: Failed to read messages (${error})\n`)
    }

    Communicate(body, "/message/read", "GET", headers, onData, onError)
}
  
async function DeleteMessage(useremail, messageid, authToken, callback) {
    console.debug(`Function called: Login(${useremail}, ${messageid}, ${authToken}, ${callback})\n`)

    const request = {
        useremail: useremail,
        messageid: messageid
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
        console.error(`Error: Failed to delete message (${error})\n`)
    }

    Communicate(body, "/message/delete", "DELETE", headers, onData, onError)
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
    StartMessager,
    StopMessanger,
    SendMessage,
    ReadMessages,
    DeleteMessage
}



