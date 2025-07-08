const apiKey = 'cf3a8c879639cf5381a774aa2efb76ad';

//url per i dettagli del film, rimpiazzare $movie_id con l'id dek film da richiedere
const detailsURL = 'https://api.themoviedb.org/3/movie/$movie_id?api_key=' + apiKey + '&query=';
const imgURL = 'https://image.tmdb.org/t/p/w1280';

let content;
let btnRemove;
let preferiti;

// form elements DOM
const root = document.getElementById('root');

let movies = [],
    page = 1;

function init() {
    content = ""
    caricaPreferiti();
}

init();

async function caricaPreferiti(URL) {
    if (localStorage.getItem("favorites-id")) {
        preferiti = localStorage.getItem("favorites-id").split(",");
    } else {
        alert('Nessun Preferito Memorizzato');
        return;
    }
    let data;
    let mioURL;
    for (let i = 0; i < preferiti.length; i++) {
        try {
            mioURL = detailsURL.replace('$movie_id', preferiti[i]);
            data = await fetch(mioURL).then((response) => response.json());
            data && showResults(data);
        } catch (error) {
            console.error(error.message);
        }
    }

    root.innerHTML = content;
    // Lancio la funzione che mi legge tutti i bottoni con classe btnRemoveFavorites
    caricaBtnRemove();
}

const showResults = (item) => {
    if (item.title) {
        title = item.title;
    } else {
        title = 'Titolo Sconosciuto';
    }
    if (item.original_title.length > 15) {
        original_title = item.original_title.slice(0, 15) + "..."; // es: Ren & Stimpy: T...
    } else {
        original_title = "Titolo Originale Sconosciuto";
    }
    if (item.release_date) {
        release_date = item.release_date;
    } else {
        release_date = "Nessuna data di realizzazione";
    }
    if (item.overview) {
        overview = item.overview;
    } else {
        overview = "Nessun raiassunto presente";
    }
    if (item.poster_path) {
        poster_path = imgURL + item.poster_path; // es: https://image.tmdb.org/t/p/w1280/y88eeQmaEDKz2e5CX3U86guIs6Q.jpg
    } else {
        poster_path = './poster.png';
    }
    if (item.id) {
        id = item.id;
    } else {
        id = "Nessun id presente";
    }
    const movieItem = {
        poster_path,
        original_title,
        title,
        release_date,
        overview,
        id
    };
    if (content) {
        content += movieCard(movieItem);
    } else {
        content = movieCard(movieItem);
    }
};

const movieCard = (movie) =>
    `<div class="col">
    <div class="card">
      <a class="card-media" href="./img-01.jpeg">
        <img src="${movie.poster_path}" alt="${movie.title}" width="100%">
      </a>
      <div class="card-content">
        <div class="card-cont-header">
          <div class="cont-left">
            <h3>${movie.original_title}</h3>
            <span>${movie.release_date}</span>
          </div>
          <div class="cont-right">
            <a href="${movie.poster_path}" target="_blank" class="btn">See image</a>
            <button class="btn btnRemoveFavorites" id="${movie.id}" type="submit">Remove To Favorites</button>
          </div>
        </div>
        <div class="describe">${movie.overview}</div>
      </div>
    </div>
  </div>`;

// Popolo la variabile array btnRemove con i pulsanti btnRemoveFavorites creati
function caricaBtnRemove() {
    btnRemove = document.querySelectorAll('.btnRemoveFavorites');
    btnRemove.forEach((btnRemove) => {
        btnRemove.addEventListener('click', (e) => {
            e.preventDefault();
            rimuoviPreferiti(e.target.id);
        })
    })
}

function rimuoviPreferiti(id) {
    let index = preferiti.indexOf(id)
    if (index >= 0) {
        preferiti.splice(index, 1)
        localStorage.setItem("favorites-id", preferiti)
        init()
    }
}