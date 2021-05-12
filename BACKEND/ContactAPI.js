var express = require('express')
const app = express()
const sql = require('mssql')
require('dotenv').config()
app.use(express.json())

const config = {
    server: process.env.CONTACT_DB_SERVER,
    user: process.env.CONTACT_DB_USER,
    password: process.env.CONTACT_DB_PASSWORD,
    database: process.env.CONTACT_DB_DATABASE,
    port: parseInt(process.env.CONTACT_DB_PORT, 10),
    options: {
        enableArithAbort: true
    }
}

async function CreateContact(request, callback) {
    console.debug("Fucntion Called: ReadUser()")
    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('userid', sql.VarChar(255), request.userid)
        req.execute('spAccount_ReadUser').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

async function ReadContacts(request, callback) {
    console.debug("Fucntion Called: ReadUser()")
    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('userid', sql.VarChar(255), request.userid)
        req.execute('spAccount_ReadUser').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

async function UpdateContact(request, callback) {
    console.debug("Function Called: UpdateContacts()")
    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('userid', sql.VarChar(255), request.userid)
        req.input('contacts', sql.VarChar(255), request.contacts)
        req.execute('spAccount_UpdateContacts').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

async function DeleteContact(request, callback) {
    console.debug("Function Called: UpdateContacts()")
    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('userid', sql.VarChar(255), request.userid)
        req.input('contacts', sql.VarChar(255), request.contacts)
        req.execute('spAccount_UpdateContacts').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

module.exports = {
    CreateContact,
    ReadContacts,
    UpdateContact,
    DeleteContact
}