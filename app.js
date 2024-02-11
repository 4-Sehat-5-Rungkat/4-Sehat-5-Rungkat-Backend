const express = require('express')
const productRouter = require('./router/product')
const app = express()
const port = 3000
const path = require('path')
const fileUpload = require('express-fileupload')
const joi = require('joi')
const fs = require('fs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())

let keranjang = []

// validasi tambah product
const validateProduct = (product) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    description: joi.string().min(3).required(),
    price: joi.number().required(),
  })

  return schema.validate(product)
}

app.get('/', (req, res) => {
  res.send('Selamat Berbelanja di 4 Sehat 5 Rungkat')
})

// route product
app.use(productRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})