let inputs = null
let form = null
let button = null
let dropArea = null
let progressBar = null
let URLImagenSubida = ''

const regExpValidar = [
    /^[a-zA-Z0-9\s]*$/, // regexp nombre
    /^[0-9]+$/, // regexp precio
    /^[0-9]+$/, // regexp stock
    /^[a-zA-Z]+$/, // regexp marca
    /^.+$/, // regexp categoría
    /.*/  // regexp detalles
]

// Arranca poniendo todos los campos como invalidos
const camposValidos = [false, false, false, false, false, false]

// Devuelve false si alguno de los campos no pasa su validacion. Si se encuentra alguno NO valido de camposvalidos, va a devolver false.
const algunCampoNoValido = () => {
    let valido =
        camposValidos[0] &&
        camposValidos[1] &&
        camposValidos[2] &&
        camposValidos[3] &&
        camposValidos[4] &&
        camposValidos[5]


    return !valido
}

// Muestra el mensaje de error para un campo en particular
// Recibe un mensaje de error, y el indice del campo que tiene el problema
// Por ejemplo, puede recibir como mensaje = "El nombre debe tener al menos 3 letras", y como index = 0 (el primer campo)
// Entonces, se mostrará en el primer campo la alerta de error con el mensaje "El nombre debe tener al menos 3 letras"
const setCustomValidity = function (mensaje, index) {
    // Obtenemos todos los divs de error
    const errorDivs = document.querySelectorAll('div.form-error')

    // Le ponemos al n-ésimo div de error el mensaje (n-ésimo significa que, por ejemplo, si index es 0 se lo ponemos al primero, si index es 3 al 4to campo y asi) 
    errorDivs[index].innerHTML = mensaje

    // Hacemos que el div de error que antes estaba escondido se vea
    errorDivs[index].parentNode.classList.toggle('form__container--error', !!mensaje)
}

// Valida los campos
// Recibe 3 cosas:
// valor: representa lo que el usuario escribio en el input a chequear
// validador: representa el regex que le corresponde a este input
// index: representa el numero de input que se está chequeando
function validar(valor, validador, index) {
    // Nos fijamos si el valor que nos pasaron pasa la prueba del regex que nos pasaron
    if (!validador.test(valor)) {
        // Si no pasa la prueba, le decimos que ponga que el campo en cuestion no es valido
        setCustomValidity('Este campo no es válido', index)
        // En la lista de campos validos, decimos que este no es valido
        camposValidos[index] = false
        // Nos aseguramos que el boton de enviar el formulario este deshabilitado
        button.disabled = true
        // salimos de la funcion validar, porque no queremos hacer nada mas
    } else {
        // Si el codigo llega hasta acá significa que pasó la prueba del regex
        // En la lista de campos validos, indicamos que este campo es válido
        camposValidos[index] = true
        // Nos fijamos si hay algun otro campo no valido
        // Si algun campo no es valido, el boton va a estar deshabilitado
        // Sino, el boton se habilitará
        button.disabled = algunCampoNoValido()
        // Decimos que no hay mensaje de error para este campo
        setCustomValidity('', index)
        return valor
    }
}


// Muestra los productos que se le pasen por parametro en pantalla
function renderProds(productos) {

    // Obtiene la plantilla alta.hbs (plantilla de Handlebars)
    fetch('vistas/alta.hbs')
        // Se queda solo con el texto
        .then(r => r.text())
        .then(plantilla => {
            // compile the template
            var template = Handlebars.compile(plantilla);

            // Le pasa a la plantilla los productos que tiene que mostrar
            let html = template({ productos: productos });

            // Pone en el elemento con clase "listado-productos" a los elementos estos generados en base a la plantilla y los productos
            // que se le pasaron a la plantilla
            document.querySelector('.listado-productos').innerHTML = html
        })
}

// Crea un objeto con los datos que ingreso el usuario en los inputs
// Este objeto tiene datos como un nombre, precio, stock, categoria, etc y representa a un PRODUCTO
function leerProductoIngresado() {
    var categoria = document.getElementById("category")
    return {
        nombre: inputs[0].value,
        precio: inputs[1].value,
        stock: inputs[2].value,
        marca: inputs[3].value,
        categoria: categoria.value || "Default",
        foto: URLImagenSubida, // inputs[4].value,
        detalles: inputs[4].value,
        envio: inputs[5].checked,

    }
}

// Borra todos los datos de los inputs
function limpiarFormulario() {
    // inicializo los campos del formulario
    // Por cada uno de los inputs me fijo si es un checkbox o no
    // Si es un checkbox, le pongo que este deschequado
    // Si no es un checkbox, le pongo contenido vacio (input.value = '')
    inputs.forEach(input => {
        input.type == 'checkbox' ? input.checked = false : input.value = ''
    })
    // Deshabilito el boton de enviar el formulario
    button.disabled = true
    // Pongo que todos los campos son invalidos
    for (let i = 0; i < camposValidos.length; i++) {
        camposValidos[i] = false
    }
    let img = document.querySelector('#gallery img')
    img.src = ''
    inicializarProgress()
    URLImagenSubida = ''
}

/* Las funciones drag and drop y la barra de progress */
/* ----------------- funciones de drag and drop y file dialog (upload) ---------------------- */
function inicializarProgress() {
    progressBar.value = 0
}

function actualizarProgress(porcentaje) {
    progressBar.value = porcentaje      // 0 a 100
}

function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function () {
        let img = document.querySelector('#gallery img')
        img.src = reader.result
    }
}

function handleFiles(files) {
    //console.log(files)
    let file = files[0]
    inicializarProgress()
    previewFile(file)
    uploadFile(file)
}

function uploadFile(file) {
    var url = '/upload'

    var xhr = new XMLHttpRequest()
    xhr.open('POST', url)

    xhr.upload.addEventListener('progress', e => {
        let porcentaje = (e.loaded * 100) / e.total
        actualizarProgress(porcentaje)
    })

    xhr.addEventListener('load', () => {
        if (xhr.status == 200) {
            let nombreImagenSubida = JSON.parse(xhr.response).nombre
            URLImagenSubida = nombreImagenSubida ? ('/uploads/' + nombreImagenSubida) : ''
        }
    })

    var formData = new FormData()
    formData.append('foto', file)

    xhr.send(formData)
}


//*************************** Inicializacion de Alta *******/
async function initAlta() {
    console.warn('initAlta')
    // Buscamos los inputs
    inputs = document.querySelectorAll('.form .form__container input')
    //console.log(inputs)
    // Buscamos el form
    form = document.querySelector('.form')
    // Buscamos el boton
    button = document.querySelector('button')
    // Deshabilitamos el boton
    button.disabled = true
    // Obtemenmos los productos
    // Modificación 18/01/2022 - Le ponemos la función inicializar que se encuentra en products.js en Modelos.
    productosModel.inicializar(await productosController.obtenerProductos()) // []
    // Mostramos los productos en pantalla
    renderProds(productosModel.obtener())
    // Nota: este es un for inteligente que ademas te da el indice del item en el que estas actualmente. Por eso este forEach tiene '(input, index) =>' en vez de solo 'input =>'
    // Para cada uno de los inputs hacemos lo siguiente:    
    inputs.forEach((input, index) => {
        // Si el input NO es un checkbox
        if (input.type != 'checkbox') {
            // Le agregamos un event listener de input...
            input.addEventListener('input', () => {
                // Que valide el input, usando el regex correspondiente a su indice (index). El indice sería el numero de 
                // input que es (el primero, segundo, tercero, etc).
                // Entonces, para el primer input usa el primer regex, para el segundo input usa el segundo regex y asi...
                validar(input.value, regExpValidar[index], index)
            })
        }
    })
    // En el formulario agregamos un event listener de "submit" (que significa que intentaron enviar el formulario)
    form.addEventListener('submit', async e => {
        // Evitamos que haga el comportamiento default
        e.preventDefault()
        // Creamos un producto en base a los inputs del usuario
        let producto = leerProductoIngresado()
        // Borramos todo lo que escribio el usuario de los inputs
        limpiarFormulario()
        // Guardamos el producto en la lista de productos usando el contoller.
        await productosController.guardarProducto(producto)
    })

    /* ------------- inicialización drag and drop ---------------- */
    dropArea = document.getElementById('drop-area')
    progressBar = document.getElementById('progress-bar')


        ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, e => e.preventDefault())
            document.body.addEventListener(eventName, e => e.preventDefault())
        })

        ;['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => {
                dropArea.getElementsByClassName("drop-area__container")[0].classList.add('highlight')
            })
        })

        ;['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, () => {
                dropArea.getElementsByClassName("drop-area__container")[0].classList.remove('highlight')
            })
        })

    dropArea.addEventListener('drop', e => {
        //console.log(e)
        var dt = e.dataTransfer
        var files = dt.files
        //console.log(files)
        handleFiles(files)
    })

}


// Los datos de Alta que aparecen debajo del formulario; función que tiene estilos para que aparezca y desaparezca cuando se da click:

function menuProductos() {
    var menu = document.getElementsByClassName("listado-productos")[0];
    if (menu.style.display === "none") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
}

