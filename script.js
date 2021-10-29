// load movie lists by default
document.addEventListener('DOMContentLoaded', function() {
    load_movies();
});

// GET request API to get all movies from database
function load_movies() {
    fetch('./db.json')
        .then(response => response.json())
        .then(db => {
            movies = db.movies
            movies.forEach(movie => show_movie(movie))
        })
}
// function for showing movie lists
function show_movie(movie) {
    let container = document.getElementById("movies-container");
    container.innerHTML += `
        <div class="card">
            <img src="${movie.poster}" alt="Movie Poster" class="card-img" onclick="details(${movie.id})">
            <div class="card-body">
                <div class="row">
                    <h3 class="card-title">${movie.title}</h3>
                    <div class="badge">
                        <p>${movie.rate}</p>
                    </div>
                </div>
                <div class="row flex-end">
                    <button class="btn" onclick="details(${movie.id})">Details</button>
                </div>
            </div>
        </div>
    `
}

// function for showing the movie description's modal
function details(id) {

    // Get the modal
    var modal = document.getElementById("modal-container");
    // When the user clicks the button, open the modal 
    modal.style.display = "block";

    // GET request API to get movie's description
    fetch('./db.json')
        .then(response => response.json())
        .then(db => {

            // get the movie's description
            movie = db.movies[id - 1];

            // get the movie's genre
            genreId = movie.genreId;
            genre = db.genres[genreId - 1];

            modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close" onclick="close_modal()">&times;</span>
                    <h1 class="title" style="padding: 0.5em;">${movie.title}</h1>
                </div>
                <div class="modal-body">
                    <img src=${movie.poster} alt="Movie Poster" class="modal-img" >
                    <div class="modal-desc">
                        <div style="margin-bottom: 1em;">
                            <h3>Details</h3>
                            <p>${movie.description}</p>
                        </div>
                        <div style="margin-bottom: 0.5em;">
                            <h4 style="display: inline;">IMDb rating:</h4>
                            <h>${movie.rate}</h>
                        </div>
                        <div style="margin-bottom: 0.5em;">
                            <h4 style="display: inline;">Genre:</h4>
                            <h>${genre.name}</h>
                        </div>
                        <div style="margin-bottom: 0.5em;">
                            <h4 style="display: inline;">Year:</h4>
                            <h>${movie.year}</h>
                        </div>
                        <div style="margin-bottom: 0.5em;">
                            <h4 style="display: inline;">Duration:</h4>
                            <h>${movie.duration}</h>
                        </div>
                    </div>
                </div>
            </div>
        `
        })

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// function for closing the movie description's modal
function close_modal() {
    var modal = document.getElementById("modal-container");
    modal.style.display = "none";
}

const searchBar = document.querySelector(".search-box");
const inputBox = searchBar.querySelector("input");
const movieTitle = searchBar.querySelector("movies-container")

inputBox.onkeyup = (e) => {
    let userData = e.target.value;
    let emptyArray = [];
    if (userData) {
        emptyArray = movies.filter((data) => {
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLowerCase();
        });
        emptyArray = emptyArray.map((data) => {
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
    } else {
        searchBar.classList.remove("active"); //hide autocomplete box
    }
}

function select(element) {
    let selectData = element.textContent;
    inputBox.value = selectData;

    searchBar.classList.remove("active");
}

function showSuggestions(list) {
    let listData;
    if (!list.length) {
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    } else {
        listData = list.join('');
    }
    movieTitle.innerHTML = listData;
}