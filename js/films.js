const container = document.getElementById("movies-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const pageInfo = document.getElementById("page-info");

let currentPage = 1;
let totalPages = 1;

async function displayMovies(page) {

    const data = await getMoviesByPage(page);

    const movies = data.results;
    totalPages = data.total_pages;

    container.innerHTML = "";

    movies.forEach(movie => {

        const card = document.createElement("div");
        card.classList.add("movie-card");

        const img = `${IMG_URL}${movie.poster_path}`;

        card.innerHTML = `
            <img src="${img}">
            <h3>${movie.title}</h3>
        `;

        card.addEventListener("click", () => {
            window.location.href = `detail.html?id=${movie.id}`;
        });

        container.appendChild(card);
    });

    pageInfo.textContent = `Page ${currentPage} / ${totalPages}`;
}

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayMovies(currentPage);
    }
});

nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        displayMovies(currentPage);
    }
});

displayMovies(currentPage);