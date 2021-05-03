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