var express = require('express')
const app = express.Router()
const sql = require('mssql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
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

app.post('/register', async (req, res) => {
    console.debug(`Route Called: /register (${JSON.stringify(req.body)})\n`)

    try {
        res.send("This is a test from register")
        
    } 
    catch (err) {
        console.error(`Error: Failed to register user ${err}\n`)
    }
})

app.get('/login', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /login (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from login ")
    } 
    catch (err) {
        console.error(`Error: Failed to log in: ${err}\n`)
    }
})

app.delete('/delete', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /delete (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from delete")
    } 
    catch (err) {
        console.error(`Error: Failed to delete account ${err}\n`)
    }
})

app.patch('/update-settings', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /update-settings (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from update settings")
    } 
    catch (err) {
        console.error(`Error: Failed to update settings ${err}\n`)
    }
})


const config = {
    server: process.env.ACCOUNT_DB_SERVER,
    user: process.env.ACCOUNT_DB_USER,
    password: process.env.ACCOUNT_DB_PASSWORD,
    database: process.env.ACCOUNT_DB_DATABASE,
    port: parseInt(process.env.ACCOUNT_DB_PORT, 10),
    options: {
        enableArithAbort: true
    }
}

async function Register(request, callback) {
    console.debug("Function Called: Register()")
    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('userid', sql.VarChar(255), request.userid)
        req.input('email', sql.VarChar(255), request.email)
        req.input('username', sql.VarChar(255), request.username)
        req.input('passhash', sql.VarChar(255), request.pa+sshash)
        req.execute('spAccount_CreateUser').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

async function Login(request, callback) {
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

async function Delete(request) {
    try {
        console.debug("Function Called: DeleteUser()")
        var conn = new sql.connect(config).then((conn) => {
            var req = new sql.Request(conn)
            req.input('userid', sql.VarChar(255), request.userid)
            req.execute('spAccount_DeleteUser').then((recordsets, err) => {
            }).catch(function(err) {
                console.error(`Error: SQL operation failed: ${err}`)
            })
        })
    } 
    catch (err) {
        console.error(`Error: Failed to delete user: ${err}`)
    }
}

async function UpdateSettings(request, callback) {
    console.debug("Function Called: UpdateSettings()")
    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('userid', sql.VarChar(255), request.userid)
        req.input('settings', sql.VarChar(255), request.settings)
        req.execute('spAccount_UpdateSettings').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}