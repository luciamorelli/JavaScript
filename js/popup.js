//PopUp
//Tomo todos los elementos de HTML y guardo en variables
var botonAbrir = document.getElementById('botonabre'),
	capa = document.getElementById('capa'),
	popup = document.getElementById('popup'),
	botonCierra = document.getElementById('botoncierra');


//cuando se haga click en ese boton, que ejecute la funcion 	
//Hacer que solo se ejecute una vez
var repetir = true;

if (repetir) {
botonAbrir.addEventListener('click', function(){ 
	capa.classList.add('active'); //define clase
	popup.classList.add('active');	
}); 
ejecucion= false;
}
	

botonCierra.addEventListener('click', function(e){
	e.preventDefault(); //verificacion del formulario 
	capa.classList.remove('active'); 
	popup.classList.remove('active');
})

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

