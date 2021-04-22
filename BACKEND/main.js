//Accounts Database:
//userid, username, email, passhash, contacts, settings

//Messages database:
//messageid, message, toid, fromid

require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
app.use(express.json())

const {
    CreateUser,
    FindUserByEmail,
    DeleteUser,
    UpdateUser
} = require('./accountSQL')

function authenticateToken(request, response, next) {
    const authHeader = request.headers['authorization']

    console.log("authHeader value = " + authHeader) //DEBUG
    const token = authHeader && authHeader.split(' ')[1]
    console.log("token value = " + token)   //DEBUG
    if (token == null) return response.status(401).send("Failed to AuthenticateToken")

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return response.status(401).send("Failed to AuthenticateToken")
        request.user = user
        next()
    })
}


app.post('/register', async (req, res) => {
    console.log("/register route called")   //DEBUG
    try {
        await FindUserByEmail(req.body.email, async (foundUser) => {
            if (foundUser === undefined) {
                if (!req.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                    console.log("EMAIL IS INVALID") //DEBUG
                    return res.status(422).send()
                }

                if (!req.body.username.match(/^[a-zA-Z0-9]+$/) || req.body.username.length < 5) {
                    console.log("USERNAME IS INVALID") //DEBUG
                    return res.status(422).send()
                }

                if (req.body.password.length < 8) {
                    console.log("PASSWORD IS INVALID") //DEBUG
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
        console.error(err)
    }
})

app.get('/login', /*authenticateToken,*/ async(req, res) => {
    console.log("/login route called")  //DEBUG
    try {
        console.dir(req.body)
        await FindUserByEmail(req.body.email, async function (foundUser) {
            if (foundUser !== undefined) {
                let submittedPass = req.body.password
                let storedPassHash = foundUser.passhash
                await bcrypt.compare(submittedPass, storedPassHash, function(err, passMatch) {
                    if (passMatch) {
                        let userSig = {
                            username: foundUser.username,
                            email: foundUser.email,
                            id: foundUser.id
                        }
                        let accessToken = jwt.sign(userSig, process.env.ACCESS_TOKEN_SECRET)
                        res.status(200).json({ token: accessToken })

                    } else {

                    }
                })
            } else {
                let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`
                await bcrypt.compare(req.body.password, fakePass)
                res.status(401).send("asaas/users/login POST > Could Not Login User")
            }
        })
    } 
    catch (err) {
        console.error(err)
        res.status(401).send("asddas/users/login POST > Could Not Login User")
    }
})

app.delete('/delete', /*authenticateToken,*/ async(req, res) => {
    console.log("/delete route called") //DEBUG
    try {
        DeleteUser(req.user.id)
    } 
    catch (err) {
        console.error(err)
    }
})

app.get('/logout', /*authenticateToken,*/ async(req, res) => {
    console.log("/delete route called") //DEBUG
    try {
        //TODO: Implement logout function
    } catch (err) {
        console.error(err)
    }
})

app.patch('/update', /*authenticateToken,*/ async(req, res) => {
    console.log("/update route called") //DEBUG
    try {
        await FindUserByEmail(req.user.email, async (foundUser) => {
            if (foundUser) {
                if (!req.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                    console.log("EMAIL IS INVALID") //DEBUG
                    return res.status(422).send()
                }

                if (!req.body.username.match(/^[a-zA-Z0-9]+$/) || req.body.username.length < 5) {
                    console.log("USERNAME IS INVALID") //DEBUG
                    return res.status(422).send()
                }

                if (req.body.password.length < 8) {
                    console.log("PASSWORD IS INVALID") //DEBUG
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
        console.error(err)
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
        console.log("contents of accessToken = " + accessToken) //DEBUG
        res.status(200).json({ Token: accessToken })
    } 
    catch (err) {
        console.error(err)
    }
})

app.get('/getusername', /*authenticateToken,*/ async(req, res) => {
    console.log("/getusername route called") //DEBUG
    try {
        const request = {
            userid: req.body.userid
        }

        await GetUserMessages(request, async(response) => {
            res.status(201).send()
        })
    } 
    catch (err) {
        console.error(err)
    }
})


// Messaging Logic //

const {
    AddMessage,
    DeleteMessage,
    GetUserMessages,
    GetAllMessages
} = require('./messageSQL')

const
    {Server} = require("socket.io"),
    server = new Server(8000)

let sequenceNumberByClient = new Map()

server.on("connection", (socket) => {
   console.info(`Client connected [id=${socket.id}], [userid=${socket.handshake.query.userid}]`)   //DEBUG
   sequenceNumberByClient.set(parseInt(socket.handshake.query.userid), socket)

   socket.on("disconnect", () => {
       sequenceNumberByClient.delete(socket.handshake.query.userid)
       console.info(`Client gone [id=${socket.id}]`)    //DEBUG
   })

   socket.on("sendmessage", (request) => {
        console.info(`Client got message [message=${request.message}], [toid=${request.toid}], [fromid=${request.fromid}]`)    //DEBUG
        try {
            const message = {
                messageid: Date.now(),
                message: request.message,
                toid: request.toid,
                fromid: request.fromid
            }

            AddMessage(message)

            if (sequenceNumberByClient.get(request.toid))
            {
                sequenceNumberByClient.get(request.toid).emit("getmessage", message)
            }
        }
        catch (err) {
            console.error(err)
        }
    })
})

app.delete('/deletemessage', /*authenticateToken,*/ async(req, res) => {
    console.log("/deletemessage route called")  //DEBUG
    try {
        const request = {
            fromid: req.body.fromid,
            toid: req.body.toid,
            messageid: req.body.messageid
        }

        await DeleteMessage(request, async(response) => {
            res.status(201).send()
        })

    } 
    catch (err) {
        console.error(err)
    }
})
    
app.get('/getusermessages', /*authenticateToken,*/ async(req, res) => {
    console.log("/getusermessages route called") //DEBUG
    try {
        const request = {
            toid: req.body.toid,
            fromid: req.body.fromid
        }

        await GetUserMessages(request, async(response) => {
            res.status(201).send()
        })
    } 
    catch (err) {
        console.error(err)
    }
})

app.get('/getallmessages', /*authenticateToken,*/ async(req, res) => {
    console.log("/getallmessages route called") //DEBUG
    try {
        const request = {
            fromid: req.body.fromid
        }
        await GetAllMessages(request, async(response) => {
            res.status(201).send()
        })
    } 
    catch (err) {
        console.error(err)
    }
})

// Contacts Logic //

const {
    UpdateContacts,
    GetContacts
} = require('./contactsSQL')

app.post('/updatecontacts', /*authenticateToken,*/ async(req, res) => {
    console.log("/updatecontacts route called")   //DEBUG
    try {
        const request = {
            userid: req.body.userid,
            contacts: req.body.contacts
        }

        await UpdateContacts(request, async(response) => {
            res.status(201).send()
        })
    }
    catch (err) {
        console.error(err)
    }
})

app.get('/getcontacts', /*authenticateToken,*/ async(req, res) => {
    console.log("/getcontacts route called") //DEBUG
    try {
        const request = {
            userid: req.body.userid
        }

        await GetContacts(request, async(response) => {
            res.status(201).send()
        })
    } 
    catch (err) {
        console.error(err)
    }
})

// Settings Logic //

const {
    UpdateSettings,
    GetSettings
} = require('./settingsSQL')

app.post('/updatesettings', /*authenticateToken,*/ async(req, res) => {
    console.log("/updatesettings route called")   //DEBUG
    try {
        const request = {
            userid: req.body.userid,
            contacts: req.body.settings
        }

        await UpdateSettings(request, async(response) => {
            res.status(201).send()
        })
    }
    catch (err) {
        console.error(err)
    }
})

app.get('/getsettings', /*authenticateToken,*/ async(req, res) => {
    console.log("/getsettings route called") //DEBUG
    try {
        const request = {
            userid: req.body.userid
        }

        await GetSettings(request, async(response) => {
            res.status(201).send()
        })
    } 
    catch (err) {
        console.error(err)
    }
})
app.listen(3010, '127.0.0.1')