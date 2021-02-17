
const http = require('http');

/**
 * Sends an HTTP POST request to the backend asking if it can
 * create a user from the given account information
 * @name CreateUser
 * @memberof account.js
 * @param {string} username - string representing the desired username
 * @param {string} email - string representing the desired email
 * @param {string} password - string representing the desired password
 */
async function CreateUser(username, email, password)
{
    //Create body of HTTP/POST request
    const data = JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    
      console.log("Called readcontact");//test

      //Set configuration parameters for the request
      let options = { //TODO change configuration parameters production parameters
        host: '127.0.0.1', 
        path: '/users/create',
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
async function LoginUser(email, password)
{
    //Create body of HTTP/POST request
    const data = JSON.stringify({
        email: email,
        password: password
      })
    
      console.log("LoginUser Called");
      let options = {
        host: '127.0.0.1',
        path: '/users/read', //points it at the login route
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
async function ReadUser(email, password)
{
    const data = JSON.stringify({
        name: name,
        platform: platform,
        username: username
      })
    
      console.log("Called readcontact");
      let options = {
        host: '127.0.0.1', //Update later
        path: '/users/read',
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
async function UpdateUser(email, password)
{
    const data = JSON.stringify({
        name: name,
        platform: platform,
        username: username
      })
    
      console.log("Called readcontact");
      let options = {
        host: '127.0.0.1', //Update later
        path: '/users/update',
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
async function DeleteUser(email, password)
{
    const data = JSON.stringify({
        name: name,
        platform: platform,
        username: username
      })
    
      console.log("Called readcontact");
      let options = {
        host: '127.0.0.1', //Update later
        path: '/users/delete',
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