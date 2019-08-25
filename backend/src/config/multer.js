const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
const filesize = 2 //megabytes

module.exports = {
	dest: path.resolve(__dirname, '..', 'assets', 'tmp', 'uploads'),
	storage: multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.resolve(__dirname, '..','assets','tmp','uploads'))
		},
		filename: (req, file, cb) => {
			crypto.randomBytes(16, (err, hash)=>{
				if(err) cb(err)

				const filename = `${ hash.toString('hex') }-${ file.originalname }`

				cb(null, filename)
			})
		}
	}),
	limits: {
		fileSize: filesize * 1024 * 1024,
	},
	fileFilter: (req, file, cb) => {
		const allowedMimes = [
			"image/jpeg",
			"image/pjpeg",
			"image/png",
		]
		if(allowedMimes.includes(file.mimetype)){
			cb(null, true)
		}else{
			cb(new Error('Invalid file type.'))
		}
	}
}