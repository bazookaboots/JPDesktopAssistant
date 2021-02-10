/** Express router providing user related routes
 * @module main
 * @requires express
 * @requires bcrypt
 */
const { ReadUser, CreateUser } = require('./account')
const { response, request } = require('express')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())

const testUsers = []



//
app.get('/account', (request, response) => {

})


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
        //Find email check if its in use
        //Find the user in the databse //TODO needs to actually be connected to database instead of testUsers
        const userCheck = testUsers.find((user) => {
            user.email === request.body.email
        })
        

        //Check that no user was found
        if (userCheck != null) {
            //Sends Error status if user is not null
            return response.status(400).send()
        }

        //Hash user password
        const hashedPassword = await bcrypt.hash(request.body.password/*TODO figure out the correct way to access this value*/, 10)

        //Create user object
        const user = {
            email: request.body.email,
            name: request.body.name,//TODO figure out the correct way to access this value
            password: hashedPassword
        }

        //Adds user to database
        testUsers.push(user)//TODO needs to actually be connected to database instead of testUsers

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

        //Find the user in the databse //TODO needs to actually be connected to database instead of testUsers
        const user = testUsers.find((user) => {
            user.email === request.body.email
        })

        //Test to see if user was found
        if (user == null) {
            //Sends Error status if user is not found
            return response.status(400).send()
        }

        //Compares the user password with encrypted password
        if (await bcrypt.compare(request.body.password, user.password)) {
            //Code executed if password matches
            response.send('Success')
        } else {
            //Code executed if password does not match
            response.send('failure')
        }

    } catch (error) {

    }
})

app.listen(3010, '127.0.0.1')