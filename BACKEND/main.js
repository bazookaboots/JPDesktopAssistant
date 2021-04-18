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

app.post('/register', /*authenticateToken,*/ async(req, res) => {
    console.log("/register route called")   //DEBUG
    try {
        await FindUserByEmail(req.body.email, async(foundUser) => {
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

                const user = {
                    id: Date.now(),
                    email: req.body.email,
                    username: req.body.username,
                    passhash: hashedPassword
                }

                await CreateUser(user, async(response) => {
                    res.status(201).send()
                })

            } else {
                console.log("USER ALREADY FOUND")
                res.status(422).send()
            }
        })

    } catch (error) {

    }
})

app.get('/login', /*authenticateToken,*/ async(req, res) => {
    console.log("/login route called")  //DEBUG
    try {
        await FindUserByEmail(req.body.email, async function(foundUser) {
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
    } catch (error) {
        res.status(401).send("asddas/users/login POST > Could Not Login User")
    }
})

app.delete('/delete', /*authenticateToken,*/ async(req, res) => {
    console.log("/delete route called") //DEBUG
    try {
        DeleteUser(req.user.id)
        console.log("testing")
    } catch (error) {

    }
})

app.get('/logout', /*authenticateToken,*/ async(req, res) => {
    console.log("/delete route called") //DEBUG
    try {
        //TODO implement more robust logout function
        console.log("testing")
    } catch (error) {

    }
})

app.patch('/update', /*authenticateToken,*/ async(req, res) => {
    console.log("/update route called") //DEBUG
    try {
        await FindUserByEmail(req.user.email, async(foundUser) => {
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

                const user = {
                    id: foundUser.id,
                    email: req.body.email,
                    username: req.body.username,
                    passhash: hashedPassword
                }
                await UpdateUser(user, async(response) => {
                    res.status(201).send()
                })

            } else {
                console.log("USER ALREADY FOUND")
                res.status(422).send()
            }
        })

    } catch (error) {

    }
})

app.get('/test-find', async(req, res) => {
    console.log("/test-find route called") //DEBUG
    try {
        let accessToken = jwt.sign({
            id: "foundUser.id",
            username: "foundUser.username",
            email: "foundUser.email"
        }, process.env.ACCESS_TOKEN_SECRET)
        console.log("contents of accessToken = " + accessToken)
        res.status(200).json({ Token: accessToken })
    } catch (error) {
        res.status(401).send("/users/login POST > Could Not Login User")
    }
})

// Messaging Logic //

const
    {Server} = require("socket.io"),
    server = new Server(8000);

const {
    AddMessage,
    DeleteMessage,
    GetUserMessages,
    GetAllMessages
} = require('./messageSQL')

let sequenceNumberByClient = new Map()

server.on("connection", (socket) => {
   console.info(`Client connected [id=${socket.id}], [userid=${socket.handshake.query['userid']}]`)   //DEBUG
   sequenceNumberByClient.set(socket.handshake.query['userid'], socket) //add socket, key is userid

   socket.on("disconnect", () => {
       sequenceNumberByClient.delete(socket.handshake.query['userid'])  //remove socket, key is userid
       console.info(`Client gone [id=${socket.id}]`)    //DEBUG
   })
   socket.on("sendmessage", (request) => {
        console.info(`Client got message [message=${request.message}], [message=${request.toid}], [message=${request.fromid}]`)    //DEBUG
        try {
            const message = {
                messageid: Date.now(),
                message: request.message,
                toid: request.toid,
                fromid: request.fromid
            }
            
            AddMessage(message, async(response))    //add to database

            if (sequenceNumberByClient.get(request.toid))   //If client is connected
            {
                sequenceNumberByClient.get(request.toid).emit("getmessage", message);   //Emit message to client from socket list.
            }
        }
        catch (error) {

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

    } catch (error) {

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
    catch (error) {

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
    catch (error) {

    }
})

app.listen(3010, '127.0.0.1')