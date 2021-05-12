var express = require('express')
const contact = express.Router()
const sql = require('mssql')
require('dotenv').config()
contact.use(express.json())

contact.use(function middle (req, res, next) {
    console.debug(`Reached contact route.\n`)
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

contact.post('/create', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /create-contact (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from create contact")
        //CreateContact()
    } 
    catch (err) {
        console.error(`Error: Failed to create contact ${err}\n`)
    }
})

contact.get('/read', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /read-contacts (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from read contacts")
        //ReadContacts()
    } 
    catch (err) {
        console.error(`Error: Failed to read contacts ${err}\n`)
    }
})

contact.patch('/update', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /update-contact (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from update contact")
        //UpdateContact()
    } 
    catch (err) {
        console.error(`Error: Failed to update contact ${err}\n`)
    }
})

contact.delete('/delete', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /delete-contact (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from delete contact")
        //DeleteContact()
    } 
    catch (err) {
        console.error(`Error: Failed to delete contact ${err}\n`)
    }
})


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
        req.input('contactid', sql.VarChar(255), request.userid)
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

module.exports = contact