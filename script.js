import data from './productos.json' assert { type: 'json'};
import { Carrito } from "./Carrito.js";


let shopContent = document.getElementById("cardsContainer");
let carrito = new Carrito();
let lengthCarrito = 0;
let cantCarrito = 0;
let flag = 0;
let i=0;
data.productos.forEach((producto) => {

    let content = document.createElement("div");
    content.className = "card";
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

        //carrito.agregarProducto(producto);
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
})

let btnCarrito = document.getElementById("btnCarrito");
btnCarrito.addEventListener("click", mostrarCarrito);

function mostrarCarrito() {

    let items='';
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
                    confirmButtonText:
                        '<i class="fa fa-thumbs-up"></i>Volver'
                });
                break;
            } else {
                items = items + '<tr>' + '<td>' + producto.tipo + '</td>' + '<td align="center">' + producto.descripcion + '</td>' +
                    '<td align="right">' + '$' + producto.precio + '</td>' + '<td align="center">'
                    //<button type="button" class="btn btn-outline-danger" id="btnDel" onclick="eliminarItem(producto.id,productoJSON)">x</button></td>'
                    + '</tr>';
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
                '<i class="fa fa-thumbs-up"></i> Volver',
            cancelButtonAriaLabel: 'Thumbs down'
        }).then((result) => {
            if (result.isConfirmed) {
                cleanStorage();
                flag = 0;
                cantCarrito = document.getElementById("cantidadCarrito");
                cantCarrito.innerHTML = null;
                Swal.fire(
                    '',
                    'Su pago ha sido procesado.',
                    'success',
                )
            }
        })

    }

}

function eliminarItem(key, producto) {
    removeProductoSt(key, producto);
}

//  ---Para categorias---
// function mostrarProductos(tipoProducto) {

//     let shopContent = document.getElementById("cardsContainer")

//     data.productos.forEach((producto) => {

//         if (producto.tipo == "tipoProducto") {

//             let content = document.createElement("div")
//             content.className = "card"
//             content.innerHTML = `
//         <img src="${producto.imagen}" class="card-img-top">
//         <div class="card-body">
//         <h6 class="card-title">${producto.tipo} ${producto.descripcion}</h6>
//         <p class="card-text">$${producto.precio}</p>
//         </div>`;

//             shopContent.append(content)

//             let comprar = document.createElement("button")
//             comprar.className = "btn btn-outline-primary";
//             comprar.innerText = "Agregar"
//             comprar.id = "btnAgregar"
//             comprar.addEventListener("click", llamarBtnAgregar)

//             function llamarBtnAgregar() {

//                 carrito.agregarProducto(producto);
//                 console.log(carrito.productos);

//                 Swal.fire({
//                     title: 'Carrito',
//                     text: 'Producto agregado',
//                     icon: 'success',
//                     confirmButtonColor: '#3085d6',
//                     confirmButtonText: 'Aceptar'
//                 })
//             }
//             content.append(comprar)
//         }
//     })
// }

function addProductoSt(clave, producto) {

    localStorage.setItem(clave, producto);

}

function getProductoSt(clave) {

    let activo = localStorage.getItem(clave);

    return activo;
}

function removeProductoSt(clave, producto) {

    localStorage.removeItem(clave, producto);

}

function cleanStorage() {

    localStorage.clear();

}

