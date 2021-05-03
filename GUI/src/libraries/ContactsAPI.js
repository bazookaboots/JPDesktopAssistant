//TODO: Function to get user information
//TODO: Function to search for users

const fs = require('fs');

async function CreateContact(userid, name, username, contactid)
{
  console.log("Called updatecontacts");  //DEBUG
  const data = JSON.stringify({
    name: name,
    username: username,
    contactid: contactid
  })
  
  //TODO: Logic to add to string of contacts

  let options = {
    host: '127.0.0.1',
    path: '/updatecontacts',
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
      console.log(d); //DEBUG

      //TODO: Save new string
      
      const data = JSON.stringify(d, null, 4);
      fs.writeFile('contacts.json', data, (err))
    })
  })

  request.on('error', error => {
    console.error(error)
  })
 
  request.write(data)

  request.end()
}

async function DeleteContact(userid, contactid)
{
  console.log("Called updatecontacts"); //DEBUG

  //TODO: Logic to delete contact from string of contacts

  let options = {
    host: '127.0.0.1',
    path: '/updatecontacts',
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
      console.log(d); //DEBUG
      
      //TODO: Save new string

      const data = JSON.stringify(d, null, 4);
      fs.writeFile('contacts.json', data, (err))
    })
  })

  request.on('error', error => {
    console.error(error)
  })
 
  request.write(data)

  request.end()
}

async function UpdateContact(userid, name, username, contactid)
{
  console.log("Called updatecontacts"); //DEBUG

  //TODO: Logic to update string of contacts

  let options = {
    host: '127.0.0.1',
    path: '/updatecontacts',
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
      console.log(d); //DEBUG
      
      //TODO: Save new string

      const data = JSON.stringify(d, null, 4);
      fs.writeFile('contacts.json', data, (err))
    })
  })

  request.on('error', error => {
    console.error(error)
  })
 
  request.write(data)

  request.end()
}

async function GetContacts(userid) {
  console.log("Called getcontacts");  //DEBUG

  let options = {
    host: '127.0.0.1',
    path: '/getcontacts',
    port: 3010,
    method: 'GET'
  };

  const request = http.request(options, response => {

    response.on('data', d => {
      console.log(d); //DEBUG

      const data = JSON.stringify(d, null, 4);
      fs.writeFile('contacts.json', data, (err))
    })
  })

  request.on('error', error => {
    console.error(error)
  })

  request.end()
}

async function LoadContacts() {
  console.log("Called loadcontacts");  //DEBUG

  fs.readFile('contacts.json', 'utf-8', (err, data))
  const contacts = JSON.parse(data.toString());

  return contacts;
}