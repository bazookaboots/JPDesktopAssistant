require('dotenv').config();
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const { Register, Login, Delete, UpdateSettings } = require('./AccountAPI')
const { CreateContact, ReadContacts, UpdateContact, DeleteContact } = require('./ContactAPI')
const { AddMessage } = require('./MessageAPI')


app.listen(3010, '127.0.0.1')

const
    {Server} = require("socket.io"),
    server = new Server(8000)

let sequenceNumberByClient = new Map()




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
        //Register()
        
    } 
    catch (err) {
        console.error(`Error: Failed to register user ${err}\n`)
    }
})

app.get('/login', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /login (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from login ")
        //Login()
    } 
    catch (err) {
        console.error(`Error: Failed to log in: ${err}\n`)
    }
})

app.delete('/delete', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /delete (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from delete")
        ///Delete()
    } 
    catch (err) {
        console.error(`Error: Failed to delete account ${err}\n`)
    }
})

app.patch('/update-settings', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /update-settings (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from update settings")
        //UpdateSettings()
    } 
    catch (err) {
        console.error(`Error: Failed to update settings ${err}\n`)
    }
})




app.post('/create-contact', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /create-contact (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from create contact")
        //CreateContact()
    } 
    catch (err) {
        console.error(`Error: Failed to create contact ${err}\n`)
    }
})

app.get('/read-contacts', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /read-contacts (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from read contacts")
        //ReadContacts()
    } 
    catch (err) {
        console.error(`Error: Failed to read contacts ${err}\n`)
    }
})

app.patch('/update-contact', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /update-contact (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from update contact")
        //UpdateContact()
    } 
    catch (err) {
        console.error(`Error: Failed to update contact ${err}\n`)
    }
})

app.delete('/delete-contact', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /delete-contact (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from delete contact")
        //DeleteContact()
    } 
    catch (err) {
        console.error(`Error: Failed to delete contact ${err}\n`)
    }
})



server.on("connection", (socket) => {
   console.debug(`Client connected: (${socket.id}, ${socket.handshake.query.userid})\n`)

   sequenceNumberByClient.set(parseInt(socket.handshake.query.userid), socket)

   socket.on("disconnect", () => {
       console.debug(`Client disconnected: (${socket.id}, ${socket.handshake.query.userid})\n`)

       sequenceNumberByClient.delete(socket.handshake.query.userid)
   })

   socket.on("client-send-message", (request) => {
        console.debug(`Client sent message: (${request.messageid}, ${request.message}, ${request.toid},${request.fromid})\n`)
        try {
            const message = {
                messageid: request.messageid,
                message: request.message,
                toid: request.toid,
                fromid: request.fromid
            }

            if (sequenceNumberByClient.get(request.toid))
            {
                sequenceNumberByClient.get(request.toid).emit("client-get-message", message)
            }

            //AddMessage()
        }
        catch (err) {
            console.error(`Error: Failed to send message: ${err}`)
        }
    })
})

app.get('/read-messages', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /read-messages (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from read messages")
        //DeleteContact()
    } 
    catch (err) {
        console.error(`Error: Failed to read messages ${err}\n`)
    }
})

app.delete('/delete-message', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /delete-message (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from delete message")
        //DeleteContact()
    } 
    catch (err) {
        console.error(`Error: Failed to delete message ${err}\n`)
    }
})