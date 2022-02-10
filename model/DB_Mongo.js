import mongoose from "mongoose"
import config from "../config.js"


class DB_Mongo {
    static conexionOk = false

    static genIdKey(obj) {

        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                obj[i].id = obj[i]._id
            }
        }
        else {
            obj.id = obj._id
        }

        return obj
    }

    static async conectarDB() {
        try {
            if (!DB_Mongo.conexionOk) {
                // Para conectarme a la base de datos necesito definir un string. En la página hay todo un link con el string de conexión para mongoose. Y se hace con una promesa en general. ecommerce es la base de datos que habíamos creado antes a través de la terminal; eligiendola con use ecommerce.
                await mongoose.connect(config.STR_CNX, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
                console.log('Base de Datos Conectada!')

                DB_Mongo.conexionOk = true
            }
        }
        catch (error) {
            console.log(`MongoDB error al conectar: ${error.message}`)
        }
    }
}

export default DB_Mongo







