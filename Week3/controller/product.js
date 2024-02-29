const express = require('express')
const app = express()
const path = require('path')
const joi = require('joi')
const fileUpload = require('express-fileupload')
const fs = require('fs')
const validateProduct = (product) => {
    const schema = joi.object({
      name: joi.string().min(3).required(),
      description: joi.string().min(3).required(),
      price: joi.number().required(),
      quantity: joi.number().required(),
    })
    return schema.validate(product)
}

app.use(express.static(path.join(__dirname, '../images')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())

let produkOlahraga = [
    {
        id: 1,
        name: "Sepatu Lari",
        price: 750000,
        quantity: 100,
        description: "Sepatu lari dengan teknologi terbaru untuk performa maksimal.",
        image: "/images/sepatu_lari.jpg",
    },
    {
        id: 2,
        name: "Jersey Sepak Bola",
        price: 250000,
        quantity: 100,
        description: "Jersey resmi klub favoritmu, nyaman dan stylish.",
        image: "/images/jersey_sepak_bola.jpg",
    },
    {
        id: 3,
        name: "Raket Bulu Tangkis",
        price: 350000,
        quantity: 100,
        description: "Raket dengan desain aerodinamis untuk kontrol dan kekuatan lebih baik.",
        image: "/images/raket_bulu_tangkis.jpg",
    },
    {
        id: 4,
        name: "Bola Basket",
        price: 200000,
        quantity: 100,
        description: "Bola basket resmi ukuran standar untuk pertandingan serius.",
        image: "/images/bola_basket.jpg",
    },
    {
        id: 5,
        name: "Bola Sepak",
        price: 150000,
        quantity: 100,
        description: "Bola sepak resmi ukuran standar untuk pertandingan serius.",
        image: "/images/bola_sepak.jpg",
    }
]

cart = []

module.exports = {
    get: (req, res)=>{
        const name = req.query.name

        if(name){
            const product = produkOlahraga.find(product => product.name.toLowerCase() == name)

            if(!product) {
                res.status(404).json({
                messages: "Data Not Found"
                })
            }

            res.status(200).json({
                messages: "Success Get Detail Data",
                data: product
            })
        }

        res.status(200).json({
            messages: "Success Get All Data",
            data: produkOlahraga
        })
    },
    post : (req, res) => {
        const {name, description, price, quantity} = req.body
      
        const id = produkOlahraga.length + 1;
      
        const {error} = validateProduct(req.body)
      
        if(error) {
          return res.status(400).json({
            messages: error.details[0].message
          })
        }
      
        const image = req.files.image
        //const filename = `${name}.jpg`
        const filename = `${name.replace(/\s/g, '_')}.jpg`

        image.mv(path.join(__dirname, '../images', filename))
      
        const newProduct = {
          id,
          name,
          description,
          price,
          quantity,
          image: `/images/${filename}`,
        }
      
        console.log(newProduct)
      
        produkOlahraga.push(newProduct)
      
        res.status(201).json({
          messages: "Success Add Data",
          data: newProduct
        })
    },
    getId : (req, res) => {
        const id = req.params.id
      
        const product = produkOlahraga.find(product => product.id == id)
      
        if(!product) {
          res.status(404).json({
            messages: "Data Not Found"
          })
        }
      
        res.status(200).json({
          messages: "Success Get Detail Data",
          data: product
        })
    },
    editId : (req, res) => {
        const id = req.params.id
        const {name, description, price} = req.body
      
        const {error} = validateProduct(req.body)
      
        if(error) {
          return res.status(400).json({
            messages: error.details[0].message
          })
        }
      
        const product = produkOlahraga.find(product => product.id == id)
      
        if(!product) {
          return res.status(404).json({
            messages: "Data Not Found"
          })
        }
      
        const fileNameOld = `../${product.name}.jpg`
        product.name = name
        product.description = description
        product.price = price
      
        const image = req.files.image
        // const filename = `${name}.jpg`
      
        // image.mv(path.join(__dirname, 'public/images', filename))
      
        if(image) {
          try{
            fs.unlinkSync(path.join(__dirname, '../images', fileNameOld))
          }catch(err) {
            console.log(err)
          }
          const filename = `${name.replace(/\s/g, '_')}.jpg`
          // image.mv(path.join(__dirname, 'public/images', filename))
          console.log(image.mv(path.join(__dirname, '../images', filename)))
          product.image = `/images/${filename}`
        }
      
        res.status(201).json({
          messages: "Success Update Data",
          data: product
        })
    },
    deleteId : (req, res) => {
        const id = req.params.id
      
        const product = produkOlahraga.find(product => product.id == id)
      
        if(!product) {
          return res.status(404).json({
            messages: "Data Not Found"
          })
        }
      
        const index = produkOlahraga.indexOf(product)
        produkOlahraga.splice(index, 1)
      
        res.status(200).json({
          messages: "Success Delete Data",
          data: product
        })
    },
    getCart : (req, res) => {
      res.status(200).json({
        massages: "Success Show Cart",
        data: cart
      })
    }, 
    postCart: (req, res) =>{
      const id = req.body.id
      const product = produkOlahraga.find(product => product.id == id)

      if (!product){
        return res.status(404).json({
          massages: "Data Not Found"
        })
      }

      if (product.quantity == 0){
        return res.status(204).json({
          massages: "Product Sold"
        })
      }

      const item = cart.find(item => item.id == id)
      
      product.quantity -= 1

      if (!item){
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        })

        res.status(201).json({
          massages: "success add product",
          cart
        })
      }

      item.quantity += 1
      res.status(201).json({
        massages: "Success add product",
        cart
      })
    },
    putCart: (req, res) =>{
      const id = req.params.id
      const {quantity} = req.body
      const product = cart.find(product => product.id == id)

      if (!product) {
        return res.status(404).json({
          massages: "Data Not Found"
        })
      }

      if (quantity == 0){
        const index = cart.indexOf(product)
        cart.splice(index, 1)

        return res.status(200).json({
          massages: "Success Delete Item",
          cart: cart
        })
      }

      const item = produkOlahraga.find(item => item.id == id)
      const diff = quantity - product.quantity
      product.quantity += diff
      item.quantity -= diff

      res.status(201).json({
        massages: "Success Update Item",
        cart: cart
      })
    },
    deleteCartId: (req, res)=>{
      const id = req.params.id

      const item = cart.find(item => item.id == id)
      if(!item) {
        return res.status(404).json({
          messages: "Data Not Found"
        })
      }
      
      const product = produkOlahraga.find(product => product.id == id) 
      product.quantity += item.quantity

      const productCart = cart.find(product => product.id == id)

      const index = cart.indexOf(productCart)
      cart.splice(index, 1)
      
      res.status(200).json({
        messages: "Success Delete Item",
        data: cart
      })
  }, 
  payment : (req,res) => {
    const {bank} = req.body

    const totalPrice = cart.reduce((barang, item) => {
      return barang + (item.price * item.quantity)
    },0)

    cart = []

    return res.status(201).json({
      massages: `Pembayaran sukses silahkan bayar melalui ${bank}`,
      total: totalPrice,
      method: bank
    })
  }
}