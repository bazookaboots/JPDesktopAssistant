const { response } = require('express')
const express = require('express')
const app = express()

const testUsers = []

app.get('/', (req, res) => {
    res.send("<p>hello</p>")
})

app.listen(3010,'127.0.0.1')