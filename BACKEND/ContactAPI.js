const sql = require('mssql')
require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())

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