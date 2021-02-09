
async function CreateContact(name, platform, username)
{

}

async function ReadContact(name, platform, username)
{
    console.log("Called readcontact");

    let options = {
        host: '127.0.0.1:3010', //Update later
        path: '/',
        port: 80,
        method: 'GET'
      };

      const request = http.request(options, response => {
      
        response.on('data', d => {
        console.log("Inside response.on");
          console.log(d)
        })
      })

      console.log("Outside response.on");
}

async function UpdateContact(name, platform, username)
{

}

async function DeleteContact(name, platform, username)
{

}
