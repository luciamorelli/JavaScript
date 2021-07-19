const compra = new Carrito();
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');

cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    //Eliminar productos del carrito
    carrito.addEventListener('click', (e) => { compra.eliminarProducto(e) });
    compra.calcularTotal();

    //cuando se selecciona procesar Compra
    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });

};

