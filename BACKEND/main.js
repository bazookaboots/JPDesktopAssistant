const { response } = require('express')
const express = require('express')
const app = express()

const testUsers = []

app.get('/users', (req, res) => {
    res.json(testUsers)
})

app.listen(3000)