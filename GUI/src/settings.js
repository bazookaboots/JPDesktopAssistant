const fs = require('fs');

async function UpdateSettings(userid, setting, value)
{
  console.log("Called updatesettings"); //DEBUG

    //TODO: Logic for updating settings string

  let options = {
    host: '127.0.0.1',
    path: '/updatesettings',
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

      const data = JSON.stringify(UPDATE, null, 4);
      fs.writeFile('settings.json', data, (err))
    })
  })

  request.on('error', error => {
    console.error(error)
  })
 
  request.write(data)

  request.end()
}

async function GetSettings(userid) {
  console.log("Called getcontacts");  //DEBUG

  let options = {
    host: '127.0.0.1',
    path: '/getsettings',
    port: 3010,
    method: 'GET'
  };

  const request = http.request(options, response => {

    response.on('data', d => {
      console.log(d); //DEBUG

      const data = JSON.stringify(d, null, 4);
      fs.writeFile('settings.json', data, (err))
    })
  })

  request.on('error', error => {
    console.error(error)
  })

  request.end()
}

async function LoadSettings() {
  console.log("Called loadsettings");  //DEBUG

  fs.readFile('settings.json', 'utf-8', (err, data))
  const settings = JSON.parse(data.toString());

  return settings;
}