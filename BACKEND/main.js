/* Account Logic */

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
    UpdateUser,
    FindUsername
} = require('./accountSQL')

app.listen(3010, '127.0.0.1')

function authenticateToken(request, response, next) {
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return response.status(401).send("Error: Failed to AuthenticateToken.")

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return response.status(401).send("Error: Failed to AuthenticateToken.")
        request.user = user
        next()
    })
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

app.get('/login', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /login")
    try {
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
                res.status(401).send("Error: Failed to log in.")
            }
        })
    } 
    catch (err) {
        console.error(`Error: Failed to log in: ${err}`)
        res.status(401).send("Error: Failed to log in.")
    }
})

app.delete('/delete', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /delete")
    try {
        DeleteUser(req.user.id)
    } 
    catch (err) {
        console.error(`Error: Failed to delete account: ${err}`)
    }
})

app.get('/logout', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /logout")
    try {
        //TODO: Implement logout function
    } catch (err) {
        console.error(`Error: Failed to log out: ${err}`)
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


/* Messaging Logic */

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
   console.debug(`Client connected: [id=${socket.id}], [userid=${socket.handshake.query.userid}]`)
   sequenceNumberByClient.set(parseInt(socket.handshake.query.userid), socket)

   socket.on("disconnect", () => {
       sequenceNumberByClient.delete(socket.handshake.query.userid)
       console.debug(`Client disconnected: [id=${socket.id}], [userid=${socket.handshake.query.userid}]`)
   })

   socket.on("sendmessage", (request) => {
        console.debug(`Client sent message: [message=${request.message}], [toid=${request.toid}], [fromid=${request.fromid}]`)
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
            console.error(`Error: Failed to send message: ${err}`)
        }
    })
})

app.delete('/deletemessage', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /deletemessage")
    try {
        const request = {
            messageid: req.body.messageid
        }

        await DeleteMessage(request, async(response) => {
            res.status(201).send()
        })

    } 
    catch (err) {
        console.error(`Error: Failed to delete message: ${err}`)
    }
})
    
app.get('/getusermessages', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /getusermessages")
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
        console.error(`Error: Failed to get user messages: ${err}`)
    }
})

app.get('/getallmessages', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /getallmessages")
    try {
        const request = {
            fromid: req.body.fromid
        }
        await GetAllMessages(request, async(response) => {
            res.status(201).send()
        })
    } 
    catch (err) {
        console.error(`Error: Failed to get all messages: ${err}`)
    }
})

/* Contacts Logic */

const {
    UpdateContacts,
    GetContacts
} = require('./contactsSQL')

app.post('/updatecontacts', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /updatecontacts")
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
        console.error(`Error: Failed to update contacts: ${err}`)
    }
})

app.get('/getcontacts', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /getcontacts")
    try {
        const request = {
            userid: req.body.userid
        }

        await GetContacts(request, async(response) => {
            res.status(201).send()
        })
    } 
    catch (err) {
        console.error(`Error: Failed to get contacts: ${err}`)
    }
})

/* Settings Logic */

const {
    UpdateSettings,
    GetSettings
} = require('./settingsSQL')

app.post('/updatesettings', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /updatesettings")
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
        console.error(`Error: Failed to update settings: ${err}`)
    }
})

app.get('/getsettings', /*authenticateToken,*/ async(req, res) => {
    console.debug("Route Called: /getsettings")
    try {
        const request = {
            userid: req.body.userid
        }

        await GetSettings(request, async(response) => {
            res.status(201).send()
        })
    } 
    catch (err) {
        console.error(`Error: Failed to get settings: ${err}`)
    }
})