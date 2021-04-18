const io = require("socket.io-client"),
ioClient = NULL

ioClient.on("getmessage", (msg) => {
    console.info(msg);
    //TODO: Logic to allow user to see new message (Lehi)
})

function Startup(m_userid)
{
    ioClient = io.connect("http://localhost:8000", {query: m_userid});
}

function SendMessage(m_message, m_toid, m_fromid) {
    const request = {
        message: m_message,
        toid: m_toid,
        fromid: m_fromid
    }

    ioClient.emit("sendmessage", request)

}

function DeleteMessage(m_messageid){
    //TODO: Create logic for calling deletemessage

}

function GetUserMessages(m_fromid, m_toid){
    //TODO: Create logic for calling getallmessages
}

function GetAllMessages(m_fromid){
    //TODO: Create logic for calling getallmessages
}