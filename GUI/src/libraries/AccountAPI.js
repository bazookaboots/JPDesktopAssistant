const bcrypt = require('bcrypt')

const {
    RegisterRoute,
    LoginRoute,
    DeleteUserRoute,
    UpdateSettingsRoute,
    ReadContactsRoute,
    UpdateContactsRoute
} = require('./Communications')

const default_contacts = {
}

const default_settings = {
}

async function Register(username, email, password){
    console.debug(`Function called: Register(${username}, ${email}, ${password})\n`)

    if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) || email.length < 8 || email.length > 64) {
        console.debug("Email is invalid.\n")
        return -100
    }

    if (!username.match(/^[a-zA-Z0-9]+$/) || username.length < 5 || username.length > 32) {
        console.debug("Username is invalid.\n")
        return -200
    }

    if (password.length < 8 || password.length > 32) {
        console.debug("Password is invalid.\n")
        return -300
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const request = {
        userid: Date.now(),
        email: email,
        username: username,
        passhash: hashedPassword,
        settings: default_settings,
        contacts: default_contacts
    }

    let result = RegisterRoute(request)

    if (result == -400){
        console.debug("Failed to register on the server.\n")
    }
    else{
        //TODO: Store generated data in cache
        return 0
    }
}

async function Login(email, password){
    console.debug(`Function called: Login(${email}, ${password})\n`)

    if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) || email.length < 8 || email.length > 64) {
        console.debug("Email is invalid.\n")
        return -100
    }

    if (password.length < 8 || password.length > 32) {
        console.debug("Password is invalid.\n")
        return -200
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const request = {
        email: email,
        passhash: hashedPassword
    }

    let result = LoginRoute(request)

    if (result == -300){
        console.debug("Failed to login on the server.\n")
    }
    else{
        //TODO: Store returned data
        return 0
    }
}

async function DeleteUser(userid){
    console.debug(`Function called: DeleteUser(${userid})\n`)

    const request = {
        userid: userid
    }

    DeleteUserRoute(request)
    //TODO: Clear cache
}

async function UpdateSettings(userid, key, value){
    //pull settings from cache
    //update values
    //store changes in cache
    //build json (userid, settings)
    //call /update-settings (request)
    UpdateSettingsRoute(request)
}

async function CreateContact(userid, contactid, displayname){
    //pull contacts from cache
    //update values
    //store changes in cache
    //build json (userid, contacts)
    //call /update-contacts (request)
    UpdateContactsRoute(request)
}

async function ReadContacts(userid){
    //build json (userid)
    //call /read-user-data (request)
    //store returned contacts in cache
    ReadContactsRoute(request)
}

async function UpdateContacts(userid, contactid, displayname){
    //pull contacts from cache
    //update values
    //store changes in cache
    //build json (userid, contacts)
    //call /update-contacts (request)
    UpdateContactsRoute(request)
}

async function DeleteContact(userid, contactid){
    //pull contacts from cache
    //update values
    //store changes in cache
    //build json (userid, contacts)
    //call /update-contacts (request)
    UpdateContactsRoute(request)
}

module.exports = {
    Register,
    Login,
    DeleteUser,
    UpdateSettings,
    CreateContact,
    ReadContacts,
    UpdateContacts,
    DeleteContact
  }




// app.post('/register', async (req, res) => {
//     console.debug("Route Called: /register")
//     try {
//         await FindUserByEmail(req.body.email, async (foundUser) => {
//             if (foundUser === undefined) {
//                 if (!req.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) || req.body.email.length < 8 || req.body.email.length > 64) {
//                     console.debug("Email is invalid.")
//                     return res.status(422).send()
//                 }

//                 if (!req.body.username.match(/^[a-zA-Z0-9]+$/) || req.body.username.length < 5 || req.body.username.length > 32) {
//                     console.debug("Username is invalid.")
//                     return res.status(422).send()
//                 }

//                 if (req.body.password.length < 8 || req.body.password.length > 32) {
//                     console.debug("Password is invalid.")
//                     return res.status(422).send()
//                 }

//                 const hashedPassword = await bcrypt.hash(req.body.password, 10)

//                 const request = {
//                     id: Date.now(),
//                     email: req.body.email,
//                     username: req.body.username,
//                     passhash: hashedPassword
//                 }

//                 await CreateUser(request, async(response) => {
//                     res.status(201).send()
//                 })

//             } else {
//                 res.status(422).send()
//             }
//         })
//     } 
//     catch (err) {
//         console.error(`Error: Failed to register user: ${err}`)
//     }
// })

// app.patch('/update', /*authenticateToken,*/ async(req, res) => {
//     console.debug("Route Called: /update")
//     try {
//         await FindUserByEmail(req.user.email, async (foundUser) => {
//             if (foundUser) {
//                 if (!req.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) || req.body.email.length < 8 || req.body.email.length > 64) {
//                     console.debug("Email is invalid.")
//                     return res.status(422).send()
//                 }

//                 if (!req.body.username.match(/^[a-zA-Z0-9]+$/) || req.body.username.length < 5 || req.body.username.length > 32) {
//                     console.debug("Username is invalid.")
//                     return res.status(422).send()
//                 }

//                 if (req.body.password.length < 8 || req.body.password.length > 32) {
//                     console.debug("Password is invalid.")
//                     return res.status(422).send()
//                 }

//                 const hashedPassword = await bcrypt.hash(req.body.password, 10)

//                 const request = {
//                     id: foundUser.id,
//                     email: req.body.email,
//                     username: req.body.username,
//                     passhash: hashedPassword
//                 }
//                 await UpdateUser(request, async(response) => {
//                     res.status(201).send()
//                 })

//             } else {
//                 res.status(422).send()
//             }
//         })

//     } 
//     catch (err) {
//         console.error(`Error: Failed to update account: ${err}`)
//     }
// })

// app.get('/getusername', /*authenticateToken,*/ async(req, res) => {
//     console.debug("Route Called: /getusername")
//     try {
//         const request = {
//             userid: req.body.userid
//         }

//         await FindUsername(request, async(response) => {
//             res.status(201).send()
//         })
//     } 
//     catch (err) {
//         console.error(`Error: Failed to get username: ${err}`)
//     }
// })

// app.get('/test-tok', async (req, res) => {
//     console.log("/test-find route called")
//     try {
//         let accessToken = jwt.sign({
//             id: "foundUser.id",
//             username: "foundUser.username",
//             email: "foundUser.email"
//         }, process.env.ACCESS_TOKEN_SECRET)
//         console.log("contents of accessToken = " + accessToken)
//         res.status(200).json({ Token: accessToken })
//     } 
//     catch (err) {
//         console.error(err)
//     }
// })