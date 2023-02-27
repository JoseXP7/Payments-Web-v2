//Variables globales localizando los objetos DOM
let form = document.getElementById("formulario")
let objetos = {
	inputcedula: document.getElementById("identification"),
	inputemail: document.getElementById("email"),
	inputfile: document.getElementById("recibo"),
	btnenviar: document.getElementById("enviar")
}

//Variables con expresiones regulares
let expRegCedula = /^[0-9]{8}$/
let expRegEmail = /^(1001|1002|1003|1004|1005|1006)\.[\d]{8}\.(ucla)@(gmail)\.(com)$/

//eventListeners para escuchar los eventos del DOM
objetos.inputcedula.addEventListener("input", ()=> {
	validarCedula(objetos.inputcedula.value)
})
objetos.inputcedula.addEventListener("input", limiteCedula)

objetos.inputemail.addEventListener("input", ()=> {
	validarEmail(objetos.inputemail.value)
})

objetos.inputfile.addEventListener("change", validarFile)
form.addEventListener("submit", validarTodo)

//Funciones para validar los inputs
function validarCedula(identification) {
	if (expRegCedula.test(identification)) {
		return true
	}
	else {
		console.log("no valido")
		cancelarSubmit(event)
		return false
	}
}

function limiteCedula(identification) {
	if (objetos.inputcedula.value.length > 8) {
		objetos.inputcedula.value = objetos.inputcedula.value.slice(0, 8)
	} else {
		cancelarSubmit(event)
	}
}

function validarEmail(email) {
	if (expRegEmail.test(email)) {
		console.log("valido")
		return true
	}
	else {
		console.log("novalido")
		cancelarSubmit(event)
		return false
	}
}

function validarFile() {
	let ruta = objetos.inputfile.value
	let extPermitidas = /(.jpg|.png|.jpeg)$/i

	if (!extPermitidas.exec(ruta)) {
		objetos.inputfile.value = ""
		req.flash("error_msg", "Extension no permitida, asegurate de usar JPEG, JPG, o PNG")
		return false
	} else {
		req.flash("success_msg", "¡Archivo Subido!")
	}
}

function validarTodo(e) {
	if (objetos.inputcedula.value.length == 0 || objetos.inputemail.value.length == "" || objetos.inputfile.value == "") {
		e.preventDefault()
		req.flash("error_msg", "Tienes campos sin llenar!")
		objetos.btnenviar.disabled = true
		return false
	} else {
		req.flash("success_msg", "¡Perfecto!, presiona enviar para reportar tu aporte")
		objetos.btnenviar.disabled = false
		return true
	}
}

function cancelarSubmit(event) {
	event.preventDefault()
}