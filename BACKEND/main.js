const { response } = require('express')
const express = require('express')
const app = express()

const testUsers = []

app.get('/', (req, res) => {
    res.send("This is a damn test")
})

app.listen(3010,'127.0.0.1')