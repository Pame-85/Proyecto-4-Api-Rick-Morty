//Busqueda
const busquedaPersonaje=document.querySelector(".personaje-button")
const busquedaForm=document.querySelector("#form-busqueda")
const containerCards=document.querySelector(".cards")

//Pagina Principal

let paginaPrincipal=1
const buscarPersonaje = () => {
    fetch(`https://rickandmortyapi.com/api/character?page=${paginaPrincipal}`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            hacerHtmlCards(data.results)

            personajePrincipal()

        })
}
buscarPersonaje()
//Button

busquedaPersonaje.onclick=()=>{
    buscarPersonaje(paginaPrincipal)
}


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
            personajePrincipal()


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

