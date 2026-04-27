// ACCUEIL

// FILMS

const moviesContainer = document.getElementById("movies-container");

async function displayMovies() {
    const movies = await getPopularMovies();

    movies.slice(0, 8).forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = `${IMG_URL}${movie.poster_path}`;

        card.innerHTML = `
            <img src="${img}">
            <h3>${movie.title}</h3>
            <p>${movie.vote_average}</p>
        `;

        card.addEventListener("click", () => {
            window.location.href = `pages/detail.html?id=${movie.id}`;
        });

        moviesContainer.appendChild(card);
    });
}

// SERIES

const seriesContainer = document.getElementById("series-container");

async function displaySeries() {
    const series = await getSeriesPopulaires();

    series.slice(0, 8).forEach(serie => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = `${IMG_URL}${serie.poster_path}`;

        card.innerHTML = `
            <img src="${img}">
            <h3>${serie.name}</h3>
            <p>${serie.vote_average}</p>
        `;

        card.addEventListener("click", () => {
            window.location.href = `pages/detail.html?type=serie&id=${serie.id}`;
        });

        seriesContainer.appendChild(card);
    });
}

displayMovies();
displaySeries();