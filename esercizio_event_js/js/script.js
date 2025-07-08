const collegamentiConFigli = document.querySelectorAll('.linkConFigli > a');

collegamentiConFigli.forEach((collegamentiConFigli) => {
    collegamentiConFigli.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(collegamentiConFigli)
        chiudiSubMenu(collegamentiConFigli);
        collegamentiConFigli.classList.toggle('active');
    })
});

function chiudiSubMenu(eccetto) {
    let contatore = 0
    for (contatore = 0; contatore < collegamentiConFigli.length; contatore++) {
        if (eccetto !== collegamentiConFigli[contatore]) {
            collegamentiConFigli[contatore].classList.remove('active')
        }
    }
}

window.addEventListener("resize", gestisciLarghezza);

function gestisciLarghezza() {
    let larghezza = window.innerWidth;
    if (larghezza > 768) {
        let m = document.querySelector('.menubar');
        m.classList.remove('activeMenuMobile')
    }
}

function premutoBtnMenu() {
    let m = document.querySelector('.menubar');
    m.classList.toggle('activeMenuMobile')
}

// Da qui inizia il codice per l'esercizio del Contatore

let Contatore = 0;
let Casella = document.querySelector('.testoContatore');

const Pulsanti = document.querySelectorAll("button");
Pulsanti.forEach((Pulsanti => {
    Pulsanti.addEventListener('click', (e) => {
        switch (e.target.id) {
            case 'aumenta':
                Contatore++;
                break;
            case 'diminuisci':
                Contatore--;
                break;
            case 'azzera':
                Contatore = 0;
        }
        Casella.innerText = "Contatore: " + Contatore
    });
}));