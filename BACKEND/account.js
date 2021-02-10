

//Stuff to put in backend server
const config = {
    user: 'morgananderson2',
    password: 'morgananderson2',
    server: 'aura.cset.oit.edu',
    database: 'morgananderson2',
    port: 5433
}

async function CreateUser(passedinfo) {
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

async function LoginUser(passedinfo) {
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

async function ReadUser(passedinfo) {
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

async function UpdateUser(passedinfo) {
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

async function DeleteUser(passedinfo) {
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
module.exports = {CreateUser, ReadUser, UpdateUser, DeleteUser}