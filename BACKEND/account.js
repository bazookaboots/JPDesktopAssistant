//Includes
const { response, request } = require('express')
const express = require('express')
const app = express()
const mysql = require('mysql')
const bcrypt = require('bcrypt')

//Lets express know we are using json objects and how to parse them
app.use(express.json())

//Connection config
const config = {
    connectionLimit: 100,
    host: 'aura.cset.oit.edu',
    user: 'morgananderson2',
    password: 'morgananderson2',
    database: 'morgananderson2',
    debug: true,
    port: 5433
}

async function CreateUser(request) {
    try{
        let connection = await mysql.createConnection(config)
        let result = await connection.query("INSERT INTO morgananderson2.users"
            + "VALUES ( ?, ?, ?)", [request.username, request.email, request.password])
    } catch (err) {
        console.log(err);
    }
}

async function ReadUser(request) {
    try {
        let connection = await mysql.createConnection(config)
        let result = await connection.query("SELECT * FROM morgananderson2.users"
            + "WHERE email = ?", [request.email])
        //TODO Pull config and return
    } catch (err) {
        console.log(err);
    }
}

async function UpdateUser(request) {
    try {
        let connection = await mysql.createConnection(config)
        i = 0;
        await passedinfo.settings.forEach(element => {
            let result = connection.query("UPDATE morgananderson2.users"
            + "SET ? = ?"
            + "WHERE email = ?", [request.settings[i].key, request.settings[i].value, request.email])
            i++;
        });
    } catch (err) {
        console.log(err);
    }
}

async function DeleteUser(request) {
    try {
        let connection = await mysql.createConnection(config)
        let result = await connection.query("DELETE FROM morgananderson2.users"
            + "WHERE email = ?", [request.email])
    } catch (err) {
        console.log(err);
    }
}

async function CheckEmail(email)
{
    try {
        let pool = await mysql.createPool(config)
        let result = await pool.query("SELECT * FROM morgananderson2.users", (err, data) =>
        {
            if(err) {
                console.error(err);
                return;
            }

            console.log(data);
        })
        //TODO Return based on result.
    } catch (err) {
        console.log(err);
    }
}

async function CheckPassword(email, password)
{
    try {
        let connection = await mysql.createConnection(config)
        let result = await connection.query("SELECT * FROM morgananderson2.users"
            + "WHERE email = ?"
            + "AND password = ?", [email, password])
        //TODO Return based on result.
    } catch (err) {
        console.log(err);
    }
}

module.exports = {CreateUser, ReadUser, UpdateUser, DeleteUser, CheckEmail, CheckPassword}