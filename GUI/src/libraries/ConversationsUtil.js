class ConversationsManager {
    constructor() {
        this.conversations = testData    
    }

    addMessage(contactId, timestamp, message)
    {

    }

    addContact(username)
    {

    }

    addConversation()
    {
        
    }

    getMessages(contactId)
    {
        console.log("ConversationsManager getMessages function called")
        let conversation = null
        let i = 0
        while(conversation === null || conversation.username !== contactId)
        {
            conversation = this.conversations[i]
            i++
        }

        return conversation.messages
    }

    getContacts()
    {
        console.log("ConversationsManager getContacts function called")
        let contacts = []
        this.conversations.forEach(conversation => {
            contacts.push({ username: conversation.username})
        });
        
        return contacts
    }
   
}






var testData =[
    {
        username:"Morgan Anderson#1473",
        messages: [
            {
                user: "Morgan Anderson#1473",
                time:"6:08 PM",
                date:"04/18/2021",
                text:"ok",
            },
            {
                user: "Bazookaboots#9013",
                time:"6:07 PM",
                date:"04/18/2021",
                text:"Morgan im gonna have to rain check on meeting tonight im completely out of it today",
            },
            {
                user: "Morgan Anderson#1473",
                time:"6:05 PM",
                date:"04/18/2021",
                text:"When do you want to meet tonight?",
            },
            {
                user: "Morgan Anderson#1473",
                time:"8:27 PM",
                date:"04/07/2021",
                text:"ok",
            },
            {
                user: "Bazookaboots#9013",
                time:"8:26 PM",
                date:"04/07/2021",
                text:"Hey give me one sec im finishing up marking dinner",
            }
        ]
    },
    {
        username:"Friendly Sven#4527",
        messages: [
            {
                
                user: "Bazookaboots#9013",
                time:"2:54 PM",
                date:"05/08/2021",
                text:"yeah I would not do that the print just gets too massive. put prints in the OS code to see what it hits and what it doesn't",
            },
            {
                user: "Friendly Sven#4527",
                time: "2:52 PM",
                date:"05/08/2021",
                text:"still stuck. what's odd is that the loop has a print to run  but it doesn't print it i.e.",
            },
            {
                user: "Bazookaboots#9013",
                time:"2:49 PM",
                date:"05/08/2021",
                text: "yeah try without",
            },
            {
                user: "Friendly Sven#4527",
                time:"2:49 PM",
                date:"05/08/2021",
                text: "lmao I assumed i should and my loop has been stuck",
            },
            {
                user: "Bazookaboots#9013",
                time:"2:49 PM",
                date:"05/08/2021",
                text: "thats the weird thing, I feel like I would need to but I didn't and it still works",
            }
        ]
    },
    {
        username:"baygoo#0151",
        messages: [
            {
                user: "Bazookaboots#9013",
                time: "3:43 PM",
                date: "02/08/2021",
                text:"im pretty sure its nicklmore but I can't remember awesome thanks!",
            },
            {
                user: "baygoo#0151",
                time: "3:43 PM",
                date: "02/08/2021",
                text:"Nicklmore#1390",
            },
            {
                user: "Bazookaboots#9013",
                time: "3:42 PM",
                date: "02/08/2021",
                text: "Hey do you know what nick springer's discord @ is?",
            },
            {
                user: "baygoo#0151",
                time:"1:42 PM",
                date: "12/27/2020",
                text: "Hey, I'm having some trouble getting the new GUI demo to listen to me when I click the mic button. Do I need to do anything differently to get it to work? I ran the speech engine on its own and it's working fine.",
            },
            {
                user: "baygoo#0151",
                time: "1:22 PM",
                date: "12/27/2020",
                text: "Right.",
            }
        ]
    }
]

module.exports = { ConversationsManager }