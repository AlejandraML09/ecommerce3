//https://www.npmjs.com/package/joi
//https://joi.dev/

import Joi from 'joi'

class ProductoValidation {
    static validar(producto) {
        const productoSchema = Joi.object({
            nombre: Joi.string().min(3).max(35).required(),
            precio: Joi.number().required(),
            stock: Joi.number().required(),
            marca: Joi.string().required(),
            categoria: Joi.string().required(),
            foto: Joi.string().empty(''),
            detalles: Joi.string().required(),
            envio: Joi.boolean().required()
        })

        //const error = productoSchema.validate(producto).error //sin destructuring object
        const { error } = productoSchema.validate(producto) //con destructuring object

        return error
    }
}


export default ProductoValidation