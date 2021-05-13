var express = require('express')
const message = express.Router()
const sql = require('mssql')
const {Server} = require("socket.io")
require('dotenv').config()
message.use(express.json())

let server = new Server(8000)

let sequenceNumberByClient = new Map()

message.use(function middle (req, res, next) {
    console.debug(`Reached message route.\n`)
    next()
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

             function callback(recordsets){
             }
 
             CreateMessage(message, callback)
         }
         catch (err) {
             console.error(`Error: Failed to send message: (${err})\n`)
         }
     })
 })
 
 message.get('/read', /*authenticateToken,*/ async(req, res) => {
     console.debug(`Route Called: /read (${JSON.stringify(req.body)})\n`)

     try {
         await ReadMessages(req.body, async(response) => {
            console.debug(`/read callback: (${JSON.stringify(response)})\n`)
            res.status(201).send(response)
        });
     } 
     catch (err) {
         console.error(`Error: Failed to read messages: (${err})\n`)
         res.status(422).send(err)
     }
 })
 
 message.delete('/delete', /*authenticateToken,*/ async(req, res) => {
     console.debug(`Route Called: /delete (${JSON.stringify(req.body)})\n`)
     try {
         res.status(201).send("This is a test from delete message")
        
         await DeleteMessage(req.body, async(response) => {
            console.debug(`/delete callback: (${JSON.stringify(response)})\n`)
            res.status(201).send(response)
        });
     } 
     catch (err) {
         console.error(`Error: Failed to delete message: (${err})\n`)
         res.status(422).send(err)
     }
 })

 

const config = {
    server: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        enableArithAbort: true
    }
}

async function CreateMessage(request, callback) {
    console.debug(`Function Called: CreateMessage(${JSON.stringify(request)})\n`)

    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('messageid', sql.VarChar(255), request.messageid)
        req.input('message', sql.VarChar(255), request.message)
        req.input('fromid', sql.VarChar(255), request.fromid)
        req.input('toid', sql.VarChar(255), request.toid)
        req.execute('spMessage_CreateMessage').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: CreateMessage SQL operation failed: (${err})\n`)
        })
    })
}

async function ReadMessages(request, callback) {
    console.debug(`Function Called: ReadMessages(${JSON.stringify(request)})\n`)

    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('userid', sql.VarChar(255), request.userid)
        req.execute('spMessage_ReadMessages').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: ReadMessages SQL operation failed: (${err})\n`)
        })
    })
}

async function DeleteMessage(request, callback) {
    console.debug(`Function Called: DeleteMessage(${JSON.stringify(request)})\n`)

    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('messageid', sql.VarChar(255), request.messageid)
        req.input('userid', sql.VarChar(255), request.userid)
        req.execute('spMessage_DeleteMessage').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: DeleteMessage SQL operation failed: (${err})\n`)
        })
    })
}

module.exports = message