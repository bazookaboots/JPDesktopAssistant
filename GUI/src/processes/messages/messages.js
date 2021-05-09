const { ipcRenderer } = require('electron')
const { ConversationsManager } = require("../../libraries/ConversationsUtil")


//INITIALIZATION
var conversations = new ConversationsManager()

let contacts = conversations.getContacts()
var contactsContainer = document.getElementById("contactsContainer")


//RENDERING
//this sets the scroll bar to the bottm so the user can see the most recent messages 
contacts.forEach(contact => {
    createContact(contact)
});
loadChatArea("Friendly Sven#4527")


//REGISTER EVENTS
//this event is the close button event
document.getElementById("close-btn").addEventListener("click", (e) => {
    console.log("close-btn function called")
    ipcRenderer.send('close-messagesWin')
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

function createChat(message, chatArea) {
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

function loadChatArea(contact)
{

    let chatContainer = document.createElement("section")
    chatContainer.id = "chatInner"
    chatContainer.classList.add("chat-inner")
    chatContainer.scrollTop = chatContainer.scrollHeight

    let header = document.createElement("div")
    header.innerText = "Beginning of chat messages"
    header.classList.add("chat-beginning")
    chatContainer.appendChild(header)

    let messages = conversations.getMessages(contact)
    messages.forEach(message => {
        createChat(message,chatContainer)
    });
    deleteChats()
    document.getElementById("contact-title").innerText = contact
    document.getElementById("vertContainer").appendChild(chatContainer)
    
}

function deleteChats()
{
    document.getElementById("chatInner").remove()
}

