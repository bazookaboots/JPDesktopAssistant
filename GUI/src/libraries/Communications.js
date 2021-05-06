/* Account Communication */ 

const http = require('http')
const hostURL = "127.0.0.1"

async function RegisterUser(request) {
  console.debug("Function Called: RegisterUser()")

  const options = {
    host: hostURL,
    path: '/register',
    port: 3010,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': request.length
    }
  }

  const req = http.request(options, res => {
    res.on('data', d => {
      return d
    })
  })

  req.on('error', err => {
    console.error(`Error: Failed to register user: ${err}`)
  })

  req.write(request)

  req.end()
}

async function LoginUser(email, password, callback) {
  console.debug("Function Called: LoginUser()")

  const options = {
    hostname: hostURL,
    path: '/login',
    port: 3010,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': request.length
    }
  }

  const req = http.request(options, res => {
    res.on('data', d => {
      return d
    })

  })

  req.on('error', err => {
    console.error(`Error: Failed to log in: ${err}`)
  })

  req.write(request)

  req.end()
}

async function ReadUserdata(request, authTokens) {
  console.debug("Function Called: ReadUserdata()")

  let options = {
    host: hostURL,
    path: '/read-userdata',
    port: 3010,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': request.length,
      'Authorization': 'Bearer ' + authTokens.jwt_token
    }
  }
}

async function UpdateSettings(request, authTokens) {
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

async function UpdateContacts(request, authTokens) {
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

async function DeleteUser(request, authTokens) {
  console.debug("Function Called: DeleteUser()")

  let options = {
    host: hostURL,
    path: '/delete',
    port: 3010,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
      'Authorization': 'Bearer ' + authTokens.jwt_token
    }
  }

  const req = http.request(options, res => {
    res.on('data', d => {
      return d
    })

  })

  req.on('error', err => {
    console.error(`Error: Failed to delete user: ${err}`)
  })

  req.write(request)

  req.end()

  const req = http.request(options, res => {
    res.on('data', d => {
      return d
    })

  })

  req.on('error', err => {
    console.error(`Error: Failed to get userdata: ${err}`)
  })

  req.write(request)

  req.end()
}

/* Message Communication */ 

async function DeleteUserMessages(request, authTokens) {
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

async function ReadUserMessages(request, authTokens) {
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

module.exports = {
  RegisterUser,
  LoginUser,
  ReadUserdata,
  UpdateSettings,
  UpdateContacts,
  DeleteUser,
  DeleteUserMessages,
  ReadUserMessages
}