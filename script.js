import { Carrito } from "./Carrito.js";

let shopContent = document.getElementById("cardsContainer");
let carrito = new Carrito();
let cantCarrito = 0;
let flag = 0;
let i = 0;

cargarProductos();

function cargarProductos() {

    let content = document.getElementById("cardsContainer");
    content.innerHTML = '';

    fetch("./productos.json")
        .then(res => res.json())
        .then(data => data.productos.forEach((producto) => {

            let content = document.createElement("div");
            content.className = "card";
            content.id = "listado";
            content.innerHTML = `
        <img src="${producto.imagen}" class="card-img-top">
        <div class="card-body">
        <h6 class="card-title">${producto.tipo} ${producto.descripcion}</h6>
        <p class="card-text">$${producto.precio}</p>
        </div>`;

            shopContent.append(content);

            let agregar = document.createElement("button");
            agregar.className = "btn btn-outline-primary";
            agregar.innerText = "Agregar";
            agregar.id = "btnAgregar";
            agregar.addEventListener("click", llamarBtnAgregar);

            function llamarBtnAgregar() {

                flag = 1;

                const productoJSON = JSON.stringify(producto);
                addProductoSt(i, productoJSON);
                i++;
                Swal.fire({
                    title: 'Tu Compra',
                    text: 'Producto agregado',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Aceptar'
                })
                cantCarrito = document.getElementById("cantidadCarrito");
                cantCarrito.innerHTML = `${localStorage.length}`;
            }
            content.append(agregar);

        }))
}

let btnCarrito = document.getElementById("btnCarrito");
btnCarrito.addEventListener("click", mostrarCarrito);

function mostrarCarrito() {

    let items = '';
    let importeTotal = 0;

    for (const key in localStorage) {
        {
            const productoJSON = localStorage.getItem(key);
            const producto = JSON.parse(productoJSON);
            if (flag == 0) {

                Swal.fire({
                    title: 'Carrito Vacio',
                    icon: 'warning',
                    confirmButtonColor: '#3085d6',
                  });
                break;
            } else {
                items = items + '<tr>' + '<td>' + producto.tipo + '</td>' + '<td align="center">' + producto.descripcion + '</td>' +
                    '<td align="right">' + '$' + producto.precio + '</td>' + '</tr>';
                importeTotal = importeTotal + producto.precio;
            }
        }

        Swal.fire({
            title: 'Tu Compra',
            html: `<div class="container">
                <table class="table table-hover">
                <tr>
                    <td>Tipo</td>
                    <td align="center">Descripcion</td>
                    <td align="right">Precio</td>
                </tr>
                    ${items}
                </table>
                </div><br>
               <div table class="table table-hover">Total a Pagar: $${importeTotal}</p>`,
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            focusConfirm: false,
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Comprar',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
                '<i class="fa fa-thumbs-down"></i> Volver',
            cancelButtonAriaLabel: 'Thumbs down',
        
        }).then((result) => {
            if (result.isConfirmed) {
                cleanStorage();
                flag = 0;
                cantCarrito = document.getElementById("cantidadCarrito");
                cantCarrito.innerHTML = null;

                const procesarPago = () => {
                    return new Promise((resolve, reject) => {
                        resolve(setTimeout(() => {
                            Swal.fire(
                                '',
                                'Su pago ha sido procesado.',
                                'success',
                            )
                        }, 2000))
                        
                        Swal.fire({
                            html: 'Estamos procesando su pago.',
                            didOpen: () => {
                                Swal.showLoading()
                                timerInterval = setInterval(() => {
                                }, 100)
                            }
                        })
                    })
                }
                procesarPago();
            }
        })
    }
}

//  ---Para categorias---

let btnInicio = document.getElementById('btnInicio');
btnInicio.addEventListener("click", cargarProductos);

let btnCPU = document.getElementById('btnCPU');
btnCPU.addEventListener("click", procesadores);


function procesadores() {

    let content = document.getElementById("cardsContainer");
    content.innerHTML = '';

    mostrarProductosCat('Procesador');

}

let btnMothers = document.getElementById('btnMothers');
btnMothers.addEventListener("click", motherboards);

function motherboards() {

    let content = document.getElementById("cardsContainer");
    content.innerHTML = '';

    mostrarProductosCat('Motherboard');

}

let btnMemorias = document.getElementById('btnMemorias');
btnMemorias.addEventListener("click", memorias);

function memorias() {

    let content = document.getElementById("cardsContainer");
    content.innerHTML = '';

    mostrarProductosCat('Memoria');

}

let btnDiscos = document.getElementById('btnDiscos');
btnDiscos.addEventListener("click", discos);

function discos() {

    let content = document.getElementById("cardsContainer");
    content.innerHTML = '';

    mostrarProductosCat('Almacenamiento');

}

let btnVideo = document.getElementById('btnVideo');
btnVideo.addEventListener("click", videos);

function videos() {

    let content = document.getElementById("cardsContainer");
    content.innerHTML = '';

    mostrarProductosCat('Placa de Video');

}

let btnFuentes = document.getElementById('btnFuentes');
btnFuentes.addEventListener("click", fuentes);

function fuentes() {

    let content = document.getElementById("cardsContainer");
    content.innerHTML = '';

    mostrarProductosCat('Fuente');

}

let btnGabinetes = document.getElementById('btnGabinetes');
btnGabinetes.addEventListener("click", gabinetes);

function gabinetes() {

    let content = document.getElementById("cardsContainer");
    content.innerHTML = '';

    mostrarProductosCat('Gabinete');

}

let btnCoolers = document.getElementById('btnCoolers');
btnCoolers.addEventListener("click", coolers);

function coolers() {

    let content = document.getElementById("cardsContainer");
    content.innerHTML = '';

    mostrarProductosCat('Cooler');

}

let btnMonitores = document.getElementById('btnMonitores');
btnMonitores.addEventListener("click", monitores);

function monitores() {

    let content = document.getElementById("cardsContainer");
    content.innerHTML = '';

    mostrarProductosCat('Monitor');

}

let btnPerifericos = document.getElementById('btnPerifericos');
btnPerifericos.addEventListener("click", perifericos);

function perifericos() {

    let content = document.getElementById("cardsContainer");
    content.innerHTML = '';

    mostrarProductosCat('Mouse');
    mostrarProductosCat('Teclado');

}

function mostrarProductosCat(tipoProducto) {

    fetch("./productos.json")
        .then(res => res.json())
        .then(data => data.productos.forEach((producto) => {

            if (producto.tipo == tipoProducto) {

                let content = document.createElement("div")

                content.className = "card";
                content.id = "listado";
                content.innerHTML = `
            <img src="${producto.imagen}" class="card-img-top">
            <div class="card-body">
            <h6 class="card-title">${producto.tipo} ${producto.descripcion}</h6>
            <p class="card-text">$${producto.precio}</p>
            </div>`;

                shopContent.append(content);

                let comprar = document.createElement("button")
                comprar.className = "btn btn-outline-primary";
                comprar.innerText = "Agregar"
                comprar.id = "btnAgregar"
                comprar.addEventListener("click", llamarBtnAgregar)

                function llamarBtnAgregar() {

                    flag = 1;

                    const productoJSON = JSON.stringify(producto);
                    addProductoSt(i, productoJSON);
                    i++;
                    Swal.fire({
                        title: 'Tu Compra',
                        text: 'Producto agregado',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Aceptar'
                    })
                    cantCarrito = document.getElementById("cantidadCarrito");
                    cantCarrito.innerHTML = `${localStorage.length}`;
                }
                content.append(comprar)
            }
        }))
}

function addProductoSt(clave, producto) {

    localStorage.setItem(clave, producto);
}

function getProductoSt(clave) {

    let activo = localStorage.getItem(clave);

    return activo;
}

function c(clave, producto) {

    localStorage.removeItem(clave, producto);
}

function cleanStorage() {

    localStorage.clear();
}