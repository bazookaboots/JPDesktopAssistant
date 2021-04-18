
async function CreateContact(userid, name, username, contactid)
{
  console.log("Called updatecontacts");  //DEBUG
  const data = JSON.stringify({
    name: name,
    username: username,
    contactid: contactid
  })
  
  //TODO: Logic to add to long string of contacts
  //TODO: Update json to also pass userid
  let options = {
    host: '127.0.0.1', //Update later
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
      console.log(d);
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

  //TODO: Logic to delete contact from string
  //TODO: Update json
  let options = {
    host: '127.0.0.1', //Update later
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
      console.log(d);
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

  //TODO: Logic to update long string of contacts
  //TODO: Update json
  let options = {
    host: '127.0.0.1', //Update later
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
      console.log(d);
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

  //TODO: Logic to get long string of contacts
  //TODO: Update json
  let options = {
    host: '127.0.0.1', //Update later
    path: '/getcontacts',
    port: 3010,
    method: 'GET'
  };

  const request = http.request(options, response => {

    response.on('data', d => {
      console.log(d);
    })
  })

  request.on('error', error => {
    console.error(error)
  })

  request.end()
}
