const jimp = require('jimp')
const fs = require("fs")
const crypto = require('crypto')

const animals = require('./animals')

module.exports = async (req, res) => {
	try{
		const new_filename = await generate(req.body.name, `./src/assets/tmp/uploads/${req.file.filename}`)
		console.log(new_filename)
		const response_data = {
			"result_url": `results/${ new_filename }`
		}
		res.send(response_data)
	}
	catch (e){
		res.json({"status":"error","msg":"Something gone wrong!", "details":`${e}` })
	}finally{
		deleteUpload(req.file.filename)
	}
}

function deleteUpload(filename){
	try{
		fs.unlinkSync(`./src/assets/tmp/uploads/${ filename }`)
	}catch(e){
		console.log(e)
	}
}

async function generate(nome, imagemSource){
		let baseImage = await jimp.read('./src/assets/images/base.png')
		let uploadedImage = await jimp.read(imagemSource)
		
		const animalID = Math.floor(Math.random() * (animals.length - 0) + 0)

		let animal = await jimp.read(animals[animalID].source)

		const id = crypto.randomBytes(16).toString('hex')
		console.log(id)
		// Configuring font
		const font = await jimp.loadFont(jimp.FONT_SANS_64_WHITE)
		uploadedImage = cropAndResize(uploadedImage)
		ainmal = cropAndResize(animal)
		
		//Generate Image
		baseImage
			.blit(uploadedImage, 64, 419)
			.blit(animal, 685, 419)
			.print(font, 60, 770, nome)
			.print(font, 690, 770, animals[animalID].name)
			.write(`./src/assets/images/results/${ id }.png`)
		return id+".png"
	}

function cropAndResize(image){
	image.resize(326, jimp.AUTO)
	image.crop(0, 0, 326, 326)
	return image
}