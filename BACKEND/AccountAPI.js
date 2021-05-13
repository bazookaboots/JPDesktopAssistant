var express = require('express')
const account = express.Router()
const sql = require('mssql')
const bcrypt = require('bcrypt')
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
        await Register(req.body, async(response) => {
            console.debug(`/register callback: (${JSON.stringify(response)})\n`)
            res.status(201).send(response)
        });
    } 
    catch (err) {
        console.error(`Error: Failed to register user: (${err})\n`)
        res.status(422).send(err)
    }
})

account.get('/login', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /login (${JSON.stringify(req.body)})\n`)
    try {
        await Login(req.body, async(response) => {
            console.debug(`/login callback: (${JSON.stringify(response)})\n`)
            res.status(201).send(response)
        });
    } 
    catch (err) {
        console.error(`Error: Failed to log in: (${err})\n`)
        res.status(422).send(err)
    }
})

account.patch('/update', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /update (${JSON.stringify(req.body)})\n`)
    try {
        await UpdateAccount(req.body, async(response) => {
            console.debug(`/update callback: (${JSON.stringify(response)})\n`)
            res.status(201).send(response)
        });
    } 
    catch (err) {
        console.error(`Error: Failed to update settings: (${err})\n`)
        res.status(422).send(err)
    }
})

account.delete('/delete', /*authenticateToken,*/ async(req, res) => {
    console.debug(`Route Called: /delete (${JSON.stringify(req.body)})\n`)
    try {
        await DeleteAccount(req.body, async(response) => {
            console.debug(`/delete callback: (${JSON.stringify(response)})\n`)
            res.status(201).send(response)
        });
    } 
    catch (err) {
        console.error(`Error: Failed to delete account: (${err})\n`)
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

async function Register(request, callback) {
    console.debug(`Function Called: Register(${JSON.stringify(request)})\n`)

    await CheckEmail(request, async(foundUser) => {
        console.debug(`FIND RETURNED: (${foundUser})\n`)
        if (foundUser === undefined) {
            console.debug("IN HERE!!!!!!\n")
            const passhash = "temp" /*await bcrypt.hash(request.password, 10);*/

            var conn = new sql.connect(config).then(function(conn) {
                var req = new sql.Request(conn)
                req.input('userid', sql.VarChar(255), request.userid)
                req.input('email', sql.VarChar(255), request.email)
                req.input('username', sql.VarChar(255), request.username)
                req.input('passhash', sql.VarChar(255), passhash)
                req.execute('spAccount_Register').then(function(recordsets, err) {
                    callback(recordsets)
                }).catch(function(err) {
                    console.error(`Error: Register SQL operation failed: (${err})\n`)
                })
            })
        } else {
            console.error(`Error: User already exists.\n`)
        }
    })
}

async function CheckEmail(request, callback) {
    console.debug(`Function Called: CheckEmail(${JSON.stringify(request)})\n`)

    var conn = new sql.connect(config).then((conn) => {
        var request = new sql.Request(conn);
        request.input('email', sql.VarChar(255), request.email);
        request.execute('spAccount_CheckEmail').then((recordsets, err) => {
            console.debug(`RECORDSET: (${recordsets/recordset})`)
            if (typeof recordsets.recordset !== undefined) callback(recordsets.recordset[0]);
            else callback(undefined)
        }).catch(function(err) {
            console.error(`Error: Email already exists.\n`)
        });
    })
}

async function Login(request, callback) {
    console.debug(`Function Called: Login(${JSON.stringify(request)})\n`)

    await CheckEmail(request.body, async(foundUser) => {
        if (foundUser !== undefined) {
            const passhash = "temp" /*await bcrypt.hash(request.password, 10);*/
            //TODO: Password check
            var conn = new sql.connect(config).then(function(conn) {
                var req = new sql.Request(conn)
                req.input('userid', sql.VarChar(255), request.userid)
                req.input('email', sql.VarChar(255), request.email)
                req.input('username', sql.VarChar(255), request.username)
                req.input('passhash', sql.VarChar(255), passhash)
                req.execute('spAccount_Register').then(function(recordsets, err) {
                    callback(recordsets)
                }).catch(function(err) {
                    console.error(`Error: Register SQL operation failed: (${err})\n`)
                })
            })
        } else {
            console.error(`Error: Email does not exist.\n`)
        }
    })
}

async function UpdateAccount(request, callback) {
    console.debug(`Function Called: UpdateAccount(${JSON.stringify(request)})\n`)

    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('userid', sql.VarChar(255), request.userid)
        req.input('key', sql.VarChar(255), request.key)
        req.input('value', sql.VarChar(255), request.value)
        req.execute('spAccount_UpdateAccount').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: UpdateAccount SQL operation failed: (${err})\n`)
        })
    })
}

async function DeleteAccount(request, callback) {
    console.debug(`Function Called: DeleteAccount(${JSON.stringify(request)})\n`)

    var conn = new sql.connect(config).then((conn) => {
        var req = new sql.Request(conn)
        req.input('userid', sql.VarChar(255), request.userid)
        req.execute('spAccount_DeleteAccount').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: DeleteAccount SQL operation failed: (${err})\n`)
        })
    })
}

module.exports = account