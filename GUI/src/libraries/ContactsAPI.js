
async function CreateContact(name, platform, username)
{
  const data = JSON.stringify({
    name: name,
    platform: platform,
    username: username
  })

  console.log("Called readcontact");
  let options = {
    host: '127.0.0.1', //Update later
    path: '/account',
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

async function ReadContact(name, platform, username) {
  console.log("Called readcontact");

  let options = {
    host: '127.0.0.1', //Update later
    path: '/account',
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

async function UpdateContact(name, platform, username)
{
  const data = JSON.stringify({
    name: name,
    platform: platform,
    username: username
  })

  console.log("Called readcontact");
  let options = {
    host: '127.0.0.1', //Update later
    path: '/account',
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

async function DeleteContact(name, platform, username)
{
  const data = JSON.stringify({
    name: name,
    platform: platform,
    username: username
  })

  console.log("Called readcontact");
  let options = {
    host: '127.0.0.1', //Update later
    path: '/account',
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
