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
    console.debug(`Route Called: /create (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from create contact")
        
        await CreateContact(req.body, async(response) => {
            res.status(201).send()
        });
    } 
    catch (err) {
        console.error(`Error: Failed to create contact ${err}\n`)
        res.status(422).send(err)
    }
})

contact.get('/read', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /read (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from read contacts")
        
        await ReadContacts(req.body, async(response) => {
            res.status(201).send()
        });
    } 
    catch (err) {
        console.error(`Error: Failed to read contacts ${err}\n`)
        res.status(422).send(err)
    }
})

contact.patch('/update', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /update (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from update contact")
        
        await UpdateContact(req.body, async(response) => {
            res.status(201).send()
        });
    } 
    catch (err) {
        console.error(`Error: Failed to update contact ${err}\n`)
        res.status(422).send(err)
    }
})

contact.delete('/delete', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /delete (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from delete contact")
        
        await DeleteContact(req.body, async(response) => {
            res.status(201).send()
        });
    } 
    catch (err) {
        console.error(`Error: Failed to delete contact ${err}\n`)
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

async function CreateContact(request, callback) {
    console.debug(`Function Called: CreateContact(${JSON.stringify(request)})\n`)

    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('userid', sql.VarChar(255), request.userid)
        req.input('contactid', sql.VarChar(255), request.contactid)
        req.input('displayname', sql.VarChar(255), request.displayname)
        req.execute('spContact_CreateContact').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

async function ReadContacts(request, callback) {
    console.debug(`Function Called: ReadContacts(${JSON.stringify(request)})\n`)

    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('userid', sql.VarChar(255), request.userid)
        req.execute('spContact_ReadContacts').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

async function UpdateContact(request, callback) {
    console.debug(`Function Called: UpdateContact(${JSON.stringify(request)})\n`)

    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('userid', sql.VarChar(255), request.userid)
        req.input('contactid', sql.VarChar(255), request.contactid)
        req.input('displayname', sql.VarChar(255), request.displayname)
        req.execute('spContact_UpdateContact').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

async function DeleteContact(request, callback) {
    console.debug(`Function Called: DeleteContact(${JSON.stringify(request)})\n`)

    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('userid', sql.VarChar(255), request.userid)
        req.input('contactid', sql.VarChar(255), request.contactid)
        req.execute('spContact_DeleteContact').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

module.exports = contact