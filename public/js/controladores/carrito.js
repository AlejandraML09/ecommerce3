class CarritoController {
    constructor() {
        try {
            carritoModel.inicializar(
                JSON.parse(localStorage.getItem("carrito")) || []
            );
        } catch {
            carritoModel.inicializar([]);
            localStorage.setItem("carrito", carritoModel.obtener());
        }
    }
    agregarAlCarrito(producto) {
        if (!carritoModel.productoExiste(producto)) {
            producto.cantidad = 1;
            // Guardar es el método que se encuentra en el modelo carrito.js
            carritoModel.guardar(producto);
        }
        // Si el producto existe, lo que hago es obtener ese producto del carrito y le aumento la cantidad.
        else {
            let productoDeCarrito = carritoModel.obtenerProducto(producto);
            productoDeCarrito.cantidad++;
        }
        
        //  Esta es una función que agregué para que cada vez que se agregan productos en el carrito; se actualicé en el badge de notificaciones roja arriba.
        this.updateBadge();
        // Cada vez que agreguemos un producto lo vamos a persistir ahí.
        localStorage.setItem("carrito", JSON.stringify(carritoModel.obtener()));

    }
    async borrarProducto(id) {
        console.log("borrarProducto", id);
        // Cada vez que borro un producto del carrito, guardo todo de nuevo en el localStorage
        carritoModel.borrar(id);
        localStorage.setItem("carrito", JSON.stringify(carritoModel.obtener()));
        //Una vez que borramos el carrito y llamamos al localStorage, lo llamo acá y obtengo el carrito y se refresca de nuevo lo que se ve.
        // Esta es una función que agregué para que cada vez que se borra la cantidad de productos en el carrito; se actualicé en el badge de notificaciones roja arriba.
        this.updateBadge();
        await renderCarrito(carritoModel.obtener());

    }
    // La idea es crear un servicio para que mande todo a la nube. El controlador carrito debe usar un servicio que basicamente lo envie
    async enviarCarrito() {
        var elemSectionCarrito = document.querySelector(".section-carrito");
        elemSectionCarrito.innerHTML = "<h2>Enviando Carrito...<h2>";
        // Envio al carrito al backend
        await carritoService.guardarCarrito(carritoModel.obtener());
        elemSectionCarrito.innerHTML = "<h2>Carrito Enviado!<h2>";
        //Borrando el carrito del modelo y del local storage porque ya se envió
        carritoModel.inicializar([]);
        localStorage.setItem("carrito", carritoModel.obtener());
        // ------ cierro la ventana del menú del carrito un tiempo después ------
        setTimeout(() => {
            elemSectionCarrito.classList.remove("section-carrito--visible");
            mostrarCarrito = false;
        // Acá utilizamos la función después del timeout para que la notificación se actualicé una vez que el carrito se manda al "backend"
            this.updateBadge();
        }, 1500);
    }

    updateBadge() {
        // Consigo el id dónde va a ir la notificación de cuantos productos hay en el carrito.
        let badge = document.getElementById("cart-badge");
        // Se pone dentro del Id en el innerhtml la cantidad de productos. La función getProductsAmount determina la cantidad de productos que hay en el carrito.
        badge.innerHTML = carritoModel.getProductsAmount()
    }
}

const carritoController = new CarritoController();
