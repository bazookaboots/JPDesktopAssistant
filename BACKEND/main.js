/* Account Communication */ 

require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())

const {
    CreateUser,
    FindUserByEmail,
    DeleteUser,
    UpdateUser,
    FindUsername
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
    console.debug("Route Called: /register")
    try {
        await FindUserByEmail(req.body.email, async (foundUser) => {
            if (foundUser === undefined) {
                await CreateUser(request, async(response) => {
                    res.status(201).send()
                })
            } else {
                res.status(422).send()
            }
        })
    } 
    catch (err) {
        console.error(`Error: Failed to register user: ${err}`)
    }
})

app.get('/login', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /login")
    try {
        await FindUserByEmail(req.body.email, async function (foundUser) {
            if (foundUser !== undefined) {
                let submittedPass = req.body.password
                let storedPassHash = foundUser.passhash
                await bcrypt.compare(submittedPass, storedPassHash, function(err, passMatch) {
                    if (passMatch) {
                        let userSig = {
                            username: foundUser.username,
                            email: foundUser.email,
                            id: foundUser.id
                        }
                        let accessToken = jwt.sign(userSig, process.env.ACCESS_TOKEN_SECRET)
                        res.status(200).json({ token: accessToken })

                    } else {

                    }
                })
            } else {
                let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`
                await bcrypt.compare(req.body.password, fakePass)
                res.status(401).send("Error: Failed to log in.")
            }
        })
    } 
    catch (err) {
        console.error(`Error: Failed to log in: ${err}`)
        res.status(401).send("Error: Failed to log in.")
    }
})

app.patch('/read-userdata', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /read-userdata")
    try {

    } 
    catch (err) {
        console.error(`Error: Failed to read userdata: ${err}`)
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

app.patch('/update-contacts', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /update-contacts")
    try {

    } 
    catch (err) {
        console.error(`Error: Failed to update contacts: ${err}`)
    }
})

app.delete('/delete', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /delete")
    try {
        DeleteUser(req.user.id)
    } 
    catch (err) {
        console.error(`Error: Failed to delete account: ${err}`)
    }
})

/* Message Communication */ 

const {
    AddMessage,
    DeleteMessage,
    GetUserMessages,
    GetAllMessages
} = require('./messageSQL')

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

   socket.on("sendmessage", (request) => {
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
                sequenceNumberByClient.get(request.toid).emit("getmessage", message)
            }
        }
        catch (err) {
            console.error(`Error: Failed to send message: ${err}`)
        }
    })
})

app.delete('/delete-messages', /*authenticateToken,*/ async(req, res) => {
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