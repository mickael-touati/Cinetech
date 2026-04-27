async function afficherSeries() {
    const series = await getSeriesPopulaires();
    const container = document.getElementById("series-container");

    series.forEach(serie => {
        const carte = document.createElement("div");
        carte.classList.add("serie-card");
        carte.innerHTML = `
            <img src="${IMG_URL}${serie.poster_path}" alt="${serie.name}">
            <h3>${serie.name}</h3>
            <p>⭐ ${serie.vote_average}</p>
            <button class="btn-favori">🤍</button>
        `;

        carte.querySelector(".btn-favori").addEventListener("click", (e) => {
            e.stopPropagation();
            const favoris = JSON.parse(localStorage.getItem("favoris")) || [];
            const index = favoris.findIndex(f => f.id === serie.id);
            if (index === -1) {
                favoris.push({ id: serie.id, titre: serie.name, affiche: serie.poster_path, note: serie.vote_average });
                e.target.textContent = "❤️";
            } else {
                favoris.splice(index, 1);
                e.target.textContent = "🤍";
            }
            localStorage.setItem("favoris", JSON.stringify(favoris));
        });

        carte.addEventListener("click", () => {
            window.location.href = `pages/detail.html?type=serie&id=${serie.id}`;
        });

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
        `;

        card.addEventListener("click", () => {
            window.location.href = `pages/detail.html?id=${movie.id}`;
        });

        moviesContainer.appendChild(card);
    });
}

displayMovies();