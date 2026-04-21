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

        const div = document.createElement("div");

        const img = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;

        div.classList.add("movie-card");

        div.innerHTML = `
            <img src="${img}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;

        div.addEventListener("click", () => {
            window.location.href = `detail.html?id=${movie.id}`;
        });

        moviesContainer.appendChild(div);
    });
}

displayMovies();
