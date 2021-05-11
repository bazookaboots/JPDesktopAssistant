require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

app.listen(3010, '127.0.0.1')
