
function compareDate(a,b){
    let aDate = new Date(a.timeStamp)
    let bDate = new Date(b.timeStamp)
    return bDate - aDate;
}

class ConversationsManager {
    constructor() {
        this.conversations = []
        this.contacts = []
    }

    loadConversations(conversations) {
        conversations.forEach(contact => {
            this.contacts.push({
                username: contact.username,
                lastMessageDate: new Date(contact.lastMessageDate)
            })

            //let sortedmessages = contact.messages.sort(sortbyDate)

            this.conversations.push({
                username: contact.username,
                messages: contact.messages
            })
        });


    }
    sendMessage(text) {
        let dateTime = new Date()
        let message ={
            timeStamp: dateTime.getDate(),
            user: this.currentConversation,
            time: ""+ dateTime.getHours()+":" + dateTime.getMinutes(),
            date: "" + dateTime.getMonth() + dateTime.getDay + dateTime.getFullYear,
            text: text,
        }
        return true
    }

    addContact(username) {

    }

    addConversation() {

    }

    getMessages(contactId) {
        return this.conversations.find(obj => obj.username == contactId).messages
    }

    getContacts() {
        let contacts = []
        this.conversations.forEach(conversation => {
            contacts.push({ username: conversation.username })
        });

        return contacts
    }

}








module.exports = { ConversationsManager }