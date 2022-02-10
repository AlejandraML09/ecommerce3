class CarritoModel {
    carrito = []
    inicializar(productos) {
        this.carrito = productos

    }
    // El find es para buscar un elemento dentro de un array. Si el producto.id coincide con el id que le paso como parametro, entonces ese producto es el que cargamos.
    obtener(id) {
        if (id) {
            let producto = this.carrito.find(producto => producto.id == id)
            return producto
        } else {
            return this.carrito
        }
    }
    // Si esto devuelve un valor distinto de 0 implica que existe. Es decir esto chequea si el producto existe o no dentro del carrito. Filter lo que hace es crear un array nuevo dónde los elementos del array van a ser elegidos por lo que devuelva la función callback. Lo que busco es si ese id de producto existe en los elementos del carrito o no.
    productoExiste(producto) {
        return this.carrito.filter(prod => prod.id == producto.id).length
    }

    // Al obtener el producto (y si existía me va a devolver en que cantidad tenía)
    obtenerProducto(producto) {
        return this.carrito.find(prod => prod.id == producto.id)
    }

    guardar(producto) {
        this.carrito.push(producto)
    }

    actualizar(id, producto) {
        let index = this.carrito.findIndex(prod => prod.id == id)
        this.carrito.splice(index, 1, producto)
    }

    borrar(id) {
        let index = this.carrito.findIndex(prod => prod.id == id)
        this.carrito.splice(index, 1)
    }

// Esto da la cantidad de productos que hay en el carrito.
    getProductsAmount() {
        return this.carrito.length
    }
}

const carritoModel = new CarritoModel()

