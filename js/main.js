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