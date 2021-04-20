require('dotenv').config();
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {
    CreateUser,
    FindUserByEmail,
    DeleteUser,
    UpdateUser
} = require('./accountSQL')

app.use(express.json())

function authenticateToken(request, response, next) {
    const authHeader = request.headers['authorization']

    console.log("authHeader value = " + authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    console.log("token value = " + token)
    if (token == null) return response.status(401).send("Failed to AuthenticateToken")

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return response.status(401).send("Failed to AuthenticateToken")
        request.user = user
        next()
    })
}


app.post('/register', async (req, res) => {
    console.log("/register route called")
    try {
        await FindUserByEmail(req.body.email, async (foundUser) => {
            if (foundUser === undefined) {
                //Check that the email meets character requirements
                if (!req.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                    console.log("EMAIL IS INVALID") //DEBUG
                    return res.status(422).send()
                }

                //Check that the username meets character requirements
                if (!req.body.username.match(/^[a-zA-Z0-9]+$/) || req.body.username.length < 5) {
                    console.log("USERNAME IS INVALID") //DEBUG
                    return res.status(422).send()
                }

                //Check that the password is expression valid
                if ( /* !req.body.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/) || */ req.body.password.length < 8) {
                    console.log("PASSWORD IS INVALID") //DEBUG
                    return res.status(422).send()
                }
                //Hash user password
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                //Create user object
                const user = {
                    id: Date.now(),
                    email: req.body.email,
                    username: req.body.username,
                    passhash: hashedPassword
                }
                await CreateUser(user, async (response) => {
                    res.status(201).send()
                });

            } else {
                console.log("USER ALREADY FOUND")
                res.status(422).send()
            }
        })

    } catch (error) {

    }
})

app.get('/login', async (req, res) => {
    console.log("/login route called")
    try {
        console.dir(req.body);
        await FindUserByEmail(req.body.email, async function (foundUser) {
            if (foundUser !== undefined) {
                let submittedPass = req.body.password;
                let storedPassHash = foundUser.passhash;
                await bcrypt.compare(submittedPass, storedPassHash, function (err, passMatch) {
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
                //fake compare made for security
                let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
                await bcrypt.compare(req.body.password, fakePass);
                res.status(401).send("/login GET> Could Not Login User")
            }
        })


    } catch (error) {
        res.status(401).send("/login POST > Could Not Login User")
    }
})

app.delete('/delete', authenticateToken, async (req, res) => {
    console.log("/delete route called")
    try {
        DeleteUser(req.user.id)
        console.log("testing")
    } catch (error) {

    }
})

app.get('/logout', authenticateToken, async (req, res) => {
    console.log("/delete route called")
    try {
        //TODO implement more robust logout function
        console.log("testing")
    } catch (error) {

    }
})

app.patch('/update', authenticateToken, async (req, res) => {
    console.log("/update route called")
    try {
        await FindUserByEmail(req.user.email, async (foundUser) => {
            if (foundUser) {
                //Check that the email meets character requirements
                if (!req.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                    console.log("EMAIL IS INVALID") //DEBUG
                    return res.status(422).send()
                }

                //Check that the username meets character requirements
                if (!req.body.username.match(/^[a-zA-Z0-9]+$/) || req.body.username.length < 5) {
                    console.log("USERNAME IS INVALID") //DEBUG
                    return res.status(422).send()
                }

                //Check that the password is expression valid
                if ( /* !req.body.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/) || */ req.body.password.length < 8) {
                    console.log("PASSWORD IS INVALID") //DEBUG
                    return res.status(422).send()
                }
                //Hash user password
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                //Create user object
                const user = {
                    id: foundUser.id,
                    email: req.body.email,
                    username: req.body.username,
                    passhash: hashedPassword
                }
                await UpdateUser(user, async (response) => {
                    res.status(201).send()
                });

            } else {
                console.log("USER ALREADY FOUND")
                res.status(422).send()
            }
        })

    } catch (error) {

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
    } catch (error) {
        res.status(401).send("/users/login POST > Could Not Login User")
    }
})

app.listen(3010, '127.0.0.1')