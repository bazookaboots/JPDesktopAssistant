require('dotenv').config();
const sql = require('mssql')
const jwt = require('jsonwebtoken')

//TODO Check settings for new database
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

//TODO clean up function and add comments
async function AddMessage(request, callback) {
    console.log("Fucntion Called> AddMessage(request)")
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn);
        request.input('fromid', sql.VarChar(255), request.fromid);
        request.input('toid', sql.VarChar(255), request.toid);
        request.input('message', sql.VarChar(255), request.message);
        request.input('messageid', sql.VarChar(255), messageid);    //TODO add messageid routine (last message id + 1)
        //TODO fix this to add message to database
        request.execute('spPerson_CreateUser').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.log(err);
        });
    });

}

//TODO clean up function and add comments
async function DeleteMessage(request, callback) {
    console.log("Fucntion Called> DeleteMessage(request)")
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn);
        request.input('fromid', sql.VarChar(255), request.fromid);
        request.input('toid', sql.VarChar(255), request.toid);
        request.input('messageid', sql.VarChar(255), request.messageid);
        //TODO fix this to delete message from database
        request.execute('spPerson_CreateUser').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.log(err);
        });
    });

}

//TODO clean up function and add comments
async function GetMessages(request, callback) {
    console.log("Fucntion Called> GetMessages(request)")
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn);
        request.input('fromid', sql.VarChar(255), request.fromid);
        request.input('toid', sql.VarChar(255), request.toid);
        //TODO fix this to get messages from database
        request.execute('spPerson_CreateUser').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.log(err);
        });
    });

}

module.exports = { AddMessage, DeleteMessage, GetMessages }