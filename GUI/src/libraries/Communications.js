/* Account Communication */ 
const { callback } = require('util')
const http = require('http')
const hostURL = "127.0.0.1"

async function RegisterRoute(request) {
  console.debug(`Function called: RegisterRoute(${JSON.stringify(request)})\n`)

  const body = JSON.stringify(request)

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
      console.debug(`DATA: Register(${d})\n`)
        if(d != undefined)
            data += d
    })

    res.on("end", () => {
      console.debug(`DATA: Register(${data})\n`)
        return data
    })
})

req.on('error', err => {
    console.error(`Error: Failed to register user: ${err}\n`)
})

req.write(body)

req.end()
}

async function LoginRoute(request) {
  console.debug(`Function called: LoginRoute(${JSON.stringify(request)})\n`)

  const body = JSON.stringify(request)

  const options = {
    hostname: hostURL,
    path: '/login',
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
    })

    res.on("end", () => {
        return data
    })
})

req.on('error', err => {
    console.error(`Error: Failed to log in: ${err}\n`)
})

req.write(body)

req.end()
}

async function DeleteUserRoute(request) {
  console.debug(`Function Called: DeleteUserRoute(${JSON.stringify(request)})\n`)

  const body = JSON.stringify(request)

  let options = {
    host: hostURL,
    path: '/delete-user',
    port: 3010,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': body.length
      //'Authorization': 'Bearer ' + authTokens.jwt_token
    }
  }

  const req = http.request(options, res => {
    let data =''
    res.on('data', d => {
        if(d != undefined)
            data += d
    })

    res.on("end", () => {
        return data
    })
})

req.on('error', err => {
    console.error(`Error: Failed to delete account: ${err}\n`)
})

req.write(body)

req.end()
}

async function UpdateSettingsRoute(request, authTokens) {
  console.debug("Function Called: UpdateSettings()")

  let options = {
    host: hostURL,
    path: '/update-settings',
    port: 3010,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': request.length,
      'Authorization': 'Bearer ' + authTokens.jwt_token
    }
  }

  const req = http.request(options, res => {
    res.on('data', d => {
      return d
    })

  })

  req.on('error', err => {
    console.error(`Error: Failed to update settings: ${err}`)
  })

  req.write(request)

  req.end()
}

async function ReadContactsRoute(request, authTokens) {
  console.debug("Function Called: ReadContacts()")

  let options = {
    host: hostURL,
    path: '/read-contacts',
    port: 3010,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': request.length,
      'Authorization': 'Bearer ' + authTokens.jwt_token
    }
  }
}

async function UpdateContactsRoute(request, authTokens) {
  console.debug("Function Called: UpdateContacts()")

  let options = {
    host: hostURL,
    path: '/update-contacts',
    port: 3010,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': request.length,
      'Authorization': 'Bearer ' + authTokens.jwt_token
    }
  }

  const req = http.request(options, res => {
    res.on('data', d => {
      return d
    })

  })

  req.on('error', err => {
    console.error(`Error: Failed to update contacts: ${err}`)
  })

  req.write(request)

  req.end()
}

/* Message Communication */ 

async function ReadMessagesRoute(request, authTokens) {
  console.debug("Function Called: ReadUserMessages()")

  let options = {
    host: hostURL,
    path: '/read-messages',
    port: 3010,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'Authorization': 'Bearer ' + authTokens.jwt_token
    }
  };

  const req = http.request(options, res => {
    res.on('data', d => {
      return d
    })

  })

  req.on('error', err => {
    console.error(`Error: Failed to get messages: ${err}`)
  })

  req.write(request)

  req.end()
}

async function DeleteMessageRoute(request, authTokens) {
  console.debug("Function Called: DeleteUserMessages()")

  let options = {
    host: hostURL,
    path: '/delete-messages',
    port: 3010,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'Authorization': 'Bearer ' + authTokens.jwt_token
    }
  };

  const req = http.request(options, res => {
    res.on('data', d => {
      return d
    })

  })

  req.on('error', err => {
    console.error(`Error: Failed to delete message: ${err}`)
  })

  req.write(request)

  req.end()
}

module.exports = {
  RegisterRoute,
  LoginRoute,
  DeleteUserRoute,
  UpdateSettingsRoute,
  ReadContactsRoute,
  UpdateContactsRoute,
  ReadMessagesRoute,
  DeleteMessageRoute
}