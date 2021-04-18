require('dotenv').config()
const sql = require('mssql')
const jwt = require('jsonwebtoken')

//TODO Create new automated databse functions
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

async function AddMessage(requested, callback) {
    console.log("Fucntion Called> AddMessage(request)") //DEBUG
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn)
        request.input('messageid', sql.VarChar(255), requested.messageid)
        request.input('message', sql.VarChar(255), requested.message)
        request.input('fromid', sql.VarChar(255), requested.fromid)
        request.input('toid', sql.VarChar(255), requested.toid)
        request.execute('spMessages_AddMessage').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.log(err)
        })
    })

}

//TODO clean up function and add comments
async function DeleteMessage(requested, callback) {
    console.log("Fucntion Called> DeleteMessage(request)")  //DEBUG
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn)
        request.input('messageid', sql.VarChar(255), requested.messageid)
        request.execute('spMessages_DeleteMessage').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.log(err)
        })
    })

}

async function GetUserMessages(requested, callback) {
    console.log("Fucntion Called> GetUserMessages(request)")    //DEBUG
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn)
        request.input('fromid', sql.VarChar(255), requested.fromid)
        request.input('toid', sql.VarChar(255), requested.toid)
        request.execute('spMessages_GetUserMessages').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.log(err)
        })
    })

}

async function GetAllMessages(requested, callback) {
    console.log("Fucntion Called> GetAllMessages(request)")    //DEBUG
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn)
        request.input('fromid', sql.VarChar(255), requested.fromid)
        request.execute('spMessages_GetAllMessages').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.log(err)
        })
    })

}

module.exports = { AddMessage, DeleteMessage, GetUserMessages, GetAllMessages }