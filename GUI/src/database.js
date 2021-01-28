const sql = require('mssql');

const config = {
    user: 'lehibriggs',
    password: 'lehibriggs',
    server: 'aura.cset.oit.edu', // You can use 'localhost\\instance' to connect to named instance
    database: 'lehibriggs',
    port: 5433
}

async function GetContacts(operationfunction) {
    try {
    let connection = await sql.connect(config)
    let result = await connection.request().query('SELECT * FROM Contacts WHERE Owner = \'Lehi\';').then(value => {
        data = value.recordset
        operationfunction(data)
    })
    } catch (err) {
        console.log(err);
    }

}

// let pool = new sql.connect(config, err => {
//     if (err) console.log(err)
//     else {
//         const request = new sql.Request()

//         request.query("CREATE TABLE Contacts (Owner varchar(64),Name varchar(64), Platform varchar(64), UserName varchar(64));", (err, result) => {
//             if (err) console.log(err)
//             else console.log(result )
//         })
//     }
// })




