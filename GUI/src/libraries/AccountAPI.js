const http = require('http');
const { callbackify } = require('util');
const { ValueStore } = require('./StorageUtil');
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
    //Create body of HTTP/POST request
    const body = JSON.stringify({
        username: username,
        email: email,
        password: password
    })

    console.log("Called RegisterUser");

    //Set configuration parameters for the request
    const options = { //TODO change configuration parameters production parameters
        host: hostURL,
        path: '/register',
        port: 3010,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': body.length
        }
    };

    //Create the request to be sent to the backend
    const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        let data =''
        res.on('data', d => {
            if(d != undefined)
                data += d;
        })

        res.on("end", () => {
            callback( data)
        })
    })

    //register what to do if there is an error
    req.on('error', error => {
        console.error(error)
    })

    //Write actual data  
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

    const body = JSON.stringify(
        {
            email:email,
            password: password
        }
    )
    console.log(body)

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
        console.log(`statusCode: ${res.statusCode}`)
        let data ='';
        res.on('data', d => {
            if(d != undefined)
                data += d;
        })

        res.on("end", () => {
            callback( data)
        })
    })

    req.on('error', error => {
        console.error(error)
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
    jwt_token = '';
}


//TODO implement this function vvvv
async function UpdateUser(email, username, password, authTokens) {
    const data = JSON.stringify({
        email: email,
        username: username,
        password: password
    })

    console.dir(authTokens.jwt_token)
    console.log("Called UpdateUser()");
    let options = {
        host: hostURL, //Update later
        path: '/update',
        port: 3010,
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
            'Authorization': 'Bearer ' + authTokens['jwt_token']
        }
    };

    const request = http.request(options, response => {
        console.log(`statusCode: ${response.statusCode}`)
        response.on('data', d => {
            console.log(d);
        })
    })


    request.on('error', error => {
        console.error(error)
    })

    //Write actual data  
    request.write(data)

    request.end()

}

//TODO implement this function vvvv
async function DeleteUser(email, password, authTokens) {
    const data = JSON.stringify({
        name: name,
        platform: platform,
        username: username,
        'Authorization': "Bearer " + authTokens.jwt_token
    })

    console.log("Called readcontact");
    let options = {
        host: hostURL, //Update later
        path: '/delete',
        port: 3010,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const request = http.request(options, response => {
        console.log(`statusCode: ${response.statusCode}`)
        response.on('data', d => {
            console.log(d);
        })
    })


    request.on('error', error => {
        console.error(error)
    })

    //Write actual data  
    request.write(data)

    request.end()

}

async function GetUserName(userid) {
    const body = JSON.stringify(
        {
            userid:userid
        }
    )
    console.log(body)

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
            console.log(d); //DEBUG
            //TODO: Return username
        })
    })

    request.on('error', error => {
        console.error(error)
    })

    //Write actual data  
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

