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



