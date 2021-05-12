const http = require('http');
const hostURL = "127.0.0.1"
const io = require("socket.io-client")
let ioClient = null

async function StartMessager(userid) {
    console.debug(`Function called: StartMessanger(${userid})\n`)

    ioClient = io.connect("http://localhost:8000",
        {
            query: {
                userid: userid
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

async function SendMessage(message, toid, fromid) {
    console.debug(`Function called: SendMessage(${message}, ${toid}, ${fromid})\n`)

    const request = {
        messageid: Date.now(),
        message: message,
        toid: toid,
        fromid: fromid
    }

    ioClient.emit("client-send-message", request)
}

async function ReadMessages(userid, authToken, callback) {
    console.debug(`Function called: ReadMessages(${userid}, ${authToken}, ${callback})\n`)

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
        console.error(`Error: Failed to read messages (${error})\n`)
    }

    Communicate(body, "/message/read", "GET", headers, onData, onError)
}
  
async function DeleteMessage(userid, messageid, authToken, callback) {
    console.debug(`Function called: Login(${userid}, ${messageid}, ${authToken}, ${callback})\n`)

    const request = {
        userid: userid,
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



