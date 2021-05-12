var express = require('express')
const account = express.Router()
const sql = require('mssql')
require('dotenv').config()
account.use(express.json())

account.use(function middle (req, res, next) {
    console.debug(`Reached account route.\n`)
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

account.post('/register', async (req, res) => {
    console.debug(`Route Called: /register (${JSON.stringify(req.body)})\n`)

    try {
        res.send("This is a test from register")
        //Register()
        
    } 
    catch (err) {
        console.error(`Error: Failed to register user ${err}\n`)
    }
})

account.get('/login', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /login (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from login ")
        //Login()
    } 
    catch (err) {
        console.error(`Error: Failed to log in: ${err}\n`)
    }
})

account.patch('/update', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /update-settings (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from update settings")
        //UpdateSettings()
    } 
    catch (err) {
        console.error(`Error: Failed to update settings ${err}\n`)
    }
})

account.delete('/delete', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /delete (${JSON.stringify(req.body)})\n`)
    try {
        res.status(201).send("This is a test from delete")
        ///Delete()
    } 
    catch (err) {
        console.error(`Error: Failed to delete account ${err}\n`)
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
    console.debug(`Function Called: Register(${JSON.stringify(request)})\n`)
    //if email exists, return error code
    //hash password
    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('userid', sql.VarChar(255), request.userid)
        req.input('email', sql.VarChar(255), request.email)
        req.input('username', sql.VarChar(255), request.username)
        req.input('passhash', sql.VarChar(255), passhash)
        req.execute('spAccount_CreateUser').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

async function Login(request, callback) {
    console.debug(`Function Called: Login(${JSON.stringify(request)})\n`)
    //check for email, if does not exist, return error code
    //hash password and compare to database, if fails, return error code
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
        console.debug(`Function Called: Delete(${JSON.stringify(request)})\n`)
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
    console.debug(`Function Called: UpdateSettings(${JSON.stringify(request)})\n`)
    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('userid', sql.VarChar(255), request.userid)
        req.input('key', sql.VarChar(255), request.key)
        req.input('value', sql.VarChar(255), request.value)
        req.execute('spAccount_UpdateSettings').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

module.exports = account