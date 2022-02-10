// Modificación 18/01/2022
// Muestra los productos que se le pasen por parametro en pantalla
function renderCards(productos) {
    // Obtiene la plantilla inicio.hbs (plantilla de Handlebars)
    fetch('vistas/inicio.hbs')
        // Se queda solo con el texto
        .then(r => r.text())
        .then(plantilla => {
            // compile the template
            var template = Handlebars.compile(plantilla);

            let keyboardsContainer = document.getElementById("keyboard-container")
            let headsetsContainer = document.getElementById("headsets__container")
            let microphonesContainer = document.getElementById("microphones__container")

            // let teclados = []
            // let microfonos = []
            // let headsets = []


            // for (productoCategoria of productos) {
            //     if (productoCategoria.categoria == "teclados") {
            //         teclados.push(productoCategoria)
            //     }
            //     else if (productoCategoria.categoria == "microfono") {
            //         microfonos.push(productoCategoria)
            //     }
            //     else {
            //         headsets.push(productoCategoria)
            //     }
            // }

            // Le pasa a la plantilla los productos que tiene que mostrar
            let tecladoHtml = template({
                productos: productos.filter((elem) => {
                    return elem.categoria == "teclados"
                })
            });

            let microfonosHtml = template({
                productos: productos.filter((elem) => {
                    return elem.categoria == "microfono"
                })
            })

            let headsetsHtml = template({
                productos: productos.filter((elem) => {
                    return elem.categoria == "headsets"
                })
            });

            keyboardsContainer.innerHTML = tecladoHtml;
            headsetsContainer.innerHTML = headsetsHtml;
            microphonesContainer.innerHTML = microfonosHtml;
        })
}

// Modificación 18/01/2022 - Esto recibe el id - Todo el código de inicio rige cuando está cargada la plantilla de vista de inicio.html y en inicio.html (en .cards-container) está cargado todo. Nosotros tenemos los productos en el modelo, el modelo es una capa en nuestro desarrollo que nos permite interactuar con los productos. 
function agregarAlCarrito(id) {
    let producto = productosModel.obtener(id)
    // Este controlador agrega el carrito al modelo
    carritoController.agregarAlCarrito(producto)
}

// Modificación 18/01/2022
async function initInicio() {
    console.warn("initInicio")
    // Modificación 18/01/2022 - Le ponemos la función inicializar que se encuentra en products.js en Modelos.
    productosModel.inicializar(await productosController.obtenerProductos()) // []
    let productos = productosModel.obtener()
    // Mostramos los productos en pantalla
    renderCards(productos)
    let lg = productos.length
    // Mostramos la cantidad de productos -> Usamos operador ternario para que si NO hay nada en productos.length (o sea no hay productos), que no muestre el mensaje.
    document.querySelector(".card-category-container h1").innerHTML = lg ? `Se encontraron ${lg} productos` : ""

}

// Para que se de vuelta la card. Esta es la función que se corre cuando haces una click en una card. (inicio.hbs).
function toggleCard(cardId) {
    let card = document.getElementById("card-" + cardId)
    let cardContent = card.getElementsByClassName("card__content")[0];
    cardContent.classList.toggle("card--flipped");

}

// Scrollea a los Banners
function scrollToElement(id) {
    const element = document.getElementById(id);
    element.scrollIntoView()
}


// Updatea el carrito. Esto se hace para cuando la página carga por primera vez. Porque sino el updateBadge sólo se corre cuando agregamos o sacamos un producto del carrito. Por lo tanto; si no corremos esta función al menos 1 vez (cuando carga la página) podríamos tener items en el carrito y que el badge diga 0 hasta que no saquemos u agreguemos un nuevo item.
carritoController.updateBadge();