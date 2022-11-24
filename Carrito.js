export class Carrito {
    
    constructor(productos, importeTotal){

      this.productos = new Array();
      this.importeTotal = importeTotal;

    }

    agregarProducto(object){

        this.productos.push(object);

    }

    quitarProducto(object){

        const filteredProducts = this.productos.filter((item) => item.id !== object.id);
        return filteredProducts;

    }

    mostrarProductos(){

        this.productos.forEach((producto) => {

            let content = document.createElement("div");
            content.className = "card";
            content.innerHTML = `
            <div class="card-body">
            <h6 class="card-title">${producto.tipo} ${producto.descripcion}</h6>
            <p class="card-text">$${producto.precio}</p>
            </div>`;
        
            shopContent.append(content);
        })
    }


    sumarImportes(){

        this.productos.forEach((producto)=> {

            this.importeTotal = this.importeTotal + producto.precio;

        })

        return this.importeTotal;
    }

    obtenerImporte(){

        return this.importeTotal;

    }

    obtenerCantidadProductos(){

        let lengthCarrito = this.productos.length;
        console.log(lengthCarrito);
    }

}