require('dotenv').config();
const sql = require('mssql')
const jwt = require('jsonwebtoken')

//Connection config
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
async function CreateUser(user, callback) {
    console.log("Fucntion Called> CreateUser(user)")
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn);
        request.input('id', sql.VarChar(255), user.id);
        request.input('email', sql.VarChar(255), user.email);
        request.input('username', sql.VarChar(255), user.username);
        request.input('passhash', sql.VarChar(255), user.passhash);
        request.execute('spPerson_CreateUser').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.log(err);
        });
    });

}

//TODO clean up function and add comments
async function FindUserByEmail(email, callback) {
    try {
        console.log("Fucntion Called> FindUserByEmail( " + email + " )")
        var conn = new sql.connect(config).then((conn) => {
            var request = new sql.Request(conn);
            request.input('email', sql.VarChar(255), email);
            request.execute('spPerson_FindUserByEmail').then((recordsets, err) => {
                if (typeof recordsets.recordset !== undefined) callback(recordsets.recordset[0]);
                else callback(undefined)
            }).catch(function(err) {
                console.dir("ERROR CAUGHT IN FindUserByEmail( " + email + " ): " + err);
            });
        })

    } catch (error) {
        console.log(error)
    }
}

//TODO clean up function and add comments
async function DeleteUser(id, callback) {
    try {
        console.log("Fucntion Called> DeleteUser( " + id + ")")
        var conn = new sql.connect(config).then((conn) => {
            var request = new sql.Request(conn);
            request.input('id', sql.VarChar(255), id);
            request.execute('spPerson_DeleteUser').then((recordsets, err) => {}).catch(function(err) {
                console.dir("ERROR CAUGHT IN DeleteUser( " + id + ", " + callback + "): " + err);
            });
        })

    } catch (error) {
        console.log(error)
    }
}

async function UpdateUser(user, callback) {
    console.log("Fucntion Called> UpdateUser( " + user + " )")
    var conn = new sql.connect(config).then(function(conn) {
        var request = new sql.Request(conn);
        request.input('id', sql.VarChar(255), user.id);
        request.input('email', sql.VarChar(255), user.email);
        request.input('username', sql.VarChar(255), user.username);
        request.input('passhash', sql.VarChar(255), user.passhash);
        request.execute('spPerson_UpdateUser').then(function(recordsets, err) {
            callback(recordsets)
        }).catch(function(err) {
            console.log(err);
        });
    });
}

module.exports = { CreateUser, FindUserByEmail, DeleteUser, UpdateUser }