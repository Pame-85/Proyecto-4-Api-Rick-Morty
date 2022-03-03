//Busqueda

// Deja un espacio antes y despues de los =, asi:
// const busquedaPersonaje = document.querySelector(".personaje-button")
// let paginaPrincipal = 1

// nunca usas esta variable
const busquedaPersonaje=document.querySelector(".personaje-button")
// nunca usas esta variable
const busquedaForm=document.querySelector("#form-busqueda")
const containerCards=document.querySelector(".cards")
//Paginacion
const btnPrev=document.querySelector("#prev-button")
const btnNext=document.querySelector("#next-button")

//Modal Detalle
// nunca usas esta variable
const btnCloseModal=document.querySelector(".close-button")
// nunca usas esta variable
const modalDetallePcipal=document.querySelector("#modal-detalle")
// nunca usas esta variable
const containerModal=document.querySelector(".card-modal-detalle")


//Pagina Principal

let paginaPrincipal=1
let ultimaPagina=0


const buscarPersonaje = () => {
    // no dejes console log en una entrega
    console.log(paginaPrincipal)
    fetch(`https://rickandmortyapi.com/api/character?page=${paginaPrincipal}`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            ultimaPagina=(data.info.pages)
            hacerHtmlCards(data.results)
            // no dejes codigo comentado en una enetrega
            //personajePrincipal()

        })
}

// todas las funciones que se ejecutan al principio, es mejor que esten al final de todo, 
// todas juntas. asi el flujo de ejecucion del codigo es mas facil de entender
buscarPersonaje()


const hacerHtmlCards = (data) => {
    const html = data.reduce((acc, curr) => {
        return acc + `
          <div class="card" data-id="${curr.id}">
           <h2>${curr.name}</h2>
            <img class="img" src =${curr.image}> </img>
           
           </div>
           `
    }, "")
    containerCards.innerHTML = html


}
buscarPersonaje()

//Input y Form para busqueda filtrada
const formPersonaje = document.querySelector("#form-busqueda")
const inputNamePersonaje = document.querySelector("#input-busqueda")

formPersonaje.onsubmit = (e) => {
    e.preventDefault();
    buscarPersonajeFiltrado(inputNamePersonaje.value)
}
//Busqueda de personaje principal

const buscarPersonajeFiltrado = (name) => {
    fetch(`https://rickandmortyapi.com/api/character?name=${name}`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            cardPrincipal(data.results)
            // no dejes codigo comentado
            //personajePrincipal()


        })
}
//Busqueda de un solo personaje
const cardPrincipal = (character) => {
    const html = character.reduce((acc, curr) => {
        return acc + `
          <div class="card" data-id="${curr.id}">
           <h2>${curr.name}</h2>
            <img class="img" src =${curr.image}> </img>
           </div>       
           `
    }, "")
    containerCards.innerHTML = html


}
//Paginacion

// Estos botones estan asociados a buscarPersonaje, no a buscarPersonajeFiltrado. 
// Lo que ocurre es que cuando busco un personaje, por ejemplo, Rick, y luego voy a la pagina 2, 
// veo los resiltados de todos los personajes, no de rick solamente

// Tenes que, o bien hacer diferentes botones para la busqueda, o hacer una funcion que sirva para las dos cosas
// Con la api de rick y morty es facil hacer lo segundo, agrega name=${inputNamePersonaje.value} al fetch de 
// buscarPersonaje y deberia andar
btnNext.onclick = () => {
    paginaPrincipal++
    if(paginaPrincipal===ultimaPagina){
        btnNext.disabled=true
    }
    buscarPersonaje()
  }
  
  btnPrev.onclick = () => {
    paginaPrincipal--
    if(paginaPrincipal===1){
        btnPrev.disabled=true
    }
    buscarPersonaje()
  } 
  
  //Detalles Modal

  