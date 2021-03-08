const http = require('http');
const jwt_token = '';

const hostURL = "http://www.lehibriggs.org/PAL"
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
    const data = JSON.stringify({
        username: username,
        email: email,
        password: password
    })

    console.log("Called CreateUser");

    //Set configuration parameters for the request
    let options = { //TODO change configuration parameters production parameters
        host: hostURL,
        path: '/register',
        port: 3010,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    //Create the request to be sent to the backend
    const request = http.request(options, response => {
        console.log(`statusCode: ${response.statusCode}`)
        response.on('data', d => {
            console.log(d);
        })
    })

    //register what to do if there is an error
    request.on('error', error => {
        console.error(error)
    })

    //Write actual data  
    request.write(data)

    request.end()
}

/**
 * Sends an HTTP POST request to the backend asking to authorize the user
 * given the email and password
 * @name LoginUser
 * @memberof account.js
 * @param {string} email - string representing the desired email
 * @param {string} password - string representing the desired password
 */
async function LoginUser(email, password) {
    //Create body of HTTP/POST request
    const data = JSON.stringify({
        email: email,
        password: password
    })

    console.log("LoginUser Called");
    let options = {
        host: hostURL,
        path: '/login', //points it at the login route
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


//TODO implement this function vvvv
async function UpdateUser(email, password) {
    const data = JSON.stringify({
        name: name,
        platform: platform,
        username: username,
        'Authorization': "Bearer " + jwt_token
    })

    console.log("Called readcontact");
    let options = {
        host: hostURL, //Update later
        path: '/update',
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

//TODO implement this function vvvv
async function DeleteUser(email, password) {
    const data = JSON.stringify({
        name: name,
        platform: platform,
        username: username,
        'Authorization': "Bearer " + jwt_token
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