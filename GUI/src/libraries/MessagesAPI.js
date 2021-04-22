const io = require("socket.io-client"),
ioClient = NULL

ioClient.on("getmessage", (msg) => {
    console.info(msg)
    //TODO: DisplayReceivedMessage(messageid, message, toid, fromid)
    //Should take apart the object and display in messages for a user
})

//TODO: Run this when the GUI starts
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
function SendMessage(message, toid, fromid) {
    const request = {
        message: message,
        toid: toid,
        fromid: fromid
    }

    ioClient.emit("sendmessage", request)
}

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
            //TODO: GetUserMessages(d)
            //Should take apart the object and display in messages for a user
        })
    })

    request.on('error', error => {
        console.error(error)
    })

    request.write(data)

    request.end()
}

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
            //TODO: GetAllMessages(d)
            //Should take apart the object inside the object list and display in messages for a user
        })
    })

    request.on('error', error => {
        console.error(error)
    })

    request.write(data)

    request.end()
}