import ProductosModelMem from "./productos-mem.js"
import ProductosModelFile from "./productos-file.js"
import ProductoModelMongoDB from "./productos-mongodb.js"

class ProductoModel {
    // Recibe el tipo de persistencia con el cuál yo voy a trabajar
    static get(tipo) {
        switch (tipo) {
            case 'MEM':
                console.log('Persistencia en Memoria(productos)')
                // Retorno el modelo directamente.
                return new ProductosModelMem()

            case 'FILE':
                console.log('Persistencia en File System(productos)')
                return new ProductosModelFile()

            case 'MONGODB':
                console.log('Persistencia en MongoDB(productos)')
                return new ProductoModelMongoDB()

            default:
                console.log('Persistencia Default(MEM)(productos)')
                return new ProductosModelMem()
        }
    }
}

export default ProductoModel