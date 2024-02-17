const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);


const header = document.querySelector("[data-header]");

const activeHeader = function () {
  if (window.scrollY > 300) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeHeader);




window.addEventListener('DOMContentLoaded', function (){
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(function(registration) {
            console.log('Service Worker registrado con éxito:', registration);
        })
        .catch(function(error) {
            console.error('Error al registrar el Service Worker:', error);
        });
}
}); 
let criptomonedas = [];

let endpoint = 'js/items.json'
fetch(endpoint)
.then(response => response.json())
    .then(data => mostrarData(data))
.catch(e => console.log(e))

const mostrarData = (data) => {
  let body = ''
  for (let i=0; i < data.length; i++) {
      body += `
    <tr class="table-row">
        <td class="table-data">
                    <button class="add-to-fav" aria-label="Add to favourite" data-add-to-fav>
                    <ion-icon  name="star-outline" aria-hidden="true" class="icon-outline"></ion-icon>
                      <ion-icon name="star" aria-hidden="true" class="icon-fill"></ion-icon>
                    </button>
        </td>
        <th class="table-data rank" scope="row">${data[i].market_cap_rank}</th>
        <td class="table-data">
            <div class="wrapper">
                <img src="${data[i].image}" width="20" height="20" alt="Bitcoin logo" class="img">
                <h3>
                  <a href="#" class="coin-name">${data[i].name}<span class="span">${data[i].symbol}</span></a>
                </h3>
            </div>
        </td>
                  <td id="last-price" class="table-data last-price">$${data[i].current_price}</td>
                  <td id="price" class="table-data last-update">${data[i].price_change_percentage_24h}</td>
                  <td id="marketCap" class="table-data market-cap">$${data[i].market_cap}</td>
                  <td id="chart" class="table-data">
                    <img src="${data[i].chart}" width="100" height="40" alt="profit chart" class="chart">
                  </td>
                  <td id="trade" class="table-data">
                    <button class="btn btn-outline">Trade</button>
                  </td>
      </tr>
   `
  }
  document.getElementById('data').innerHTML = body

  

}

document.addEventListener('DOMContentLoaded', function() {
const campoBusqueda = document.getElementById('busquedaCriptos');
campoBusqueda.addEventListener('input', function() {
  const valorBusqueda = campoBusqueda.value.toLowerCase();
  const criptomonedasFiltradas = criptomonedas.filter(function(cripto) {
    const nombreEnMinusculas = cripto.name.toLowerCase();
    const simboloEnMinusculas = cripto.symbol.toLowerCase();
    return nombreEnMinusculas.includes(valorBusqueda) || simboloEnMinusculas.includes(valorBusqueda);
  });
  const contenedorCriptomonedas = document.getElementById('contenedorCriptomonedas');
  contenedorCriptomonedas.innerHTML = '';
  if (valorBusqueda.trim() !== '') {
    criptomonedasFiltradas.forEach(function(cripto) {
      const criptoElemento = document.createElement('div');
      criptoElemento.classList.add("div-search")
      criptoElemento.textContent = ` ${cripto.name} (${cripto.symbol}) - Price: $${cripto.current_price}`;
      contenedorCriptomonedas.appendChild(criptoElemento);
    });
  }
});
});
fetch('js/items.json')
  .then(response => response.json())
  .then(data => {
    criptomonedas = data;
  })
  .catch(error => console.error('Error al cargar los datos:', error));
  
function obtenerComentariosDeLocalStorage() {
  const comentariosJSON = localStorage.getItem('comentarios');
  return comentariosJSON ? JSON.parse(comentariosJSON) : [];
}

function guardarComentariosEnLocalStorage(comentarios) {
  localStorage.setItem('comentarios', JSON.stringify(comentarios));
}

const commentForm = document.getElementById('commentForm');
commentForm.addEventListener('submit', function(e) {
  e.preventDefault(); 

  const nameInput = document.getElementById('nameInput');
  const commentInput = document.getElementById('commentInput');
  const nombre = nameInput.value.trim();
  const comentario = commentInput.value.trim();

  if (nombre !== '' && comentario !== '') {
    const comentariosExistentes = obtenerComentariosDeLocalStorage() || [];
    const nuevoComentario = {
      nombre: nombre,
      comentario: comentario
    };

    comentariosExistentes.push(nuevoComentario);
    guardarComentariosEnLocalStorage(comentariosExistentes);
    nameInput.value = '';
    commentInput.value = '';
    mostrarComentarios(comentariosExistentes);
  }
});

function mostrarComentarios(comentarios) {
  const commentArea = document.getElementById('commentArea');
  commentArea.innerHTML = '';

  if (comentarios.length === 0) {
    commentArea.innerHTML = '<p>No comments yet.</p>';
  } else {
    const ul = document.createElement('ul');
    ul.className = 'ul-comentario';
    comentarios.forEach(comentario => {
      const li = document.createElement('li');
      li.textContent = `${comentario.nombre} dice: ${comentario.comentario}`;
      ul.appendChild(li);
    });
    commentArea.appendChild(ul);
  }
}
const comentariosExistentes = obtenerComentariosDeLocalStorage();
mostrarComentarios(comentariosExistentes);

function guardarComentariosEnLocalStorage(comentarios) {
  localStorage.setItem('comentarios', JSON.stringify(comentarios));
}
  
let objectInstall;
let liInstall = this.document.getElementById('li-install');
liInstall.style.display= 'none';
let btnInstall = this.document.getElementById('btn-install');

window.addEventListener("beforeinstallprompt", function (e) {
  e.preventDefault()
  objectInstall = e;
  liInstall.style.display= 'inline';
})
btnInstall.addEventListener('click', function(e){
  if (objectInstall) {
    objectInstall.prompt();
    objectInstall.userChoice.then((choiseResult) => {
      console.log('respuesta:', choiseResult.outcome);
      if (choiseResult.outcome =='accepted') {
        liInstall.style.display= 'none';
      }
  })
} 

});

function NotificationPermission() {
  if (window.Notification) {
    if (Notification.permission !== 'denied') {
  
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
              console.log('El usuario acepto recibir notificaciones')
          } else {
            console.log('El usuario NO acepto recibir notificaciones')
          }
        })
    }
  }
} 
this.setTimeout(NotificationPermission, 2000)

const Status = () => {
  console.log('Estado de la conexion:' , this.navigator.onLine);
  const status = document.getElementById('status');
  const body = document.getElementsByTagName('body')[0];
  if (this.navigator.onLine) {
    body.style.backgroundColor = 'black';
    status.style.color = 'green';
    status.innerHTML= 'Online';
  } else {
    status.style.color = 'red';
    body.style.backgroundColor = 'DarkSlateGray';
    status.innerHTML= 'Offline';
  }
}
Status();

window.addEventListener('online', Status);
window.addEventListener('offline', Status);


let liShare = document.getElementById('li-share');
liShare.style.display = 'none';
if (navigator.share) {
liShare.style.display = 'inline';
  let btnShare = this.document.getElementById('btn-share');
  btnShare.addEventListener('click', async (e) => {
    console.log ('Compartir aplicacion');
    let dataShare = {
      title: "Crypmel",
      text: "Learn trading on Crypmel",
      url: this.window.location.href ,
    }
    try {
      await this.navigator.share(dataShare);
      console.log("Shared Successfully");
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  })
} else {
  console.log('web share not supported');
}


































  
  


