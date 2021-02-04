const sql = require('mssql');

async function CreateUser(username, email, password)
{
    return status;
}

async function LoginUser(email, password)
{
    return status;
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
    user: 'morgananderson2',
    password: 'morgananderson2',
    server: 'aura.cset.oit.edu',
    database: 'morgananderson2',
    port: 5433
}

async function CreateUser(passedinfo)
{
    try {
        //Check password
        //Encrpt password
        //Check email
        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('username', sql.VarChar(64), passedinfo.username)
            .input('email', sql.VarChar(64), passedinfo.email)
            .input('password', sql.VarChar(64), encryptedpassword)
            .input('logged_in', int, 1)
            //For loop to get all config values as input
            .query("INSERT INTO morgananderson2.users"
                + "VALUES ( @username, @email, @password, @logged_in)") //For loop to get all config values as input
            .then(response => {

            })
    } catch (err) {
        console.log(err);
    }

    //Create status return
}

async function LoginUser(passedinfo)
{
    try {
        //Encrpt password
        //Check password
        //Check email
        //Check logged_in
        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('email', sql.VarChar(64), passedinfo.email)
            .input('password', sql.VarChar(64), encryptedpassword)
            .query("UPDATE morgananderson2.users"
                + "SET logged_in = 1"
                + "WHERE email = @email and password = @password")
            .then(response => {
                //Pull user information
            })
    } catch (err) {
        console.log(err);
    }

    //Create status return
}

async function ReadUser(passedinfo)
{
    try {
        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('email', sql.VarChar(64), passedinfo.email)
            .query("SELECT * FROM morgananderson2.users"
                + "WHERE email = @email")
            .then(response => {
                //Pull user information
            })
    } catch (err) {
        console.log(err);
    }
}

async function UpdateUser(passedinfo)
{
    try {
        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('email', sql.VarChar(64), passedinfo.email)
            .input('setting', sql.VarChar(64), passedinfo.setting)
            .input('value', sql.VarChar(64), passedinfo.value)
            .query("UPDATE morgananderson2.users"
                + "SET @setting = @value"
                + "WHERE email = @email")
            .then(response => {
                
            })
    } catch (err) {
        console.log(err);
    }
}

async function DeleteUser(passedinfo)
{
    try {
        let connection = await sql.connect(config)
        let result = await connection.request()
            .input('email', sql.VarChar(64), passedinfo.email)
            .query("DELETE FROM morgananderson2.users"
                + "WHERE email = @email")
            .then(response => {
                
            })
    } catch (err) {
        console.log(err);
    }
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





