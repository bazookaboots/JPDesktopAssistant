require('dotenv').config()
const sql = require('mssql')
const jwt = require('jsonwebtoken')

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

async function CreateUser(requested, callback) {
    console.debug("Function Called: CreateUser()")
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn)
        request.input('id', sql.VarChar(255), requested.id)
        request.input('email', sql.VarChar(255), requested.email)
        request.input('username', sql.VarChar(255), requested.username)
        request.input('passhash', sql.VarChar(255), requested.passhash)
        request.execute('spPerson_CreateUser').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

async function FindUserByEmail(requested, callback) {
    try {
        console.debug("Function Called: FindUserByEmail()")
        var conn = new sql.connect(config).then((conn) => {
            var request = new sql.Request(conn)
            request.input('email', sql.VarChar(255), requested.email)
            request.execute('spPerson_FindUserByEmail').then((recordsets, err) => {
                if (typeof recordsets.recordset !== undefined) callback(recordsets.recordset[0])
                else callback(undefined)
            }).catch(function(err) {
                console.error(`Error: SQL operation failed: ${err}`)
            })
        })
    } 
    catch (err) {
        console.error(`Error: Failed to find user by email: ${err}`)
    }
}

async function DeleteUser(requested, callback) {
    try {
        console.debug("Function Called: DeleteUser()")
        var conn = new sql.connect(config).then((conn) => {
            var request = new sql.Request(conn)
            request.input('id', sql.VarChar(255), requested.id)
            request.execute('spPerson_DeleteUser').then((recordsets, err) => {
            }).catch(function(err) {
                console.error(`Error: SQL operation failed: ${err}`)
            })
        })
    } 
    catch (err) {
        console.error(`Error: Failed to delete user: ${err}`)
    }
}

async function UpdateUser(requested, callback) {
    console.debug("Function Called: UpdateUser()")
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn)
        request.input('id', sql.VarChar(255), requested.id)
        request.input('email', sql.VarChar(255), requested.email)
        request.input('username', sql.VarChar(255), requested.username)
        request.input('passhash', sql.VarChar(255), requested.passhash)
        request.execute('spPerson_UpdateUser').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

async function FindUsername(requested, callback) {
    try {
        console.debug("Function Called: FindUsername()")
        var conn = new sql.connect(config).then((conn) => {
            var request = new sql.Request(conn)
            request.input('userid', sql.VarChar(255), requested.userid)
            request.execute('spPerson_FindUsername').then((recordsets, err) => {
                if (typeof recordsets.recordset !== undefined) callback(recordsets.recordset[0])
                else callback(undefined)
            }).catch(function(err) {
                console.error(`Error: SQL operation failed: ${err}`)
            })
        })
    } 
    catch (err) {
        console.error(`Error: Failed to find username: ${err}`)
    }
}

module.exports = { CreateUser, FindUserByEmail, DeleteUser, UpdateUser, FindUsername }

require('dotenv').config()
const sql = require('mssql')
const jwt = require('jsonwebtoken')

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

async function UpdateSettings(requested, callback) {
    console.debug("Fucntion Called: UpdateSettings()")
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn)
        request.input('userid', sql.VarChar(255), requested.userid)
        request.input('settingstring', sql.VarChar(255), requested.settingstring)
        request.execute('spSettings_UpdateSettings').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

async function GetSettings(requested, callback) {
    console.debug("Fucntion Called: GetSettings()")
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn)
        request.input('userid', sql.VarChar(255), requested.userid)
        request.execute('spSettings_GetSettings').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

module.exports = { UpdateSettings, GetSettings }

require('dotenv').config()
const sql = require('mssql')
const jwt = require('jsonwebtoken')

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

async function UpdateContacts(requested, callback) {
    console.debug("Function Called: UpdateContacts()")
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn)
        request.input('userid', sql.VarChar(255), requested.userid)
        request.input('contactstring', sql.VarChar(255), requested.contactstring)
        request.execute('spContacts_UpdateContacts').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

async function GetContacts(requested, callback) {
    console.debug("Function Called: GetContacts()")
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn)
        request.input('userid', sql.VarChar(255), requested.userid)
        request.execute('spContacts_GetContacts').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(`Error: SQL operation failed: ${err}`)
        })
    })
}

module.exports = { UpdateContacts, GetContacts }