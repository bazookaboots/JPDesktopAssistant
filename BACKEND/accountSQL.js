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
    console.log("Fucntion Called> CreateUser()")    //DEBUG
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn)
        request.input('id', sql.VarChar(255), requested.id)
        request.input('email', sql.VarChar(255), requested.email)
        request.input('username', sql.VarChar(255), requested.username)
        request.input('passhash', sql.VarChar(255), requested.passhash)
        request.execute('spPerson_CreateUser').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(err)
        })
    })
}

async function FindUserByEmail(requested, callback) {
    try {
        console.log("Fucntion Called> FindUserByEmail()")    //DEBUG
        var conn = new sql.connect(config).then((conn) => {
            var request = new sql.Request(conn)
            request.input('email', sql.VarChar(255), requested.email)
            request.execute('spPerson_FindUserByEmail').then((recordsets, err) => {
                if (typeof recordsets.recordset !== undefined) callback(recordsets.recordset[0])
                else callback(undefined)
            }).catch(function(err) {
                console.error(err)
            })
        })
    } 
    catch (err) {
        console.error(err)
    }
}

async function DeleteUser(requested, callback) {
    try {
        console.log("Fucntion Called> DeleteUser()") //DEBUG
        var conn = new sql.connect(config).then((conn) => {
            var request = new sql.Request(conn)
            request.input('id', sql.VarChar(255), requested.id)
            request.execute('spPerson_DeleteUser').then((recordsets, err) => {}).catch(function(err) {
                console.error(err)
            })
        })
    } 
    catch (err) {
        console.error(err)
    }
}

async function UpdateUser(requested, callback) {
    console.log("Fucntion Called> UpdateUser()")  //DEBUG
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn)
        request.input('id', sql.VarChar(255), requested.id)
        request.input('email', sql.VarChar(255), requested.email)
        request.input('username', sql.VarChar(255), requested.username)
        request.input('passhash', sql.VarChar(255), requested.passhash)
        request.execute('spPerson_UpdateUser').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(err)
        })
    })
}

async function FindUsername(requested, callback) {
    try {
        console.log("Fucntion Called> FindUsername()")  //DEBUG
        var conn = new sql.connect(config).then((conn) => {
            var request = new sql.Request(conn)
            request.input('userid', sql.VarChar(255), requested.userid)
            request.execute('spPerson_FindUsername').then((recordsets, err) => {
                if (typeof recordsets.recordset !== undefined) callback(recordsets.recordset[0])
                else callback(undefined)
            }).catch(function(err) {
                console.error(err)
            })
        })
    } 
    catch (err) {
        console.error(err)
    }
}

module.exports = { CreateUser, FindUserByEmail, DeleteUser, UpdateUser, FindUsername }