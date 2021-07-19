/*CONSTANTES*/
const boton = document.querySelectorAll('#button');
const listaProductos = document.getElementById('lista');
const botonContinuar = document.querySelector('#continuar');
const alertaCarroVacio = document.querySelector('#carroVacio');
const listaCompra = document.getElementById("lista-compra--carrito");
const carroVacio = document.getElementById("carro-vacio");
const carroConCosas = document.getElementById("carro-cosas");
const realizarCompra = document.getElementById('realizar-compra'); 
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');
const modalSuscribite = document.getElementById("modal-suscribite");
const botonCerrarModal= document.getElementById("cerrar-suscribite");
const modalProducto = document.getElementById("modal-producto");
const modalContinuar = document.getElementById("modal-continuar");
const botonCerrarModalContinuar= document.getElementById("cerrar-continuar");
const modalCarrito = document.getElementById("modal-carrito");
const modalVacio = document.getElementById("modal-vacio");

$(carroVacio).show()
$(carroConCosas).hide();;
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
               console.log(estado);
               $('#modal-suscribite').modal('toggle');
               setTimeout(function() { $('#modal-suscribite').modal('hide');  }, 1000);    
            }  
            );
    
    });
    dato.find('[name1]').each(function(index, value){
        var dato =$(this),
        nombre= dato.attr('name1'),
        valor= dato.val();

        info[nombre] = valor;

        $.post("https://jsonplaceholder.typicode.com/posts", info).done(function (respuesta, estado){

            console.log("El usuario ingreso el mail:"+ info[nombre]);
               console.log(estado);
               $('#modal-suscribite').modal('toggle');
               setTimeout(function() { $('#modal-suscribite').modal('hide');  }, 1000);   }  
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
          
          $('#modal-producto').modal('toggle'); 
         setTimeout(function() { $('#modal-producto').modal('hide');  }, 1000); 
         
         
          
          //Enviamos el producto seleccionado para tomar sus datos
         this.leerDatosProducto(producto);
         $(carroVacio).hide();
        $(carroConCosas).show();



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
      
        let productosLS; 
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS){
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id; //SI COINCIDE EL PRODUCTO SELECCIONADO CON ID 
            }
        });

        if(productosLS === infoProducto.id){ //NOS MUESTRE ESTOS DATOS SI SE DA ESTA COMPARACION
            $('#modal-continuar').modal('toggle');  
          
          botonContinuar.onclick = () => {this.insertarCarrito(infoProducto)|| $('#modal-continuar').modal('hide');};
          
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
           //modal
           $('#modal-vacio').modal('toggle');
           setTimeout(function() { $('#modal-vacio').modal('hide');  }, 1500);
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
//Realizar compra
function procesarCompra() {
    if (compra.obtenerProductosLocalStorage().length === 0) 
    {  $('#modal-vacio').modal('toggle');
    setTimeout(function() { $('#modal-vacio').modal('hide');  }, 1500);
        
      }    
 else if (cliente.value === '' || correo.value === '') {
       
    $('#modal-carrito').modal('toggle');
    setTimeout(function() { $('#modal-carrito').modal('hide');  }, 1500);
        }
else {
    localStorage.clear();
    window.location= "pedidorealizado.html";
}
  return false;
      };
realizarCompra.addEventListener('click', procesarCompra);

//Cerrar Modal
botonCerrarModal.addEventListener('click', function(){ 
    $('#modal-suscribite').modal('hide'); 

});
botonCerrarModalContinuar.addEventListener('click', function(){ 
    $('#modal-continuar').modal('hide'); 

});