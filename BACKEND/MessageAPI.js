const sql = require('mssql')
require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())

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


const config = {
    server: process.env.MESSAGE_DB_SERVER,
    user: process.env.MESSAGE_DB_USER,
    password: process.env.MESSAGE_DB_PASSWORD,
    database: process.env.MESSAGE_DB_DATABASE,
    port: parseInt(process.env.MESSAGE_DB_PORT, 10),
    options: {
        enableArithAbort: true
    }
}

async function AddMessage(request, callback) {
    console.debug("Fucntion Called: AddMessage()")
    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('message', sql.VarChar(255), request.message)
        req.input('messageid', sql.VarChar(255), request.messageid)
        req.input('fromid', sql.VarChar(255), request.fromid)
        req.input('toid', sql.VarChar(255), request.toid)
        req.execute('spMessage_AddMessage').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

async function ReadMessages(request, callback) {
    console.debug("Fucntion Called: ReadMessages()")
    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('fromid', sql.VarChar(255), request.fromid)
        req.input('toid', sql.VarChar(255), request.toid)
        req.execute('spMessage_ReadMessages').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

async function DeleteMessage(request, callback) {
    console.debug("Fucntion Called: DeleteMessage()")
    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('messageid', sql.VarChar(255), request.messageid)
        req.execute('spMessage_DeleteMessage').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}