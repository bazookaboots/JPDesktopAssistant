/** Express router providing user related routes
 * @module main
 * @requires express
 * @requires bcrypt
 */
const { CreateUser, ReadUser, UpdateUser, DeleteUser, CheckEmail, CheckPassword } = require('./account')
const { response, request } = require('express')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

//lets express know we are using json objects and how to parse them
app.use(express.json())

/**
 * This is an Express.js route for the PAL backend that
 * is reponsible for create
 * @name POST/create
 * @function
 * @memberof module:main
 * @inner
 * @param {string} path - path to direct an http request.
 * @param {callback} func - call back ran on request
 */
app.post('/users/create', async (request, response) => {
    console.log("/users/create route called")

    const user = {
        email: request.body.email,
        name: request.body.username,
        password: request.body.email,
        settings: {
                ree: request.body.email,
                teee: request.body.password
        }
    }

    console.log("EEEE:" + Object.keys(user.settings).length)

    try {
        //Check that the email meets character requirements
        if (!request.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            console.log("EMAIL IS INVALID") //DEBUG
            return response.status(400).send()
        }

        //Check that the username meets character requirements
        if (!request.body.username.match(/^[a-zA-Z0-9]+$/) || request.body.username.length < 4){
            console.log("USERNAME IS INVALID") //DEBUG
            return response.status(401).send()
        }

        //Check that the email does not already exist.
        if (CheckEmail(request.body.email)) {
            console.log("EMAIL ALREAY EXISTS")  //DEBUG
            return response.status(402).send()
        }

        //Check that the password is expression valid
        if (!request.body.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/) || request.body.password.length < 8){
            console.log("PASSWORD IS INVALID") //DEBUG
            return response.status(403).send()
        }

        //Hash user password
        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        //Create user object
        const user = {
            email: request.body.email,
            name: request.body.username,
            password: hashedPassword,
            settings: {
                    ree: request.body.email
            }
        }

        Object.keys(user.settings).length

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
 * is reponsible for reading
 * @name POST/read
 * @function
 * @memberof module:main
 * @inner
 * @param {string} path - path to direct an http request.
 * @param {callback} func - call back ran on request
 */
app.post('/users/read', async (request, response) => {
    console.log("/users/read route called")
    try {
        //Check that the email meets character requirements
        if (!request.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            console.log("EMAIL IS INVALID") //DEBUG
            return response.status(400).send()
        }

        //Check that the user exists
        if (!CheckEmail(request.body.email)) {
            console.log("EMAIL DOES NOT EXIST") //DEBUG
            return response.status(401).send()
        }
        
        //Compares the user password with encrypted password
        if (!CheckPassword(request.body.email, bcrypt.hash(request.body.password, 10))) {
            console.log("PASSWORD IS INCORRECT")
            return response.status(402).send()
        }

        result = ReadUser(request);

        //Sends response to the frontend
        response.status(201).send()

        return result; 

    } catch (error) {
        console.log(error)

        //Sends response to the frontend
        response.status(500).send()
    }
})


/**
 * This is an Express.js route for the PAL backend that
 * is reponsible for updating
 * @name POST/update
 * @function
 * @memberof module:main
 * @inner
 * @param {string} path - path to direct an http request.
 * @param {callback} func - call back ran on request
 */
app.post('/users/update', async (request, response) => {
    console.log("/users/update route called")
    try {
        //Check that the email meets character requirements
        if (!request.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            console.log("EMAIL IS INVALID") //DEBUG
            return response.status(400).send()
        }

        //Check that the user exists
        if (!CheckEmail(request.body.email)) {
            console.log("EMAIL DOES NOT EXIST") //DEBUG
            return response.status(401).send()
        }

        UpdateUser(request); 

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
 * is reponsible for deleting
 * @name POST/delete
 * @function
 * @memberof module:main
 * @inner
 * @param {string} path - path to direct an http request.
 * @param {callback} func - call back ran on request
 */
app.post('/users/delete', async (request, response) => {
    console.log("/users/delete route called")
    try {
        //Check that the email meets character requirements
        if (!request.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            console.log("EMAIL IS INVALID") //DEBUG
            return response.status(400).send()
        }

        //Check that the user exists
        if (!CheckEmail(request.body.email)) {
            console.log("EMAIL DOES NOT EXIST") //DEBUG
            return response.status(401).send()
        }

        DeleteUser(request); 

        //Sends response to the frontend
        response.status(201).send()

    } catch (error) {
        console.log(error)

        //Sends response to the frontend
        response.status(500).send()
    }
})


app.listen(3010, '127.0.0.1')