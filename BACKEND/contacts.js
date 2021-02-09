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
    
    /*try {
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
    */
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
