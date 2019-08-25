const express = require('express')
const cors = require('cors')
const path = require('path')

const routes = require("./routes")

const server = express()
server.use('/results', express.static(__dirname+'/assets/images/results'))

server.use(cors({
	origin: (origin, cb) => {
		cb(null, true)
	}
}))
server.use(routes)


server.listen(3333,()=>{console.log("Server iniciado..")})