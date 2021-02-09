
async function CreateContact(name, platform, username)
{

}

async function ReadContact(name, platform, username) {
  console.log("Called readcontact");

  let options = {
    host: '127.0.0.1', //Update later
    path: '/',
    port: 3010,
    method: 'GET'
  };

  const request = http.request(options, response => {

    response.on('data', d => {
      console.log(d);
      console.log("FUUUUUUUUUUUUUUUUUUUUUCKKKKKKK");
    })
  })

  console.log("Outside response.on");


  request.on('error', error => {
    console.error(error)
  })

  request.end()
}

async function UpdateContact(name, platform, username)
{

}

async function DeleteContact(name, platform, username)
{

}
