const { response } = require('express')
const express = require('express')
const app = express()

const testUsers = []

app.get('/', (request, response) => {
    response.send("This is a damn test")
})

app.post('/', (request, response) => {

})

app.listen(3010,'127.0.0.1')