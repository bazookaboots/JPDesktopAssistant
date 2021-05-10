const io = require("socket.io-client"),
ioClient = NULL

const {
    ReadMessagesRoute,
    DeleteMessageRoute
} = require('./Communications')

async function Startup() {
    //if userid in cahce, connect
    //else, do nothing.
    ioClient = io.connect("http://localhost:8000",
        {
            query: {
                userid: id
            }
        })
}

ioClient.on("client-get-message", (msg) => {
    //display message popup
    //add message to cache
})

async function SendMessage(message, toid, fromid) {
    //build json (message, messageid, toid, fromid)
    //update messages in cache

    ioClient.emit("client-send-message", request)
}

async function ReadMessages() {
    //build json (userid)
    //call /get-messages (request)
    //store returned messages in cache
    ReadMessagesRoute(request)
}

async function DeleteMessage(messageid) {
    //build json (userid, messageid)
    //call /delete-messages (request, authTokens)
    //update messages in cache
    DeleteMessageRoute(rquest)
}