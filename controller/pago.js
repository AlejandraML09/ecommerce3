// SDK de Mercado Pago
import mercadopago from "mercadopago"

// Agrega credenciales
mercadopago.configure({
    access_token: "APP_USR-6159093155056510-021114-eaf19acff0d7bbc7b6c95077806709cf-237472433"
});

console.log(`Configuración del SDK de Mercado Pago OK!`)

const feedBack = (req, res) => {
    let info = {
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    }

    console.log(info)

    res.redirect('/')
}

export default {
    feedBack
}