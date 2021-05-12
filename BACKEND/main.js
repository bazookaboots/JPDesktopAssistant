require('dotenv').config();
const express = require('express')
const app = express()

app.listen(3010, '127.0.0.1')

var account = require('./AccountAPI')
var contact = require('./ContactAPI')
var message = require('./MessageAPI')

app.use('/account', account)
app.use('/contact', contact)
app.use('/message', message)