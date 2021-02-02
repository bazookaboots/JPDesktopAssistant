const sql = require('mssql');

const config = {
    user: 'lehibriggs',
    password: 'lehibriggs',
    server: 'aura.cset.oit.edu', // You can use 'localhost\\instance' to connect to named instance
    database: 'lehibriggs',
    port: 5433
}

// //Create database connection
// try {
//     let connection = await sql.connect(config)
//     let result = await connection.request()
//         .query().then(response => {
//         
//     })
//     } catch (err) {
//         console.log(err);
//     }

async function CreateContact(contact) {
    try {
        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('owner', sql.VarChar(64), contact.Owner)
            .input('name', sql.VarChar(64), contact.Name)
            .input('platform', sql.VarChar(64), contact.Platform)
            .input('username', sql.VarChar(64), contact.Username)
            .query("INSERT INTO Contacts (owner, name, platform, username) "
                + "VALUES ( @owner, @name, @platform, @username )")
            .then(response => {

            })
    } catch (err) {
        console.log(err);
    }

}

async function ReadContacts(operationfunction) {
    try {
        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('owner', sql.VarChar(64), 'Lehi')
            .query("SELECT * FROM Contacts "
                + "WHERE owner = @owner ;")
            .then(response => {
                data = response.recordset
                operationfunction(data)
            })
    } catch (err) {
        console.log(err);
    }
}

async function UpdateContact(id, values) {
    try {
        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('owner', sql.VarChar(64), 'Lehi')
            .input('id', int, id)
            .input('name', sql.VarChar(64), values.Name)
            .input('platform', sql.VarChar(64), values.Platform)
            .input('username', sql.VarChar(64), values.Username)
            .query("UPDATE Contacts "
                + "SET name = @name, platform = @platform, username = @username"
                + "WHERE id = @id"
                + "AND owner = @owner")
            .then(response => {
            console.log(response.rowsAffected)
        })
    } catch (err) {
        console.log(err);
    }
}

async function DeleteContact(id) {
    try {
        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('id', int, id)
            .query("DELETE FROM Contacts "
                + "WHERE id = @id"
                + "AND owner = @owner")
            .then(response => {
            console.log(response.rowsAffected)
        })
    } catch (err) {
        console.log(err);
    }

}





