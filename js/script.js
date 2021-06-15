//Carrito
const ClickButton = document.querySelectorAll('button'); // Tomo el boton de "A;adir al carrito"
const tbody = document.querySelector('.tbody') //padre de todos los productos lo toma
let carrito = []                                      //Guardar esa informacion en un array donde todo lo que este ahi se va a renderizar 
const shoppingCartContainer =document.querySelector('#tbody');


ClickButton.forEach (btn =>                                                //Accedemos a cada boton y vemos que cuando ocurra  el evento click se realice una funcion
btn.addEventListener("click", addToCarrito));

function addToCarrito(e){               //Definimos la funcion
  const button = e.target                   // visualizamos el boton al cual le hicimos click 
  const item = button.closest(".card-body");
  //que tome los datos del contenedor padre que posee toda la informacion del producto

// Tomo cada dato (en forma de texto), el tilulo, el precio, y la imagen
const itemTitle = item.querySelector('.card-text').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImg = item.querySelector('#img').src;

  const newItem = {                           
                //Luego creamos un objeto donde guardan los  new elementos 
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1,
  }

  addItemCarrito(newItem)
}


function addItemCarrito(newItem){

  const alert = document.querySelector('.alert')

  setTimeout( function(){
    alert.classList.add('hide')
  }, 2000)
    alert.classList.remove('hide')

  const InputElemnto = document.getElementsByClassName('input__elemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }
  
  carrito.push(newItem)
  
  renderCarrito()
} 


function renderCarrito(){
  tbody.innerHTML = "" //no se porque aca me pone null, busque mucho y no encuentro solucion
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img}  alt="">
              <h6 class="title">${item.title}</h6>
            </td>
            <td class="table__price"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
  
}

function CarritoTotal(){
  let Total = 0; // guardo el total 
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio*item.cantidad
  })

  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage() //guardo dato en local storage
}

function removeItemCarrito(e){ 
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1)
    }
  }

  const alert = document.querySelector('.remove') 

  setTimeout( function(){
    alert.classList.add('remove')
  }, 2000)
    alert.classList.remove('remove')

  tr.remove()
  CarritoTotal()
}

function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}

// Local storage- guardado de datos
function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    renderCarrito()
  }
}

