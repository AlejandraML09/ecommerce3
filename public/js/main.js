//Funcion para simplificar los llamados HTTP.
// Con esto obtengo el HTML que yo quiera, así cuando la página carga veo el contenido del HTML.
// si hacemos ajax('plantillas/alta.html') va a enviar un request de tipo GET, que va a intentar conseguir el archivo 'plantillas/alta.html'
// si hacemos ajax('plantillas/alta.html', 'post') va a enviar un request de tipo POST, hacia la URL donde está 'plantillas/alta.html'
function ajax(url, metodo) {
    let xhr = new XMLHttpRequest
    xhr.open(metodo || 'get', url)
    xhr.send()

    return xhr
}

// Dado un id, obtiene un archivo.
// Por ejemplo, si le pedimos el archivo del id 'alta', nos va a devolver 'plantillas/alta.html'
function getNombreArchivo(id) {
    return 'plantillas/' + id + '.html'
}


/**
 * Dado un id de página, esta funcion corre la funcion de inicialización de cada pagina correspondiente.
 * Estas funciones están en el archivo .js correspondiente
 * Por ejemplo, la funcion initNosotros() está en nosotros.js
 * Función que dado un id corre la función de incialización correspondiente 
    Ej = Si yo corro initJS("inicio"), se va a correr la función de incialización de inicio.js
*/

function initJS(id) {
    switch (id) {
        /* inicializo el código de la plantilla de inicio */
        case 'inicio':
            initInicio()
            break
        /* inicializo el código de la plantilla de alta */
        case 'alta':
            initAlta()
            break
        /* inicializo el código de la plantilla de contacto */
        case 'contacto':
            initContacto()
            break
        /* inicializo el código de la plantilla de nosotros */
        case 'nosotros':
            initNosotros()
            break
        /* inicializo el código de la plantilla por defecto */
        default:
            initInicio()
    }
}

/**
 * Dado un id de página, pone en el elemento main el contenido de esa plantilla.
 * Por ejemplo, si hacemos cargarPlantilla('nosotros'), en el main se va a ver el contenido de nosotros.html
 * 
 */
function cargarPlantilla(id) {
    let main = document.querySelector('main')
    let archivo = getNombreArchivo(id)
    let xhr = ajax(archivo)
    xhr.addEventListener('load', () => {
        if (xhr.status = 200) {

            //Cargo el HTML de la plantilla elegida
            main.innerHTML = xhr.response
            //Cargo el JS de la plantilla elegida -> Acá se inicializan las cosas (como cards)
            initJS(id)
        }
    })
}

/* ----------------------------------------------------------------------------- */
/*     Carga de las vistas/plantillas de navegación dentro del elemento main     */
/* ----------------------------------------------------------------------------- */

function iniPlantillas() {
    let links = document.querySelectorAll('a')
    //console.log(links)

    /* --------------------------------------------- */
    /*           Carga de la vista inicial           */
    /* --------------------------------------------- */
    let id = location.hash.slice(1) || 'inicio'
    cargarPlantilla(id)

    /* --------------------------------------------- */
    /*       Carga de la vista de navegación         */
    /* --------------------------------------------- */
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()

            let id = link.id
            //console.log(id)
            location.hash = id
        })
    })

    window.addEventListener('hashchange', () => {
        //console.log('La url cambió')

        let id = location.hash.slice(1) || 'inicio'

        cargarPlantilla(id)
    })
}

/**
 * Funcion que llama a las funciones de inicialización
 * Se llama siempre una sola vez, al cargar la página (ver ultima linea de este archivo)
 */
function start() {
    console.warn('start...')
    iniPlantillas()
}

start()