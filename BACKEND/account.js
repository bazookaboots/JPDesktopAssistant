//Includes
const { response, request } = require('express')
const express = require('express')
const app = express()
const sql = require('mssql')
const bcrypt = require('bcrypt')

//Lets express know we are using json objects and how to parse them
app.use(express.json())

//Connection config
const config = {
    server: 'aura.cset.oit.edu',
    user: 'morgananderson2',
    password: 'morgananderson2',
    database: 'morgananderson2',
    debug: true,
    port: 5433
}

async function CreateUser(request) {
    try{
        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('username', sql.VarChar(64), request.username)
            .input('email', sql.VarChar(64), request.email)
            .input('password', sql.VarChar(64), request.password)
            .query("INSERT INTO morgananderson2.users "
                + "VALUES ( @username, @email, @password)")
            .then(response => {

            })
    } catch (err) {
        console.log(err);
    }
}

async function ReadUser(request) {
    try {
        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('email', sql.VarChar(64), request.email)
            .query("SELECT * FROM morgananderson2.users "
                + "WHERE email = @email")
            .then(response => {
                //TODO Return a JSON settings string
            })
    } catch (err) {
        console.log(err);
    }
}

async function UpdateUser(request) {
    try {
        request.settings.forEach(element => {
            stringvar += request.settings[i].key + " =" + request.settings[i].value + " "
        });

        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('email', sql.VarChar(64), request.email)
            .query("UPDATE morgananderson2.users "
                + "SET " + stringvar
                + "WHERE email = @email")
            .then(response => {

            })
    } catch (err) {
        console.log(err);
    }
}

async function DeleteUser(request) {
    try {
        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('email', sql.VarChar(64), request.email)
            .query("DELETE FROM morgananderson2.users "
                + "WHERE email = @email")
            .then(response => {

            })
    } catch (err) {
        console.log(err);
    }
}

async function CheckEmail(email)
{
    try {
        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('email', sql.VarChar(64), email)
            .query("SELECT * FROM morgananderson2.users "
            + "WHERE email = @email")
            .then(response => {
                if (response.rowsAffected != 0){
                    return true;
                }
                else{
                    return false;
                }
            })
    } catch (err) {
        console.log(err);
    }
}

async function CheckPassword(email, password)
{
    try {
        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('email', sql.VarChar(64), email)
            .input('password', sql.VarChar(64), password)
            .query("SELECT * FROM morgananderson2.users "
                + "WHERE email = @email "
                + "AND password = @password")
            .then(response => {
                if (response.rowsAffected != 0){
                    return true;
                }
                else{
                    return false;
                }
            })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {CreateUser, ReadUser, UpdateUser, DeleteUser, CheckEmail, CheckPassword}