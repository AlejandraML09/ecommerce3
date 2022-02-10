class CarritoService {
    URL_CARRITO = '/api/carrito/' // https://61dd84a6f60e8f0017668897.mockapi.io/carrito/'

    // Usamos este método de servicio para que el controlador use este método para guardarlo en la nube. 
    async guardarCarrito(carrito) {
        let carritoGuardado = await http.post(this.URL_CARRITO, carrito)
        return carritoGuardado
    }
}

const carritoService = new CarritoService()