
const boton = document.querySelectorAll('#button');
const listaProductos = document.getElementById('lista');
const alerta = document.querySelector('#alerta');
const botonContinuar = document.querySelector('#continuar');
const alertaCarroVacio = document.querySelector('#carroVacio');
const listaCompra = document.getElementById("lista-compra--carrito");
$(alerta).hide();
$(alertaCarroVacio).hide();



//AJAX CON JQUERY tomar el email del usuario que se suscribe en Newsletter
$('form.ajax').on('submit', function() {
    var dato = $('form.ajax'),
    url = dato.attr('action'),
    type = dato.attr('method'),
    info = {};

    //buco sobre todos los elementos que tengan atributo name(me importa el email)
    dato.find('[name]').each(function(index, value){
        var dato =$(this),
        nombre= dato.attr('name'),
        valor= dato.val();

        info[nombre] = valor;

        $.post("https://jsonplaceholder.typicode.com/posts", info).done(function (respuesta, estado){

            console.log("El usuario ingreso el mail:"+ info[nombre]);
               console.log(estado);}  
            );
    
    });
    
    return false;
});


//Carrito
class Carrito {

  //Añadir producto al carrito
  comprarProducto(e){
      e.preventDefault();
      //Delegado para agregar al carrito
      if(e.target.classList.contains('agregar-carrito')){
          const producto = e.target.parentElement.parentElement;
          //Enviamos el producto seleccionado para tomar sus datos
         this.leerDatosProducto(producto);
      //Aumentar span
         const botonSpan =document.querySelector('#span');
        
        for (let i = 0; i < 100; i++) {
        let resultado = producto * i;
        $(botonSpan).text([resultado]);;
      }
        }
      }

 
  //Leer datos del producto
leerDatosProducto(producto){
      const infoProducto = {
          imagen : producto.querySelector('img').src,
          titulo: producto.querySelector('h4').textContent,
          precio: producto.querySelector('.precio').textContent,
          id: producto.querySelector('button').getAttribute('data-id'),
          cantidad: 1
        }
      
        let productosLS; //CUANDO CLICLKEE VARIAS VECES ME SUME EN CANTIDADES
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS){
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id; //SI COINCIDE EL PRODUCTO SELECCIONAL CON ID 
            }
        });

        if(productosLS === infoProducto.id){ //NOS MUESTRE ESTOS DATOS SI SE DA ESTA COMPARACION
          $(alerta).show();
          botonContinuar.onclick = () => {this.insertarCarrito(infoProducto)|| $(alerta).hide();};
          }
        else { // sino que lo muestre
           this.insertarCarrito(infoProducto);
    }

  
}
  //muestra producto seleccionado en carrito
  insertarCarrito(producto){
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>
              <img src="${producto.imagen}" width=100>
          </td>
          <td>${producto.titulo}</td>
          <td>${producto.precio}</td>
          <td>
              <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
          </td>
      `;
      listaProductos.appendChild(row);
    this.guardarProductosLocalStorage(producto);
  }

 

  
  
  //Eliminar el producto del carrito en el DOM
  eliminarProducto(e){
    e.preventDefault();
    let producto, productoID;
    if(e.target.classList.contains('borrar-producto')){
      e.target.parentElement.parentElement.remove();
      producto = e.target.parentElement.parentElement;
      productoID = producto.querySelector("a").getAttribute('data-id');
    }

    this.eliminarProductoLocalStorage(productoID);
    this.calcularTotal(); //ELIMINA EN CARRITO.HTML CUALDO ELIMINO SACA DEL TOTAL

  }
   //Elimina todos los productos
 vaciarCarrito(e){
  e.preventDefault();
  while(listaProductos.firstChild){
      listaProductos.removeChild(listaProductos.firstChild);
  }
  this.vaciarLocalStorage();// Eliminar todos los datos del LS CUANDO ELIMINEMOS EN CARRITO

  return false;
}

 //Almacenar en el LS
 guardarProductosLocalStorage(producto){
  let productos;
  //Toma valor de un arreglo con datos del LS
  productos = this.obtenerProductosLocalStorage();
  //Agregar el producto al carrito
  productos.push(producto);
  //Agregamos al LS
  localStorage.setItem('productos', JSON.stringify(productos));
}


//Comprobar que hay elementos en el LS
obtenerProductosLocalStorage(){
  let productoLS;

  //Comprobar si hay algo en LS
  if(localStorage.getItem('productos') === null){
      productoLS = []; // si no obtiene nada queda en vacio
  }
  else {
      productoLS = JSON.parse(localStorage.getItem('productos'));
  }
  return productoLS;
}
  
//leer ptos local storage cuando reiniciamos pagina
  //Mostrar los productos guardados en el LS
    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            //Construir plantilla
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>
            `;
            listaProductos.appendChild(row);
        });
    }

  

//Mostrar los productos guardados en el LS en carrito.html
    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            const row = document.createElement('tr'); // APAREZCAN LOS DATOS 
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td id='subtotales'>${producto.precio * producto.cantidad}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${producto.id}"></a>
                </td>
            `;
            listaCompra.appendChild(row);
  

          });
          
    }


//Eliminar producto por ID del LS (cuando elimino en el DOM que me elimine en el LS)
eliminarProductoLocalStorage(productoID){
  let productosLS;
  //Obtenemos el arreglo de productos
  productosLS = this.obtenerProductosLocalStorage();
  //Comparar el id del producto borrado con LS
  productosLS.forEach(function(productoLS, index){
      if(productoLS.id === productoID){
          productosLS.splice(index, 1);
      }
  });

  //Añadimos el arreglo actual al LS
  localStorage.setItem('productos', JSON.stringify(productosLS));
}

//Eliminar todos los datos del LS CUANDO ELIMINEMOS EN CARRITO
vaciarLocalStorage(){
  localStorage.clear();
}



//Procesar pedido
    procesarPedido(e){
        e.preventDefault();
        if(this.obtenerProductosLocalStorage().length === 0){
          //Alerta 'El carrito está vacío, agrega algún producto'  
          $(alertaCarroVacio).show();
        }
        else {
            location.href = "carrito.html";
        }
    }
  
 //Calcular montos
    calcularTotal(){
        let productosLS;
        let total = 0, igv = 0, subtotal = 0;
        productosLS = this.obtenerProductosLocalStorage();
        for(let i = 0; i < productosLS.length; i++){
            let element = Number(productosLS[i].precio * productosLS[i].cantidad);
            total = total + element;
            
        }
        
        igv = parseFloat(total * 0.21).toFixed(2);
        subtotal = parseFloat(total-igv).toFixed(2);

        document.getElementById('subtotal').innerHTML = "$/. " + subtotal;
        document.getElementById('igv').innerHTML = "$/. " + igv;
        document.getElementById('total').value = "$/. " + total.toFixed(2);
    }
  }
/*    obtenerEvento(e) {
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains('cantidad')) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');
            productosLS = this.obtenerProductosLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;                    
                    actualizarMontos[index].innerHTML = Number(cantidad * productosLS[index].precio);
                }    
            });
            localStorage.setItem('productos', JSON.stringify(productosLS));
            
        }
        else {
            console.log("click afuera");
        }
    }
}*/
