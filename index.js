//Busqueda
const busquedaPersonaje = document.querySelector(".personaje-button");
const busquedaForm = document.querySelector("#form-busqueda");
const containerCards = document.querySelector(".cards");
//Paginacion
const btnPrev = document.querySelector("#prev-button");
const btnNext = document.querySelector("#next-button");

//Modal Detalle
const btnCloseModal = document.querySelector(".close-button");
const modalDetallePcipal = document.querySelector("#modal-detalle");
const containerModal = document.querySelector(".card-modal-detalle");

//Pagina Principal

let paginaPrincipal = 1;
let ultimaPagina = 0;

const buscarPersonaje = () => {
  console.log(paginaPrincipal);
  fetch(`https://rickandmortyapi.com/api/character?page=${paginaPrincipal}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      ultimaPagina = data.info.pages;
      hacerHtmlCards(data.results);
      //personajePrincipal()
    });
};
buscarPersonaje();

const hacerHtmlCards = (data) => {
  const html = data.reduce((acc, curr) => {
    return (
      acc +
      `
          <div class="card" data-id="${curr.id}">
           <h2>${curr.name}</h2>
            <img class="img" src =${curr.image}> </img>
           
           </div>
           `
    );
  }, "");
  containerCards.innerHTML = html;
};
buscarPersonaje();

//Input y Form para busqueda filtrada
const formPersonaje = document.querySelector("#form-busqueda");
const inputNamePersonaje = document.querySelector("#input-busqueda");

formPersonaje.onsubmit = (e) => {
  e.preventDefault();
  buscarPersonajeFiltrado(inputNamePersonaje.value);
};
//Busqueda de personaje principal

const buscarPersonajeFiltrado = (name) => {
  fetch(`https://rickandmortyapi.com/api/character?name=${name}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      cardPrincipal(data.results);
      //personajePrincipal()
    });
};
//Busqueda de un solo personaje
const cardPrincipal = (character) => {
  const html = character.reduce((acc, curr) => {
    return (
      acc +
      `
          <div class="card" data-id="${curr.id}">
           <h2>${curr.name}</h2>
            <img class="img" src =${curr.image}> </img>
           </div>       
           `
    );
  }, "");
  containerCards.innerHTML = html;
};
//Paginacion

btnNext.onclick = () => {
  paginaPrincipal++;
  if (paginaPrincipal === ultimaPagina) {
    btnNext.disabled = true;
  }
  buscarPersonaje();
};

btnPrev.onclick = () => {
  paginaPrincipal--;
  if (paginaPrincipal === 1) {
    btnPrev.disabled = true;
  }
  buscarPersonaje();
};

//Detalles Modal
