const sql = require('mssql');

async function CreateUser(username, email, password)
{

}

async function LoginUser(email, password)
{

}

async function ReadUser(email, password)
{

}

async function UpdateUser(email, password)
{

}

async function DeleteUser(email, password)
{

}

async function CreateContact(name, platform, username)
{

}

async function ReadContact(name, platform, username)
{

}

async function UpdateContact(name, platform, username)
{

}

async function DeleteContact(name, platform, username)
{

}


//Stuff to put in backend server
const config = {
    user: 'lehibriggs',
    password: 'lehibriggs',
    server: 'aura.cset.oit.edu', // You can use 'localhost\\instance' to connect to named instance
    database: 'lehibriggs',
    port: 5433
}

async function CreateUser(passedinfo)
{
    try {
        //Encrpt password
        //Check password
        //Check email
        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('username', sql.VarChar(64), passedinfo.username)
            .input('email', sql.VarChar(64), passedinfo.email)
            .input('password', sql.VarChar(64), encryptedpassword)
            .input('logged_in', int, 1)
            //Add something to parse config to push default values
            .query("INSERT INTO morgananderson2.users"
                + "VALUES ( @username, @email, @password, @logged_in)") //Add something to parse config to push default values
            .then(response => {

            })
    } catch (err) {
        console.log(err);
    }
}

async function LoginUser(passedinfo)
{

}

async function ReadUser(passedinfo)
{

}

async function UpdateUser(passedinfo)
{

}

async function DeleteUser(passedinfo)
{

}

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

async function ReadContacts(contact) {
    try {
        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('owner', sql.VarChar(64), contact.Owner)
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

async function UpdateContact(contact) {
    try {
        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('owner', sql.VarChar(64), contact.Owner)
            .input('id', int, id)
            .input('name', sql.VarChar(64), contact.Name)
            .input('platform', sql.VarChar(64), contact.Platform)
            .input('username', sql.VarChar(64), contact.Username)
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

async function DeleteContact(contact) {
    try {
        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('owner', sql.VarChar(64), contact.Owner)
            .input('name', sql.VarChar(64), contact.Name)
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





