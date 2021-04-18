const io = require("socket.io-client"),
ioClient = NULL


// This function is automatic
ioClient.on("getmessage", (msg) => {
    console.info(msg)
    //TODO: Add logic for the user to see these messages in the GUI
    //You will receive: messageid, message, fromid, and toid
})

//TODO: This function needs to run when pal starts and it needs the user id
function Startup(m_userid)
{
    ioClient = io.connect("http://localhost:8000", 
    { 
        query: {
        userid: m_userid
    }})
    
    GetAllMessages(m_userid)
}

//TODO: This function needs to run when the user sends a message in the GUI
//You will need: message, toid, fromid
function SendMessage(m_message, m_toid, m_fromid) {
    const request = {
        message: m_message,
        toid: m_toid,
        fromid: m_fromid
    }

    ioClient.emit("sendmessage", request)
}

//TODO: This function needs to run hen the user deletes a message
//You will need: messageid
//This should call the backend path "/deletemessage"
function DeleteMessage(m_messageid){

}

//TODO: This function needs to run hen the user displays a single users message history
//You will need: fromid, toid
//This should call the backend path "/getusermessages"
function GetUserMessages(m_fromid, m_toid){

}

//TODO: This function needs to run hen the user logs in
//You will need: userid (fromid)
//This should call the backend path "/getallmessages"
function GetAllMessages(m_fromid){
    
}