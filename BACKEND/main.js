/** Express router providing user related routes
 * @module main
 * @requires express
 * @requires bcrypt
 */
const { CreateUser, ReadUser, UpdateUser, DeleteUser, CheckUser, CheckPassword } = require('./account')
const { response, request } = require('express')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

//lets express know we are using json objects and how to parse them
app.use(express.json())

/**
 * This is an Express.js route for the PAL backend that
 * is reponsible for creating new users in the database.
 * @name POST/createUser
 * @function
 * @memberof module:main
 * @inner
 * @param {string} path - path to direct an http request.
 * @param {callback} func - call back ran on request
 */
app.post('/users', async (request, response) => {
    console.log("/users route called")

    try {
        //Check that no user was found
        if (!CheckUser(request.body.email)) {
            return response.status(400).send()
        }
        //Check that the email is expression valid
        if (!true){
            response.status(500).send();
        }

        //Hash user password
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        //Create user object
        const user = {
            email: request.body.email,
            name: request.body.username,
            password: hashedPassword
        }

        //Adds user to database
        CreateUser(user);

        //Sends response to the frontend
        response.status(201).send()

    } catch (error) {
        console.log(error)

        //Sends response to the frontend
        response.status(500).send()
    }
})

/**
 * This is an Express.js route for the PAL backend that
 * is reponsible for logging in users
 * @name POST/login
 * @function
 * @memberof module:main
 * @inner
 * @param {string} path - path to direct an http request.
 * @param {callback} func - call back ran on request
 */
app.post('/users/login', async (request, response) => {
    console.log("/users/login route called")
    try {
        //Check that no user was found
        if (!CheckUser(request.body.email)) {
            return response.status(400).send()
        }
        //Compares the user password with encrypted password
        if (!CheckPassword(request.body.email, request.body.password)) {
            return response.status(400).send()
        }

        //Create user object
        const user = {
            email: request.body.email,
        }

        ReadUser(user); 
        //TODO Return JSON settings string

        //Sends response to the frontend
        response.status(201).send()

    } catch (error) {
        console.log(error)

        //Sends response to the frontend
        response.status(500).send()
    }
})

app.listen(3010, '127.0.0.1')