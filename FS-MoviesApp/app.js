/* 
 *    in questo caso decidiamo di andare a prendere le info tramite API concessa da TheMovieDB.org;
 *    è necessaria una registrazione + poi nel proprio profilo in impostazione trovo documentaz per generare API key;
 *    Per la documentazione di uso API --> https://developer.themoviedb.org/docs/getting-started + https://developer.themoviedb.org/reference/discover-movie
 */

// TheMovieDB elements (externals)
const apiKey = 'cf3a8c879639cf5381a774aa2efb76ad';
const URL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&sort_by=title.asc&page=1&language=it-IT';

const imgURL = 'https://image.tmdb.org/t/p/w1280';
const searchURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=';

//url per i dettagli del film, rimpiazzare $movie_id con l'id dek film da richiedere
const detailsURL = 'https://api.themoviedb.org/3/movie/$movie_id?api_key=' + apiKey + '&query=';

// form elements DOM
const form = document.getElementById('search-form');
const query = document.getElementById('query');
const root = document.getElementById('root');

//dimensionato btnDetail lo popolo quando visualizzo le card
let btnDetail;
let btnFavorites;
let datiDettaglio;

let movies = [],
    page = 1,
    inSearchPage = false;

// Fetch del file json dal URL
async function fetchData(URL) {
    try {
        const data = await fetch(URL).then((response) => response.json());
        return data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

const fetchAndShowResult = async (URL) => {
    const data = await fetchData(URL);
    data && showResults(data.results);
}

// alternativa, fa la stessa cosa: crea una funzione asyncrona di nome fetchAndShowResult
// async function fetchAndShowResult(URL) {
//     const data = await fetchData(URL);
//     data && showResults(data.results);
// }

const getSpecificPage = (page) => {
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=title.asc&page=${page}`;
    fetchAndShowResult(URL);
}

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
            <button class="btn btnDetail" id="${movie.id}" type="submit">Details</button>
            <button class="btn btnFavorites" id="${movie.id}" type="submit">Add a Favorites</button>
          </div>
        </div>
        <div class="describe">${movie.overview}</div>
      </div>
    </div>
  </div>`;

const showResults = (items) => {
    let content = !inSearchPage ? root.innerHTML : "";

    if (items && items.length > 0) {
        items.map((item) => {
            // crea e assegna a ogni variabile il 
            // valore dall'oggetto con pari chiave
            let {
                poster_path,
                title,
                original_title,
                release_date,
                overview,
                id
            } = item;
            // equivalente a sopra
            // let poster_path
            // poster_path = item.poster_path
            if (poster_path) {
                poster_path = imgURL + poster_path; // es: https://image.tmdb.org/t/p/w1280/y88eeQmaEDKz2e5CX3U86guIs6Q.jpg
            } else {
                poster_path = './poster.png';
            }
            if (original_title.length > 15) {
                original_title = original_title.slice(0, 15) + "..."; // es: Ren & Stimpy: T...
            }
            if (!release_date) {
                release_date = "Nessuna data di realizzazione";
            }
            if (!overview) {
                overview = "Nessun raiassunto presente";
            }
            const movieItem = {
                poster_path,
                original_title,
                title,
                release_date,
                overview,
                id
            };
            content += movieCard(movieItem);
        });
    } else {
        content += "<p>Qualcosa è andato storto!!!</p>"
    }
    root.innerHTML = content;
    // Lancio la funzione che mi legge tutti i bottoni con classe btnDetail e btnFavorites
    caricaBtnDetail();
    caricaBtnFavorites();
}

const handleLoadMore = () => {
    getSpecificPage(++page);
}

const detectEndAndLoadMore = () => {
    let el = document.documentElement;
    if (!inSearchPage && el.scrollTop + el.clientHeight == el.scrollHeight) {
        console.log("Evviva");
        handleLoadMore();
    } else {
        console.log('paginazione fallita');
    }
}

form.addEventListener('submit', async (e) => {
    inSearchPage = true;
    e.preventDefault();
    const searchTerm = query.value;
    searchTerm && fetchAndShowResult(searchURL + searchTerm);
    query.value = "";
});

window.addEventListener('scroll', detectEndAndLoadMore);

function init() {
    inSearchPage = false;
    fetchAndShowResult(URL);
}

init();


// Popolo la variabile array btnDetail con i pulsanti btnDetail creati
function caricaBtnDetail() {
    btnDetail = document.querySelectorAll('.btnDetail');
    // console.log(btnDetail)

    btnDetail.forEach((btnDetail) => {
        btnDetail.addEventListener('click', (e) => {
            e.preventDefault();
            // console.log(e.target.id)
            caricaDettaglio(e.target.id)
        })
    })
}

async function caricaDettaglio(id) {
    let mioURL = detailsURL.replace('$movie_id', id)
    datiDettaglio = await fetchData(mioURL)
    console.log(datiDettaglio)
    let messaggio = "Dettaglio del Film Selezionato \n \n"
    let detMessaggio = ""
    detMessaggio = datiDettaglio.adult ? "Si" : "No";
    messaggio = messaggio + "Da adulti: " + detMessaggio + "\n"
    detMessaggio = datiDettaglio.genres
    for (let i = 0; i < detMessaggio.length; i++) {
        messaggio = messaggio + "Genere" + (i + 1) + ": " + detMessaggio[i].name + "\n"
    }
    messaggio = messaggio + "Homepage: " + datiDettaglio.homepage + "\n"
    messaggio = messaggio + "Linguaggio Originale: " + datiDettaglio.original_language + "\n"
    messaggio = messaggio + "Paese di Origine: " + datiDettaglio.origin_country + "\n"
    localStorage.setItem("movie-id", id);
    if (!localStorage.getItem("seen-movie-id")) {
        localStorage.setItem("seen-movie-id", id);
        seen_movies = localStorage.getItem("seen-movie-id").split(",");
    } else {
        seen_movies = localStorage.getItem("seen-movie-id").split(",");
        seen_movies.push(id);
    }
    localStorage.setItem("seen-movie-id", seen_movies);
    alert(messaggio);
}

// Popolo la variabile array btnFavorites con i pulsanti btnFavorites creati
function caricaBtnFavorites() {
    btnFavorites = document.querySelectorAll('.btnFavorites');
    btnFavorites.forEach((btnFavorites) => {
        btnFavorites.addEventListener('click', (e) => {
            e.preventDefault();
            // console.log(e.target.id);
            gestisciPreferiti(e.target.id);
        })
    })
}

function gestisciPreferiti(id) {
    let favorites;
    if (!localStorage.getItem("favorites-id")) {
        localStorage.setItem("favorites-id", id);
        favorites = localStorage.getItem("favorites-id").split(",");
    } else {
        favorites = localStorage.getItem("favorites-id").split(",");
        let esisteFavorites = favorites.indexOf(id)
        if (esisteFavorites == -1) {
            favorites.push(id)
        } else {
            alert('Questo ID è già tra i preferiti')
        }
    }
    localStorage.setItem("favorites-id", favorites)
}