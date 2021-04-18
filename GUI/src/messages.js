const io = require("socket.io-client"),
ioClient = NULL

ioClient.on("getmessage", (msg) => {
    console.info(msg)
    //TODO: Add logic for the user to see these messages in the GUI
    //You will receive: messageid, message, fromid, and toid
})

//TODO: This function needs to run when pal starts and it needs the user id
function Startup(id)
{
    ioClient = io.connect("http://localhost:8000", 
    { 
        query: {
        userid: id
    }})
    
    GetAllMessages(id)
}

//TODO: This function needs to run when the user sends a message in the GUI
//You will need: message, toid, fromid
function SendMessage(mess, to, from) {
    const request = {
        message: mess,
        toid: to,
        fromid: from
    }

    ioClient.emit("sendmessage", request)
}

/**
 * Sends an HTTP POST request to the backend asking if it can
 * delete a message
 * @name DeleteMessage
 * @memberof messages.js
 * @param {int} messid - int representing the desired message
 */
 async function DeleteMessage(messid) {

    const data = JSON.stringify({
        messageid: messid
    })

    console.log("Called DeleteMessage");    //DEBUG

    let options = {
        host: hostURL,
        path: '/deletemessage',
        port: 3010,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const request = http.request(options, response => {
        console.log(`statusCode: ${response.statusCode}`)
        response.on('data', d => {
            console.log(d);
        })
    })

    request.on('error', error => {
        console.error(error)
    })
 
    request.write(data)

    request.end()
}

/**
 * Sends an HTTP POST request to the backend asking if it can
 * delete a message
 * @name GetUserMessages
 * @memberof messages.js
 * @param {int} to - int representing the user message was sent to
 * @param {int} from -  int representing the user message was sent from
 */
 async function GetUserMessages(to, from) {

    const data = JSON.stringify({
        toid: to,
        fromid: from
    })

    console.log("Called GetUserMessages");    //DEBUG

    let options = {
        host: hostURL,
        path: '/getusermessages',
        port: 3010,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const request = http.request(options, response => {
        console.log(`statusCode: ${response.statusCode}`)
        response.on('data', d => {
            console.log(d);
        })
    })

    request.on('error', error => {
        console.error(error)
    })

    request.write(data)

    request.end()
}

/**
 * Sends an HTTP POST request to the backend asking if it can
 * delete a message
 * @name GetAllMessages
 * @memberof messages.js
 * @param {int} userid - int representing the user
 */
 async function GetAllMessages(userid) {

    const data = JSON.stringify({
        fromid: userid
    })

    console.log("Called GetAllMessages");    //DEBUG

    let options = {
        host: hostURL,
        path: '/getallmessages',
        port: 3010,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const request = http.request(options, response => {
        console.log(`statusCode: ${response.statusCode}`)
        response.on('data', d => {
            console.log(d);
        })
    })

    request.on('error', error => {
        console.error(error)
    })

    request.write(data)

    request.end()
}