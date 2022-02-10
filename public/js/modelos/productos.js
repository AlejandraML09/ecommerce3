class ProductosModel {
    productos = []
    // Modificación 18/01/2022 - Acá van los Productos para Inicializar el Modelo - De esta manera inicializaría el modelo de una manera mejor que el del alta.js en InitAlta() (el productosModel) - Esto tiene que ver con algo de programación orientada a objetos.
    inicializar(productos) {
        this.productos = productos

    }
    // El find es para buscar un elemento dentro de un array. Si el producto.id coincide con el id que le paso como parametro, entonces ese producto es el que cargamos.
    obtener(id) {
        if (id) {
            let producto = this.productos.find(producto => producto.id == id)
            return producto
        } else {
            return this.productos
        }
    }

    guardar(producto) {
        this.productos.push(producto)
    }

    actualizar(id, producto) {
        let index = this.productos.findIndex(prod => prod.id == id)
        this.productos.splice(index, 1, producto)
    }

    borrar(id) {
        let index = this.productos.findIndex(prod => prod.id == id)
        this.productos.splice(index, 1)
    }
}

const productosModel = new ProductosModel()

