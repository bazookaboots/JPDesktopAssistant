const io = require("socket.io-client"),
ioClient = NULL

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

async function SendMessages(message, toid, fromid) {
    //build json (message, messageid, toid, fromid)
    //update messages in cache

    ioClient.emit("client-send-message", request)
}

async function ReadMessages() {
    //build json (userid)
    //call /get-messages (request, authTokens)
    //store returned messages in cache
}

async function DeleteMessage(messageid) {
    //build json (userid, messageid)
    //call /delete-messages (request, authTokens)
    //update messages in cahce
}