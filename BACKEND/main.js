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
} = require('./accountSQL')

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
    console.debug(`Route Called: /register (${req})\n`)
    try {
        const request = {
            userid: req.body.userid,
            username: req.body.username,
            email: req.body.email,
            passhash: req.body.passhash,
            settings: req.body.settings,
            contacts: req.body.contacts
        }

        res.status(201).send("This is a test from register")

        //check for existing email
        //call register
        //return result
    } 
    catch (err) {
        console.error(`Error: Failed to register user: ${err}\n`)
    }
})

app.get('/login', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /login (${req})\n`)
    try {
        //Check if account exists
        //check if password is valid
        //call login
        res.status(201).send("This is a test from login ")
    } 
    catch (err) {
        console.error(`Error: Failed to log in: ${err}\n`)
    }
})

app.delete('/delete-user', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /delete (${req})\n`)
    try {
        //call deleteuser
        res.status(201).send("This is a test from delete")
    } 
    catch (err) {
        console.error(`Error: Failed to delete account: ${err}\n`)
    }
})

app.patch('/update-settings', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /update-settings")
    try {

    } 
    catch (err) {
        console.error(`Error: Failed to update settings: ${err}`)
    }
})

app.get('/read-contacts', /*authenticateToken,*/ async(req, res) => {
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

app.patch('/update-contacts', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /update-contacts")
    try {

    } 
    catch (err) {
        console.error(`Error: Failed to update contacts: ${err}`)
    }
})

/* Message Communication */ 

const {
    AddMessage,
    DeleteMessage,
    GetUserMessages,
    GetAllMessages
} = require('./messageSQL')
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

            AddMessage(message)

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