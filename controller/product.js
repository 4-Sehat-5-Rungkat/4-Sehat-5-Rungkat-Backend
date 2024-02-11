const fileUpload = require('express-fileupload')
const joi = require('joi')
const fs = require('fs')
const validateProduct = (product) => {
    const schema = joi.object({
      name: joi.string().min(3).required(),
      description: joi.string().min(3).required(),
      price: joi.number().required(),
    })
    return schema.validate(product)
}

let produkOlahraga = [
    {
        id: 1,
        name: "Sepatu Lari",
        price: 750000,
        description: "Sepatu lari dengan teknologi terbaru untuk performa maksimal.",
        image: "/images/sepatu_lari.jpg",
    },
    {
        id: 2,
        name: "Jersey Sepak Bola",
        price: 250000,
        description: "Jersey resmi klub favoritmu, nyaman dan stylish.",
        image: "/images/jersey_sepak_bola.jpg",
    },
    {
        id: 3,
        name: "Raket Bulu Tangkis",
        price: 350000,
        description: "Raket dengan desain aerodinamis untuk kontrol dan kekuatan lebih baik.",
        image: "/images/raket_bulu_tangkis.jpg",
    },
    {
        id: 4,
        name: "Bola Basket",
        price: 200000,
        description: "Bola basket resmi ukuran standar untuk pertandingan serius.",
        image: "/images/bola_basket.jpg",
    },
    {
        id: 5,
        name: "Bola Sepak",
        price: 150000,
        description: "Bola sepak resmi ukuran standar untuk pertandingan serius.",
        image: "/images/bola_sepak.jpg",
    }
]

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
        const {name, description, price} = req.body
      
        const id = produkOlahraga.length + 1;
      
        const {error} = validateProduct(req.body)
      
        if(error) {
          return res.status(400).json({
            messages: error.details[0].message
          })
        }
      
        const image = req.files.image
        const filename = `${name}.jpg`
      
        image.mv(path.join(__dirname, 'images', filename))
      
        const newProduct = {
          id,
          name,
          description,
          price,
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
      
        const fileNameOld = `${product.name}.jpg`
        product.name = name
        product.description = description
        product.price = price
      
        const image = req.files.image
        // const filename = `${name}.jpg`
      
        // image.mv(path.join(__dirname, 'public/images', filename))
      
        if(image) {
          try{
            fs.unlinkSync(path.join(__dirname, 'images', fileNameOld))
          }catch(err) {
            console.log(err)
          }
          const filename = `${name}.jpg`
          // image.mv(path.join(__dirname, 'public/images', filename))
          console.log(image.mv(path.join(__dirname, 'images', filename)))
          product.image = `/images/${filename}`
        }
      
        res.status(200).json({
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
    }
}