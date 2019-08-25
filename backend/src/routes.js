const express = require("express")
const routes = express.Router()

const multer = require('multer')
const multerConfig = require('./config/multer')

const imageGenerator = require("./utils/imageGenerator")

const upload = multer(multerConfig)

routes.post('/animal', upload.single('picture'), imageGenerator)

module.exports = routes