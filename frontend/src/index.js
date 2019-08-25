import api from './services/api'

const formElement = document.querySelector("#form")
const pictureInput = document.querySelector("#picture")
const nameInput = document.querySelector("#name")

const resultContainer = document.querySelector("#result_container")
const resultElement = document.querySelector("#img_result")
const repeatButton = document.querySelector("#refazerBtn")

let foto = null

const formScreen = 0
const resultScreen = 1

let state = formScreen

function configureHandler(){
	pictureInput.onchange = (e) => {
		foto = e.target.files
	}

	formElement.onsubmit = async(e) => {
		e.preventDefault()
		let data = new FormData()
		
		data.append("picture", foto[0])
		data.append("name", nameInput.value)

		const response = await api.post("http://192.168.1.104:3333/animal", data, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		})
		const { result_url } = response.data
		setResultPicture(result_url)
	}

	repeatButton.onclick = (e) => {
		toggleScreen()
	}
}

function setResultPicture(url){
	resultElement.src = `http://192.168.1.104:3333/${url}`
	toggleScreen()
}

function toggleScreen(){
	if(state === formScreen){
		state = resultScreen
		formElement.classList.add("hidden")
		resultContainer.classList.remove("hidden")
	}else{
		state = formScreen
		formElement.classList.remove("hidden")
		resultContainer.classList.add("hidden")
	}
}


configureHandler()