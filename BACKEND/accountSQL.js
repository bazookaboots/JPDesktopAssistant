require('dotenv').config()
const sql = require('mssql')
const jwt = require('jsonwebtoken')

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
    console.debug("Function Called: CreateUser()")
    var conn = new sql.connect(config).then(function(conn) {
        var req = new sql.Request(conn)
        req.input('userid', sql.VarChar(255), request.userid)
        req.input('email', sql.VarChar(255), request.email)
        req.input('username', sql.VarChar(255), request.username)
        req.input('passhash', sql.VarChar(255), request.passhash)
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

async function DeleteUser(request) {
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

async function UpdateContacts(request, callback) {
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

module.exports = { CreateUser, ReadUser, UpdateSettings, UpdateContacts, DeleteUser }
