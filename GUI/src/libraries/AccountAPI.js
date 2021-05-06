async function Register(username, email, password){
    //do regex checks
    //build json (username, email, password)
    //call /register (request)
    //store returned userid and stated info in cache
}

async function Login(email, password){
    //do regex checks
    //build json (email, password)
    //call /login (request)
    //store returned contacts, settings, etc in cache
}

async function Logout(){
    //delete auth token
    //clear cache
}

async function Delete(userid){
    //build json (userid)
    //call /delete (request, authTokens)
    //clear cache
}

async function UpdateSettings(userid, key, value){
    //pull settings from cache
    //update values
    //store changes in cache
    //build json (userid, settings)
    //call /update-settings (request, authTokens)
}

async function CreateContacts(userid, contactid, displayname){
    //pull contacts from cache
    //update values
    //store changes in cache
    //build json (userid, contacts)
    //call /update-contacts (request, authTokens)
}

async function ReadContacts(userid){
    //build json (userid)
    //call /read-user-data (request, authTokens)
    //store returned contacts in cache
}

async function UpdateContacts(userid, contactid, displayname){
    //pull contacts from cache
    //update values
    //store changes in cache
    //build json (userid, contacts)
    //call /update-contacts (request, authTokens)
}

async function DeleteContacts(userid, contactid){
    //pull contacts from cache
    //update values
    //store changes in cache
    //build json (userid, contacts)
    //call /update-contacts (request, authTokens) 
}






app.post('/register', async (req, res) => {
    console.debug("Route Called: /register")
    try {
        await FindUserByEmail(req.body.email, async (foundUser) => {
            if (foundUser === undefined) {
                if (!req.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) || req.body.email.length < 8 || req.body.email.length > 64) {
                    console.debug("Email is invalid.")
                    return res.status(422).send()
                }

                if (!req.body.username.match(/^[a-zA-Z0-9]+$/) || req.body.username.length < 5 || req.body.username.length > 32) {
                    console.debug("Username is invalid.")
                    return res.status(422).send()
                }

                if (req.body.password.length < 8 || req.body.password.length > 32) {
                    console.debug("Password is invalid.")
                    return res.status(422).send()
                }

                const hashedPassword = await bcrypt.hash(req.body.password, 10)

                const request = {
                    id: Date.now(),
                    email: req.body.email,
                    username: req.body.username,
                    passhash: hashedPassword
                }

                await CreateUser(request, async(response) => {
                    res.status(201).send()
                })

            } else {
                res.status(422).send()
            }
        })
    } 
    catch (err) {
        console.error(`Error: Failed to register user: ${err}`)
    }
})

app.patch('/update', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /update")
    try {
        await FindUserByEmail(req.user.email, async (foundUser) => {
            if (foundUser) {
                if (!req.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) || req.body.email.length < 8 || req.body.email.length > 64) {
                    console.debug("Email is invalid.")
                    return res.status(422).send()
                }

                if (!req.body.username.match(/^[a-zA-Z0-9]+$/) || req.body.username.length < 5 || req.body.username.length > 32) {
                    console.debug("Username is invalid.")
                    return res.status(422).send()
                }

                if (req.body.password.length < 8 || req.body.password.length > 32) {
                    console.debug("Password is invalid.")
                    return res.status(422).send()
                }

                const hashedPassword = await bcrypt.hash(req.body.password, 10)

                const request = {
                    id: foundUser.id,
                    email: req.body.email,
                    username: req.body.username,
                    passhash: hashedPassword
                }
                await UpdateUser(request, async(response) => {
                    res.status(201).send()
                })

            } else {
                res.status(422).send()
            }
        })

    } 
    catch (err) {
        console.error(`Error: Failed to update account: ${err}`)
    }
})

app.get('/getusername', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /getusername")
    try {
        const request = {
            userid: req.body.userid
        }

        await FindUsername(request, async(response) => {
            res.status(201).send()
        })
    } 
    catch (err) {
        console.error(`Error: Failed to get username: ${err}`)
    }
})

app.get('/test-tok', async (req, res) => {
    console.log("/test-find route called")
    try {
        let accessToken = jwt.sign({
            id: "foundUser.id",
            username: "foundUser.username",
            email: "foundUser.email"
        }, process.env.ACCESS_TOKEN_SECRET)
        console.log("contents of accessToken = " + accessToken)
        res.status(200).json({ Token: accessToken })
    } 
    catch (err) {
        console.error(err)
    }
})