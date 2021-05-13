const { ipcRenderer } = require('electron')
const { ConversationsManager } = require("../../libraries/ConversationsUtil")


//INITIALIZATION
var conversations = new ConversationsManager()

ipcRenderer.send("init-messages")
ipcRenderer.on("messages-init-response", (event, response) => {
    console.log("messages-init-response event called")
    if(response.loggedin){
        //Do loggedin stuff for messaging
        console.log(response.convos)
        conversations.loadConversations(response.convos)
        loadChatArea(conversations.recent)
    }
    else{
        //Throw Error
        console.error("ERROR: messaging screen opened while not logged in")
        ipcRenderer.send('close-messagesWin')
    }
})
let contacts = conversations.getContacts()
var contactsContainer = document.getElementById("contactsContainer")


//RENDERING
//this sets the scroll bar to the bottm so the user can see the most recent messages 
contacts.forEach(contact => {
    createContact(contact)
});


//REGISTER EVENTS
//this event is the close button event
document.getElementById("close-btn").addEventListener("click", (e) => {
    console.log("close-btn function called")
    ipcRenderer.send('close-messagesWin')
})

document.getElementById("send-btn").addEventListener("click", (e) => {
    let input = document.getElementById("message-input")
    if (conversations.sendMessage(input.value)) {
        let chatArea = document.getElementById("chatInner")
        renderNewMessage(input.value);
    }
})


//FUNCTIONS
function createContact(contact) {
    let collection = document.createElement("div")
    collection.classList.add("contact-collection")

    let image = document.createElement("div")
    image.classList.add("contact-image")

    let username = document.createElement("div")
    username.classList.add("contact-username")

    username.innerText = contact.username

    collection.appendChild(image)
    collection.appendChild(username)
    collection.addEventListener("click", (e) => {
        console.log("contact-collection function called")
        loadChatArea(contact.username)
    })

    contactsContainer.appendChild(collection)
}

function renderNewMessage(chatArea,message) {
    let collection = document.createElement("div")
    collection.classList.add("message-collection")
    let margin = document.createElement("div")
    margin.classList.add("message-margin")
    let block = document.createElement("div")
    block.classList.add("message-block")
    let image = document.createElement("div")
    image.classList.add("message-image")
    let username = document.createElement("div")
    username.classList.add("message-username")

    let timestamp = document.createElement("div")
    timestamp.classList.add("message-timestamp")

    let messageText = document.createElement("p")
    messageText.classList.add("message")

    let breakTag = document.createElement("br")

    messageText.innerText = message.text
    username.innerText = message.user
    timestamp.innerText = message.date + " | " + message.time

    margin.appendChild(image)
    block.appendChild(username)
    block.appendChild(timestamp)
    block.appendChild(breakTag)
    block.appendChild(messageText)

    collection.appendChild(margin)
    collection.appendChild(block)

    chatArea.appendChild(collection)
}

function loadChatArea(contact) {
    document.getElementById("chatInner").remove()

    var chatContainer = document.createElement("section")
    chatContainer.id = "chatInner"
    chatContainer.scrollTop = chatContainer.scrollHeight
    conversations.getMessages(contact).forEach(message => {
        renderNewMessage(chatContainer,message)
    });

    document.getElementById("contact-title").innerText = contact
    document.getElementById("chatContainer").appendChild(chatContainer)

}




