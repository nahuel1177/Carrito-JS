const producto1 = {

    id: 0,
    nombre: 'Desktop',
    precio: 130,

}

const producto2 = {

    id: 1,
    nombre: 'Laptop',
    precio: 350,

}

const producto3 = {

    id: 2,
    nombre: 'Keyword',
    precio: 120,

}

const producto4 = {

    id: 3,
    nombre: 'Mouse',
    precio: 90,

}

function itemAgregado() {

    alert('Producto agregado al carrito!');

}

function agregarCarrito(opcion) {

    switch (opcion) {

        case '1': carrito.push(producto1.precio);
            itemAgregado();
            break;
        case '2': carrito.push(producto2.precio);
            itemAgregado();
            break;
        case '3': carrito.push(producto3.precio);
            itemAgregado();
            break;
        case '4': carrito.push(producto4.precio);
            itemAgregado();
            break;
    }
}

function sumarTotal() {

    let total = carrito.reduce((a, b) => a + b, 0)

    return total;
}

function Venta() {

    if (carrito.length != 0) {
        var monto = sumarTotal();
        alert('El monto a pagar es: $' + monto + '\nGracias por su compra!');
    }
}

function Cierre(){
    if(venta == true){
        Venta();
        }else alert('No hay realizado compras. Gracias por visitar nuestro Sitio!');
}

function Menu() {
    venta = true;
    var opcion = prompt("Elige producto:\n\n" + "1 - Notebook\n2 - Desktop\n3 - Teclado\n4 - Mouse\n0 - Terminar Compra");

    while (opcion != 0) {

        if ((opcion < 0) || (opcion > 4)) {
            alert('No tenemos ese producto');
            Menu();
        }

        while ((opcion > 0) && (opcion < 5)) {

            agregarCarrito(opcion);
            opcion = prompt("Elige producto:\n\n" + "1 - Notebook\n2 - Desktop\n3 - Teclado\n4 - Mouse\n0 - Terminar Compra");

        }
    }
    if (carrito.length == 0) {
        let opcion2 = prompt('No hay productos en su carrito.\nEsta seguro que no desea comprar?\n1 - Seguir Comprando\n2 - Cerrar Carrito')
        switch (opcion2) {
            case '1': Menu();
                break;
            case '2': venta = false;
                break;
        }
    }

}

var carrito = [];
let venta;
Menu();
Cierre();


