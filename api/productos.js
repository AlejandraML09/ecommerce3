// De esta forma lo hacemos más dinámico, persistente y configurable. Podemos cambiar el archivo y no debemos cambiar la capa de ruteo ni nada.
// import ProductosModelMem from "../model/productos-mem.js"
// import ProductosModelFile from "../model/productos-file.js"
// A través de mongodb
//import ProductosModelMongoDB from '../model/productos-mongodb.js'

// Acá traemos a la Factory
import ProductosModel from "../model/productos.js"

// Acá importamos el config dónde va a estar la persistencia que nosotros elegimos.
import config from "../config.js"

import ProductoValidation from "./validaciones/productos.js"

// const model = new ProductosModelMem()
// const model = new ProductosModelFile()
// const model = new ProductosModelMongoDB()
// Acá le pasamos el tipo de persistencia que queremos elegir. La persistencia la leemos desde el config. La persistencia en mi caso es MongoDB.
const model = ProductosModel.get(config.TIPO_DE_PERSISTENCIA)


const obtenerProductos = async () => {
    let productos = await model.readProductos()
    return productos
}

const obtenerProducto = async id => {
    let producto = await model.readProducto(id)
    return producto
}


const guardarProducto = async producto => {
    const errorvalidation = ProductoValidation.validar(producto)
    if (!errorvalidation) {
        let productoGuardado = await model.createProducto(producto)
        return productoGuardado
    }
    else {
        console.log(`Error en guardarProducto`, errorvalidation.details[0].message)
        return {}
    }
}

const actualizarProducto = async (id, producto) => {
    const errorvalidation = ProductoValidation.validar(producto)
    if (!errorvalidation) {
        let productoActualizado = await model.updateProducto(id, producto)
        return productoActualizado
    }
    else {
        console.log(`Error en actualizarProducto`, errorvalidation.details[0].message)
        return {}
    }
}


const borrarProducto = async id => {
    let productoBorrado = await model.deleteProducto(id)
    return productoBorrado
}


export default {
    obtenerProductos,
    obtenerProducto,
    guardarProducto,
    actualizarProducto,
    borrarProducto
}