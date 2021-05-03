const http = require('http')
const { callbackify } = require('util')
const { ValueStore } = require('./StorageUtil')
const hostURL = "127.0.0.1"

/**
* Sends an HTTP POST request to the backend asking if it can
* create a user from the given account information
* @name CreateUser
* @memberof account.js
* @param {string} username - string representing the desired username
* @param {string} email - string representing the desired email
* @param {string} password - string representing the desired password
*/
async function RegisterUser(username, email, password) {
    console.debug("Function Called: RegisterUser()")

    const body = JSON.stringify({
        username: username,
        email: email,
        password: password
    })

    const options = {
        host: hostURL,
        path: '/register',
        port: 3010,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': body.length
        }
    }

    const req = http.request(options, res => {
        let data =''
        res.on('data', d => {
            if(d != undefined)
                data += d
                //TODO: Implement this logic.
        })

        res.on("end", () => {
            callback(data)
        })
    })

    req.on('error', err => {
        console.error(`Error: Failed to register user: ${err}`)
    })

    req.write(body)

    req.end()
}

/**
 * Sends an HTTP POST request to the backend asking to authorize the user
 * given the email and password
 * @name LoginUser
 * @memberof account.js
 * @param {string} email - string representing the desired email
 * @param {string} password - string representing the desired password
 */
async function LoginUser(email, password, callback) {
    console.debug("Function Called: LoginUser()")

    const body = JSON.stringify(
        {
            email:email,
            password: password
        }
    )

    const options = {
        hostname: hostURL,
        path: '/test-tok',
        port: 3010,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': body.length
        }
    }

    const req = http.request(options, res => {
        let data =''
        res.on('data', d => {
            if(d != undefined)
                data += d
                //TODO: Implement this logic.
        })

        res.on("end", () => {
            callback(data)
        })
    })

    req.on('error', err => {
        console.error(`Error: Failed to log in: ${err}`)
    })

    req.write(body)

    req.end()
}

/**
 * Sends an HTTP POST request to the backend asking to authorize the user
 * given the email and password
 * @name LogoutUser
 * @memberof account.js
 * @param {string} email - string representing the desired email
 * @param {string} password - string representing the desired password
 */
async function LogoutUser(authTokens) {
    console.debug("Function Called: LogoutUser()")

    jwt_token = ''
}

async function UpdateUser(email, username, password, authTokens) {
    console.debug("Function Called: UpdateUser()")

    const data = JSON.stringify({
        email: email,
        username: username,
        password: password
    })

    let options = {
        host: hostURL,
        path: '/update',
        port: 3010,
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            'Authorization': 'Bearer ' + authTokens['jwt_token']
        }
    }

    const request = http.request(options, response => {
        response.on('data', d => {
            //TODO: Implement this logic.
        })
    })


    request.on('error', err => {
        console.error(`Error: Failed to update user: ${err}`)
    })

    request.write(data)

    request.end()
}

async function DeleteUser(email, password, authTokens) {
    console.debug("Function Called: DeleteUser()")

    const data = JSON.stringify({
        name: name,
        platform: platform,
        username: username,
        'Authorization': "Bearer " + authTokens.jwt_token
    })

    let options = {
        host: hostURL,
        path: '/delete',
        port: 3010,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }

    const request = http.request(options, response => {
        console.log(`statusCode: ${response.statusCode}`)
        response.on('data', d => {
            //TODO: Implement this logic.
        })
    })

    request.on('error', err => {
        console.error(`Error: Failed to delete user: ${err}`)
    })

    request.write(data)

    request.end()
}

async function GetUsername(userid) {
    console.debug("Function Called: GetUsername()")

    const body = JSON.stringify(
        {
            userid:userid
        }
    )

    const options = {
        hostname: hostURL,
        path: '/getusername',
        port: 3010,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': body.length
        }
    }

    const request = http.request(options, response => {
        console.log(`statusCode: ${response.statusCode}`)
        response.on('data', d => {
            //TODO: Implement this logic.
        })
    })

    request.on('error', err => {
        console.error(`Error: Failed to find username: ${err}`)
    })

    request.write(data)

    request.end()
}

module.exports = {
    RegisterUser,
    LoginUser,
    LogoutUser,
    UpdateUser,
    DeleteUser
}