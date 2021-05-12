var express = require('express')
const app = express()
const sql = require('mssql')
require('dotenv').config()
app.use(express.json())

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

module.exports = {
    AddMessage,
    ReadMessages,
    DeleteMessage
}