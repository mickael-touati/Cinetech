// FILMS
const moviesContainer = document.getElementById("movies-container");

async function displayMovies() {
    const movies = await getPopularMovies();

    movies.slice(0, 8).forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${IMG_URL}${movie.poster_path}">
            <h3>${movie.title}</h3>
            <p>${movie.vote_average}</p>
            <button class="btn-favori">🤍</button>
        `;

        card.querySelector(".btn-favori").addEventListener("click", (e) => {
            e.stopPropagation();
            const favoris = JSON.parse(localStorage.getItem("favoris")) || [];
            const index = favoris.findIndex(f => f.id === movie.id);
            if (index === -1) {
                favoris.push({ id: movie.id, titre: movie.title, affiche: movie.poster_path, note: movie.vote_average });
                e.target.textContent = "❤️";
            } else {
                favoris.splice(index, 1);
                e.target.textContent = "🤍";
            }
            localStorage.setItem("favoris", JSON.stringify(favoris));
        });

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

        card.innerHTML = `
            <img src="${IMG_URL}${serie.poster_path}">
            <h3>${serie.name}</h3>
            <p>${serie.vote_average}</p>
            <button class="btn-favori">🤍</button>
        `;

        card.querySelector(".btn-favori").addEventListener("click", (e) => {
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

        card.addEventListener("click", () => {
            window.location.href = `pages/detail.html?type=serie&id=${serie.id}`;
        });

        seriesContainer.appendChild(card);
    });
}

displayMovies();
displaySeries();