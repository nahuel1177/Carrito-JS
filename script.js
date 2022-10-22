let precioNotebook = 150000;
let precioDesktop = 180000;

function PrecioNotebook(opcion){
    if(opcion==1){
        let precioFinal = precioNotebook * 1.21;
        alert("El precio final es: " + precioFinal);
    }else {
        alert("El precio sin IVA incluido es: " + precioNotebook);
    }
}

function PrecioDesktop(opcion){
    if(opcion==1){
        let precioFinal = precioDesktop * 1.21;
        alert("El precio final es: " + precioFinal);
    }else {
        alert("El precio sin IVA incluido es: " + precioDesktop);
    }
}

function Menu(opcion) {

    switch (opcion) {

        case '1':
            let precio1 = prompt("¿Desea ver precio con IVA incluido?\n1 - SI\n2 - NO");
            PrecioNotebook(precio1);
            break;
        case '2':
            let precio2 = prompt("¿Desea ver precio con IVA incluido?\n1 - SI\n2 - NO");
            PrecioDesktop(precio2);
            break;
    }
}

let opcionMenu = prompt("Elegi equipo a comprar:\n\n" + "1 - Notebook\n2 - Desktop\n");
Menu(opcionMenu);