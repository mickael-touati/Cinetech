async function afficherSeries() {
    const series = await getSeriesPopulaires();

    const container = document.getElementById("series-container");

    series.forEach(serie => {
        const carte = document.createElement("div");
        carte.classList.add("serie-card");
        carte.innerHTML = `
            <img src="${IMG_URL}${serie.poster_path}" alt="${serie.name}">
            <h3>${serie.name}</h3>
            <p>${serie.vote_average}</p>
        `;
        container.appendChild(carte);
    });
}

afficherSeries();

const moviesContainer = document.getElementById("movies-container");

async function displayMovies() {

    const movies = await getPopularMovies();

    movies.forEach(movie => {

        const card = document.createElement("div");
        card.classList.add("movie-card");

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

displayMovies();
