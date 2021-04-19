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
    console.log("Fucntion Called> UpdateSettings(request)") //DEBUG
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn)
        request.input('userid', sql.VarChar(255), requested.userid)
        request.input('settingstring', sql.VarChar(255), requested.settingstring)
        request.execute('spSettings_UpdateSettings').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(err)
        })
    })
}

async function GetSettings(requested, callback) {
    console.log("Fucntion Called> GetSettings(request)") //DEBUG
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn)
        request.input('userid', sql.VarChar(255), requested.userid)
        request.execute('spSettings_GetSettings').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.error(err)
        })
    })
}

module.exports = { UpdateSettings, GetSettings }