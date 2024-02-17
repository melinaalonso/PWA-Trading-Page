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
        body.style.backgroundColor = 'grey';
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




})