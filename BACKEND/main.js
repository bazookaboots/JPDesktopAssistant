/* Account Communication */ 

require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())

const {
    Register,
    Login,
    DeleteUser,
    UpdateSettings,
    ReadContacts,
    UpdateContacts
} = require('./AccountAPI')

app.listen(3010, '127.0.0.1')

function authenticateToken(request, response, next) {
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null){
        return response.status(401).send("Error: Failed to AuthenticateToken.")
    } 

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err){
            return response.status(401).send("Error: Failed to AuthenticateToken.")
        } 

        request.user = user

        next()
    })
}
app.post('/register', async (req, res) => {
    console.debug(`Route Called: /register (${JSON.stringify(req.body)})\n`)

    try {
        res.send("This is a test from register")
    } 
    catch (err) {
        console.error(`Error: Failed to register user ${err}\n`)
    }
})

app.get('/login', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /login (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from login ")
    } 
    catch (err) {
        console.error(`Error: Failed to log in: ${err}\n`)
    }
})

app.delete('/delete', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /delete (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from delete")
    } 
    catch (err) {
        console.error(`Error: Failed to delete account ${err}\n`)
    }
})

app.patch('/update-settings', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /update-settings (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from update settings")
    } 
    catch (err) {
        console.error(`Error: Failed to update settings ${err}\n`)
    }
})

app.post('/create-contact', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /create-contact (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from create contact")
    } 
    catch (err) {
        console.error(`Error: Failed to create contact ${err}\n`)
    }
})

app.get('/read-contacts', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /read-contacts (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from read contacts")
    } 
    catch (err) {
        console.error(`Error: Failed to read contacts ${err}\n`)
    }
})

app.patch('/update-contact', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /update-contact (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from update contact")
    } 
    catch (err) {
        console.error(`Error: Failed to update contact ${err}\n`)
    }
})

app.delete('/delete-contact', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /delete-contact (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from delete contact")
    } 
    catch (err) {
        console.error(`Error: Failed to delete contact ${err}\n`)
    }
})

/* Message Communication */ 

const {
    AddMessage,
    DeleteMessage,
    GetUserMessages,
    GetAllMessages
} = require('./MessageAPI')
const { request } = require('express')

const
    {Server} = require("socket.io"),
    server = new Server(8000)

let sequenceNumberByClient = new Map()

server.on("connection", (socket) => {
   console.debug(`Client connected: [id=${socket.id}], [userid=${socket.handshake.query.userid}]`)
   sequenceNumberByClient.set(parseInt(socket.handshake.query.userid), socket)

   socket.on("disconnect", () => {
       sequenceNumberByClient.delete(socket.handshake.query.userid)
       console.debug(`Client disconnected: [id=${socket.id}], [userid=${socket.handshake.query.userid}]`)
   })

   socket.on("client-send-message", (request) => {
        console.debug(`Client sent message: [message=${request.message}], [toid=${request.toid}], [fromid=${request.fromid}]`)
        try {
            const message = {
                messageid: Date.now(),
                message: request.message,
                toid: request.toid,
                fromid: request.fromid
            }

            if (sequenceNumberByClient.get(request.toid))
            {
                sequenceNumberByClient.get(request.toid).emit("client-get-message", message)
            }
        }
        catch (err) {
            console.error(`Error: Failed to send message: ${err}`)
        }
    })
})

app.delete('/delete-message', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /deletemessage")
    try {
        const request = {
            messageid: req.body.messageid
        }

        await DeleteMessage(request, async(response) => {
            res.status(201).send()
        })

    } 
    catch (err) {
        console.error(`Error: Failed to delete message: ${err}`)
    }
})
    
app.get('/get-messages', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /getallmessages")
    try {
        const request = {
            fromid: req.body.fromid
        }
        await GetAllMessages(request, async(response) => {
            res.status(201).send()
        })
    } 
    catch (err) {
        console.error(`Error: Failed to get all messages: ${err}`)
    }
})