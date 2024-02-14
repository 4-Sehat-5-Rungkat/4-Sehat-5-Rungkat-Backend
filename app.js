const express = require('express')
const productRouter = require('./router/product')
var cors = require('cors')
const app = express()
const port = 3000
const path = require('path')
const fileUpload = require('express-fileupload')
const joi = require('joi')
const fs = require('fs')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())

app.use('/images', express.static(path.join(__dirname, 'images')));
app.get('/', (req, res) => {
  res.send('Selamat Berbelanja di 4 Sehat 5 Rungkat')
})

// route product
app.use(productRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})