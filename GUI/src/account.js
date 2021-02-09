const sql = require('mssql');
const http = require('http')

async function CreateUser(username, email, password)
{
    http.get("lehibriggs.org/PAL/users", 
    {
        username: "lehi briggs",
        password: "lehibriggs"
    })
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