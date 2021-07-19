//SUSCRIBITE
/*CONSTANTES*/
//Tomo todos los elementos de HTML y guardo
const carroConCosas = document.getElementById("carro-cosas");
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const procesarPedidoBtn = document.getElementById('procesar-pedido');
const modalSuscribite = document.getElementById("modal-suscribite");
const botonCerrarModal= document.getElementById("cerrar-suscribite");
$(vaciarCarritoBtn).hide();
$(procesarPedidoBtn).hide();
$(carroConCosas).hide();

var botonAbrir = document.getElementById('botonabre'),
	capa = document.getElementById('capa'),
	popup = document.getElementById('popup'),
	botonCierra = document.getElementById('botoncierra');
    botonSucribite = document.getElementById('suscribite');

//Cuando se haga click en ese boton, que ejecute la funcion 	
var repetir = true;
if (repetir) {
botonAbrir.addEventListener('click', function(){ 
	capa.classList.add('active'); //agrego clase active 
	popup.classList.add('active');	
}); 

}
	
botonCierra.addEventListener('click', function(e){
	e.preventDefault(); //verificacion del formulario,detiene la accion
	capa.classList.remove('active'); //saco clase active
	popup.classList.remove('active');
    
});


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
               capa.classList.remove('active'); //saco clase active
	            popup.classList.remove('active');
              
               setTimeout(function() { $('#modal-suscribite').modal('hide');}, 1000);
            
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
               capa.classList.remove('active'); //saco clase active
               popup.classList.remove('active');
               
               setTimeout(function() { $('#modal-suscribite').modal('hide');}, 1000);    

            }  
            );
    
    });
    $('#modal-suscribite').modal('toggle');
    return false;
    
});

