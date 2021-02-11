//Includes
const { response, request } = require('express')
const express = require('express')
const app = express()
const sql = require('mysql')
const bcrypt = require('bcrypt')

//Lets express know we are using json objects and how to parse them
app.use(express.json())

//Connection config
const config = {
    user: 'morgananderson2',
    password: 'morgananderson2',
    server: 'aura.cset.oit.edu',
    database: 'morgananderson2',
    port: 5433
}

async function CreateUser(request) {
    try{
        let connection = await sql.createConnection(config)
        let result = await connection.request()
            .input('username', sql.VarChar(64), request.username)
            .input('email', sql.VarChar(64), request.email)
            .input('password', sql.VarChar(64), hashedPassword)
            .query("INSERT INTO morgananderson2.users"
                + "VALUES ( @username, @email, @password)")
            .then(response => {

            })
    } catch (err) {
        console.log(err);
    }
}

async function ReadUser(passedinfo) {
    try {
        let connection = await sql.createConnection(config)
        let result = await connection.request()
            .input('email', sql.VarChar(64), passedinfo.email)
            .query("SELECT * FROM morgananderson2.users"
                + "WHERE email = @email")
            .then(response => {
                //TODO Return a JSON settings string
            })
    } catch (err) {
        console.log(err);
    }
}

async function UpdateUser(passedinfo) {
    try {
        //Build update list
        passedinfo.settings.forEach(element => {
            stringvar += passedinfo.settings[i].key + " =" + passedinfo.settings[i].value + " "
        });

        let connection = await sql.createConnection(config)
        let result = await connection.request()
            .input('email', sql.VarChar(64), passedinfo.email)
            .query("UPDATE morgananderson2.users"
                + "SET " + stringvar
                + "WHERE email = @email")
            .then(response => {

            })
    } catch (err) {
        console.log(err);
    }
}

async function DeleteUser(passedinfo) {
    try {
        let connection = await sql.createConnection(config)
        let result = await connection.request()
            .input('email', sql.VarChar(64), passedinfo.email)
            .query("DELETE FROM morgananderson2.users"
                + "WHERE email = @email")
            .then(response => {

            })
    } catch (err) {
        console.log(err);
    }
}

async function CheckUser(passedinfo)
{
    try {
        let connection = await sql.createConnection(config)
        let result = await connection.request()
            .input('email', sql.VarChar(64), passedinfo.email)
            .query("SELECT * FROM morgananderson2.users"
                + "WHERE email = @email")
            .then(response => {
                //TODO if null, return 0, if not, return 1
            })
    } catch (err) {
        console.log(err);
    }
}

async function CheckPassword(passedinfo)
{
    try {
        let connection = await sql.createConnection(config)
        let result = await connection.request()
            .input('email', sql.VarChar(64), passedinfo.email)
            .input('password', sql.VarChar(64), passedinfo.password)
            .query("SELECT * FROM morgananderson2.users"
                + "WHERE email = @email"
                + "AND password = @password")
            .then(response => {
                //TODO if null, return 0, if not, return 1
            })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {CreateUser, ReadUser, UpdateUser, DeleteUser, CheckUser, CheckPassword}