const http = require('http');
const hostURL = "127.0.0.1"

async function CreateContact(useremail, contactemail, displayname, authToken, callback){
  console.debug(`Function called: CreateContact(${useremail}, ${contactemail}, ${displayname}, ${authToken}, ${callback})\n`)

  const request = {
      useremail: useremail,
      contactemail: contactemail,
      displayname, displayname
  }

  const body = JSON.stringify(request)

  const headers = {
      'Content-Type': 'application/json',
      'Content-Length': body.length,
      'Authorization': 'Bearer ' + authToken['jwt_token']
  }

  function onData(datas){
      let data =''
      datas.on('data', d => {
          if(d != undefined)
              data += d
      })

      datas.on("end", () => {
          callback(data)
      })
  }
  
  function onError(error){
      console.error(`Error: Failed to create contact (${error})\n`)
  }

  Communicate(body, "/contact/create", "POST", headers, onData, onError )
}

async function ReadContacts(useremail, authToken, callback){
  console.debug(`Function called: ReadContacts(${useremail}, ${authToken}, ${callback})\n`)

  const request = {
      useremail: useremail
  }

  const body = JSON.stringify(request)

  const headers = {
      'Content-Type': 'application/json',
      'Content-Length': body.length,
      'Authorization': 'Bearer ' + authToken['jwt_token']
  }

  function onData(datas){
      let data =''
      datas.on('data', d => {
          if(d != undefined)
              data += d
      })

      datas.on("end", () => {
          callback(data)
      })
  }
  
  function onError(error){
      console.error(`Error: Failed to read contacts (${error})\n`)
  }

  Communicate(body, "/contact/read", "GET", headers, onData, onError )
}

async function UpdateContact(useremail, contactemail, displayname, authToken, callback){
  console.debug(`Function called: UpdateContact(${useremail}, ${contactemail}, ${displayname}, ${authToken}, ${callback})\n`)

  const request = {
      useremail: useremail,
      contactemail: contactemail,
      displayname, displayname
  }

  const body = JSON.stringify(request)

  const headers = {
      'Content-Type': 'application/json',
      'Content-Length': body.length,
      'Authorization': 'Bearer ' + authToken['jwt_token']
  }

  function onData(datas){
      let data =''
      datas.on('data', d => {
          if(d != undefined)
              data += d
      })

      datas.on("end", () => {
          callback(data)
      })
  }
  
  function onError(error){
      console.error(`Error: Failed to update contact (${error})\n`)
  }

  Communicate(body, "/contact/update", "PATCH", headers, onData, onError )
}

async function DeleteContact(useremail, contactemail, authToken, callback){
  console.debug(`Function called: ReadContacts(${useremail}, ${contactemail}, ${authToken}, ${callback})\n`)

  const request = {
      useremail: useremail,
      contactemail: contactemail
  }

  const body = JSON.stringify(request)

  const headers = {
      'Content-Type': 'application/json',
      'Content-Length': body.length,
      'Authorization': 'Bearer ' + authToken['jwt_token']
  }

  function onData(datas){
      let data =''
      datas.on('data', d => {
          if(d != undefined)
              data += d
      })

      datas.on("end", () => {
          callback(data)
      })
  }
  
  function onError(error){
      console.error(`Error: Failed to delete contact (${error})\n`)
  }

  Communicate(body, "/contact/delete", "DELETE", headers, onData, onError )
}

async function Communicate(request, path, method, headers, onData, onError) {
  console.debug(`Function called: Communicate(${JSON.stringify(request)}, ${path},
  ${method}, ${JSON.stringify(headers)}, ${onData}, ${onError})\n`);

  let options = {
      host: hostURL,
      path: path,
      port: 3010,
      method: method,
      headers: headers
  };

  const req = http.request(options, onData)

  req.on('error', onError)

  console.log(request)

  req.write(request)

  req.end()
}

module.exports = {
  CreateContact,
  ReadContacts,
  UpdateContact,
  DeleteContact
}