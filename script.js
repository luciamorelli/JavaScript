
const criptoMonedasPrincipales = ["Bitcoin","Ethereum" ,"Binance Coin"];
console.log( "Cantidad de Criptomonedas principales analizadas" + " " +  criptoMonedasPrincipales.length ); 

criptoMonedasPrincipales.push("Tether");
console.log( "Cantidad de Criptomonedas principales analizadas" + " " +  criptoMonedasPrincipales.length );

const criptoMonedasSecundarias = ["Cardano","Dogecoin"] ;
console.log( "Cantidad de Criptomonedas secundarias analizadas" + " " +  criptoMonedasSecundarias.length );

const criptoMonedas = criptoMonedasPrincipales.concat(criptoMonedasSecundarias);
console.log( "Cantidad de Criptomonedas  analizadas" + " " +  criptoMonedas.length );

const topCotizacion = criptoMonedasPrincipales.slice(0,2);
console.log( "Las mejores cotizaciones son de " + " " +   topCotizacion );

function saludar () {  
    let nombre = prompt ("Ingresa tu nombre:");
    let apellido = prompt ("Ingresa tu apellido:");
    alert ("Bienvenidx"+ " "  + nombre + " " + apellido); 
}

saludar (); 


class Criptomonedas {
    constructor(nombre, cotizacion) {
        this.nombre = nombre;
        this.cotizacion = parseFloat(cotizacion);

    }
    Cotizar1Dolar() {
        this.cotizacion = this.cotizacion * 1;
        alert("Un dolar cotiza" + " " + this.cotizacion +" " + this.nombre);
    }
}

const criptomoneda = [];

criptomoneda.push( new Criptomonedas ("Bitcoin",0.000024));
criptomoneda.push( new Criptomonedas ("Ethereum ",0.00036));
criptomoneda.push( new Criptomonedas ("Litecoin",0.0047));


for (const Criptomonedas of criptomoneda)
        Criptomonedas.Cotizar1Dolar();





 
